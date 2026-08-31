(function(){
  if(!Array.isArray(window.JUNIOR_JOBS)) return;
  const job=window.JUNIOR_JOBS.find(j=>j.id==="JR001");
  if(!job) return;
  Object.assign(job,{
    status:"🟣 Interview",
    applied_date:"29 Aug 2026",
    interview_date:"3 Sep 2026",
    interview_time:"1:00 PM",
    interview_with:"Oscar Smith — Accountant",
    interview_location:"Joondalup Resort, 45 Joondalup Resort Country Club Boulevard, Connolly WA 6027",
    application_employer:"TenGolf Group",
    interview_reference:"EH-6141636",
    career:"Excellent — specifically aimed at current Accounting/Finance/Commerce students; supplier invoices, finance support and practical accounting exposure. 🟣 INTERVIEW: Thu 3 Sep 2026 at 1:00 PM with Oscar Smith (Accountant) at Joondalup Resort."
  });
})();
