(function(){
  const fixes={
    J014:{status:"🚫 Disregarded",disregarded_reason:"Peak-hour commute likely around 1 hour or more from Beckenham; on-site role with no meaningful remote exception.",criteria_excluded:true,criteria_excluded_reason:"Peak-hour commute ≥ ~1 hour from Beckenham",career:"Previously considered as an accessible accounts-assistant pathway, but Greenwood is outside the practical commute target from Beckenham during peak traffic. Excluded under the new commute rule unless a future version of the role offers genuine remote/WFH flexibility.",verified_date:"2 Sep 2026"},
    J015:{role:"Client Services Officer / Bookkeeper (Part-Time, 4–5 Days per Week)",closing:"Open / verified current 2 Sep 2026",career:"High — verified current part-time accounting-firm bookkeeping/client-services role in Rivervale. Strong public-practice exposure, but prior bookkeeping experience remains an important selection factor.",verified_date:"2 Sep 2026"},
    J057:{status:"❌ Closed",applied_date:"29 Aug 2026",application_evidence:"SEEK application confirmation email",closing:"Expired / no longer taking applications — confirmed by SEEK 4 Sep 2026",closure_reason:"The Administration & Accounts Officer role with Core Talent has expired and is no longer taking applications. Application history is preserved.",verified_date:"4 Sep 2026"},
    J085:{status:"❌ Closed",closing:"Expired / no longer accepting applications — confirmed 4 Sep 2026",closure_reason:"The West Coast Neuro Admin & Finance Coordinator listing has expired and is no longer accepting applications.",career:"Previously a strong Balcatta part-time admin/finance crossover role. The vacancy has now expired, so it is retained in Closed history rather than shown as an active application target.",verified_date:"4 Sep 2026"},
    J089:{role:"Finance Officer",employment:"Contract/Temp — 4-month temporary contract",pay:"$40–$42/hr + super | ≈$79.0k–$83.0k p.a. FTE",pay_max:42,chance:"Low",relevance_label:"Excellent",status:"🟡 Consider",closing:"Open / applications assessed until filled — verified 2 Sep 2026",source:"https://www.roberthalf.com/au/en/jobs/all-locations/accounts-receivable-officer",career:"Excellent finance exposure but a significant stretch: the current Robert Half Osborne Park listing is Finance Officer, not Accounts Receivable Officer. It includes end-to-end AP, AR support, reconciliations, journals and month-end, and asks for prior Finance Officer/Accounts Officer experience. Tracker title and contract length corrected on 2 Sep 2026.",verified_date:"2 Sep 2026"},
    J090:{status:"❌ Closed",closing:"Listing no longer shown on current Pacvac careers page — verified 2 Sep 2026",source:"https://employmenthero.com/jobs/organisations/pacvac/",closure_reason:"The live Pacvac Employment Hero vacancies page no longer lists Accounts Officer. Older Employment Hero/SEEK/Jora search indexes still show the role, but those are stale cached results and are not treated as current evidence.",career:"Previously a strong Kewdale part-time Accounts Officer opportunity. The live Pacvac careers page no longer lists this vacancy as at 2 Sep 2026, so it has been moved to Closed. Older indexed job-board copies remain online but are stale.",verified_date:"2 Sep 2026"},
    J091:{status:"🔵 Applied",applied_date:"2 Sep 2026",application_evidence:"SEEK application confirmation email",verified_date:"3 Sep 2026"},
    J092:{status:"🔵 Applied",applied_date:"2 Sep 2026",application_evidence:"SEEK application confirmation email",verified_date:"3 Sep 2026"},
    J096:{status:"🔵 Applied",applied_date:"2 Sep 2026",application_evidence:"Employment Hero application receipt",source:"https://employmenthero.com/jobs/position/flinders-cardiac-accounts-assistant-bookkeeper-remote-53zva/",closing:"Open / verified current 3 Sep 2026",verified_date:"3 Sep 2026"},
    J102:{status:"🔵 Applied",applied_date:"4 Sep 2026",application_evidence:"SEEK confirmation plus direct application email to M2 Corporate",application_note:"M2 Corporate viewed the application on 4 Sep 2026.",verified_date:"4 Sep 2026"}
  };
  function applyFixes(){
    try{
      if(typeof jobs==="undefined"||!Array.isArray(jobs)||!jobs.length){setTimeout(applyFixes,140);return;}
      jobs.forEach(j=>{
        if(!fixes[j.id]) return;
        Object.assign(j,fixes[j.id]);
        if(typeof statusOverrides!=="undefined" && statusOverrides[j.id] && !/Applied|Interview|Waiting|Offer/.test(statusOverrides[j.id])) delete statusOverrides[j.id];
      });
      if(typeof saveOverrides==="function") saveOverrides();
      if(typeof render==="function") render();
    }catch(_){setTimeout(applyFixes,220);}
  }
  applyFixes();
})();
