(()=>{"use strict";const e=()=>{let e,t=document.getElementsByClassName("lightbox");t.length>0&&t[0].remove();const n=document.createElement("div");n.classList.add("lightbox","hidden"),document.body.appendChild(n),n.innerHTML='<button class="lightbox__close"><i class="fas fa-times"></i></button>\n  <button class="lightbox__next"><i class="fas fa-chevron-right"></i></button>\n  <button class="lightbox__prev"><i class="fas fa-chevron-left"></i></button>\n  <div class="lightbox__container d-flex column">\n  </div>';const o=e=>{e.preventDefault(),n.classList.add("hidden"),document.body.style.overflow="auto"};window.addEventListener("keydown",(e=>{"Escape"===e.key&&o(e)})),document.querySelector(".lightbox__close").onclick=e=>{o(e)};const s=t=>{t.preventDefault(),e==a.length-1?(i(a[0]),e=0):(i(a[e+1]),e+=1)};window.addEventListener("keydown",(e=>{"ArrowRight"===e.key&&s(e)})),document.querySelector(".lightbox__next").onclick=e=>{s(e)};const r=t=>{t.preventDefault(),0==e?(i(a[a.length-1]),e=a.length-1):(i(a[e-1]),e-=1)};window.addEventListener("keydown",(e=>{"ArrowLeft"===e.key&&r(e)})),document.querySelector(".lightbox__prev").onclick=e=>{r(e)};const i=e=>{"video"===e.dataset.mediatype?document.querySelector(".lightbox__container").innerHTML=`\n      <video controls>\n      <source src=../assets/img/Sample_Photos/${e.dataset.foldername}/${e.dataset.videoname}.mp4\n      type="video/mp4">\n      <source src=../assets/img/Sample_Photos/${e.dataset.foldername}/${e.dataset.videoname}.ogv\n      type="video/ogg">\n      <source src=../assets/img/Sample_Photos/${e.dataset.foldername}/${e.dataset.videoname}.webm\n      type="video/webm">\n      Sorry, your browser doesn't support embedded videos.\n      </video>\n      <h3 class="picture-description" id="picture-name">`+e.href.split("/")[7].replace(/_/g," ").slice(0,-4)+"</h3>":document.querySelector(".lightbox__container").innerHTML=`\n      <img src="${e.href}" alt="${e.alt}">\n      <h3 class="picture-description" id="picture-name">`+e.href.split("/")[7].replace(/_/g," ").slice(0,-4)+"</h3>"},a=Array.from(document.querySelectorAll(".jsMedia"));for(let t=0;t<a.length;t++)a[t].addEventListener("click",(o=>{o.preventDefault(),n.classList.remove("hidden"),document.body.style.overflow="hidden",e=t,i(a[e])}))};(()=>{const o=new URLSearchParams(window.location.search).get("id");fetch("/FishEyeDataFR.json").then((e=>{if(!e.ok)throw new Error("HTTP error "+e.status);return e.json()})).then((r=>{let i,a;o?i=r.photographers.find((e=>e.id==o)):console.log("No id found"),t(i),o?(a=r.media.filter((e=>e.photographerId==i.id)),s(a,i.name.split(" ")[0])):console.log("No media found"),(()=>{let e=document.querySelector(".close-btn"),t=document.querySelector(".modal"),n=document.querySelector(".modal-wrapper"),o=document.forms.contact,s=document.createElement("p"),r=document.createElement("button"),i=document.getElementById("main-wrapper");document.querySelector(".open-modal-btn").addEventListener("click",(()=>{i.setAttribute("aria-hidden","true"),t.setAttribute("aria-hidden","false"),t.style.display="flex",document.body.style.overflow="hidden",s.remove(),r.remove(),n.classList.remove("message-sended"),o.style.display="block",document.getElementById("firstName").focus()}));const a=()=>{t.style.display="none",document.body.style.overflow="auto",i.setAttribute("aria-hidden","false"),t.setAttribute("aria-hidden","true")};function l(e){return""!=(e=e.trim())&&e.length>2&&0==/\d/.test(e)}e.addEventListener("click",a),window.addEventListener("keydown",(e=>{"Escape"===e.key&&(e.preventDefault(),a())}));const d=e=>{const t=document.createElement("div");return t.className="error",t.innerHTML=e,t};o.addEventListener("submit",(e=>{e.preventDefault();let t=!1,i=o.firstName,c=o.lastName,m=o.email;var u;document.querySelectorAll(".error").forEach((e=>e.remove())),document.querySelectorAll(".error--bg").forEach((e=>e.classList.remove("error--bg"))),l(i.value)||(t=!0,i.classList.add("error--bg"),i.insertAdjacentElement("afterend",d("Veuillez entrer 2 caractères ou plus pour le prénom."))),l(c.value)||(t=!0,c.classList.add("error--bg"),c.insertAdjacentElement("afterend",d("Veuillez entrer 2 caractères ou plus pour le nom."))),u=m.value,new RegExp("^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$","i").test(u)?(o.style.display="none",n.classList.add("message-sended","d-flex","column"),s.classList.add("mess"),s.innerHTML="Merci, votre formulaire a bien été envoyé !",n.append(s),r.innerHTML="Fermer",n.appendChild(r),r.classList.add("btn-close"),r.addEventListener("click",a)):(t=!0,m.classList.add("error--bg"),m.insertAdjacentElement("afterend",d("Veuillez entrer une adresse mail valide.")))}))})(),n(a,i.name.split(" ")[0]),e()})).catch((function(e){console.log("error",e)}))})();const t=e=>{let t=`\n        <div class="photographer-description d-flex column">\n            <h1>${e.name}</h1>\n            <h2 id="location">${e.city}, ${e.country}</h2>\n            <p id="catchphrase">${e.tagline}</p>\n            <ul class="d-flex row tag-container">`;e.tags.forEach((e=>{t+=`<li class="tags"><a href='/index.html?tag=${e}'>#${e}</a></li>`})),t+=`</ul>\n      </div>\n      <button class="open-modal-btn"><a href="#modal-photographer" class="js-modal">Contactez-moi</a></button>\n      <figure class="profil-pic">\n        <img src="/assets/img/Sample_Photos/Photographers_ID_Photos/${e.portrait}" alt="" />\n      </figure>\n      <div class ="d-flex row" id="likes-price">\n      <span id="total-likes"></span>\n      <span id="price">${e.price}€ / jour</span>\n      </div>`,document.getElementById("banner-container").insertAdjacentHTML("beforeend",t),document.querySelector("#titlemodal").innerHTML=`Contactez-moi </br> ${e.name}`},n=(e,t)=>{let n=document.getElementById("gallery");n.innerHTML="";let o=0;e.forEach(((e,s)=>{o+=e.likes;let r,i=`\n    <figure class="picture-card d-flex column">\n      <div class="picture-description d-flex row">\n        <h3 id="picture-name">${e.title}</h3>\n        <p class="counter-like">${e.likes}</p>\n        <svg\n          aria-hidden="false"\n          class="heart"\n          focusable="true"\n          role="img"\n          xmlns="http://www.w3.org/2000/svg"\n          viewBox="0 0 512 512"\n          aria-describedby="title svg-description"\n        >\n          <title id="title">Coeur</title>\n          <desc id="svg-description">la forme d'un coeur dessiné simplement</desc>\n          <path\n            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"\n          />\n        </svg>\n      </div>\n    </figure>\n    `;if(e.image)r=`\n          <a href="../assets/img/Sample_Photos/${t}/${e.image} " class="jsMedia"\n            ><img\n              src="../assets/img/Sample_Photos/${t}/${e.image} "\n              alt="${e.alt}"              \n          /></a>\n        `;else if(e.video){let n=e.video.split(".")[0];r=`\n      <a data-folderName="${t}" data-videoName="${n}" data-mediaType="video" class="jsMedia" href="../assets/img/Sample_Photos/${t}/${n}.mp4 "\n      ><video width="250" >\n        <source src=../assets/img/Sample_Photos/${t}/${n}.mp4\n              type="video/mp4">\n        <source src=../assets/img/Sample_Photos/${t}/${n}.ogv\n              type="video/ogg">\n        <source src=../assets/img/Sample_Photos/${t}/${n}.webm\n              type="video/webm">\n        Sorry, your browser doesn't support embedded videos.\n        </video></a>        \n        `}else r='<p id="errorMedia">Sorry we didn\'t find anything for this photographer</p>';n.insertAdjacentHTML("beforeend",i),document.getElementsByClassName("picture-card")[s].insertAdjacentHTML("afterbegin",r);const a=document.getElementsByClassName("heart")[s];a.addEventListener("click",(function(){let t=document.getElementsByClassName("counter-like")[s];e.likes++,t.innerHTML=e.likes,o++,document.getElementById("total-likes").innerHTML=o+" ♥",a.classList.contains("like-anim")&&a.classList.remove("like-anim"),setTimeout((function(){a.classList.add("like-anim")}),10)}))})),document.getElementById("total-likes").innerHTML=o+" ♥"};document.querySelector("#filters").addEventListener("click",(function(){this.querySelector(".option-wrapper").classList.toggle("open"),this.querySelector(".filters-options-list").classList.toggle("open")}));let o=["Popularité","Date","Titre"];const s=(e,t,n=o)=>{document.getElementById("filters-options-list").innerHTML="",n.forEach((n=>{let o=document.createElement("li");o.setAttribute("id","filters-options-"+n),o.classList.add("option"),o.setAttribute("aria-selected","false"),o.setAttribute("role","option"),o.innerHTML=`${n}`,document.getElementById("filters-options-list").append(o),r(e,t,o,n)}))},r=(t,r,d,c)=>{d.addEventListener("click",(d=>{let m=t;"Date"==c?(m=i(d,t),o=["Date","Popularité","Titre"]):"Titre"==c?(m=a(d,t),o=["Titre","Date","Popularité"]):"Popularité"==c&&(m=l(d,t),o=["Popularité","Date","Titre"]),document.querySelector(".option-wrapper button span").textContent=c,n(m,r),e(),s(m,r)}))};window.addEventListener("click",(function(e){const t=document.querySelector(".option-wrapper");t.contains(e.target)||t.classList.remove("open")}));const i=(e,t)=>t.sort(((e,t)=>new Date(t.date)-new Date(e.date))),a=(e,t)=>t.sort(((e,t)=>e.title.localeCompare(t.title))),l=(e,t)=>t.sort(((e,t)=>t.likes-e.likes))})();