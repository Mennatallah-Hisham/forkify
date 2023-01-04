
const window = document.querySelector('.add-recipe-window');
const overlay = document.querySelector(".overlay");
const btnOpen = document.querySelector(".nav__btn--add-recipe");
const btnClose = document.querySelector(".btn--close-modal");
const parent =document.querySelector(".upload");


export const addShowWindowHandler= function(){
    [btnClose,btnOpen].forEach(btn=>btn.addEventListener("click",function(){
        overlay.classList.toggle("hidden");
        window.classList.toggle("hidden");
    }))
  
}

export const addUploadRecipeHandler = function(handler){
    
    parent.addEventListener("submit",(e)=>{
        e.preventDefault();
        const dataArr =[...new FormData(parent)] ;
        const data = Object.fromEntries(dataArr);
       handler(data);
      
    })
    
}