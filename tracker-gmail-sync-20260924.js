(function(){
  const fixes={
    J058:{
      status:"🔵 Applied",
      application_evidence:"SEEK application confirmation email; SEEK activity update 22 Sep 2026",
      application_note:"SEEK reported on 22 Sep 2026 that Perth Arbor Services was reviewing applications. Status remains Applied; no rejection or stronger progression outcome was stated.",
      verified_date:"24 Sep 2026"
    },
    J059:{
      status:"🔵 Applied",
      application_evidence:"SEEK application confirmation email; SEEK activity update 22 Sep 2026",
      application_note:"SEEK reported the employer was reviewing applications and the public ad was no longer advertised. Preserve as Applied because ad closure is not a rejection.",
      verified_date:"24 Sep 2026"
    },
    J063:{
      status:"🔵 Applied",
      application_evidence:"SEEK application confirmation email; SEEK activity update 22 Sep 2026",
      application_note:"SEEK reported the employer was reviewing applications and the public ad was no longer advertised. Preserve as Applied because ad closure is not a rejection.",
      verified_date:"24 Sep 2026"
    },
    J065:{
      status:"🔵 Applied",
      application_evidence:"SEEK application confirmation email; SEEK activity update 22 Sep 2026",
      application_note:"SEEK reported the GeersSullivan public ad was no longer advertised. Preserve as Applied because public-ad closure is not a rejection.",
      verified_date:"24 Sep 2026"
    },
    J067:{
      status:"🔵 Applied",
      closing:"SEEK ad expired 20 Sep 2026 — application remains active",
      application_evidence:"SEEK application confirmation email; SEEK closure email received 20 Sep 2026",
      application_note:"Finance & Administrative Assistant at Masterwall WA is no longer advertised on SEEK, but the employer still has the submitted application. Preserved as Applied; no rejection was stated.",
      verified_date:"24 Sep 2026"
    },
    J068:{
      status:"🔵 Applied",
      application_evidence:"SEEK application confirmation email; SEEK activity update 22 Sep 2026",
      application_note:"SEEK reported the employer was reviewing applications and the public ad was no longer advertised. Preserve as Applied because ad closure is not a rejection.",
      verified_date:"24 Sep 2026"
    },
    J070:{
      status:"🔵 Applied",
      application_evidence:"SEEK application confirmation email; SEEK activity update 22 Sep 2026",
      application_note:"SEEK reported the Select Staffing public ad was no longer advertised. Preserve as Applied because public-ad closure is not a rejection.",
      verified_date:"24 Sep 2026"
    },
    J072:{
      status:"🔵 Applied",
      application_evidence:"SEEK application confirmation email; SEEK activity update 22 Sep 2026",
      application_note:"SEEK reported the employer was reviewing applications and the public ad was no longer advertised. Preserve as Applied because ad closure is not a rejection.",
      verified_date:"24 Sep 2026"
    },
    J073:{
      status:"🔵 Applied",
      closing:"SEEK ad expired 23 Sep 2026 — application remains active",
      application_evidence:"SEEK application confirmation email; SEEK closure email received 23 Sep 2026",
      application_note:"Accounts Administrator at Crafted Gardens and Landscaping is no longer taking applications on SEEK, but SEEK confirms the employer retains the submitted application. Preserved as Applied; no rejection was stated.",
      verified_date:"24 Sep 2026"
    },
    J105:{
      status:"🔵 Applied",
      application_evidence:"SEEK application confirmation email; SEEK activity update 22 Sep 2026",
      application_note:"SEEK reported the public ad was no longer advertised. Preserve as Applied because public-ad closure is not a rejection.",
      verified_date:"24 Sep 2026"
    },
    J119:{
      status:"🔵 Applied",
      application_evidence:"SEEK application confirmation email received 7 Sep 2026; SEEK activity update 22 Sep 2026",
      application_note:"SEEK reported on 22 Sep 2026 that Ballajura Family Practice was reviewing applications. Status remains Applied; no rejection or stronger progression outcome was stated.",
      verified_date:"24 Sep 2026"
    },
    J126:{
      status:"🔵 Applied",
      application_evidence:"SEEK application confirmation plus Employment Hero application receipt; SEEK activity update 22 Sep 2026",
      application_note:"SEEK reported the HealthEx public ad was no longer advertised. Preserve as Applied because public-ad closure is not a rejection.",
      verified_date:"24 Sep 2026"
    }
  };

  const additions=[
    {
      id:"J148",rank:148,new:"",role:"Administration Officer",employer:"Mental Health Commission",location:"Perth",
      pay:"$89,464–$96,043 p.a. advertised | ≈$45.88–$49.25/hr derived + super",
      pay_max:49.25,employment:"Permanent full-time",arrangement:"Flexible start/finish arrangements advertised",
      chance:"Reasonable",career:"Government administration and project-support application history. Application remains valid after the employer extended the advertising period.",
      listed:"Sep 2026",closing:"29 Sep 2026 — 4:00 PM AWST (extended by employer)",
      type:"Vacancy",status:"🔵 Applied",
      source:"https://search.jobs.wa.gov.au/jobs/administration-officer-perth-metropolitan-western-australia-australia-1f138114-74aa-4633-a50e-027c5e0523fe",
      category:["Government","Corporate / Office"],applied_date:"Before 22 Sep 2026",date_added:"24 Sep 2026",
      distance_km:15,relevance_label:"High",
      application_evidence:"Direct Mental Health Commission / Health Support Services email dated 22 Sep 2026 confirms the application remains valid and will continue to be considered.",
      application_note:"Employer extended the closing time to 4:00 PM Tuesday 29 Sep 2026 and invited applicants to provide additional information before the new deadline.",
      verified_date:"24 Sep 2026"
    },
    {
      id:"J149",rank:149,new:"",role:"Aged Care Billing & Account Receivable Officer",employer:"Zenith Search",location:"Not captured from application email",
      pay:"Not captured from application email",pay_max:null,employment:"Not captured from application email",arrangement:"Not captured from application email",
      chance:"—",career:"Healthcare billing/accounts-receivable application history.",
      listed:"",closing:"SEEK ad expired 23 Sep 2026 — application remains active",
      type:"Vacancy",status:"🔵 Applied",source:"",
      category:["Finance & Accounts","Healthcare Admin / Finance"],applied_date:"28 Aug 2026",date_added:"24 Sep 2026",
      distance_km:999,relevance_label:"High",
      application_evidence:"SEEK closure email received 23 Sep 2026 confirms application was submitted on 28 Aug 2026 and remains with the employer.",
      application_note:"Public SEEK advertisement expired; preserved as Applied because no rejection was stated.",
      exact_link_unverified:true,verified_date:"24 Sep 2026"
    },
    {
      id:"J150",rank:150,new:"",role:"Business Administrator — Full-Time / Part-Time",employer:"Coolabaroo Services",location:"Not captured from application email",
      pay:"Not captured from application email",pay_max:null,employment:"Full-time / part-time — exact roster not captured",arrangement:"Not captured from application email",
      chance:"—",career:"Business-administration application history.",
      listed:"",closing:"SEEK ad expired 20 Sep 2026 — application remains active",
      type:"Vacancy",status:"🔵 Applied",source:"",
      category:["Corporate / Office"],applied_date:"3 Sep 2026",date_added:"24 Sep 2026",
      distance_km:999,relevance_label:"Medium",
      application_evidence:"SEEK closure email received 20 Sep 2026 confirms application was submitted on 3 Sep 2026 and remains with the employer.",
      application_note:"SEEK later reported the employer was reviewing applications. Public ad closure is not treated as a rejection.",
      exact_link_unverified:true,verified_date:"24 Sep 2026"
    }
  ];

  function apply(){
    try{
      if(typeof jobs==="undefined"||!Array.isArray(jobs)||!jobs.length){setTimeout(apply,140);return;}
      jobs.forEach(j=>{ if(fixes[j.id]) Object.assign(j,fixes[j.id]); });
      additions.forEach(a=>{
        const duplicate=jobs.some(j=>j.id===a.id || (String(j.role||"").toLowerCase()===String(a.role||"").toLowerCase() && String(j.employer||"").toLowerCase()===String(a.employer||"").toLowerCase()));
        if(!duplicate) jobs.push(a);
      });
      if(typeof render==="function") render();
    }catch(_){setTimeout(apply,220);}
  }
  apply();
})();