import './sass/main.scss';
import  GetRequesApi  from './modules/GetRequestApi'; //Класс всех методов для работы с API
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const axios = require('axios');
const gallery = document.querySelector('.gallery')
import { renderHtml } from './modules/renderHtml';
const searchForm = document.querySelector('.search-form')
const loadMore = document.querySelector('.load-more')
const btnSerch = document.querySelector('.btn-serch')
let countTotalPage = 1;
const getRequesApi = new GetRequesApi() //Экземпляр класса
loadMore.style.display = 'none';
searchForm.addEventListener('submit', onSerch)
loadMore.addEventListener('click', onLoadMore)
function onSerch(e){
    e.preventDefault()
    // gallery.innerHtml = "";
    getRequesApi.query = e.target.searchQuery.value.trim()
    clearingHtml()
    getRequesApi.resetPage();
        if(getRequesApi.query === ''){
            Notify.warning("Нужно что-то найти");
            return
        }
        
        getRequesApi.getRequesImg().then((response)=>{

            countTotalPage += response.hits.length -1
            console.log(countTotalPage)
       if(response.hits.length === 0){
        Notify.warning("Sorry, there are no images matching your search query. Please try again.");
            countTotalPage = 1 
       }
      renderHtml(response.hits)
    
      })
      loadMore.style.display = 'block';
}

function onLoadMore(){
    if(!getRequesApi.serchQuery){
        Notify.warning(`Строка поиска пуста, введи к примеру: "cat"...`); 
        return
    }
    getRequesApi.getRequesImg().then((response)=>{
        console.log(response.hits)
        countTotalPage += response.hits.length
        console.log(countTotalPage)
        renderHtml(response.hits)
        if(countTotalPage >= response.totalHits){
        loadMore.style.display = 'none';
        Notify.warning("We're sorry, but you've reached the end of search results.");
        setTimeout(() => {
            alert('Через 10 секунд страница будет перезагруженна')
            setTimeout(()=>{
                location.reload()
            }, 10000)
        }, 2000);
       }

       console.log(response.totalHits);  
       console.log(getRequesApi.totalHits);  
       })
}

function clearingHtml(){
    gallery.innerHTML = "";
}
// function onLoadMore(){
//     getRequesApi.getRequesImg().then((response)=>{
//         if(response === 0){
//          Notify.success("Sorry, there are no images matching your search query. Please try again.");
//         }
// }
// getRequesImg()
// .then(console.log)
// Notify.success('Sol lucet omnibus');

