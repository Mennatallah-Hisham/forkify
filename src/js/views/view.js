import icons from 'url:../../img/icons.svg';


export const renderError = function(parentEl,msg="we couldn't find that recipe, please try another one"){
    const markUp=`
    <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${msg}</p>
            </div>`
      

  parentEl.insertAdjacentHTML("afterbegin",markUp)   ;

  }

  
  export const renderMessage =function(parentEl,msg=""){
    const markUp=`
    <div class="message">
            <div>
              <svg>
                <use href="${icons}.svg#icon-smile"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>`;
      
          parentEl.insertAdjacentHTML("afterbegin",markUp)   ;

  }

  export const renderSpinner = function(parentEl){
    const markup=`
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `

parentEl.insertAdjacentHTML("afterbegin",markup);
  
  }