//header and footer
class specialHeader extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`    <header>
        <div class="container-lg container-fluid">
            <div  id="nav-header">

                <div class="row">
                   
                    <!--header icons-->

                    <div class="col-md-3 col-lg-4">
                        <div class="header-icons text-white d-flex justify-content-center align-items-center h-100 py-1 py-md-0">

                            <a class="icon pe-2" href="#">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <span id="cart-counter">0</span>
                            </a>
                            <a class="icon pe-2" href="#">
                                <i class="fa-solid fa-arrow-right-from-bracket "></i>
                                logout
                            </a>
                            <a class="icon pe-2" href="#">
                                <i class="fa-solid fa-arrow-right-to-bracket"></i>
                                login
                            </a>
                        </div>
                    </div>

                    <!-- header logo -->

                    <div class="col-md-4 col-lg-4">
                        <div class="logo-container w-100 d-flex justify-content-center align-items-center py-1 py-md-0">
                            <img src="./images/logo.png" alt=" logo">
                        </div>
                    </div>

                    <!-- header search -->
                    <div class="col-md-5 col-lg-4">
                        <div class="d-flex justify-content-center align-items-md-center  h-100 flex-column flex-md-row py-1 py-md-0">

                            <div id="phone-number" class=" text-center">
                                <a href="tel:+123-456-789" class="pe-md-2 pe-1">123-456-789</a>
                            </div>
                            <div class="position-relative search">
                                <input type="text" class="search-input w-100">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
            <div id="nav-bar">
            <a href="./index.html"><i class="fa-solid fa-house"></i> Home</a>
                <a href="./about.html">about</a>
                <a href="./categories.html">categories</a>
            </div>
        </div>
    </header>
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