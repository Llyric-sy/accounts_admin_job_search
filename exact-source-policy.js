(function(){
  "use strict";

  function isSeekHost(hostname){
    return /(^|\.)seek\.com\.au$/i.test(hostname) || /(^|\.)seek\.com$/i.test(hostname);
  }

  function isGenericSeek(url){
    if(!url) return false;
    try{
      const u=new URL(url,window.location.href);
      if(!isSeekHost(u.hostname)) return false;
      return !/^\/job\/\d+/i.test(u.pathname);
    }catch(_){
      const s=String(url);
      const isSeek=/seek\.com(?:\.au)?/i.test(s);
      const isExact=/seek\.com(?:\.au)?\/job\/\d+/i.test(s);
      return isSeek && !isExact;
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
