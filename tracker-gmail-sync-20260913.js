(function(){
  const fixes={
    J123:{status:"❌ Closed",closing:"Application unsuccessful — employer update received 12 Sep 2026",closure_reason:"Axon Neurology & Specialist Clinic confirmed on 12 Sep 2026 that it progressed with other candidates whose experience more closely aligned with its current requirements and will not progress this application further.",application_evidence:"Application submitted previously; public ad later expired; direct employer outcome email received 12 Sep 2026 confirming unsuccessful outcome.",application_note:"Preserved as application history. This is a confirmed unsuccessful employer outcome, not a closure inferred from the expired public advertisement.",verified_date:"13 Sep 2026"}
  };
  function apply(){
    try{
      if(typeof jobs==="undefined"||!Array.isArray(jobs)||!jobs.length){setTimeout(apply,140);return;}
      let changed=false;
      jobs.forEach(j=>{
        const f=fixes[j.id];
        if(!f) return;
        Object.assign(j,f);
        if(typeof statusOverrides!=="undefined" && statusOverrides[j.id]){
          delete statusOverrides[j.id];
          changed=true;
        }
      });
      if(changed && typeof saveOverrides==="function") saveOverrides();
      if(typeof render==="function") render();
    }catch(_){setTimeout(apply,220);}
  }
  apply();
})();