
(function(){
  const root=document.documentElement;
  const savedTheme=localStorage.getItem('fi-theme');
  const setTheme=(mode)=>{ if(mode==='light'||mode==='dark'){root.setAttribute('data-theme',mode);} else {root.removeAttribute('data-theme');} document.querySelectorAll('[data-theme-toggle]').forEach(btn=>{btn.textContent=mode==='light'?'Light':mode==='dark'?'Dark':'System';}); };
  setTheme(savedTheme||'system');
  window.addEventListener('load',()=>document.body.classList.add('loaded'));
  document.addEventListener('click',(e)=>{
    const theme=e.target.closest('[data-theme-toggle]');
    if(theme){const current=localStorage.getItem('fi-theme')||'system'; const next=current==='system'?'light':current==='light'?'dark':'system'; if(next==='system') localStorage.removeItem('fi-theme'); else localStorage.setItem('fi-theme',next); setTheme(next);}
    const navBtn=e.target.closest('[data-nav-toggle]');
    if(navBtn){const nav=document.querySelector('[data-site-nav]'); const open=nav.classList.toggle('open'); navBtn.setAttribute('aria-expanded',String(open));}
    if(e.target.closest('[data-open-contact]')) openContactModal();
    if(e.target.closest('[data-close-contact]')) closeContactModal();
    if(e.target.closest('[data-accept-terms]')) acceptTerms();
  });
  document.addEventListener('keydown',(e)=>{ if(e.key==='Escape'){closeContactModal(); const nav=document.querySelector('[data-site-nav]'); if(nav) nav.classList.remove('open');}});
  window.openContactModal=function(){const modal=document.getElementById('contact-modal'); if(!modal) return; modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); setTimeout(()=>modal.querySelector('input,select,textarea,button')?.focus(),50);};
  window.closeContactModal=function(){const modal=document.getElementById('contact-modal'); if(!modal) return; modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open');};
  const reveal=()=>{document.querySelectorAll('.scroll-reveal').forEach(el=>{const rect=el.getBoundingClientRect(); if(rect.top < window.innerHeight-80) el.classList.add('visible');});};
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add('visible');}),{threshold:.13}); document.querySelectorAll('.scroll-reveal').forEach(el=>io.observe(el));} else {window.addEventListener('scroll',reveal); reveal();}
  function acceptTerms(){localStorage.setItem('fi-terms-accepted','2026-05-12'); const gate=document.querySelector('[data-terms-gate]'); if(gate){gate.classList.remove('open'); gate.setAttribute('aria-hidden','true'); document.body.classList.remove('gate-open');}}
  const gate=document.querySelector('[data-terms-gate]');
  if(gate && !localStorage.getItem('fi-terms-accepted')){gate.classList.add('open'); gate.setAttribute('aria-hidden','false'); document.body.classList.add('gate-open');}
})();
