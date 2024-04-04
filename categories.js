"use strict";
import {getData} from './Api/API.js';



async function assignData(category,page) {
  var data;
  data = await getData(category);
  var Text = ``;
  var size = 6; var arrayOfArrays = [];
  for (var i=0; i<data.length; i+=size) {
       arrayOfArrays.push(data.slice(i,i+size));
  }

    var itemCard = document.getElementById('itemCard');
  var CategoryName = document.getElementById('catrgoryName');

  arrayOfArrays[page].forEach(item => {
      Text += `
          <div class="col-md-4 p-0 mb-3">
              <div class="productDiv">
                  <div class="imageTrans w-100">
                      <a href=""><img src="${item.image_url}" class="w-100" alt="">
                      <i class="fa-solid fa-eye fa-xxl"></i>
                      </a>
                  </div>
                  <h5 class="text-center mt-3 fixedHeight">${item.title}</h5>
                  <h5 class="text-center mt-3">$${item.price}</h5>
                  <a href="" class="text-decoration-none">
                      <h5 class="text-center mt-3 redColor">
                          <i class="fa-solid fa-cart-shopping fs-6 pe-2 redColor"></i> Add To Cart
                      </h5>
                  </a>
              </div>
          </div>`;
      itemCard.innerHTML = Text;
      CategoryName.innerHTML = item.category; 
  });
}

//default 
assignData('ice cream',1)
var defaultCategory =  document.querySelectorAll('[data-category="ice cream"]');
defaultCategory[0].classList.add('redColor');


var defaultPage = document.querySelectorAll('[page-number="1"]');
defaultPage[0].classList.add('selected');
// end default

var page; 
    document.querySelectorAll('.category').forEach(item => {
        item.addEventListener('click', function() {
            var category = this.getAttribute('data-category');
            document.querySelectorAll('.category').forEach(item => {
                item.classList.remove('redColor');
            });
            this.classList.add('redColor');
            var paginationElements = document.querySelectorAll('.paginations');
            paginationElements.forEach(item=>{
              item.classList.remove('selected');
            })
            paginationElements[0].classList.add('selected');
            assignData(category, 1);    
        });
    });

    document.querySelectorAll('.paginations').forEach(item => {
        item.addEventListener('click', function() {
       
            var number = this.getAttribute('page-number');

            document.querySelectorAll('.paginations').forEach(item => {
                item.classList.remove('selected');
            });
            this.classList.add('selected');
            page = number; 
            assignData(getCurrentCategory(), page); 
        });
    });

function getCurrentCategory() {
    var selectedCategory = document.querySelector('.category.redColor');
    if (selectedCategory) {
        return selectedCategory.getAttribute('data-category');
    } else {
    
        return null;
    }
}