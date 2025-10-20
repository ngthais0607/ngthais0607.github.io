
(function(){
  const root = document.documentElement;
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // honor saved theme
  const saved = localStorage.getItem('theme');
  if(saved==='light') root.classList.add('light');

  // Initialize lucide icons and keep theme icon in sync
  function setThemeIcon(){
    const btn = document.getElementById('themeToggle');
    if(!btn) return;
    const icon = btn.querySelector('i[data-lucide]');
    if(!icon) return;
    const isLight = document.documentElement.classList.contains('light');
    icon.setAttribute('data-lucide', isLight ? 'sun' : 'moon');
    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
  }
  setThemeIcon();

  const btn = document.getElementById('themeToggle');
  if(btn){
    btn.addEventListener('click', ()=>{

      const isLight = root.classList.toggle('light');
      btn.setAttribute('aria-pressed', String(isLight));
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      setThemeIcon();

});
  }
  const range = document.getElementById('range');
  const output = document.getElementById('result');
  if(range && output){
    const update = ()=> output.value = 'Score: ' + range.value;
    range.addEventListener('input', update);
    update();
  }
  const form = document.querySelector('form[novalidate]');
  if(form){
    form.addEventListener('submit', (e)=>{
      const invalid = !form.checkValidity();
      if(invalid){
        e.preventDefault();
        alert('Please verify required fields.');
      }else{
        const prog = document.getElementById('progress');
        if(prog){ prog.value = 100; }
        alert('Submitted successfully (demo).');
        e.preventDefault();
      }
    });
  }
  // Active nav link + animated page transitions
  const current = location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.site-nav a[href]');
  links.forEach(a=>{
    const href = a.getAttribute('href').replace('/', '');
    if(href === current){ a.classList.add('is-active'); }
    // Fade-out transition on internal nav clicks
    const isInternal = href.endsWith('.html');
    if(isInternal){
      a.addEventListener('click', (e)=>{
        if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // let new tab etc.
        e.preventDefault();
        document.body.classList.add('fade-out');
        setTimeout(()=>{ window.location.href = a.href; }, 180);
      });
    }
  });
  // Fade-in when ready
  window.addEventListener('DOMContentLoaded', ()=> document.body.classList.add('ready'));

})();
