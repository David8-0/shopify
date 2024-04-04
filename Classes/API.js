"use strict"

export class API{
    static async  getData(param="tomato"){
        API.showLoader();
        let res= await fetch(`https://forkify-api.herokuapp.com/api/search?q=${param}`);
        let data = await res.json();
        //*generte random number
        let rand=0;
        //*assign price
        data.recipes.forEach(element => {
            rand = Math.floor(Math.random()*(40 - 25 + 1))+25; 
            element.price=rand;
            element.category=param;
        });
        API.hideLoader();
        return data.recipes;
    }

    static async getProduct(id,category){
        let res= await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
        let data = await res.json(); 
           //*generte random number for price
           let rand=0;
               rand = Math.floor(Math.random()*(40 - 25 + 1))+25; 
               data.price=rand;
               data.category=category;
           return data;
    }
    static showLoader(){
        try{
            const loader = document.querySelector('special-loader');
            loader.classList.remove('d-none');
        }catch(e){
            console.log(e.message);
        }
    }
    static hideLoader(){
        try{
            const loader = document.querySelector('special-loader');
            loader.classList.add('d-none');
        }catch(e){
            console.log(e.message);
        }
    }
}








