"use strict";
import {getData} from './Api/API.js';

let data;

async function assignData(){
    data = await getData("ice cream");
    console.log(data);
    
  
    var Text = ``;
    data.forEach(item => {
       
            Text+= `
           
            `
        
    });

 

}
assignData();

