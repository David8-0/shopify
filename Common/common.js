//header and footer
class specialHeader extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`<div id="header-container">     
        <h3 class="text-center">header</h3>
        <a href="./index.html"> <i class="fa-solid fa-house"></i> Home</a>
        <a href="./about.html">About</a>
    <a href="./categories.html">categories</a>
    </div>
    `;
    }
}
class specialFooter extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`<div id="footer-container">     
        <h3 class="text-center bg-danger">footer</h3>
    </div>
    `;
    }
}
customElements.define('special-header',specialHeader);
customElements.define('special-footer',specialFooter);

// links and scripts
let linksArray =["./node_modules/@fortawesome/fontawesome-free/css/all.min.css","./node_modules/bootstrap/dist/css/bootstrap.min.css","./Common/common.css"];
let scriptsArray =["./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js","./node_modules/jquery/dist/jquery.min.js"];
function addLinks(...links){
    links.forEach((e)=>{
        let linkElement = document.createElement("link");
        linkElement.rel="stylesheet";
        linkElement.type="text/css";
        linkElement.href=e;
        document.head.appendChild(linkElement);
    });
}
function addscripts(...scripts){
    scripts.forEach((e)=>{
        let scriptElement = document.createElement("script");
        scriptElement.src=e;
        scriptElement.type="text/javascript";
        document.head.appendChild(scriptElement);
    });
}
addLinks(...linksArray);
addscripts(...scriptsArray);