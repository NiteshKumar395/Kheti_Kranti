const L=document.documentElement.lang==="hi"?"hi":"en";
const S={en:{day:"/day",km:"km away",none:"No machines found. Try another word.",listen:"Listening...",nomic:"Voice search is not supported in this browser",loc:"Location set to "},
hi:{day:"/दिन",km:"किमी दूर",none:"कोई मशीन नहीं मिली। दूसरा शब्द आज़माएँ।",listen:"सुन रहा हूँ...",nomic:"इस ब्राउज़र में वॉइस सर्च उपलब्ध नहीं है",loc:"लोकेशन सेट: "}}[L];
const CATS=[["tractor","Tractor","ट्रैक्टर","🚜"],["thresher","Thresher","थ्रेशर","🌾"],["harvester","Harvester","हार्वेस्टर","🌽"],["sprayer","Sprayer","स्प्रेयर","💧"],["rotavator","Rotavator","रोटावेटर","⚙️"],["seeddrill","Seed drill","सीड ड्रिल","🌱"],["pump","Water pump","पानी पंप","🚰"],["plough","Plough","हल","🪓"],["trolley","Trolley","ट्रॉली","🛒"],["cultivator","Cultivator","कल्टीवेटर","🔧"],["baler","Baler","बेलर","📦"],["leveller","Land leveller","लेवलर","📐"]];
const NEAR=[["Mahindra 575 DI","महिंद्रा 575 DI","tractor","🚜",1200,3],["Kubota Harvester","कुबोटा हार्वेस्टर","harvester","🌽",2800,5],["Multi-crop thresher","मल्टी-क्रॉप थ्रेशर","thresher","🌾",900,2],["Power sprayer","पावर स्प्रेयर","sprayer","💧",350,4],["Rotavator 7 ft","रोटावेटर 7 फीट","rotavator","⚙️",600,6],["Swaraj 744","स्वराज 744","tractor","🚜",1100,7],["Seed drill 9 tyne","सीड ड्रिल 9 टाइन","seeddrill","🌱",450,8],["Diesel water pump","डीज़ल पानी पंप","pump","🚰",300,3]];
const CITIES={Jamui:"जमुई",Patna:"पटना",Gaya:"गया",Nawada:"नवादा",Lakhisarai:"लखीसराय",Munger:"मुंगेर",Bhagalpur:"भागलपुर",Banka:"बांका"};
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const save=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}},load=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
const toast=m=>{const e=$("#toast");e.textContent=m;e.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),2200)};
save("kk-lang",L);

/* theme */
const setTheme=v=>{document.documentElement.dataset.theme=v;save("kk-theme",v);$$("#themeseg button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.t===v))};
$$("#themeseg button").forEach(b=>b.onclick=()=>setTheme(b.dataset.t));
setTheme(document.documentElement.dataset.theme||"light");

/* menus */
const closeAll=()=>{$$(".menu").forEach(m=>m.classList.remove("open"));$$(".pill>button").forEach(b=>b.setAttribute("aria-expanded","false"))};
[["#locb","#locm"],["#profb","#profm"]].forEach(([b,m])=>$(b).onclick=e=>{e.stopPropagation();const o=!$(m).classList.contains("open");closeAll();if(o){$(m).classList.add("open");$(b).setAttribute("aria-expanded","true")}});
document.addEventListener("click",e=>{if(!e.target.closest(".menu"))closeAll()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeAll()});

/* location */
let city=load("kk-city");if(!CITIES[city])city="Jamui";
const name=c=>L==="hi"?CITIES[c]:c;
function renderLoc(){$("#loct").textContent=name(city);
 $("#locm").innerHTML=Object.keys(CITIES).map(c=>`<button data-c="${c}">${name(c)}${c===city?" ✓":""}</button>`).join("")}
$("#locm").onclick=e=>{const b=e.target.closest("button");if(!b)return;city=b.dataset.c;save("kk-city",city);renderLoc();closeAll();toast(S.loc+name(city))};
renderLoc();

/* voice */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
$("#mic").onclick=()=>{if(!SR)return toast(S.nomic);
 const r=new SR(),m=$("#mic");r.lang=L==="hi"?"hi-IN":"en-IN";m.classList.add("on");toast(S.listen);
 r.onresult=e=>{$("#q").value=e.results[0][0].transcript;$("#sf").requestSubmit()};
 r.onend=r.onerror=()=>m.classList.remove("on");r.start()};

/* home page only */
if($("#rail")){
 let query=(new URLSearchParams(location.search).get("q")||"").trim(),extra=0,page=0;
 $("#q").value=query;
 const ok=e=>{if(!query)return true;const q=query.toLowerCase(),c=CATS.find(c=>c[0]===e[2]);return[e[0],e[1],c[1],c[2]].some(s=>s.toLowerCase().includes(q))};
 const card=e=>`<a class="eq" href="${L}-machine.html?m=${encodeURIComponent(e[0])}"><div class="im" aria-hidden="true">${e[3]}</div><div class="t"><b>${L==="hi"?e[1]:e[0]}</b><span class="pr">₹${e[4]}${S.day}</span><br><small>${e[5]} ${S.km}</small></div></a>`;
 const rail=()=>{const l=[];for(let r=0;r<=extra;r++)NEAR.forEach(e=>l.push([...e.slice(0,5),e[5]+r*8]));const f=l.filter(ok);$("#rail").innerHTML=f.length?f.map(card).join(""):`<div class="none">${S.none}</div>`};
 const per=()=>innerWidth<=900?4:8;
 const cats=()=>{const n=per(),p=Math.ceil(CATS.length/n);page%=p;
  $("#catg").innerHTML=CATS.slice(page*n,page*n+n).map(c=>`<a class="cat" href="${L}-category.html?c=${c[0]}"><i aria-hidden="true">${c[3]}</i>${L==="hi"?c[2]:c[1]}</a>`).join("");
  $("#dots").innerHTML=Array.from({length:p},(_,i)=>`<i class="${i===page?"a":""}"></i>`).join("")};
 $("#q").oninput=e=>{query=e.target.value.trim();rail()};
 $("#sf").onsubmit=e=>{e.preventDefault();query=$("#q").value.trim();rail();$("#nearby").scrollIntoView({behavior:"smooth"})};
 $("#nextN").onclick=()=>{const r=$("#rail");if(r.scrollLeft+r.clientWidth>=r.scrollWidth-8){extra++;rail()}r.scrollBy({left:r.clientWidth*.9,behavior:"smooth"})};
 $("#nextC").onclick=()=>{page++;cats()};
 addEventListener("resize",()=>{clearTimeout(window.rz);window.rz=setTimeout(cats,150)});
 rail();cats();
}else{$("#sf").onsubmit=e=>{e.preventDefault();location.href=L+"-index.html?q="+encodeURIComponent($("#q").value.trim())}}