// Blackthorn Resolute — Interactive Application Logic

const LOGO_SVGS = {
  convergence: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" width="46" height="46" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="80" height="80" rx="20" fill="#182E2B"/>
    <rect x="5" y="5" width="78" height="78" rx="19" stroke="#C96442" stroke-opacity="0.55" stroke-width="1.5"/>
    <path d="M24 64 C24 46, 44 46, 44 22" stroke="#FAF8F5" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M64 64 C64 46, 44 46, 44 22" stroke="#C96442" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M22 44 H66" stroke="#E5DFD5" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="2 4"/>
    <circle cx="44" cy="22" r="5.5" fill="#C96442" stroke="#FAF8F5" stroke-width="2"/>
    <circle cx="24" cy="64" r="3.5" fill="#FAF8F5"/>
    <circle cx="64" cy="64" r="3.5" fill="#C96442"/>
  </svg>`,
  monogram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" width="46" height="46" fill="none" aria-hidden="true">
    <circle cx="44" cy="44" r="40" fill="#FAF8F5" stroke="#182E2B" stroke-width="2.2"/>
    <circle cx="44" cy="44" r="35" stroke="#C96442" stroke-width="1.3"/>
    <line x1="44" y1="16" x2="44" y2="72" stroke="#182E2B" stroke-width="2"/>
    <text x="21" y="54" font-family="'Instrument Serif', Georgia, serif" font-size="30" fill="#141413">B</text>
    <text x="49" y="54" font-family="'Instrument Serif', Georgia, serif" font-size="30" fill="#C96442">R</text>
  </svg>`,
  heritage: `<img src="assets/blackthorn_logo3.png" alt="Blackthorn Resolute Heritage Crest" width="46" height="46" style="border-radius:10px;" />`
};

// 1. Theme Switcher (Claude Editorial Warm vs Classic Resolute Teal)
function setSiteTheme(themeName) {
  if (themeName === 'resolute-teal') {
    document.documentElement.setAttribute('data-theme', 'resolute-teal');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  document.querySelectorAll('[data-theme-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme-btn') === themeName);
  });
}

// 2. Logo Switcher
function setBrandLogo(logoKey) {
  const container = document.getElementById('header-logo-mark');
  if (container && LOGO_SVGS[logoKey]) {
    container.innerHTML = LOGO_SVGS[logoKey];
  }
  document.querySelectorAll('[data-logo-btn]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-logo-btn') === logoKey);
  });
}

// 3. Mobile Menu Toggle
function toggleMobileNav() {
  const nav = document.getElementById('primary-nav-links');
  if (nav) nav.classList.toggle('open');
}

// 4. Interactive 60-Second Dispute Triage Tool
const triageState = {
  category: 'Divorce, Separation & Parenting Plan',
  stage: 'Communication is tense or stuck',
  format: 'Online via Zoom / Microsoft Teams'
};

const triageRecommendations = {
  'Divorce, Separation & Parenting Plan': {
    sessions: '3 to 5 hours (typically 2–3 structured sessions)',
    splitCost: 'R1,425 – R2,375 per party (at R475/hr each when split 50/50 · No VAT)',
    roadmap: 'We start with a Free 30-Minute Consultation to map out what must be decided (parenting schedule under the Children\'s Act s33/34, maintenance, and clean division of property/pensions) inside the iMedi8 workspace—so you settle without paying two divorce attorneys R80,000+ to argue over household items.'
  },
  'Business Partnership & Commercial Dispute': {
    sessions: '3 to 6 hours (typically completed within 10–14 days)',
    splitCost: 'R1,425 – R2,850 per party (at R475/hr each when split 50/50 · No VAT)',
    roadmap: 'Drawing on 27+ years of international business & commercial negotiation experience, Stavros separates personal friction from commercial reality—helping shareholders, partners, or suppliers agree on a clean buyout, payment restructure, or working protocol without destroying client confidence.'
  },
  'Workplace & Employment Conflict (Pre-CCMA)': {
    sessions: '2 to 4 hours (often resolved in a single half-day)',
    splitCost: 'R950 – R1,900 per party (or employer-sponsored at R950/hr total · No VAT)',
    roadmap: 'Before an employment breakdown hardens into formal grievances, disciplinary hearings, or CCMA referrals, confidential workplace mediation establishes clear expectations, mutual exit terms, or restored reporting lines in days rather than months.'
  },
  'Gauteng Rule 41A / Court-Referred Matter': {
    sessions: '3 to 6 hours (completed well within the 30-day Gauteng Protocol)',
    splitCost: 'R1,425 – R2,850 per party (at R475/hr each · No VAT)',
    roadmap: 'Full statutory compliance: We execute the Rule 41A(4)(a) Pre-Mediation Initial Joint Minute (suspending pleading deadlines), conduct structured caucus & joint sessions, and issue the formal Outcome Joint Minute & Form J128 / MED-3 Mediator\'s Report within 5 business days.'
  }
};

function selectTriageOption(stepKey, value, btnEl) {
  triageState[stepKey] = value;
  const parent = btnEl.parentElement;
  parent.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
  btnEl.classList.add('selected');
  renderTriageResult();
}

function renderTriageResult() {
  const info = triageRecommendations[triageState.category] || triageRecommendations['Divorce, Separation & Parenting Plan'];
  const titleEl = document.getElementById('triage-out-title');
  const bodyEl = document.getElementById('triage-out-body');
  const sessionsEl = document.getElementById('triage-out-sessions');
  const costEl = document.getElementById('triage-out-cost');
  const waBtn = document.getElementById('triage-wa-link');
  const mailBtn = document.getElementById('triage-mail-link');

  if (titleEl) titleEl.textContent = `${triageState.category} (${triageState.format})`;
  if (bodyEl) bodyEl.textContent = info.roadmap;
  if (sessionsEl) sessionsEl.textContent = info.sessions;
  if (costEl) costEl.textContent = info.splitCost;

  const msg = `Hi Stavros, I completed the 60-second assessment on Blackthorn Resolute:\n• Matter: ${triageState.category}\n• Current Stage: ${triageState.stage}\n• Preferred Format: ${triageState.format}\nI would like to book the Free 30-Minute Consultation.`;
  if (waBtn) waBtn.href = `https://wa.me/27648987503?text=${encodeURIComponent(msg)}`;
  if (mailBtn) mailBtn.href = `mailto:support@blackthornresolute.co.za?subject=${encodeURIComponent('Free 30-Min Consultation Request: ' + triageState.category)}&body=${encodeURIComponent(msg)}`;
}

// 5. Interactive Mediation vs. Court Cost & Time Calculator
function updateCostCalculator() {
  const hoursInput = document.getElementById('calc-hours');
  const lawyerInput = document.getElementById('calc-lawyer-rate');
  if (!hoursInput || !lawyerInput) return;

  const medHours = parseInt(hoursInput.value, 10) || 4;
  const lawyerRate = parseInt(lawyerInput.value, 10) || 3500;

  document.getElementById('calc-hours-val').textContent = `${medHours} hours`;
  document.getElementById('calc-lawyer-val').textContent = `R${lawyerRate.toLocaleString('en-ZA')}/hr per attorney`;

  const totalMediation = medHours * 950;
  const perPartyMediation = Math.round(totalMediation / 2);

  // Typical contested litigation uses ~12x the billable hours across two attorneys + pleadings/counsel
  const courtBillableHoursPerSide = medHours * 7;
  const courtCostTwoLawyers = courtBillableHoursPerSide * lawyerRate * 2 + 25000;
  const netSavings = courtCostTwoLawyers - totalMediation;

  document.getElementById('out-med-total').textContent = `R${totalMediation.toLocaleString('en-ZA')}`;
  document.getElementById('out-med-split').textContent = `R${perPartyMediation.toLocaleString('en-ZA')} per party (50/50 split · No VAT)`;
  document.getElementById('out-court-total').textContent = `R${courtCostTwoLawyers.toLocaleString('en-ZA')}+`;
  document.getElementById('out-net-savings').textContent = `R${netSavings.toLocaleString('en-ZA')}+ saved`;
}

// 6. iMedi8 Interactive Workspace Tabs
const imedi8Views = {
  issues: {
    badge: 'MODULE 01 · STRUCTURED AGENDA & ASSET SCHEDULE',
    title: 'Replace 50 heated emails with one calm, shared issue board',
    desc: 'Before and between sessions, both parties log into iMedi8 to see the exact agenda, upload valuation documents or budgets, and mark which points are already agreed vs. still under discussion.',
    items: [
      ['Primary Residence & Bond (Vanderbijlpark)', 'Agreed in Principle — Valuations Uploaded', '#0E7C6B'],
      ['Parenting Schedule (School Terms & Holidays)', 'In Active Discussion — Session 2 Agenda', '#C96442'],
      ['Vehicle & Household Movables Schedule', 'Resolved — Clean Division Recorded', '#0E7C6B'],
      ['Rule 41A Confidentiality & Fee Split (R475/hr each)', 'Signed by Both Parties', '#0E7C6B']
    ]
  },
  parenting: {
    badge: 'MODULE 02 · CHILDREN\'S ACT S33/34 PARENTING PLAN BUILDER',
    title: 'Practical co-parenting clauses built around two working households',
    desc: 'Structured prompts help parents agree on school-term routines, holiday rotations, birthdays, medical aid, and school fee splits—without putting children in the middle.',
    items: [
      ['School Term Weekday & Weekend Handovers', 'Drafted & Confirmed by Both Parents', '#0E7C6B'],
      ['December / Easter / School Holiday Rotation', 'Alternating Even/Odd Years Agreed', '#0E7C6B'],
      ['School Fees, Uniforms & Medical Aid Apportionment', '50/50 Direct Expense Split Logged', '#0E7C6B'],
      ['Future Dispute Resolution Clause (Mediation First)', 'Included for Family Advocate Registration', '#0E7C6B']
    ]
  },
  rule41a: {
    badge: 'MODULE 03 · ATTORNEY & RULE 41A COMPLIANCE TRACKER',
    title: 'Court-ready documentation within the 30-day Gauteng Protocol',
    desc: 'Referring attorneys and parties can track statutory milestones from the Initial Joint Minute (Rule 41A(4)(a)) through to the final Outcome Joint Minute and Form J128 / MED-3 report.',
    items: [
      ['24-Hour Conflict Check & Mediator Confirmation', 'Completed by Stavros Gazis', '#0E7C6B'],
      ['Pre-Mediation Initial Joint Minute (Rule 41A(4)(a))', 'Executed — Pleading Time Limits Suspended', '#0E7C6B'],
      ['Without-Prejudice Case Summaries (2–3 Pages)', 'Received via Secure Portal', '#0E7C6B'],
      ['Outcome Joint Minute & Form J128 / MED-3 Report', 'Issued Within 5 Business Days of Conclusion', '#C96442']
    ]
  },
  summary: {
    badge: 'MODULE 04 · WRITTEN SESSION SUMMARIES & NEXT STEPS',
    title: 'Clear written progress notes after every single session',
    desc: 'Nobody leaves wondering what was decided. After each session, Stavros posts a neutral summary of points agreed, documents needed, and the agenda for the next session.',
    items: [
      ['Session 1 (Free 30-Min Consultation)', 'Process explained, ground rules & suitability confirmed', '#0E7C6B'],
      ['Session 2 (2 Hours — R950/hr total · R475/hr per party)', 'Core financial & parenting options explored calmly', '#0E7C6B'],
      ['Session 3 (1.5 Hours — Finalizing Terms)', 'Draft Memorandum of Understanding reviewed & signed', '#0E7C6B'],
      ['Attorney / Court Handover Pack', 'Ready for Settlement Agreement / Rule 41A Filing', '#0E7C6B']
    ]
  }
};

function switchImedi8Tab(tabKey, btnEl) {
  document.querySelectorAll('[data-imedi8-btn]').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  const data = imedi8Views[tabKey];
  if (!data) return;

  document.getElementById('imedi8-badge').textContent = data.badge;
  document.getElementById('imedi8-title').textContent = data.title;
  document.getElementById('imedi8-desc').textContent = data.desc;

  const listEl = document.getElementById('imedi8-items');
  listEl.innerHTML = data.items.map(([label, status, color]) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:var(--bg-canvas);border:1px solid var(--border-hairline);border-radius:10px;gap:12px;flex-wrap:wrap;">
      <span style="font-weight:600;font-size:0.9rem;">${label}</span>
      <span style="font-family:var(--font-mono);font-size:0.76rem;font-weight:700;color:${color};padding:4px 10px;border-radius:999px;background:var(--bg-subtle);">${status}</span>
    </div>
  `).join('');
}

// 7. Modals (Book Excerpt Modal & Brand/SEO Kit Modal)
function openModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add('open');
}

function closeModal(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.remove('open');
}

// 8. Instant Consultation Scheduler (WhatsApp, Email & .ics Calendar Download)
function getBookingDetails() {
  const name = (document.getElementById('bk-name')?.value || 'Prospective Client').trim();
  const phone = (document.getElementById('bk-phone')?.value || '').trim();
  const type = document.getElementById('bk-type')?.value || 'Divorce, Separation & Parenting';
  const mode = document.getElementById('bk-mode')?.value || 'Online (Zoom / Microsoft Teams)';
  const date = document.getElementById('bk-date')?.value || '2026-10-29';
  const time = document.getElementById('bk-time')?.value || '10:00';
  const notes = (document.getElementById('bk-notes')?.value || '').trim();
  return { name, phone, type, mode, date, time, notes };
}

function submitBookingWhatsApp() {
  const b = getBookingDetails();
  const text = `Hi Stavros, I'd like to book a Free 30-Minute Mediation Consultation:\n• Name: ${b.name}${b.phone ? ' (' + b.phone + ')' : ''}\n• Dispute Type: ${b.type}\n• Format: ${b.mode}\n• Preferred Date/Time: ${b.date} at ${b.time} (SAST)\n${b.notes ? '• Brief Context: ' + b.notes : ''}`;
  window.open(`https://wa.me/27648987503?text=${encodeURIComponent(text)}`, '_blank');
}

function submitBookingEmail() {
  const b = getBookingDetails();
  const subject = `Free 30-Min Consultation Booking: ${b.type} (${b.name})`;
  const body = `Hi Stavros,\n\nI would like to book a Free 30-Minute Mediation Consultation with Blackthorn Resolute.\n\nName: ${b.name}\nPhone / WhatsApp: ${b.phone || 'Not provided'}\nNature of Dispute: ${b.type}\nPreferred Format: ${b.mode}\nPreferred Date & Time (SAST): ${b.date} at ${b.time}\nBrief Notes: ${b.notes || 'None'}\n\nKind regards,\n${b.name}`;
  window.location.href = `mailto:support@blackthornresolute.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function downloadBookingICS() {
  const b = getBookingDetails();
  const cleanDate = b.date.replace(/-/g, '');
  const cleanHour = parseInt(b.time.split(':')[0], 10) || 10;
  const startStr = `${cleanDate}T${String(cleanHour).padStart(2, '0')}0000`;
  const endStr = `${cleanDate}T${String(cleanHour).padStart(2, '0')}3000`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Blackthorn Resolute//Mediation Consultation//EN',
    'BEGIN:VEVENT',
    `SUMMARY:Blackthorn Resolute — Free 30-Min Mediation Consultation (${b.type})`,
    `DTSTART;TZID=Africa/Johannesburg:${startStr}`,
    `DTEND;TZID=Africa/Johannesburg:${endStr}`,
    `DESCRIPTION:Confidential 30-Minute Mediation Consultation with Stavros Gazis (Blackthorn Resolute). Format: ${b.mode}. WhatsApp/Tel: +27 64 898 7503. Email: support@blackthornresolute.co.za`,
    `LOCATION:${b.mode}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Blackthorn-Resolute-30Min-Consultation.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
  renderTriageResult();
  updateCostCalculator();
  switchImedi8Tab('issues', document.querySelector('[data-imedi8-btn="issues"]'));
});
