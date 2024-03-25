export  async function getData(param="tomato"){
    let res= await fetch(`https://forkify-api.herokuapp.com/api/search?q=${param}`);
    let data = await res.json();
    //generte random number
    let rand=0;
    //assign price
    data.recipes.forEach(element => {
        // while(rand<19){
            rand = Math.floor(Math.random()*(40 - 25 + 1))+25; 
        // }
        element.price=rand;
        element.category=param;
        
    });
    return data.recipes;
}








