(()=>{"use strict";(e=>{const t=document.getElementById("timer-hours"),n=document.getElementById("timer-minutes"),o=document.getElementById("timer-seconds"),r=setInterval((()=>{let e=(()=>{let e=new Date("30 march 2022 01:15").getTime(),t=(new Date).getTime(),n=Math.max((e-t)/1e3,0);return{timeRemaining:n,hours:Math.floor(n/60/60),minutes:Math.floor(n/60%60),seconds:Math.floor(n%60)}})();t.textContent=e.hours<10?"0"+e.hours:e.hours,n.textContent=("0"+e.minutes).slice(-2),o.textContent=("0"+e.seconds).slice(-2),e.timeRemaining||clearInterval(r)}),1e3)})(),(()=>{const e=document.querySelector(".menu"),t=document.querySelector("menu"),n=t.querySelector(".close-btn"),o=t.querySelectorAll("ul>li>a"),r=document.querySelector("main a"),c=()=>{t.classList.toggle("active-menu")},l=e=>{const t=document.querySelector(e.currentTarget.hash);let n=Math.round(window.scrollY);const o=Math.round(t.getBoundingClientRect().top)+n;e.preventDefault(),function e(){n+=25,(n<o||n-o<25)&&(requestAnimationFrame(e),window.scrollTo(0,Math.min(n,o)))}()};e.addEventListener("click",c),n.addEventListener("click",c),o.forEach((e=>e.addEventListener("click",c))),o.forEach((e=>e.addEventListener("click",l))),r.addEventListener("click",l)})(),(()=>{const e=document.querySelector(".popup"),t=e.querySelector(".popup-content"),n=document.querySelectorAll(".popup-btn"),o=e.querySelector(".popup-close");n.forEach((n=>{n.addEventListener("click",(n=>{e.style.display="block",window.innerWidth>767&&(()=>{const e=Math.round(100-100*t.getBoundingClientRect().left/window.innerWidth);let n=0;!function o(){n<e?(requestAnimationFrame(o),t.style.transform="translateX( 0px )",t.style.left=100-n+"%",n++):(t.style.left="",t.style.transform="")}()})()}))})),o.addEventListener("click",(()=>{e.style.display="none"}))})()})();