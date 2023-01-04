import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const getJSON= async function(url){
    try{
        const fetchPromise=Promise.race([fetch(url),timeout(TIMEOUT_SEC)]);

    const response = await fetchPromise;
    if(!response.ok){
      throw new Error("something went wrong ");
    }
    const responseData = await response.json();
 return responseData;
}catch(e){
  
    throw e;

}
}