import{a as q,S as P,i as n}from"./assets/vendor-C1DvvBV_.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const B="58224881-408d5e3d14c615d846923e653",E="https://pixabay.com/api/";async function $(o,t){const r={key:B,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15};return(await q.get(E,{params:r})).data}const h=document.querySelector(".gallery"),v=document.querySelector(".loader"),O=new P(".gallery a",{captionsData:"alt",captionDelay:250});function R(o){const t=o.map(({webformatURL:r,largeImageURL:i,tags:e,likes:s,views:a,comments:w,downloads:S})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${i}">
            <img
              class="gallery-image"
              src="${r}"
              alt="${e}"
              loading="lazy"
            />
          </a>

          <div class="gallery-info">
            <div class="info-item">
              <p class="info-label">Likes</p>
              <p class="info-value">${s}</p>
            </div>

            <div class="info-item">
              <p class="info-label">Views</p>
              <p class="info-value">${a}</p>
            </div>

            <div class="info-item">
              <p class="info-label">Comments</p>
              <p class="info-value">${w}</p>
            </div>

            <div class="info-item">
              <p class="info-label">Downloads</p>
              <p class="info-value">${S}</p>
            </div>
          </div>
        </li>
      `).join("");h.insertAdjacentHTML("beforeend",t),O.refresh()}function I(){h.innerHTML=""}function M(){v.classList.remove("is-hidden")}function x(){v.classList.add("is-hidden")}const L=document.querySelector(".load-more");function p(){L.classList.remove("is-hidden")}function c(){L.classList.add("is-hidden")}const d=document.querySelector(".form"),g=d.querySelector('button[type="submit"]'),A=document.querySelector(".load-more"),_=15;let m="",u=1,f=0,l=!1;d.addEventListener("submit",async o=>{if(o.preventDefault(),l)return;const t=d.elements["search-text"].value.trim();if(!t){n.warning({message:"Please enter a search query!",position:"topRight"});return}m=t,u=1,f=0,I(),c(),await b(!1)});A.addEventListener("click",async()=>{l||!m||await b(!0)});async function b(o){l=!0,M(),c(),g.disabled=!0;try{const t=await $(m,u),r=t.hits;if(r.length===0){o?y():n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}R(r),f+=r.length,u+=1,o&&D(),f>=t.totalHits||r.length<_?(c(),y()):p()}catch{n.error({message:"Something went wrong. Please try again later!",position:"topRight"}),o&&p()}finally{x(),g.disabled=!1,l=!1}}function y(){n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}function D(){const o=document.querySelector(".gallery-item");if(!o)return;const{height:t}=o.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
