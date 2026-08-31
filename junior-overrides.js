(function(){
  if(!Array.isArray(window.JUNIOR_JOBS)) return;

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
      career:"Excellent — specifically aimed at current Accounting/Finance/Commerce students; supplier invoices, finance support and practical accounting exposure. 🟣 INTERVIEW: Thu 3 Sep 2026 at 1:00 PM with Oscar Smith (Accountant) at Joondalup Resort."
    });
  }

  const skipp=window.JUNIOR_JOBS.find(j=>j.id==="JR003");
  if(skipp){
    Object.assign(skipp,{
      status:"❌ Closed",
      closing:"Listing no longer verifiable — checked 1 Sep 2026",
      source:"",
      career:"Previously listed as a flexible part-time accounts/admin opportunity, but the exact Skipp Electrics listing can no longer be found or verified as active. Retained in Closed history rather than deleted.",
      closure_reason:"Exact employer/title listing no longer found in current searches on 1 Sep 2026"
    });
  }

  const skg=window.JUNIOR_JOBS.find(j=>j.id==="JR010");
  if(skg){
    Object.assign(skg,{
      status:"❌ Closed",
      closing:"Applications closed 23 Aug 2026 — verified 1 Sep 2026",
      source:"https://au.indeed.com/viewjob?jk=5d9aeda734417ab4",
      career:"Strong healthcare-finance role involving billing, banking queries, payments and health-fund/Medicare claims, but the exact advertisement states applications closed Sunday 23 Aug 2026 and it is no longer shown on SKG Radiology's current SEEK company jobs page.",
      closure_reason:"Application closing date passed and exact role no longer present on current SKG SEEK company page; checked 1 Sep 2026"
    });
  }
})();
