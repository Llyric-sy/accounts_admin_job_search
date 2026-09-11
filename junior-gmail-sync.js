(function(){
  if(!Array.isArray(window.JUNIOR_JOBS)) return;
  const fixes={
    JR021:{status:"❌ Closed",closing:"Application unlikely to progress — confirmed by SEEK 5 Sep 2026",closure_reason:"SEEK advised on 5 Sep 2026 that the Receptionist / Undergraduate Accountant (Part-Time) application with Faulkner & Co Pty Ltd is unlikely to progress further.",application_evidence:"SEEK application viewed by employer; SEEK application outcome update received 5 Sep 2026",application_note:"Employer viewed the application after submission; SEEK later advised on 5 Sep 2026 that it is unlikely to progress.",verified_date:"7 Sep 2026"},
    JR022:{status:"❌ Closed",closing:"Application unsuccessful — confirmed by BaptistCare 10 Sep 2026",closure_reason:"BaptistCare advised on 10 Sep 2026 that the Riverside Administrator application was unsuccessful.",application_evidence:"BaptistCare application receipt received 4 Sep 2026; direct application outcome received 10 Sep 2026",application_note:"Application history preserved; direct employer outcome confirms unsuccessful application.",verified_date:"11 Sep 2026"}
  };
  window.JUNIOR_JOBS.forEach(job=>{if(fixes[job.id]) Object.assign(job,fixes[job.id]);});
})();