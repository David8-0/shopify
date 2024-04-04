// import '../Classes/specialHeader.js'
// import '../Classes/specialFooter.js';
// import '../Classes/specialLoader.js';
const scriptsContainer = document.querySelector('#ss');
const loader = document.querySelector('special-loader');
// links and scripts
// let linksArray =["../node_modules/@fortawesome/fontawesome-free/css/all.min.css","../node_modules/bootstrap/dist/css/bootstrap.min.css","../Common/common.css"];
let scriptsArray =[
    "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    "../node_modules/jquery/dist/jquery.min.js",
    "../Classes/specialHeader.js",
    "../Classes/specialFooter.js",
    "../Classes/specialLoader.js"
    ];
// function addLinks(...links){
//     links.forEach((e)=>{
        
//         let linkElement = document.createElement("link");
//         linkElement.rel="stylesheet";
//         linkElement.type="text/css";
//         linkElement.href=e;
//         document.head.insertAdjacentHTML("afterbegin", `<link rel="stylesheet" href="${e}">`);
//     });
// }
function addscripts(...scripts){
    scripts.forEach((e)=>{
        let scriptElement = document.createElement("script");
        scriptElement.src=e;
        scriptElement.type="module";
        // scriptsContainer.insertAdjacentHTML("beforeend", `<script src="${e}" type="module"></script>`);
        scriptsContainer.appendChild(scriptElement);
    });
}
// addLinks(...linksArray);
addscripts(...scriptsArray);

//loader
window.addEventListener("load",function(){
    loader.classList.add("d-none");
});
