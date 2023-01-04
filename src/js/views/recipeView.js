import icons from 'url:../../img/icons.svg';
import {Fraction} from 'fractional';

import { renderError, renderMessage,renderSpinner } from './view';
const recipeContainer = document.querySelector('.recipe');



export const renderRecipe =(recipe)=>{
  



    const markUp=`
    <figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
    </figure>
    
    <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
      <span class="recipe__info-text">servings</span>
    
      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings btn-dec" data-servings="${recipe.servings}">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings btn-inc" data-servings="${recipe.servings}">
        <svg>
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </button>
      </div>
    </div>
    
    <div class="recipe__user-generated">
     
    </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}.svg#icon-bookmark${recipe.bookmarked?'-fill':''}"></use>
      </svg>
    </button>
    </div>
    
    <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    
    
    ${
    
    
    recipe.ingredients.map(ing => {
    
      return(
      ` <li class="recipe__ingredient">
       <svg class="recipe__icon">
         <use href="${icons}.svg#icon-check"></use>
       </svg>
       <div class="recipe__quantity">${ing.quantity ?new Fraction(ing.quantity).toString():'0' }</div>
       <div class="recipe__description">
         <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
       </div>
     </li>`
      )
    
      
       
     }).join('')
    }
    
    </ul>
    </div>
    
    <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}.svg#icon-arrow-right"></use>
      </svg>
    </a>
    </div>
    `
    recipeContainer.innerHTML=" ";

    recipeContainer.insertAdjacentHTML("afterbegin",markUp);
    }

export const renderSpinnerHandler = function(){
 
  recipeContainer.innerHTML=" ";
       renderSpinner(recipeContainer);
      
      }
      




// handle events . recive a function;
export const addHandlerRender= function(handler){

  ['hashchange','load'].forEach(ev=> window.addEventListener(ev,handler));

}

export const renderErrorHandler = function(){
  recipeContainer.innerHTML=" ";
  renderError(recipeContainer);
  
}

export const renderMessageHandler =function(){
 renderMessage(recipeContainer);
}


export const addChangeServingsHandler= function(handler){



recipeContainer.addEventListener("click",(e)=>{
  const target =e.target.closest(".btn--tiny");
 if(!target)return;
  let newServings;
  if (target.classList.contains("btn-inc")){
  
newServings =Number(target.getAttribute("data-servings"))+1;
handler(newServings);
  }

  if(target.classList.contains("btn-dec")){
    newServings =Number(target.getAttribute("data-servings"))-1;
    handler(newServings);

  }

})

}



export const addBookmarkHandler = function(handler){
  recipeContainer.addEventListener("click",(e)=>{
    const btn = e.target.closest(".btn--bookmark");
    if(!btn) return;
    handler();
    
  })
}
