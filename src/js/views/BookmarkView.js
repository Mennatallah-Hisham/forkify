import icons from 'url:../../img/icons.svg';
const bookmarksContainer = document.querySelector(".bookmarks__list");

/**
 * 
 * @param {object | object[]} bookmarks  the data to be rendered(recipes)
 */
export const renderBookmarks= function(bookmarks){
  
    let markUp
 if(bookmarks.length===0){
    markUp=`<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
      No bookmarks yet. Find a nice recipe and bookmark it :)
    </p>
  </div>`
 }else{
    markUp= bookmarks.map(recipe=>`
    <li class="preview">
<a class="preview__link" href="#${recipe.id}">
  <figure class="preview__fig">
    <img src="${recipe.image}" alt="Test" />
  </figure>
  <div class="preview__data">
    <h4 class="preview__name">
    ${recipe.title}
    </h4>
    <p class="preview__publisher">${recipe.publisher}</p>
  </div>
</a>
</li>
    `).join(" ");

 }
  

 bookmarksContainer.innerHTML=" ";
     bookmarksContainer.insertAdjacentHTML("afterbegin",markUp);
}