(function(){
  if(!Array.isArray(window.JUNIOR_JOBS)) return;
  const job=window.JUNIOR_JOBS.find(j=>j.id==="JR021");
  if(job){
    Object.assign(job,{
      status:"❌ Closed",
      closing:"Application unlikely to progress — confirmed by SEEK 5 Sep 2026",
      closure_reason:"SEEK advised on 5 Sep 2026 that the Receptionist / Undergraduate Accountant (Part-Time) application with Faulkner & Co Pty Ltd is unlikely to progress further.",
      application_evidence:"SEEK application viewed by employer; SEEK application outcome update received 5 Sep 2026",
      application_note:"Employer viewed the application after submission; SEEK later advised on 5 Sep 2026 that it is unlikely to progress.",
      verified_date:"7 Sep 2026"
    });
  }
})();