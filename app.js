const TABDEFS = [
  ["Dashboard","Dashboard"],["Government","Government"],["Accounting & Tax","Accounting & Tax"],
  ["Finance & Accounts","Finance & Accounts"],["Healthcare Admin","Healthcare Admin / Finance"],
  ["Corporate / Office","Corporate / Office"],["Registers & Pools","Registers & Pools"],
  ["Applied","Applied"],["Disregarded","Disregarded"],["Closed","Closed"],["All Jobs","All Jobs"]
];

let jobs = [];
let dataUpdatedAt = "";
let currentTab = "Dashboard";
let filters = new Set();
let sortKey = "rank";
let sortDir = "asc";

const STATUS_KEY = "cj_job_tracker_status_overrides_v1";
let statusOverrides = JSON.parse(localStorage.getItem(STATUS_KEY) || "{}");

const chanceOrder = {"Very High":5,"High":4,"Med–High":3.5,"Medium":3,"Medium–Low":2,"Low":1};
const relOrder = {"Excellent":5,"Very High":4.5,"High":4,"Medium":3,"Low–Medium":2,"Low":1};
const statusOrder = {"🟢 Apply":1,"🟡 Consider":2,"🟣 Interview":3,"🟠 Waiting":4,"🔵 Applied":5,"✅ Offer":6,"🚫 Disregarded":7,"❌ Closed":8};
const typeOrder = {"Vacancy":1,"Internship":2,"Graduate Program":3,"Talent Pool":4,"Register":5};
const firstDirection = {
  rank:"asc",new:"desc",rate:"desc",distance:"asc",employment:"asc",arrangement:"asc",
  chance:"desc",relevance:"desc",added:"desc",listed:"desc",closing:"asc",type:"asc",status:"asc"
};

function perthTodayParts(){
  const parts = new Intl.DateTimeFormat("en-AU", {timeZone:"Australia/Perth",day:"2-digit",month:"short",year:"numeric"}).formatToParts(new Date());
  const x = Object.fromEntries(parts.map(p=>[p.type,p.value]));
  return {key:`${x.year}-${x.month}-${x.day}`, display:`${Number(x.day)} ${x.month} ${x.year}`};
}
function canonicalDate(s){
  const m=String(s||"").match(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i);
  if(!m)return "";
  return `${m[3]}-${m[2].slice(0,3).toLowerCase()}-${String(Number(m[1])).padStart(2,"0")}`;
}
function effectiveDateAdded(j){
  if(j.date_added)return j.date_added;
  if(String(j.new||"").includes("NEW"))return j.listed || "28 Aug 2026";
  return "";
}
function isNewToday(j){
  const today=perthTodayParts();
  const d=effectiveDateAdded(j);
  if(!d)return false;
  const parts=new Intl.DateTimeFormat("en-AU",{timeZone:"Australia/Perth",day:"2-digit",month:"short",year:"numeric"}).formatToParts(new Date());
  const x=Object.fromEntries(parts.map(p=>[p.type,p.value]));
  const todayKey=`${x.year}-${x.month.toLowerCase()}-${String(Number(x.day)).padStart(2,"0")}`;
  return canonicalDate(d)===todayKey;
}
function applyOverrides(list){return list.map(j=>({...j,status:statusOverrides[j.id]||j.status}));}
function persistOverride(id,status){statusOverrides[id]=status;localStorage.setItem(STATUS_KEY,JSON.stringify(statusOverrides));}
function clearLocalStatuses(){statusOverrides={};localStorage.removeItem(STATUS_KEY);render();}
function toggleFilter(el){const f=el.dataset.filter;filters.has(f)?filters.delete(f):filters.add(f);el.classList.toggle("on");render();}
function setTab(t){currentTab=t;document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===t));render();}
function setStatus(id,status){persistOverride(id,status);render();}
function parseDate(s){
  const m=String(s||"").match(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i);
  if(!m)return null;
  return new Date(`${m[2]} ${m[1]}, ${m[3]} 23:59:59`);
}
function closingSoon(j){const d=parseDate(j.closing);if(!d)return false;const diff=(d-new Date())/86400000;return diff>=0&&diff<=4;}
function hourlyRange(j){
  const s=String(j.pay||"");
  if(!/\/hr|per hour|hourly/i.test(s))return null;
  const before=s.split(/\/hr|per hour|hourly/i)[0];
  let m=before.match(/\$?\s*(\d+(?:\.\d+)?)\s*[–-]\s*\$?\s*(\d+(?:\.\d+)?)/);
  if(m)return [Number(m[1]),Number(m[2])];
  m=before.match(/\$\s*(\d+(?:\.\d+)?)/);
  if(m)return [Number(m[1]),Number(m[1])];
  if(j.pay_max!=null)return [Number(j.pay_max),Number(j.pay_max)];
  return null;
}
function moneyK(v){return `$${(v/1000).toFixed(1)}k`;}
function annualPayText(j){
  const r=hourlyRange(j);if(!r)return "";
  const annual=[r[0]*1976,r[1]*1976];
  let txt=annual[0]===annual[1]?`${moneyK(annual[0])} p.a. FTE`:`${moneyK(annual[0])}–${moneyK(annual[1])} p.a. FTE`;
  const fte=String(j.employment||"").match(/(0\.\d+)\s*FTE/i);
  if(fte){const f=Number(fte[1]);const actual=[annual[0]*f,annual[1]*f];txt+=` • at ${f} FTE: ${actual[0]===actual[1]?moneyK(actual[0]):`${moneyK(actual[0])}–${moneyK(actual[1])}`} p.a.`;}
  return txt;
}
function payCell(j){const annual=annualPayText(j);return `<b>${esc(j.pay)}</b>${annual?`<div class="annual">≈ ${esc(annual)}</div>`:""}`;}
function baseRows(){
  let r=applyOverrides(jobs);
  if(currentTab==="Applied")r=r.filter(j=>/Applied|Interview|Waiting|Offer/.test(j.status));
  else if(currentTab==="Disregarded")r=r.filter(j=>j.status.includes("Disregarded"));
  else if(currentTab==="Closed")r=r.filter(j=>j.status.includes("Closed"));
  else if(currentTab==="Registers & Pools")r=r.filter(j=>["Register","Talent Pool"].includes(j.type));
  else if(currentTab==="Government")r=r.filter(j=>j.category.includes("Government")&&!/Closed|Disregarded/.test(j.status));
  else if(currentTab==="Accounting & Tax")r=r.filter(j=>j.category.includes("Accounting & Tax")&&!/Closed|Disregarded/.test(j.status));
  else if(currentTab==="Finance & Accounts")r=r.filter(j=>j.category.includes("Finance & Accounts")&&!/Closed|Disregarded/.test(j.status));
  else if(currentTab==="Healthcare Admin")r=r.filter(j=>j.category.includes("Healthcare Admin / Finance")&&!/Closed|Disregarded/.test(j.status));
  else if(currentTab==="Corporate / Office")r=r.filter(j=>j.category.includes("Corporate / Office")&&!/Closed|Disregarded/.test(j.status));
  else if(currentTab==="Dashboard")r=r.filter(j=>["🟢 Apply","🟡 Consider"].includes(j.status));
  return r;
}
function filteredRows(){
  let r=baseRows();
  const q=document.getElementById("search").value.trim().toLowerCase();
  if(q)r=r.filter(j=>[j.role,j.employer,j.location,j.pay,j.career,j.employment,j.arrangement,j.status,effectiveDateAdded(j)].join(" ").toLowerCase().includes(q));
  if(filters.has("new"))r=r.filter(isNewToday);
  if(filters.has("40"))r=r.filter(j=>(j.pay_max||0)>=40);
  if(filters.has("part"))r=r.filter(j=>/part[- ]time/i.test(j.employment));
  if(filters.has("hybrid"))r=r.filter(j=>/hybrid|remote|wfh/i.test(j.arrangement));
  if(filters.has("gov"))r=r.filter(j=>j.category.includes("Government"));
  if(filters.has("acct"))r=r.filter(j=>j.category.includes("Accounting & Tax"));
  if(filters.has("fin"))r=r.filter(j=>j.category.includes("Finance & Accounts"));
  if(filters.has("soon"))r=r.filter(closingSoon);
  return sortRows(r);
}
function sortValue(j,key){
  if(key==="rank")return Number(j.rank)||9999;
  if(key==="new")return isNewToday(j)?1:0;
  if(key==="rate")return j.pay_max==null?-1:Number(j.pay_max);
  if(key==="distance")return j.distance_km==null?9999:Number(j.distance_km);
  if(key==="employment")return (j.employment||"").toLowerCase();
  if(key==="arrangement")return (j.arrangement||"").toLowerCase();
  if(key==="chance")return chanceOrder[j.chance]||0;
  if(key==="relevance")return relOrder[j.relevance_label]||0;
  if(key==="added"){const d=parseDate(effectiveDateAdded(j));return d?d.getTime():0;}
  if(key==="listed"){const d=parseDate(j.listed);return d?d.getTime():0;}
  if(key==="closing"){const d=parseDate(j.closing);return d?d.getTime():Number.MAX_SAFE_INTEGER;}
  if(key==="type")return typeOrder[j.type]||99;
  if(key==="status")return statusOrder[j.status]||99;
  return "";
}
function sortRows(r){
  const dir=sortDir==="asc"?1:-1;
  return r.slice().sort((a,b)=>{const av=sortValue(a,sortKey),bv=sortValue(b,sortKey);if(typeof av==="string"||typeof bv==="string")return String(av).localeCompare(String(bv))*dir;if(av===bv)return (Number(a.rank)||0)-(Number(b.rank)||0);return (av-bv)*dir;});
}
function chooseSort(key){if(sortKey===key)sortDir=sortDir==="asc"?"desc":"asc";else{sortKey=key;sortDir=firstDirection[key]||"asc";}render();}
function arrow(key){if(sortKey!==key)return '<span class="arrow">↕</span>';return `<span class="arrow">${sortDir==="asc"?"▲":"▼"}</span>`;}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}
function actions(j){
  const b=[];
  if(!j.status.includes("Applied"))b.push(`<button class="rowbtn" onclick="setStatus('${j.id}','🔵 Applied')">✓ Applied</button>`);
  if(!j.status.includes("Disregarded"))b.push(`<button class="rowbtn" onclick="setStatus('${j.id}','🚫 Disregarded')">✕ Disregard</button>`);
  if(/Disregarded|Closed|Applied/.test(j.status))b.push(`<button class="rowbtn" onclick="setStatus('${j.id}','🟢 Apply')">↩ Restore</button>`);
  if(!j.status.includes("Consider"))b.push(`<button class="rowbtn" onclick="setStatus('${j.id}','🟡 Consider')">★ Consider</button>`);
  return b.join("");
}
function sh(label,key){return `<th class="sortable" onclick="chooseSort('${key}')">${label}${arrow(key)}</th>`;}
function refreshTabLabels(){
  const n=applyOverrides(jobs).filter(isNewToday).length;
  document.querySelectorAll(".tab").forEach(b=>{const original=b.dataset.label||b.textContent;b.dataset.label=original.replace(/\s*\(\d+ new\)$/i,"");b.textContent=b.dataset.tab==="Dashboard"&&n?`${b.dataset.label} (${n} new)`:b.dataset.label;});
}
function render(){
  refreshTabLabels();
  const r=filteredRows();
  const all=applyOverrides(jobs);
  const newToday=all.filter(isNewToday).length;
  document.getElementById("summary").innerHTML=`
    <div class="kpi newcount"><b>🆕 ${newToday}</b> new today</div>
    <div class="kpi"><b>${r.length}</b> shown</div>
    <div class="kpi"><b>${r.filter(j=>(j.pay_max||0)>=40).length}</b> $40+/hr</div>
    <div class="kpi"><b>${r.filter(j=>/part[- ]time/i.test(j.employment)).length}</b> part-time</div>
    <div class="kpi"><b>${r.filter(j=>(j.distance_km||999)<=15).length}</b> within ~15 km</div>
    <div class="kpi"><b>${r.filter(closingSoon).length}</b> closing soon</div>`;
  const table=document.getElementById("tbl");
  if(!r.length){table.innerHTML=`<tr><td class="empty">No jobs match this sheet/filter combination.</td></tr>`;return;}
  table.innerHTML=`<thead><tr>
    ${sh("Rank","rank")}${sh("New?","new")}<th>Role</th><th>Employer</th>
    ${sh("Location / distance","distance")}${sh("Pay — hourly + annual","rate")}
    ${sh("Employment","employment")}${sh("Work arrangement","arrangement")}
    ${sh("Chance","chance")}${sh("Relevance","relevance")}
    ${sh("Date added","added")}${sh("Listed","listed")}${sh("Closing","closing")}
    ${sh("Type","type")}${sh("Status","status")}<th>Actions</th><th>Source</th>
  </tr></thead><tbody>`+r.map(j=>`<tr>
    <td>${esc(j.rank)}</td><td>${isNewToday(j)?'<span class="newpill">🆕 NEW</span>':'—'}</td>
    <td class="role">${esc(j.role)}</td><td class="employer">${esc(j.employer)}</td>
    <td><div>${esc(j.location)}</div><div class="distance">≈ ${j.distance_km===999?"—":esc(j.distance_km)} km from Beckenham</div></td>
    <td>${payCell(j)}</td><td>${esc(j.employment)}</td><td>${esc(j.arrangement)}</td>
    <td>${esc(j.chance)}</td><td><b>${esc(j.relevance_label)}</b><div>${esc(j.career)}</div></td>
    <td>${esc(effectiveDateAdded(j)||"—")}</td><td>${esc(j.listed||"—")}</td><td>${esc(j.closing||"—")}</td>
    <td><span class="badge">${esc(j.type)}</span></td><td class="status">${esc(j.status)}</td>
    <td><div class="rowactions">${actions(j)}</div></td>
    <td>${j.source?`<a class="link" target="_blank" rel="noopener" href="${esc(j.source)}">Open ↗</a>`:"—"}</td>
  </tr>`).join("")+`</tbody>`;
}
function sheetJobs(name){const previous=currentTab;currentTab=name;let rows=baseRows();currentTab=previous;return rows;}
function exportRows(rows){
  return rows.map(j=>({
    "Rank":j.rank,"New?":isNewToday(j)?"🆕 NEW":"","Role":j.role,"Employer":j.employer,"Location":j.location,
    "Distance from Beckenham (km)":j.distance_km===999?"":j.distance_km,
    "Pay (hourly + annual)":annualPayText(j)?`${j.pay} | Approx. ${annualPayText(j)}`:j.pay,
    "Employment":j.employment,"Work arrangement":j.arrangement,"Chance":j.chance,"Relevance":j.relevance_label,
    "Career notes":j.career,"Date added":effectiveDateAdded(j),"Listed":j.listed,"Closing":j.closing,"Type":j.type,"Status":j.status,"Source":j.source
  }));
}
function downloadExcel(){
  if(typeof XLSX==="undefined"){alert("Excel exporter is still loading. Please try again.");return;}
  const wb=XLSX.utils.book_new();
  const names=["Dashboard","Government","Accounting & Tax","Finance & Accounts","Healthcare Admin","Corporate / Office","Registers & Pools","Applied","Disregarded","Closed","All Jobs"];
  names.forEach(name=>{let rows=sheetJobs(name);if(name==="Dashboard")rows=rows.slice(0,15);const ws=XLSX.utils.json_to_sheet(exportRows(rows));XLSX.utils.book_append_sheet(wb,ws,name.slice(0,31));});
  XLSX.writeFile(wb,"CJ_Job_Tracker.xlsx");
}
async function init(){
  document.getElementById("tabs").innerHTML=TABDEFS.map(([label,key])=>`<button class="tab ${key==="Dashboard"?"active":""}" data-tab="${esc(key)}" data-label="${esc(label)}" onclick="setTab('${esc(key)}')">${esc(label)}</button>`).join("");
  try{
    const res=await fetch("tracker.json",{cache:"no-store"});if(!res.ok)throw new Error(`HTTP ${res.status}`);const data=await res.json();
    const parts=await Promise.all((data.files||[]).map(async f=>{const r=await fetch(f,{cache:"no-store"});if(!r.ok)throw new Error(`${f}: HTTP ${r.status}`);return await r.json();}));
    jobs=parts.flat();dataUpdatedAt=data.updatedAt||"";
    const n=applyOverrides(jobs).filter(isNewToday).length;
    document.getElementById("updated").textContent=`${n?`🆕 ${n} new today • `:""}${dataUpdatedAt?`Tracker updated ${new Date(dataUpdatedAt).toLocaleString("en-AU",{timeZone:"Australia/Perth"})`:"Tracker data loaded"}`;
    render();
  }catch(err){document.getElementById("updated").textContent="Could not load tracker data";document.getElementById("tbl").innerHTML=`<tr><td class="error">Could not load tracker data: ${esc(err.message)}</td></tr>`;}
}
init();