
const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const toggle=$('.menu-toggle'),nav=$('.nav-links');if(toggle)toggle.onclick=()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);toggle.textContent=open?'×':'☰'};
$$('.nav-links a').forEach(a=>a.onclick=()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.textContent='☰'});
let lastFocus;
function closeModal(){const m=$('#demo-modal');m.hidden=true;document.body.style.overflow='';lastFocus?.focus()}
function demo(title='الطلب'){lastFocus=document.activeElement;$('#demo-title').textContent=title;$('#demo-modal').hidden=false;document.body.style.overflow='hidden';$('#demo-modal .close').focus()}
$$('[data-demo]').forEach(b=>b.addEventListener('click',()=>demo(b.dataset.demo)));
$('#demo-modal .close')?.addEventListener('click',closeModal);$('#demo-modal')?.addEventListener('click',e=>{if(e.target.id==='demo-modal')closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();const m=$('#demo-modal');if(e.key==='Tab'&&m&&!m.hidden){const a=$$('button,input,textarea,select,a[href]',m).filter(x=>!x.disabled);if(e.shiftKey&&document.activeElement===a[0]){e.preventDefault();a.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===a.at(-1)){e.preventDefault();a[0].focus()}}});
$$('form[data-local]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;const out=$('.status',f);out.textContent='شكرًا لك. هذه الخطوة غير متصلة بخدمة فعلية حاليًا، ولم تُرسل بياناتك.'}));
$$('[data-filter-group]').forEach(group=>{const target=group.dataset.filterGroup;$$('button',group).forEach(b=>b.onclick=()=>{$$('button',group).forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});$$('[data-group="'+target+'"]').forEach(card=>card.hidden=b.dataset.filter!=='all'&&card.dataset.cat!==b.dataset.filter)})});

const cfg=window.PROFILE||{};
if(cfg.name)$('#profile-name').textContent=cfg.name;
if(cfg.role)$('#profile-role').textContent=cfg.role;
if(cfg.about)$('#profile-about').textContent=cfg.about;
const names=['معرض أعمالي','السيرة الذاتية','أحدث مشروعاتي','مساحة للقراءة'];
names.forEach((n,i)=>{const b=document.createElement('button');b.className='profile-link';const label=document.createElement('b');label.textContent=cfg.links?.[i]?.label||n;const arrow=document.createElement('span');arrow.textContent='↗';b.append(label,arrow);b.onclick=()=>{const u=cfg.links?.[i]?.url;try{const parsed=new URL(u);if(parsed.protocol==='https:'){window.open(parsed.href,'_blank','noopener');return}}catch(e){}demo('أضف رابطك في ملف config.js')};$('#personal-links').append(b)});
function replaceContact(index,text,href){const old=$$('.profile-contact-btn')[index];const a=document.createElement('a');a.className=old.className;a.href=href;if(href.startsWith('https:')){a.target='_blank';a.rel='noopener'}a.append(document.createTextNode(old.childNodes[0].textContent));const b=document.createElement('b');b.dir='auto';b.textContent=text;a.append(b);old.replaceWith(a)}
if(cfg.phone&&/^\+?[0-9\s-]{7,20}$/.test(cfg.phone))replaceContact(0,cfg.phone,'tel:'+cfg.phone.replace(/\s/g,''));
if(cfg.email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cfg.email))replaceContact(1,cfg.email,'mailto:'+cfg.email);
if(cfg.whatsapp&&/^https:\/\/wa.me\/[0-9]+$/.test(cfg.whatsapp))replaceContact(2,'تواصل عبر واتساب ↗',cfg.whatsapp);
