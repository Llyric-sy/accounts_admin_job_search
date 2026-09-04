(function(){
  if(!Array.isArray(window.JUNIOR_JOBS)) return;
  if(window.JUNIOR_TRACKER_META){
    window.JUNIOR_TRACKER_META.updatedAt="2026-09-04T08:46:44+08:00";
    window.JUNIOR_TRACKER_META.commuteRule="Exclude likely 1hr+ peak-hour commutes from Beckenham unless genuinely remote/WFH";
  }

  const interviewJob=window.JUNIOR_JOBS.find(j=>j.id==="JR001");
  if(interviewJob){
    Object.assign(interviewJob,{
      status:"🟣 Interview",
      applied_date:"29 Aug 2026",
      interview_date:"3 Sep 2026",
      interview_time:"1:00 PM",
      interview_with:"Oscar Smith — Accountant",
      interview_location:"Joondalup Resort, 45 Joondalup Resort Country Club Boulevard, Connolly WA 6027",
      application_employer:"TenGolf Group",
      interview_reference:"EH-6141636",
      criteria_excluded:true,
      criteria_excluded_reason:"Peak-hour commute likely exceeds practical ~1 hour cutoff from Beckenham; preserved because already applied/interviewing.",
      career:"Excellent accounting-student pathway, but Connolly/Joondalup is outside the new practical commute range from Beckenham. Preserved as interview history because the application is already in progress. 🟣 INTERVIEW: Thu 3 Sep 2026 at 1:00 PM with Oscar Smith (Accountant) at Joondalup Resort."
    });
  }

  const audit={
    JR002:{status:"❌ Closed",closing:"Listing no longer verifiable — checked 2 Sep 2026",source:"",career:"The exact Ilonka Foods Part-Time Accounts Assistant vacancy is no longer present in current employer/job searches. Current Ilonka vacancies are different roles, so this one is retained in Closed history.",closure_reason:"Exact employer/title listing no longer verifiably active on 2 Sep 2026"},
    JR003:{status:"❌ Closed",listed:"Aug 2026 — exact date unconfirmed",closing:"Listing no longer verifiable — checked 1 Sep 2026",source:"",career:"Previously listed as a flexible part-time accounts/admin opportunity, but the exact Skipp Electrics listing can no longer be verified as active. Retained in Closed history rather than deleted.",closure_reason:"Exact employer/title listing no longer found in current searches on 1 Sep 2026"},
    JR004:{status:"❌ Closed",closing:"Listing no longer verifiable — checked 2 Sep 2026",source:"",career:"The exact Aussie Victoria Park flexible-hours Mortgage Broking Admin Assistant vacancy can no longer be verified as active. Retained in Closed history.",closure_reason:"Exact employer/title listing no longer found in current searches on 2 Sep 2026"},
    JR005:{role:"Office All-rounder/Assistant",employment:"Full-time only",status:"🚫 Disregarded",closing:"Current exact listing is full-time only — verified 2 Sep 2026",source:"https://au.seek.com/iVac-WA-jobs",career:"Current iVac WA vacancy is an Office All-rounder/Assistant and is full-time. The tracker previously classified it as part-time/junior, so it is now Disregarded under the no-full-time-only rule.",disregarded_reason:"Exclusively full-time — employment type corrected 2 Sep 2026"},
    JR006:{status:"❌ Closed",closing:"Listing no longer verifiable — checked 2 Sep 2026",source:"",career:"The exact Auto Control Systems part-time Accounts Assistant vacancy can no longer be found in current employer/title searches. Retained in Closed history.",closure_reason:"Exact employer/title listing no longer verifiably active on 2 Sep 2026"},
    JR007:{status:"🚫 Disregarded",criteria_excluded:true,criteria_excluded_reason:"Peak-hour commute ≥ ~1 hour from Beckenham",disregarded_reason:"Wangara is outside the practical peak-hour commute target from Beckenham and the role is on-site.",career:"Accessible administration role, but Wangara is too far for the new commute rule during peak traffic. Excluded unless a future version offers genuine remote/WFH flexibility."},
    JR008:{status:"❌ Closed",closing:"Listing no longer verifiable — checked 2 Sep 2026",source:"",career:"Motobility has historical Accounts Payable recruitment references, but the exact part-time Accounts Payable vacancy tracked here is no longer a current verifiable advertisement.",closure_reason:"Only historical vacancy references found; no current exact listing verified on 2 Sep 2026"},
    JR010:{status:"❌ Closed",listed:"≤19 Aug 2026 — exact posting date unconfirmed",closing:"23 Aug 2026",source:"https://au.indeed.com/viewjob?jk=5d9aeda734417ab4",career:"Strong healthcare-finance role involving billing, banking queries, payments and health-fund/Medicare claims. The exact ad confirms applications closed Sunday 23 Aug 2026. The tracker previously showed 27 Aug as the listing date from a stale search-result snippet; that was incorrect. The role is confirmed to have been live by 19 Aug 2026, but the exact original posting date is not verified.",closure_reason:"Applications closed 23 Aug 2026; exact role no longer active. Listing date corrected after identifying stale search-result metadata."},
    JR014:{status:"❌ Closed",closing:"Listing no longer verifiable — checked 2 Sep 2026",source:"",career:"The exact FQ Finance Junior Admin Assistant (Part-Time) vacancy can no longer be verified as current. Retained in Closed history.",closure_reason:"Exact employer/title listing no longer found in current searches on 2 Sep 2026"},
    JR015:{employment:"Full-time only",status:"🚫 Disregarded",closing:"Current exact listing is full-time only — verified 2 Sep 2026",source:"https://au.indeed.com/viewjob?jk=a4cf89f88296a0fd",career:"The current Minic Property Group Administrative Assistant (Junior) advertisement is full-time only. The tracker previously said full-time or part-time, so this has been corrected and moved to Disregarded under the current criteria.",disregarded_reason:"Exclusively full-time — employment type corrected 2 Sep 2026"},
    JR016:{status:"❌ Closed",closing:"Listing no longer verifiable — checked 2 Sep 2026",source:"",career:"The exact JG Thomas Admin / Internal Sales & Logistics Support Officer vacancy can no longer be verified as active. Retained in Closed history.",closure_reason:"Exact employer/title listing no longer found in current searches on 2 Sep 2026"},
    JR017:{pay:"$26–$30/hr | ≈$51.4k–$59.3k p.a. FTE",pay_min:26,pay_max:30,status:"🚫 Disregarded",closing:"Open / verified current 2 Sep 2026",criteria_excluded:true,criteria_excluded_reason:"Peak-hour commute ≥ ~1 hour from Beckenham",disregarded_reason:"Wangara is outside the practical peak-hour commute target from Beckenham and this role is on-site despite school-hour flexibility.",career:"Invoice/billing experience would be useful, but Wangara is too far under the new peak-hour commute rule. Excluded unless genuine remote/WFH becomes available."}
  };

  window.JUNIOR_JOBS.forEach(job=>{
    if(audit[job.id]) Object.assign(job,audit[job.id],{verified_date:"2 Sep 2026"});
  });

  if(!window.JUNIOR_JOBS.some(j=>j.id==="JR020")){
    window.JUNIOR_JOBS.push({
      id:"JR020",rank:20,role:"Finance Appraisals Admin",employer:"Healthcare Practice Sales Pty Ltd",location:"Australia-wide remote",distance_km:null,
      pay:"$32/hr + super | ≈$63.2k p.a. FTE",pay_min:32,pay_max:32,
      employment:"Permanent part-time / job share — 10 hrs/week, 2 hrs daily Mon–Fri",
      arrangement:"100% work from home; explicitly open to suitably experienced applicants Australia-wide; set hours around midday AEST",
      chance:"Med–High",relevance_label:"Excellent",
      career:"Excellent junior finance/healthcare-administration crossover. Work centres on onboarding, requesting and collating financial reports, secure document handling, client communication and finance-team support rather than performing the valuation analysis. Familiarity with P&L statements and Excel is mandatory; ongoing training and support are advertised.",
      listed:"Late Aug 2026 — exact date unconfirmed",date_added:"3 Sep 2026",closing:"Open / verified current 3 Sep 2026",type:"Vacancy",status:"🟢 Apply",
      source:"",exact_link_unverified:true,
      category:["Accounting & Finance","Healthcare Admin","Admin / Office"],remote_only:true,
      legitimacy_note:"Employer is independently verified as an active Australian private company (ABN 40 655 079 815) with an established official website. Exact ad explicitly states applicants may be based anywhere in Australia and the role is 100% WFH. Exact job-detail URL remains unverified, so Source is intentionally blank rather than using a generic SEEK search URL."
    });
  }

  if(!window.JUNIOR_JOBS.some(j=>j.id==="JR021")){
    window.JUNIOR_JOBS.push({
      id:"JR021",rank:21,role:"Receptionist / Undergraduate Accountant (Part-Time)",employer:"Faulkner & Co Pty Ltd",location:"West Perth",distance_km:16,
      pay:"Not disclosed",pay_min:null,pay_max:null,
      employment:"Part-time — job-share with another university student",
      arrangement:"On-site; explicitly student-friendly and designed around current study",
      chance:"Very High",relevance_label:"Excellent",
      career:"Outstanding entry pathway for an early-stage Accounting student. Primary reception/admin duties are combined with training in basic accounting and tax-related tasks, document/workpaper preparation and client information compilation. No prior experience is required, and the ad explicitly offers progression toward an Undergraduate Accountant role plus future CA/CPA support.",
      listed:"Late Aug / early Sep 2026 — exact date unconfirmed",date_added:"4 Sep 2026",closing:"Open / verified current 4 Sep 2026",type:"Vacancy",status:"🟢 Apply",
      source:"https://au.seek.com/job/94195613",
      category:["Accounting & Finance","Admin / Office","Professional Services"]
    });
  }

  if(!window.JUNIOR_JOBS.some(j=>j.id==="JR022")){
    window.JUNIOR_JOBS.push({
      id:"JR022",rank:22,role:"Administrator",employer:"BaptistCare",location:"Salter Point",distance_km:11,
      pay:"$27.77–$35.08/hr + super + NFP salary packaging | ≈$54.9k–$69.3k p.a. FTE",pay_min:27.77,pay_max:35.08,
      employment:"Permanent part-time — 25 hrs/week, Monday–Friday",
      arrangement:"On-site at Riverside Village, Salter Point",
      chance:"High",relevance_label:"High",
      career:"Strong general administration and healthcare-sector option. Duties include resident/customer service, records and correspondence, property administration, resident accounts and financial processes. Current tax/client-service/admin experience transfers well without requiring prior aged-care administration experience.",
      listed:"3 Sep 2026",date_added:"4 Sep 2026",closing:"1 Oct 2026",type:"Vacancy",status:"🟢 Apply",
      source:"https://careers.pageuppeople.com/999/cw/en/job/498954/administrator",
      category:["Healthcare Admin","Admin / Office","Accounting & Finance"]
    });
  }

  try{
    const key="cj_junior_job_tracker_status_v1";
    const saved=JSON.parse(localStorage.getItem(key)||"{}")||{};
    let changed=false;
    Object.keys(audit).forEach(id=>{
      if(saved[id] && !/Applied|Interview|Waiting|Offer/.test(saved[id])){
        delete saved[id];
        changed=true;
      }
    });
    if(changed) localStorage.setItem(key,JSON.stringify(saved));
  }catch(_){ }
})();