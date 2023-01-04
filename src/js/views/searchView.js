

const searchBtn = document.querySelector(".search__btn");
const searchInput = document.querySelector(".search__field");

export const getQuery = function(){
    return searchInput.value;

}

export const addSearchHandler = function(search){
    searchBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        search();
        searchInput.value="";
    });

}