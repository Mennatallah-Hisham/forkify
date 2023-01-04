
import icons from 'url:../../img/icons.svg';
import { renderError } from './view';
const resultsContainer=document.querySelector(".results");

export const renderResults=function(data){
    const markUp=data.map(recipe=>` <li class="preview">
    <a class="preview__link " href="#${recipe.id}">
      <figure class="preview__fig">
        <img src="${recipe.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
      
      </div>
    </a>
  </li>`
        
        
        ).join("");

resultsContainer.innerHTML=" ";
resultsContainer.insertAdjacentHTML("afterbegin",markUp)

}


export const renderResultErrorHandler = function(){
    resultsContainer.innerHTML=" ";
    renderError(resultsContainer,"no recipes found for your query, please try again")
}