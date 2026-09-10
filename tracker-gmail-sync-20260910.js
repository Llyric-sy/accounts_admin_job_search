(function(){
  const fixes={
    J115:{status:"❌ Closed",closing:"Application unlikely to progress — confirmed by SEEK 9 Sep 2026",closure_reason:"SEEK advised on 9 Sep 2026 that the Medical Receptionist/Secretary application with the Private Advertiser is unlikely to progress further.",application_evidence:"SEEK application confirmation email; employer-viewed update received 7 Sep 2026; SEEK application outcome update received 9 Sep 2026",application_note:"Employer viewed the application on 7 Sep 2026; SEEK later advised on 9 Sep 2026 that it is unlikely to progress.",verified_date:"10 Sep 2026"},
    J118:{status:"❌ Closed",closing:"Application unlikely to progress — confirmed by SEEK 9 Sep 2026",closure_reason:"SEEK advised on 9 Sep 2026 that the Medical Secretary application with the Private Advertiser is unlikely to progress further.",application_evidence:"SEEK application confirmation email; SEEK application outcome update received 9 Sep 2026",application_note:"Application history is preserved; SEEK advised on 9 Sep 2026 that it is unlikely to progress.",verified_date:"10 Sep 2026"},
    J120:{status:"❌ Closed",closing:"Application unlikely to progress — confirmed by SEEK 9 Sep 2026",closure_reason:"SEEK advised on 9 Sep 2026 that the Administration and Reception (Medical) application with Pain Options Pty Ltd is unlikely to progress further.",application_evidence:"SEEK application confirmation plus employer-viewed update received 7 Sep 2026; SEEK application outcome update received 9 Sep 2026",application_note:"Pain Options viewed the application on 7 Sep 2026; SEEK later advised on 9 Sep 2026 that it is unlikely to progress.",verified_date:"10 Sep 2026"},
    J121:{status:"❌ Closed",closing:"Application unlikely to progress — confirmed by SEEK 9 Sep 2026",closure_reason:"SEEK advised on 9 Sep 2026 that the Medical Receptionist application with Pramana Medical Centre is unlikely to progress further.",application_evidence:"SEEK application confirmation email received 7 Sep 2026; SEEK application outcome update received 9 Sep 2026",application_note:"Application history is preserved; SEEK advised on 9 Sep 2026 that it is unlikely to progress.",verified_date:"10 Sep 2026"},
    J124:{status:"❌ Closed",closing:"Application unlikely to progress — confirmed by SEEK 9 Sep 2026",closure_reason:"SEEK advised on 9 Sep 2026 that the Medical Receptionist application with Lindisfarne Medical Group is unlikely to progress further.",application_evidence:"SEEK application confirmation email received 7 Sep 2026; SEEK application outcome update received 9 Sep 2026",application_note:"Application history is preserved; SEEK advised on 9 Sep 2026 that it is unlikely to progress.",verified_date:"10 Sep 2026"}
  };
  function apply(){
    try{
      if(typeof jobs==="undefined"||!Array.isArray(jobs)||!jobs.length){setTimeout(apply,140);return;}
      jobs.forEach(j=>{
        if(!fixes[j.id]) return;
        Object.assign(j,fixes[j.id]);
        if(typeof statusOverrides!=="undefined" && statusOverrides[j.id] && !/Applied|Interview|Waiting|Offer/.test(statusOverrides[j.id])) delete statusOverrides[j.id];
      });
      if(typeof saveOverrides==="function") saveOverrides();
      if(typeof render==="function") render();
    }catch(_){setTimeout(apply,220);}
  }
  apply();
})();