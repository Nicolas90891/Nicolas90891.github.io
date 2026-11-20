(()=>{const q=document.getElementById('search');if(!q)return;const cards=[...document.querySelectorAll('.card')],groups=[...document.querySelectorAll('.collection')],empty=document.getElementById('empty');const normal=s=>s.normalize('NFKD').replace(/[\u0300-\u036f\u064b-\u065f\u0670]/g,'').toLocaleLowerCase();q.addEventListener('input',()=>{const needle=normal(q.value.trim());let shown=0;for(const c of cards){const match=!needle||normal(c.dataset.search).includes(needle);c.hidden=!match;if(match)shown++}for(const g of groups)g.hidden=![...g.querySelectorAll('.card')].some(c=>!c.hidden);empty.hidden=shown>0})})();

(()=>{const links=[...document.querySelectorAll('.sections a')];if(!links.length)return;const reflect=()=>links.forEach(a=>{if(a.hash===location.hash)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});window.addEventListener('hashchange',reflect);reflect()})();

// A shared, keyboard-accessible shortcut for publication listings and articles.
(()=>{if(!document.querySelector('.index-main,.article-main'))return;const labels={en:['Top','Back to top'],fr:['Haut','Retour en haut de page'],ja:['トップ','ページの先頭へ戻る'],ar:['الأعلى','العودة إلى أعلى الصفحة']};const [short,label]=labels[document.documentElement.lang]||labels.en;const button=document.createElement('button');button.type='button';button.className='publication-top';button.hidden=true;button.setAttribute('aria-label',label);button.title=label;const arrow=document.createElement('span');arrow.setAttribute('aria-hidden','true');arrow.textContent='↑';const text=document.createElement('span');text.className='publication-top-label';text.textContent=short;button.append(arrow,text);document.body.append(button);let queued=false;const update=()=>{queued=false;button.hidden=window.scrollY<=350;};window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});window.addEventListener('pageshow',update);button.addEventListener('click',()=>{window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});update();})();

// Keep the plain author credit consistent across all publication pages.
(()=>{
  const names={en:'Nicolas Furukawa',fr:'Nicolas Furukawa',ja:'古川 ニコラ',ar:'نيكولاس فوروكاوا'};
  const footer=document.querySelector('footer.footer');
  if(!footer||footer.querySelector('.footer-author'))return;
  const base=footer.querySelector('.nf-footer-base')||footer;
  const rights=base.querySelector(':scope > span');
  const name=names[document.documentElement.lang];
  if(!rights||!name)return;
  const identity=document.createElement('span');identity.className='footer-identity';
  const author=document.createElement('span');author.className='footer-author';author.textContent=name;
  rights.classList.add('footer-rights');rights.before(identity);identity.append(author,rights);
})();

// Share the verified author identity and portrait across publication pages.
(()=>{const person={"@context":"https://schema.org","@type":"Person","@id":"https://nicolasfurukawa.com/#nicolas-furukawa","name":"Nicolas Furukawa","alternateName":["古川ニコラ","古川 ニコラ","نيكولاس فوروكاوا"],"url":"https://nicolasfurukawa.com/","image":"https://nicolasfurukawa.com/nicolas-furukawa-silver.png","sameAs":["https://www.facebook.com/profile.php?id=61596505743564","https://www.linkedin.com/in/nicolas-furukawa-115208442/","https://www.youtube.com/@Nick19891"]};for(const el of document.querySelectorAll('script[type="application/ld+json"]')){try{const data=JSON.parse(el.textContent);if(data.author&&data.author["@id"]===person["@id"]){data.author.image=person.image;data.author.sameAs=person.sameAs;el.textContent=JSON.stringify(data);}}catch(e){}}const el=document.createElement("script");el.type="application/ld+json";el.textContent=JSON.stringify(person);document.head.append(el);})();
