import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import {
  renderRecipe,
  renderSpinnerHandler,
  addHandlerRender,
  renderErrorHandler,
  addChangeServingsHandler,
  addBookmarkHandler,

} from './views/recipeView';
import { getQuery, addSearchHandler } from './views/searchView.js';
import { renderResults, renderResultErrorHandler } from './views/resultsView';
import { renderPagination, addClickHandler } from './views/paginationView.js';
import { renderBookmarks } from './views/BookmarkView.js';
import { addShowWindowHandler, addUploadRecipeHandler } from './views/addRecipeView';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if(module.hot){
//   module.hot.accept();
// }

const controlRecipe = async function () {

  
  try {
    
    const id = window.location.hash.slice(1);
    
    
    if (!id)return;
    renderSpinnerHandler();
  
    await model.loadRecipe(id);

    const { recipe } = model.state;
 

    renderRecipe(recipe);
 

  } catch (error) {
    renderErrorHandler();
  }
};


const controlSearchResults = async function () {
  try {
    // 1- get search query
    const query = getQuery();
    if (!query) return;
    
    // 2- load search results
    
    await model.loadSearchResults(query);

  // 3- render search results
const results =model.state.search.results;

if(results.length >0){

  renderResults(model.getSearchResultsPage(1));

  //4- render initial pagination button
 renderPagination(model.state.search);



}else{
  renderResultErrorHandler();
}
 
  } catch (e) {
  
  }
};


const controlPagination = function(page){
 

  renderResults(model.getSearchResultsPage(page));
  renderPagination(model.state.search);

}


const controlServings = function(newServings){
  // update the recipe servings in state
model.updateServings(newServings);


const { recipe } = model.state;
 

    renderRecipe(recipe);


}

const controlAddBookmark = function(){
  if(!model.state.recipe.bookmarked)
  { model.addBookmark(model.state.recipe);
 

}else{
  model.deletBookmark(model.state.recipe.id);
}


 

  renderRecipe(model.state.recipe);
  //update bookmark list
  controlRenderBookmarks();

};

const controlRenderBookmarks = function(){


  renderBookmarks(model.state.bookmarks);

}
const controlLoadBookmarks =function(){
  model.loadBookmarks();
  renderBookmarks(model.state.bookmarks);
}
const controlAddRecipe= function(newRecipe){
console.log(newRecipe);
}

const init = function () {
  
  //render selected recipe
  addShowWindowHandler();
  addUploadRecipeHandler(controlAddRecipe);
  addHandlerRender(controlRecipe);
  
  controlLoadBookmarks();

  addChangeServingsHandler(controlServings);
   addBookmarkHandler(controlAddBookmark);

  // handling form
   addSearchHandler(controlSearchResults);

   addClickHandler(controlPagination,model.state.search);
  

   

};
init();