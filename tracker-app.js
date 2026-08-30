"use strict";

const TABDEFS = [
  ["Dashboard","Dashboard"],["Government","Government"],["Accounting & Tax","Accounting & Tax"],
  ["Finance & Accounts","Finance & Accounts"],["Healthcare Admin","Healthcare Admin / Finance"],
  ["Corporate / Office","Corporate / Office"],["Registers & Pools","Registers & Pools"],
  ["Applied","Applied"],["Disregarded","Disregarded"],["Closed","Closed"],["All Jobs","All Jobs"]
];

let jobs = [];
let currentTab = "Dashboard";
let filters = new Set();
let sortKey = "rank";
let sortDir = "asc";
const STATUS_KEY = "cj_job_tracker_status_overrides_v1";
let statusOverrides = {};

try {
  statusOverrides = JSON.parse(localStorage.getItem(STATUS_KEY) || "{}") || {};
} catch (_) {
  statusOverrides = {};
}

const chanceOrder = {"Very High":5,"High":4,"Med–High":3.5,"Medium":3,"Medium–Low":2,"Low":1};
const relevanceOrder = {"Excellent":5,"Very High":4.5,"High":4,"Medium":3,"Low–Medium":2,"Low":1};
const statusOrder = {"🟢 Apply":1,"🟡 Consider":2,"🟣 Interview":3,"🟠 Waiting":4,"🔵 Applied":5,"✅ Offer":6,"🚫 Disregarded":7,"❌ Closed":8};
const typeOrder = {"Vacancy":1,"Internship":2,"Graduate Program":3,"Talent Pool":4,"Register":5};
const firstDirection = {rank:"asc",new:"desc",rate:"desc",distance:"asc",employment:"asc",arrangement:"asc",chance:"desc",relevance:"desc",added:"desc",listed:"desc",closing:"asc",type:"asc",status:"asc"};

function esc(value) {
  return String(value == null ? "" : value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}

function setStage(message) {
  const u = document.getElementById("updated");
  const t = document.getElementById("tbl");
  if (u) u.textContent = message;
  if (t && !jobs.length) t.innerHTML = `<tr><td class="empty">${esc(message)}</td></tr>`;
}

function setFatal(message) {
  const u = document.getElementById("updated");
  const t = document.getElementById("tbl");
  if (u) u.textContent = "Tracker failed to load";
  if (t) t.innerHTML = `<tr><td class="error"><b>Tracker error:</b> ${esc(message)}</td></tr>`;
}

window.addEventListener("error", event => {
  if (!jobs.length) setFatal(event.message || "Unknown page error");
});
window.addEventListener("unhandledrejection", event => {
  if (!jobs.length) setFatal((event.reason && event.reason.message) || String(event.reason || "Unknown loading error"));
});

function loadJSON(url, timeoutMs) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const separator = url.includes("?") ? "&" : "?";
    xhr.open("GET", `${url}${separator}v=${Date.now()}`, true);
    xhr.timeout = timeoutMs || 10000;
    xhr.setRequestHeader("Accept", "application/json,text/plain,*/*");
    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error(`${url} returned HTTP ${xhr.status}`));
        return;
      }
      try {
        resolve(JSON.parse(xhr.responseText));
      } catch (err) {
        reject(new Error(`${url} contains invalid JSON: ${err.message}`));
      }
    };
    xhr.onerror = () => reject(new Error(`${url} network error`));
    xhr.ontimeout = () => reject(new Error(`${url} timed out after ${xhr.timeout / 1000}s`));
    xhr.onabort = () => reject(new Error(`${url} request was aborted`));
    try { xhr.send(); } catch (err) { reject(new Error(`${url} could not be requested: ${err.message}`)); }
  });
}

function applyOverrides(list) {
  return list.map(j => Object.assign({}, j, {status: statusOverrides[j.id] || j.status}));
}
function saveOverrides() {
  try { localStorage.setItem(STATUS_KEY, JSON.stringify(statusOverrides)); } catch (_) {}
}
function setStatus(id, status) {
  statusOverrides[id] = status;
  saveOverrides();
  render();
}
function clearLocalStatuses() {
  statusOverrides = {};
  try { localStorage.removeItem(STATUS_KEY); } catch (_) {}
  render();
}

function parseDate(value) {
  const m = String(value || "").match(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i);
  return m ? new Date(`${m[2]} ${m[1]}, ${m[3]} 12:00:00`) : null;
}
function canonicalDate(value) {
  const m = String(value || "").match(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i);
  return m ? `${m[3]}-${m[2].slice(0,3).toLowerCase()}-${String(Number(m[1])).padStart(2,"0")}` : "";
}
function perthTodayKey() {
  const p = new Intl.DateTimeFormat("en-AU", {timeZone:"Australia/Perth",day:"2-digit",month:"short",year:"numeric"}).formatToParts(new Date());
  const x = {};
  p.forEach(part => { x[part.type] = part.value; });
  return `${x.year}-${String(x.month).toLowerCase()}-${String(Number(x.day)).padStart(2,"0")}`;
}
function dateAdded(j) {
  if (j.date_added) return j.date_added;
  return "";
}
function isNewToday(j) {
  return !!dateAdded(j) && canonicalDate(dateAdded(j)) === perthTodayKey();
}
function closingSoon(j) {
  const d = parseDate(j.closing);
  if (!d) return false;
  const diff = (d.getTime() - Date.now()) / 86400000;
  return diff >= 0 && diff <= 4;
}

function hourlyRange(j) {
  const s = String(j.pay || "");
  const left = s.split("|")[0];
  if (!/\/hr|per hour|hourly/i.test(left)) return null;
  let m = left.match(/\$?\s*(\d+(?:\.\d+)?)\s*[–-]\s*\$?\s*(\d+(?:\.\d+)?)/);
  if (m) return [Number(m[1]), Number(m[2])];
  m = left.match(/\$\s*(\d+(?:\.\d+)?)/);
  if (m) return [Number(m[1]), Number(m[1])];
  if (j.pay_max != null) return [Number(j.pay_max), Number(j.pay_max)];
  return null;
}
function moneyK(v) { return `$${(v/1000).toFixed(1)}k`; }
function annualPayText(j) {
  const range = hourlyRange(j);
  if (!range) return "";
  const annual = [range[0] * 1976, range[1] * 1976];
  let text = annual[0] === annual[1] ? `${moneyK(annual[0])} p.a. FTE` : `${moneyK(annual[0])}–${moneyK(annual[1])} p.a. FTE`;
  const fte = String(j.employment || "").match(/(0\.\d+)\s*FTE/i);
  if (fte) {
    const f = Number(fte[1]);
    const actual = [annual[0] * f, annual[1] * f];
    text += ` • at ${f} FTE: ${actual[0] === actual[1] ? moneyK(actual[0]) : `${moneyK(actual[0])}–${moneyK(actual[1])}`} p.a.`;
  }
  return text;
}
function payCell(j) {
  const annual = annualPayText(j);
  const alreadyHasAnnual = /\bp\.a\.|per annum|annual/i.test(String(j.pay || ""));
  return `<b>${esc(j.pay)}</b>${annual && !alreadyHasAnnual ? `<div class="annual">≈ ${esc(annual)}</div>` : ""}`;
}

function toggleFilter(el) {
  const f = el.dataset.filter;
  if (filters.has(f)) filters.delete(f); else filters.add(f);
  el.classList.toggle("on");
  render();
}
function setTab(tab) {
  currentTab = tab;
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
  render();
}

function baseRows() {
  let r = applyOverrides(jobs);
  if (currentTab === "Applied") r = r.filter(j => /Applied|Interview|Waiting|Offer/.test(j.status));
  else if (currentTab === "Disregarded") r = r.filter(j => String(j.status).includes("Disregarded"));
  else if (currentTab === "Closed") r = r.filter(j => String(j.status).includes("Closed"));
  else if (currentTab === "Registers & Pools") r = r.filter(j => ["Register","Talent Pool"].includes(j.type));
  else if (currentTab === "Government") r = r.filter(j => (j.category || []).includes("Government") && !/Closed|Disregarded/.test(j.status));
  else if (currentTab === "Accounting & Tax") r = r.filter(j => (j.category || []).includes("Accounting & Tax") && !/Closed|Disregarded/.test(j.status));
  else if (currentTab === "Finance & Accounts") r = r.filter(j => (j.category || []).includes("Finance & Accounts") && !/Closed|Disregarded/.test(j.status));
  else if (currentTab === "Healthcare Admin") r = r.filter(j => (j.category || []).includes("Healthcare Admin / Finance") && !/Closed|Disregarded/.test(j.status));
  else if (currentTab === "Corporate / Office") r = r.filter(j => (j.category || []).includes("Corporate / Office") && !/Closed|Disregarded/.test(j.status));
  else if (currentTab === "Dashboard") r = r.filter(j => ["🟢 Apply","🟡 Consider"].includes(j.status));
  return r;
}

function sortValue(j, key) {
  if (key === "rank") return Number(j.rank) || 9999;
  if (key === "new") return isNewToday(j) ? 1 : 0;
  if (key === "rate") return j.pay_max == null ? -1 : Number(j.pay_max);
  if (key === "distance") return j.distance_km == null ? 9999 : Number(j.distance_km);
  if (key === "employment") return String(j.employment || "").toLowerCase();
  if (key === "arrangement") return String(j.arrangement || "").toLowerCase();
  if (key === "chance") return chanceOrder[j.chance] || 0;
  if (key === "relevance") return relevanceOrder[j.relevance_label] || 0;
  if (key === "added") { const d = parseDate(dateAdded(j)); return d ? d.getTime() : 0; }
  if (key === "listed") { const d = parseDate(j.listed); return d ? d.getTime() : 0; }
  if (key === "closing") { const d = parseDate(j.closing); return d ? d.getTime() : Number.MAX_SAFE_INTEGER; }
  if (key === "type") return typeOrder[j.type] || 99;
  if (key === "status") return statusOrder[j.status] || 99;
  return "";
}
function sortRows(rows) {
  const direction = sortDir === "asc" ? 1 : -1;
  return rows.slice().sort((a,b) => {
    const av = sortValue(a, sortKey), bv = sortValue(b, sortKey);
    if (typeof av === "string" || typeof bv === "string") return String(av).localeCompare(String(bv)) * direction;
    if (av === bv) return (Number(a.rank) || 0) - (Number(b.rank) || 0);
    return (av - bv) * direction;
  });
}
function chooseSort(key) {
  if (sortKey === key) sortDir = sortDir === "asc" ? "desc" : "asc";
  else { sortKey = key; sortDir = firstDirection[key] || "asc"; }
  render();
}
function arrow(key) {
  if (sortKey !== key) return '<span class="arrow">↕</span>';
  return `<span class="arrow">${sortDir === "asc" ? "▲" : "▼"}</span>`;
}
function sh(label,key) { return `<th class="sortable" onclick="chooseSort('${key}')">${label}${arrow(key)}</th>`; }

function filteredRows() {
  let r = baseRows();
  const search = document.getElementById("search");
  const q = search ? search.value.trim().toLowerCase() : "";
  if (q) r = r.filter(j => [j.role,j.employer,j.location,j.pay,j.career,j.employment,j.arrangement,j.status,dateAdded(j)].join(" ").toLowerCase().includes(q));
  if (filters.has("new")) r = r.filter(isNewToday);
  if (filters.has("40")) r = r.filter(j => (j.pay_max || 0) >= 40);
  if (filters.has("part")) r = r.filter(j => /part[- ]time/i.test(j.employment || ""));
  if (filters.has("hybrid")) r = r.filter(j => /hybrid|remote|wfh/i.test(j.arrangement || ""));
  if (filters.has("gov")) r = r.filter(j => (j.category || []).includes("Government"));
  if (filters.has("acct")) r = r.filter(j => (j.category || []).includes("Accounting & Tax"));
  if (filters.has("fin")) r = r.filter(j => (j.category || []).includes("Finance & Accounts"));
  if (filters.has("soon")) r = r.filter(closingSoon);
  return sortRows(r);
}

function actionButtons(j) {
  const buttons = [];
  if (!String(j.status).includes("Applied")) buttons.push(`<button class="rowbtn" onclick="setStatus('${esc(j.id)}','🔵 Applied')">✓ Applied</button>`);
  if (!String(j.status).includes("Disregarded")) buttons.push(`<button class="rowbtn" onclick="setStatus('${esc(j.id)}','🚫 Disregarded')">✕ Disregard</button>`);
  if (/Disregarded|Closed|Applied/.test(j.status || "")) buttons.push(`<button class="rowbtn" onclick="setStatus('${esc(j.id)}','🟢 Apply')">↩ Restore</button>`);
  if (!String(j.status).includes("Consider")) buttons.push(`<button class="rowbtn" onclick="setStatus('${esc(j.id)}','🟡 Consider')">★ Consider</button>`);
  return buttons.join("");
}

function refreshTabLabels() {
  const count = applyOverrides(jobs).filter(isNewToday).length;
  document.querySelectorAll(".tab").forEach(b => {
    const label = b.dataset.label || b.textContent;
    b.dataset.label = label.replace(/\s*\(\d+ new\)$/i, "");
    b.textContent = b.dataset.tab === "Dashboard" && count ? `${b.dataset.label} (${count} new)` : b.dataset.label;
  });
}

function render() {
  refreshTabLabels();
  const rows = filteredRows();
  const all = applyOverrides(jobs);
  const newToday = all.filter(isNewToday).length;
  document.getElementById("summary").innerHTML = `
    <div class="kpi newcount"><b>🆕 ${newToday}</b> new today</div>
    <div class="kpi"><b>${rows.length}</b> shown</div>
    <div class="kpi"><b>${rows.filter(j => (j.pay_max || 0) >= 40).length}</b> $40+/hr</div>
    <div class="kpi"><b>${rows.filter(j => /part[- ]time/i.test(j.employment || "")).length}</b> part-time</div>
    <div class="kpi"><b>${rows.filter(j => (j.distance_km || 999) <= 15).length}</b> within ~15 km</div>
    <div class="kpi"><b>${rows.filter(closingSoon).length}</b> closing soon</div>`;

  const table = document.getElementById("tbl");
  if (!rows.length) {
    table.innerHTML = '<tr><td class="empty">No jobs match this sheet/filter combination.</td></tr>';
    return;
  }
  table.innerHTML = `<thead><tr>
    ${sh("Rank","rank")}${sh("New?","new")}<th>Role</th><th>Employer</th>
    ${sh("Location / distance","distance")}${sh("Pay — hourly + annual","rate")}
    ${sh("Employment","employment")}${sh("Work arrangement","arrangement")}
    ${sh("Chance","chance")}${sh("Relevance","relevance")}
    ${sh("Date added","added")}${sh("Listed","listed")}${sh("Closing","closing")}
    ${sh("Type","type")}${sh("Status","status")}<th>Actions</th><th>Source</th>
  </tr></thead><tbody>` + rows.map(j => `<tr>
    <td>${esc(j.rank)}</td><td>${isNewToday(j) ? '<span class="newpill">🆕 NEW</span>' : '—'}</td>
    <td class="role">${esc(j.role)}</td><td class="employer">${esc(j.employer)}</td>
    <td><div>${esc(j.location)}</div><div class="distance">≈ ${j.distance_km == null || j.distance_km === 999 ? "—" : esc(j.distance_km)} km from Beckenham</div></td>
    <td>${payCell(j)}</td><td>${esc(j.employment)}</td><td>${esc(j.arrangement)}</td>
    <td>${esc(j.chance)}</td><td><b>${esc(j.relevance_label)}</b><div>${esc(j.career)}</div></td>
    <td>${esc(dateAdded(j) || "—")}</td><td>${esc(j.listed || "—")}</td><td>${esc(j.closing || "—")}</td>
    <td><span class="badge">${esc(j.type)}</span></td><td class="status">${esc(j.status)}</td>
    <td><div class="rowactions">${actionButtons(j)}</div></td>
    <td>${j.source ? `<a class="link" target="_blank" rel="noopener" href="${esc(j.source)}">Open ↗</a>` : "—"}</td>
  </tr>`).join("") + "</tbody>";
}

function sheetJobs(name) {
  const previous = currentTab;
  currentTab = name;
  const rows = baseRows();
  currentTab = previous;
  return rows;
}
function exportRows(rows) {
  return rows.map(j => ({
    "Rank": j.rank,
    "New?": isNewToday(j) ? "🆕 NEW" : "",
    "Role": j.role,
    "Employer": j.employer,
    "Location": j.location,
    "Distance from Beckenham (km)": j.distance_km === 999 ? "" : j.distance_km,
    "Pay (hourly + annual)": annualPayText(j) && !/\bp\.a\.|per annum|annual/i.test(String(j.pay || "")) ? `${j.pay} | Approx. ${annualPayText(j)}` : j.pay,
    "Employment": j.employment,
    "Work arrangement": j.arrangement,
    "Chance": j.chance,
    "Relevance": j.relevance_label,
    "Career notes": j.career,
    "Date added": dateAdded(j),
    "Listed": j.listed,
    "Closing": j.closing,
    "Type": j.type,
    "Status": j.status,
    "Source": j.source
  }));
}
function loadXLSX() {
  return new Promise((resolve,reject) => {
    if (window.XLSX) { resolve(window.XLSX); return; }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
    s.onload = () => window.XLSX ? resolve(window.XLSX) : reject(new Error("Excel library loaded incorrectly"));
    s.onerror = () => reject(new Error("Excel library could not load"));
    document.head.appendChild(s);
  });
}
async function downloadExcel() {
  try {
    const XLSX = await loadXLSX();
    const wb = XLSX.utils.book_new();
    ["Dashboard","Government","Accounting & Tax","Finance & Accounts","Healthcare Admin","Corporate / Office","Registers & Pools","Applied","Disregarded","Closed","All Jobs"].forEach(name => {
      let rows = sheetJobs(name);
      if (name === "Dashboard") rows = rows.slice(0,15);
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(exportRows(rows)), name.slice(0,31));
    });
    XLSX.writeFile(wb, "CJ_Job_Tracker.xlsx");
  } catch (err) {
    alert(`Excel download failed: ${err.message}`);
  }
}

async function init() {
  document.getElementById("tabs").innerHTML = TABDEFS.map(([label,key]) => `<button class="tab ${key === "Dashboard" ? "active" : ""}" data-tab="${esc(key)}" data-label="${esc(label)}" onclick="setTab('${esc(key)}')">${esc(label)}</button>`).join("");
  setStage("Loading tracker manifest…");

  let manifest;
  try {
    manifest = await loadJSON("tracker.json", 8000);
  } catch (err) {
    setStage("Manifest unavailable — trying known job files…");
    manifest = {updatedAt:"", files:["jobs-1.json","jobs-2.json","jobs-3.json","jobs-4.json","jobs-5.json"]};
  }

  const files = Array.isArray(manifest.files) && manifest.files.length ? manifest.files : ["jobs-1.json","jobs-2.json","jobs-3.json","jobs-4.json","jobs-5.json"];
  const parts = [];
  for (let i=0; i<files.length; i++) {
    setStage(`Loading jobs ${i+1}/${files.length}: ${files[i]}…`);
    const data = await loadJSON(files[i], 10000);
    if (!Array.isArray(data)) throw new Error(`${files[i]} did not contain a job array`);
    parts.push(data);
  }

  jobs = parts.flat();
  if (!jobs.length) throw new Error("No jobs were loaded");
  const newToday = applyOverrides(jobs).filter(isNewToday).length;
  const updated = document.getElementById("updated");
  const when = manifest.updatedAt ? new Date(manifest.updatedAt).toLocaleString("en-AU", {timeZone:"Australia/Perth"}) : "loaded now";
  updated.textContent = `${newToday ? `🆕 ${newToday} new today • ` : ""}${jobs.length} jobs • Tracker updated ${when}`;
  render();
}

init().catch(err => setFatal(err && err.message ? err.message : String(err)));
