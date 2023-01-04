import {async} from 'regenerator-runtime';
import { API_URL,RES_PER_PAGE } from './config';
import { getJSON } from './helpers';
export const state={
    recipe:{},
    search:{
      query:'',
      results:[],
      resultsPerPage:RES_PER_PAGE,
      page:1,
     
    },
   bookmarks:[]

};

export const loadRecipe = async function(id){
    try{
   
  const data= await  getJSON(`${API_URL}/${id}`);
      

        let recipe=data.data.recipe;
        state.recipe={
          id:recipe.id,
          title:recipe.title,
          publisher:recipe.publisher,
          sourceUrl:recipe.source_url,
          image:recipe.image_url,
          servings:recipe.servings,
          cookingTime:recipe.cooking_time,
          ingredients:recipe.ingredients,
    
    
    
        }
        
      if(state.bookmarks.some(bookmark=> bookmark.id===recipe.id)){
        state.recipe.bookmarked=true;

      }else{
        state.recipe.bookmarked=false;
      }


    }catch(e){
throw e;
    }
}

export const loadSearchResults =async function(query){
  try{

const data = await getJSON(`${API_URL}?search=${query}`);


const loadedRecipes=data.data.recipes;
state.search.query=query;
state.search.results=loadedRecipes.map(loadedRecipe => {
return {
  id:loadedRecipe.id,
  title:loadedRecipe.title,
  publisher:loadedRecipe.publisher,

  image:loadedRecipe.image_url,

}

});




  }catch(e){
    throw e
  }
}

export const getSearchResultsPage = function(page=state.search.page){
state.search.page=page;

  const start=(page-1)*state.search.resultsPerPage;
  const end=page *state.search.resultsPerPage;
  const arrSlice = state.search.results.slice(start,end);

return arrSlice;
}


export const updateServings = function(newServings){
  if(newServings<1) return;

  const oldServing =state.recipe.servings;
  state.recipe.ingredients.forEach(ing => {
    ing.quantity= (ing.quantity/oldServing)*newServings;
    
  });
  state.recipe.servings=newServings;


}

export const addBookmark = function(recipe){
state.bookmarks.push(recipe);


//mark the current recipe as bookmark
if(recipe.id===state.recipe.id){
  state.recipe.bookmarked = true;

}
saveBookMark();
}

export const deletBookmark = function (id){
const index=state.bookmarks.findIndex(bookmark=>bookmark.id===id);
  state.bookmarks.splice(index,1);
  if(id===state.recipe.id){
    state.recipe.bookmarked = false;
  }
  saveBookMark();
}

const saveBookMark = function(){
  if(!window.localStorage.bookmarks){
    window.localStorage.setItem("bookmarks",JSON.stringify(state.bookmarks));
  }else{
    window.localStorage.bookmarks=JSON.stringify(state.bookmarks);
  }
 

}

export const loadBookmarks=function(){
  if(!window.localStorage.bookmarks) return;
  state.bookmarks=JSON.parse(window.localStorage.getItem("bookmarks"));

}

export const uploadRecipe = async function(newRecipe){

  
}
