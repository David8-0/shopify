import {User} from '../Classes/User.js';
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
                            <a class="icon pe-2" href="#" id="logout-Btn">
                                <i class="fa-solid fa-arrow-right-from-bracket "></i>
                                logout
                            </a>
                            <a class="icon pe-2" href="/login/login.html">
                                <i class="fa-solid fa-arrow-right-to-bracket"></i>
                                login
                            </a>
                            <p id="user-Name"></p>
                            <img id="user-img" src="" alt="">
                        </div>
                    </div>

                    <!-- header logo -->

                    <div class="col-md-4 col-lg-4">
                        <div class="logo-container w-100 d-flex justify-content-center align-items-center py-1 py-md-0">
                            <img src="../images/logo.png" alt=" logo">
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
            <a href="/index.html"><i class="fa-solid fa-house"></i> Home</a>
                <a href="/about.html">about</a>
                <a href="/categories.html">categories</a>
            </div>
        </div>
    </header>
    `;
    }
}
customElements.define('special-header',specialHeader);
const userName = document.querySelector('#user-Name');
const logOutBtn = document.querySelector('#logout-Btn');
const userImg=document.querySelector('#user-img');


logOutBtn.addEventListener('click',function(){
    if(localStorage.getItem('currentUser')==null)
        throw new Error('no user logged in!!');
    console.log('log out');
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if(!user.isNormal){
        const info = JSON.parse(localStorage.getItem('authInfo'));
        fetch(`https://www.googleapis.com/revoke=${info['access_token']}`,{
            method:'POST',
            headers:{
                'Content-type':'application/x-www-form-urlencoded'
            },
            mode: 'no-cors'
        })
        .then((data)=>{
            location.href = "/login/login.html";
            localStorage.removeItem('authInfo');
            User.logOut();
        })
    }else{
        localStorage.removeItem('currentUser');
        location.href='/login/login.html';
    }
});

    const params = {};
    let regex = /([^&=]+)=([^&]*)/g, m;

function verifyUser(){
    //extract token from the url and add it to object params
    
    while(m=regex.exec(location.href)){
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    //if there is values in the token store it in local storage
    if(Object.keys(params).length > 0){
        localStorage.setItem('authInfo', JSON.stringify(params));
    }
    // hide the token from the url
    window.history.pushState({},document.title,"/"+"home.html");
    //getting the info 
    let info = JSON.parse(localStorage.getItem('authInfo'));

    // console.log(info);

    // use this token with any google api to get data related to the user 
    fetch("https://www.googleapis.com/oauth2/v3/userinfo",{
        headers:{
            "Authorization":`Bearer ${info['access_token']}`
        }
    })
    .then((data)=>data.json())
    .then((info)=>{
        // console.log(info);
        // userName.innerHTML += info.name;
        // image.setAttribute('src',info.picture);
        //sub is the unique id for each user
        let user = new User(info.name,info.sub,info.email,false);
        if(JSON.parse(localStorage.getItem('currentUser')!=null)){
            let currUser = localStorage.getItem('currentUser');
            
            userName.innerHTML +=currUser.name;
            userImg.setAttribute('src',info.picture);
        }
        
    })
}

if(m=regex.exec(location.href)){
    console.log("userrrrrrrrrr");
    verifyUser();
}
