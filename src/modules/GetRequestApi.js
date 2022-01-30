const axios = require('axios');
export default class GetRequestApi {
    constructor(){
      this.serchQuery = '';
      this.page = 1;
      this.totalHits = 1;
    }
    async getRequesImg(){
        try {
                const response = await axios.get('https://pixabay.com/api/',{
                    params: {
                        key : '25390928-06f59bddd078a5230b482801c',
                        q: this.serchQuery,
                        image_type: 'photo',
                        orientation: 'horizontal',
                        safesearch: true,
                        page: this.page,
                        per_page: 40,
                        
                      }
                    })
                    
                    console.log(this)
                    this.incrementPage()
                    // console.log(response.data)
                    this.totalHits = response.data.totalHits
                    return response.data

              } catch (error) {
                console.error(error);
              }
    }
    incrementPage(){
      this.page += 1;
    }
    resetPage(){
      this.page = 1;
    }
    get query(){
      return this.serchQuery
    }
    set query(newQuery){
     this.serchQuery = newQuery;
    }
   
    // get totalHits(){
    //   return this.totalHits;
    // }
    // set totalHits(newQuery){
    //  this.totalHits = newQuery;
    // }
   
}
// export async function getRequesImg(request){
// try {
//     const response = await axios.get('https://pixabay.com/api/',{
//         params: {
//             key : '25390928-06f59bddd078a5230b482801c',
//             q: request,
//             image_type: 'photo',
//             orientation: 'horizontal',
//             safesearch: true,
//           }
//         })
//         return response.data.hits
//   } catch (error) {
//     console.error(error);
//   }


// }

// export const getRequesImg = (reques) => {
//     const url = 'https://pixabay.com/api/?'
//     const serchParams = new URLSearchParams(
//         {
//             key: '25390928-06f59bddd078a5230b482801c',
//             q: 'dog',
//             image_type: 'photo',
//             orientation: 'horizontal',
//             safesearch: true,
//         }
//     )
//     console.log(serchParams.toString())
//     return fetch(url+serchParams)
//     .then(response => response.json())
// }