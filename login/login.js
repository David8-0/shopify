"use strict";
import {User} from '../Classes/User.js';
let loginBtn = document.getElementById('loginBtn');
const form = document.querySelector('form');
const emailInput=document.getElementById('email-input');
const passwordInput=document.getElementById('password-input');
const normalLogin = document.getElementById('normal-loginBtn');
const generalAlert = document.getElementById('general-alert');
const alertEmail=document.getElementById('alert-email');
const alertPassword=document.getElementById('alert-password');

console.log(form);


form.onsubmit = function(e){
    e.preventDefault();
}




//login with google account
loginBtn.addEventListener('click',login);
function login(){
    let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

    let form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action',oauth2Endpoint);

    let params={
        "client_id":"581289324805-ll9bdr2fha4o4dqekp70nhs4vcruagvn.apps.googleusercontent.com",
        "redirect_uri":"http://127.0.0.1:5503/index.html",
        "response_type":"token",
        "scope":"https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",  // scopes are the data of the user that we will need permission to access using google api later
        "include_granted_scopes":'true',
        'state':'pass-through-value'
    }

    for(var param in params){
        let input = document.createElement('input');
        input.setAttribute('type','hidden');
        input.setAttribute('name',param);
        input.setAttribute('value',params[param]);
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
}

//normal login
normalLogin.onclick = function(){
    if(isValidEmail(),isValidPassword()){
        if(localStorage.getItem('normalUsers')==null || JSON.parse(localStorage.getItem('normalUsers')).length ==0){
            generalAlert.classList.remove('d-none');
            generalAlert.innerHTML='invalid Email or Password 🙈';
            return ;
        }else{
            let normalUsers = JSON.parse(localStorage.getItem('normalUsers')); 
            normalUsers.forEach(element => {
                if(element.email==emailInput.value && element.password==passwordInput.value){
                    generalAlert.classList.add('d-none');
                    let user = new User(element.name, element.id, element.email,true);
                    location.href='../index.html';
                }else{
                    generalAlert.classList.remove('d-none');
                    generalAlert.innerHTML='invalid Email or Password 🙈';
                }
            });
        }
       
    }
};


function isValidEmail(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(emailInput.value)){
        alertEmail.innerText = `${emailInput.value} is not a valid email`;
        alertEmail.classList.remove('d-none');
    }else{
        alertEmail.classList.add('d-none'); 
    }
    return emailRegex.test(emailInput.value);
}

 function isValidPassword(){
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if(!passwordRegex.test(passwordInput.value)){
        alertPassword.innerText='invalid password format must at least contain 8 characters and one uppercase character';
        alertPassword.classList.remove('d-none');
    }else{
        alertPassword.classList.add('d-none');

    }
    return passwordRegex.test(passwordInput.value);
}
