"use strict";
import {getData} from './Api/API.js';

let data;

async function assignData(){
    data = await getData();
    console.log(data);
}
assignData();



