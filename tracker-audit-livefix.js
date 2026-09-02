(function(){
  const fixes={
    J015:{role:"Client Services Officer / Bookkeeper (Part-Time, 4–5 Days per Week)",closing:"Open / verified current 2 Sep 2026",career:"High — verified current part-time accounting-firm bookkeeping/client-services role in Rivervale. Strong public-practice exposure, but prior bookkeeping experience remains an important selection factor.",verified_date:"2 Sep 2026"},
    J089:{role:"Finance Officer",employment:"Contract/Temp — 4-month temporary contract",pay:"$40–$42/hr + super | ≈$79.0k–$83.0k p.a. FTE",pay_max:42,chance:"Low",relevance_label:"Excellent",status:"🟡 Consider",closing:"Open / applications assessed until filled — verified 2 Sep 2026",source:"https://www.roberthalf.com/au/en/jobs/all-locations/accounts-receivable-officer",career:"Excellent finance exposure but a significant stretch: the current Robert Half Osborne Park listing is Finance Officer, not Accounts Receivable Officer. It includes end-to-end AP, AR support, reconciliations, journals and month-end, and asks for prior Finance Officer/Accounts Officer experience. Tracker title and contract length corrected on 2 Sep 2026.",verified_date:"2 Sep 2026"},
    J090:{source:"https://employmenthero.com/jobs/position/pacvac-pty-ltd-accounts-officer-emhbm/",verified_date:"2 Sep 2026"}
  };
  function applyFixes(){
    try{
      if(typeof jobs==="undefined"||!Array.isArray(jobs)||!jobs.length){setTimeout(applyFixes,140);return;}
      jobs.forEach(j=>{if(fixes[j.id]) Object.assign(j,fixes[j.id]);});
      if(typeof render==="function") render();
    }catch(_){setTimeout(applyFixes,220);}
  }
  applyFixes();
})();
