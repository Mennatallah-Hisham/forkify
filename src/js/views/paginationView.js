import icons from 'url:../../img/icons.svg';

const paginationContainer =document.querySelector(".pagination");


export const renderPagination= function(search){
 
    const currentPage= search.page;
    const numberOfPages =Math.ceil(search.results.length/search.resultsPerPage);
  let markUp ;
 
  // page 1 and there are  no other pages
  // current page no buttons
    if(currentPage===1 && numberOfPages < 2) return;

  //page  1 and there are other pages
  // next button  done

    if(currentPage===1 && numberOfPages>1){
       markUp=`

      <button class="btn--inline pagination__btn--next">
        <span>Page ${currentPage+1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    

    }

    

  //last page
  // prev button  done

  if(currentPage=== numberOfPages  && numberOfPages>1){
    markUp=`
    <button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage-1} </span>
  </button>
 `;

  }

  // page +1  
  // prev and next pages done

  if(currentPage>1 && currentPage<numberOfPages){

  markUp=`
    <button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage-1}</span>
  </button>
  <button class="btn--inline pagination__btn--next">
    <span>Page ${currentPage+1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;


  }
  paginationContainer.innerHTML="";
  paginationContainer.insertAdjacentHTML("afterbegin",markUp);

}


export const addClickHandler = function (handler, search){

// or add data-goTo to buttons
 paginationContainer.addEventListener("click",(e)=>{
    const btn =e.target.closest(".btn--inline");
    if(!btn) return;
  

if(btn.classList.contains("pagination__btn--prev")){

handler(search.page-1);
}
if(btn.classList.contains("pagination__btn--next")){

handler(search.page+1)
}
    })
}