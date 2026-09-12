(function(){
  const fixes={
    J110:{status:"❌ Closed",closing:"Closed — deadline passed 11 Sep 2026, 3:00 PM AWST",closure_reason:"The Department of Transport and Major Infrastructure Administration Officer Pool application deadline passed on 11 Sep 2026 at 3:00 PM AWST and no application history is recorded.",verified_date:"12 Sep 2026"},
    J123:{status:"🔵 Applied",closing:"Public ad expired / no longer taking applications — confirmed by SEEK 11 Sep 2026",application_evidence:"SEEK application confirmation received 7 Sep 2026; SEEK vacancy-closure notice received 11 Sep 2026",application_note:"The Axon Neurology Murdoch Medical Receptionist public vacancy has expired, but the application remains Applied because no rejection or unsuccessful outcome has been received.",verified_date:"12 Sep 2026"},
    J135:{status:"🟠 Waiting",application_note:"Interview completed in person at Buxton Resources on 11 Sep 2026; awaiting employer outcome.",application_evidence:"Application submitted 9 Sep 2026; employer progressed candidate to in-person interview; user confirmed interview completed 11 Sep 2026",verified_date:"12 Sep 2026"},
    J137:{status:"🔵 Applied",applied_date:"11 Sep 2026",application_evidence:"Direct Randstad application confirmation received 11 Sep 2026",application_note:"Application submitted for the EOI: Accounts Payable / Finance Officer / Accounts Receivable role. Operational AP/AR/payment-run experience remains a development area and is not claimed as prior experience.",verified_date:"12 Sep 2026"}
  };
  function apply(){
    try{
      if(typeof jobs==="undefined"||!Array.isArray(jobs)||!jobs.length){setTimeout(apply,140);return;}
      jobs.forEach(j=>{
        if(!fixes[j.id]) return;
        Object.assign(j,fixes[j.id]);
        if(typeof statusOverrides!=="undefined" && statusOverrides[j.id] && !/Applied|Interview|Waiting|Offer/.test(fixes[j.id].status||"")) delete statusOverrides[j.id];
      });
      if(typeof saveOverrides==="function") saveOverrides();
      if(typeof render==="function") render();
    }catch(_){setTimeout(apply,220);}
  }
  apply();
})();