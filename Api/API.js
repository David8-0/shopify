

  export async function getData(param = "tomato") {
      showLoadingScreen();
      let res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${param}`);
      let data = await res.json();
      let rand = 0;
      data.recipes.forEach(element => {
        rand = Math.floor(Math.random() * (40 - 25 + 1)) + 25;
        element.price = rand;
        element.category = param;
      });

      return data.recipes;
    }