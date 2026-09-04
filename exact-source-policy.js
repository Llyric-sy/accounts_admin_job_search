(function(){
  "use strict";

  function isGenericSeek(url){
    if(!url) return false;
    try{
      const u=new URL(url,window.location.href);
      if(!/(^|\.)seek\.com\.au$/i.test(u.hostname)) return false;
      return !/^\/job\/\d+/i.test(u.pathname);
    }catch(_){
      return /seek\.com\.au/i.test(String(url)) && !/seek\.com\.au\/job\/\d+/i.test(String(url));
    }
  }

  function enforceExactSources(){
    try{
      if(typeof jobs==="undefined" || !Array.isArray(jobs) || !jobs.length){
        setTimeout(enforceExactSources,150);
        return;
      }

      let changed=false;
      jobs.forEach(job=>{
        if(isGenericSeek(job.source)){
          job.source_search=job.source;
          job.source="";
          job.source_note="Exact SEEK job-ad link not yet verified — generic search link suppressed";
          changed=true;
        }
      });

      if(changed && typeof render==="function") render();
    }catch(_){
      setTimeout(enforceExactSources,250);
    }
  }

  enforceExactSources();
})();
