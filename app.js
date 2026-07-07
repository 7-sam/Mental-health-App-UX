/*=====================================================
  Aura - Mental Health & Wellness App
  app.js
=====================================================*/

// Initialize Feather Icons
document.addEventListener("DOMContentLoaded", () => {

    if (typeof feather !== "undefined") {
        feather.replace();
    }

    initializeApp();

});



/*=====================================================
  APP INITIALIZATION
=====================================================*/

function initializeApp(){

    splashAnimation();

    moodSelection();

    buttonsRipple();

    breathingExercise();

    meditationTimer();

    saveMoodEntry();

    journalSystem();

    animateCharts();

    navigationSystem();

    cardHoverEffects();

    smoothReveal();

}



/*=====================================================
  SPLASH ANIMATION
=====================================================*/

function splashAnimation(){

    const splash=document.querySelector(".splash-screen");

    if(!splash) return;

    splash.style.opacity=0;

    splash.style.transform="scale(.95)";

    setTimeout(()=>{

        splash.style.transition="all .8s ease";

        splash.style.opacity=1;

        splash.style.transform="scale(1)";

    },300);

}



/*=====================================================
  MOOD SELECTION
=====================================================*/

let selectedMood="Happy";

function moodSelection(){

    const cards=document.querySelectorAll(".mood-grid .glass-panel");

    if(cards.length===0) return;

    cards.forEach(card=>{

        card.addEventListener("click",()=>{

            cards.forEach(c=>{

                c.style.border="1px solid rgba(255,255,255,.4)";

                c.style.transform="scale(1)";

            });

            card.style.border="2px solid #9b89b3";

            card.style.transform="scale(1.05)";

            selectedMood=card.innerText.trim();

            localStorage.setItem("selectedMood",selectedMood);

        });

    });

}



/*=====================================================
  RIPPLE BUTTON EFFECT
=====================================================*/

function buttonsRipple(){

    const buttons=document.querySelectorAll("button");

    buttons.forEach(btn=>{

        btn.addEventListener("click",(e)=>{

            const circle=document.createElement("span");

            const d=Math.max(btn.clientWidth,btn.clientHeight);

            circle.style.width=d+"px";

            circle.style.height=d+"px";

            circle.style.position="absolute";

            circle.style.borderRadius="50%";

            circle.style.background="rgba(255,255,255,.4)";

            circle.style.pointerEvents="none";

            circle.style.left=e.offsetX-d/2+"px";

            circle.style.top=e.offsetY-d/2+"px";

            circle.style.animation="ripple .6s linear";

            btn.style.position="relative";

            btn.style.overflow="hidden";

            btn.appendChild(circle);

            setTimeout(()=>circle.remove(),600);

        });

    });

}



/*=====================================================
  BREATHING EXERCISE
=====================================================*/

function breathingExercise(){

    const breatheBtn=document.querySelector(".breathing-btn");

    const circle=document.querySelector(".breathing-circle");

    if(!breatheBtn || !circle) return;

    breatheBtn.addEventListener("click",()=>{

        let state=true;

        breatheBtn.innerText="Stop";

        const interval=setInterval(()=>{

            if(state){

                circle.style.transform="scale(1.3)";

                circle.innerHTML="Inhale";

            }

            else{

                circle.style.transform="scale(.8)";

                circle.innerHTML="Exhale";

            }

            state=!state;

        },4000);

        breatheBtn.onclick=()=>{

            clearInterval(interval);

            breatheBtn.innerText="Start";

            circle.innerHTML="Relax";

            circle.style.transform="scale(1)";

            breathingExercise();

        };

    });

}



/*=====================================================
  MEDITATION TIMER
=====================================================*/

function meditationTimer(){

    const timer=document.querySelector(".meditation-timer");

    const start=document.querySelector(".start-meditation");

    if(!timer || !start) return;

    let seconds=300;

    let interval;

    start.addEventListener("click",()=>{

        clearInterval(interval);

        interval=setInterval(()=>{

            let min=Math.floor(seconds/60);

            let sec=seconds%60;

            timer.innerHTML=

                `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

            seconds--;

            if(seconds<0){

                clearInterval(interval);

                timer.innerHTML="Done";

            }

        },1000);

    });

}



/*=====================================================
  SAVE MOOD
=====================================================*/

function saveMoodEntry(){

    const saveBtn=document.querySelector(".save-mood");

    if(!saveBtn) return;

    saveBtn.addEventListener("click",()=>{

        const note=document.querySelector("textarea");

        const data={

            mood:selectedMood,

            note:note?note.value:"",

            date:new Date().toLocaleDateString(),

            time:new Date().toLocaleTimeString()

        };

        let moods=JSON.parse(localStorage.getItem("moods"))||[];

        moods.push(data);

        localStorage.setItem("moods",JSON.stringify(moods));

        alert("Mood Saved Successfully ❤️");

    });

}



/*=====================================================
  JOURNAL
=====================================================*/

function journalSystem(){

    const add=document.querySelector(".add-journal");

    const input=document.querySelector(".journal-input");

    const list=document.querySelector(".journal-list");

    if(!add || !input || !list) return;

    loadJournal();

    add.addEventListener("click",()=>{

        if(input.value.trim()==="") return;

        let journals=JSON.parse(localStorage.getItem("journal"))||[];

        journals.push({

            text:input.value,

            date:new Date().toLocaleString()

        });

        localStorage.setItem("journal",JSON.stringify(journals));

        input.value="";

        loadJournal();

    });

}



function loadJournal(){

    const list=document.querySelector(".journal-list");

    if(!list) return;

    list.innerHTML="";

    let journals=JSON.parse(localStorage.getItem("journal"))||[];

    journals.reverse().forEach(item=>{

        const card=document.createElement("div");

        card.className="glass-panel";

        card.style.marginBottom="15px";

        card.innerHTML=`

        <h4>${item.date}</h4>

        <p>${item.text}</p>

        `;

        list.appendChild(card);

    });

}



/*=====================================================
  CHART ANIMATION
=====================================================*/

function animateCharts(){

    const bars=document.querySelectorAll(".chart-bar");

    if(bars.length===0) return;

    bars.forEach((bar,index)=>{

        const final=bar.dataset.height||80;

        bar.style.height="0px";

        setTimeout(()=>{

            bar.style.transition="1s ease";

            bar.style.height=final+"px";

        },index*150);

    });

}



/*=====================================================
  NAVIGATION
=====================================================*/

function navigationSystem(){

    const items=document.querySelectorAll(".nav-item");

    items.forEach(item=>{

        item.addEventListener("click",()=>{

            items.forEach(i=>i.classList.remove("active"));

            item.classList.add("active");

        });

    });

}



/*=====================================================
  CARD EFFECTS
=====================================================*/

function cardHoverEffects(){

    const cards=document.querySelectorAll(".glass-panel");

    cards.forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform="translateY(-8px)";

            card.style.transition=".3s";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="translateY(0)";

        });

    });

}



/*=====================================================
  REVEAL ANIMATION
=====================================================*/

function smoothReveal(){

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.style.opacity=1;

                entry.target.style.transform="translateY(0)";

            }

        });

    },{

        threshold:.2

    });

    document.querySelectorAll(".screen-section").forEach(section=>{

        section.style.opacity=0;

        section.style.transform="translateY(40px)";

        section.style.transition=".8s";

        observer.observe(section);

    });

}



/*=====================================================
  PAGE SCROLL TO TOP
=====================================================*/

window.addEventListener("scroll",()=>{

    const btn=document.querySelector(".scroll-top");

    if(!btn) return;

    if(window.scrollY>400){

        btn.style.display="flex";

    }

    else{

        btn.style.display="none";

    }

});



/*=====================================================
  KEYFRAME FOR RIPPLE
=====================================================*/

const style=document.createElement("style");

style.innerHTML=`

@keyframes ripple{

0%{

transform:scale(0);

opacity:.7;

}

100%{

transform:scale(4);

opacity:0;

}

}

`;

document.head.appendChild(style);
