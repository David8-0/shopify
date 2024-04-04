"use strict";
import {User} from '../Classes/User.js';
const nameInput=document.getElementById('name-input');
const emailInput=document.getElementById('email-input');
const passwordInput=document.getElementById('password-input');
const registerBtn=document.getElementById('register-Btn');
const form = document.querySelector('form');
const alertEmail=document.getElementById('alert-email');
const alertName=document.getElementById('alert-name');
const alertPassword=document.getElementById('alert-password');





form.onsubmit = function(e){
    e.preventDefault();
}

registerBtn.onclick=function(){
    if(isValidEmail() & isNewEmail() & isValidPassword() & isValidName() ){
        //create normalUsers if it doesn't exist
        let userId=generateUniqueId();
        // const user = new User(nameInput.value, userId,emailInput.value )
        
        let normalUsers = JSON.parse(localStorage.getItem('normalUsers'));   
        let normalUser={
            id:userId,
            name:nameInput.value,
            email:emailInput.value,
            password:passwordInput.value
        }
        normalUsers.push(normalUser);
        localStorage.setItem('normalUsers',JSON.stringify(normalUsers));
    }
}


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

function isValidName(){
    if(nameInput.value.trim().length < 4){
        alertName.innerText='Name must be at least 4 characters';
        alertName.classList.remove('d-none');
        return false;
    }else{
        alertName.classList.add('d-none');
        return true;
    }
    
}

function generateUniqueId() {
    const timestamp = new Date().getTime(); 
    const randomNum = Math.floor(Math.random() * 10000); 
    return timestamp.toString(16) + randomNum.toString(16); 
  }

function isNewEmail(){
    if(localStorage.getItem('normalUsers')==null){
        localStorage.setItem('normalUsers',JSON.stringify([]));
        return true;
    }
    let normalUsers = JSON.parse(localStorage.getItem('normalUsers')); 
    normalUsers.forEach(element => {
        if(element.email==emailInput.value){
            alertEmail.innerText = `${emailInput.value} already exists`;
            alertEmail.classList.remove('d-none');
            return false;
        }
    });
    return true;
}