"use strict";
import {API} from './Classes/API.js';
let btn = document.getElementById('get');
let data;
btn.onclick = async function(){
    let d = await API.getData();
    console.log(d);
};
// async function assignData(){

//     data = await API.getProduct(47746,"Pizza");
//     console.log(data);
// }
// assignData();



