const root=document.documentElement;const theme=document.getElementById("theme");const menu=document.getElementById("menu");const mobile=document.getElementById("mobileNav");let savedTheme=null;try{savedTheme=localStorage.getItem("mkc-theme")}catch{}if(savedTheme==="light")root.dataset.theme="light";theme?.addEventListener("click",()=>{const light=root.dataset.theme!=="light";if(light)root.dataset.theme="light";else delete root.dataset.theme;try{localStorage.setItem("mkc-theme",light?"light":"dark")}catch{}});menu.addEventListener("click",()=>mobile.classList.toggle("open"));mobile.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobile.classList.remove("open")));const cursor=document.querySelector(".cursor"),dot=document.querySelector(".cursor-dot");let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px"});function tick(){cx+=(mx-cx)*.14;cy+=(my-cy)*.14;cursor.style.left=cx+"px";cursor.style.top=cy+"px";requestAnimationFrame(tick)}tick();document.querySelectorAll("a,button").forEach(el=>{el.addEventListener("mouseenter",()=>cursor.classList.add("active"));el.addEventListener("mouseleave",()=>cursor.classList.remove("active"))});const reveal=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});document.querySelectorAll(".work-card,.compact-card,.lab-list a,.principles div,.signal-inner,.contact-right a").forEach(e=>{e.classList.add("reveal");reveal.observe(e)});
/* Visitor support */
const guestbookModal=document.getElementById("guestbookModal");
const guestbookForm=document.getElementById("guestbookForm");
const guestbookType=document.getElementById("guestbookType");
const guestbookSupportType=document.getElementById("guestbookSupportType");
const guestbookStatus=document.getElementById("guestbookStatus");
const guestbookTrigger=document.getElementById("guestbookTrigger");
const supportChoices=document.querySelectorAll(".support-choice");
const closeGuestbook=()=>{guestbookModal.classList.remove("open");guestbookModal.setAttribute("aria-hidden","true");document.body.style.overflow=""};
const openGuestbook=(type="Encouragement")=>{
  guestbookType.textContent=type.toUpperCase();
  guestbookSupportType.value=type;
  guestbookStatus.textContent="";
  guestbookStatus.className="guestbook-status";
  guestbookModal.classList.add("open");
  guestbookModal.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
  setTimeout(()=>guestbookForm.querySelector("textarea")?.focus(),180);
};
supportChoices.forEach(button=>button.addEventListener("click",()=>openGuestbook(button.dataset.support)));
guestbookTrigger?.addEventListener("click",()=>openGuestbook());
guestbookModal?.querySelectorAll("[data-close-guestbook]").forEach(el=>el.addEventListener("click",closeGuestbook));
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&guestbookModal?.classList.contains("open"))closeGuestbook()});
guestbookForm?.addEventListener("submit",async e=>{
  e.preventDefault();
  const submit=guestbookForm.querySelector(".guestbook-submit");
  submit.disabled=true;
  submit.querySelector("span").textContent="Envoi en cours…";
  guestbookStatus.textContent="";
  try{
    const response=await fetch("https://formsubmit.co/ajax/papac8443@gmail.com",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(guestbookForm)))});
    const data=await response.json();
    if(!response.ok||data.success===false)throw new Error("submission_failed");
    guestbookStatus.textContent="Merci. Votre message vient d'être envoyé. 💚";
    guestbookStatus.className="guestbook-status success";
    guestbookForm.reset();
    guestbookSupportType.value="Encouragement";
    setTimeout(closeGuestbook,1800);
  }catch(error){
    guestbookStatus.textContent="Impossible d'envoyer le message pour le moment. Réessayez dans un instant.";
    guestbookStatus.className="guestbook-status error";
  }finally{
    submit.disabled=false;
    submit.querySelector("span").textContent="Envoyer le message";
  }
});

/* Scroll-aware navigation */
const nav=document.querySelector(".nav");
let lastScrollY=window.scrollY;
let scrollTick=false;
const updateNav=()=>{const y=window.scrollY;nav?.classList.toggle("nav-scrolled",y>24);if(y<80){nav?.classList.remove("nav-hidden")}else if(y>lastScrollY+6){nav?.classList.add("nav-hidden")}else if(y<lastScrollY-6){nav?.classList.remove("nav-hidden")}lastScrollY=y;scrollTick=false};
window.addEventListener("scroll",()=>{if(!scrollTick){requestAnimationFrame(updateNav);scrollTick=true;}},{passive:true});
