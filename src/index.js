import './sass/main.scss';
import  GetRequesApi  from './modules/GetRequestApi'; //Класс всех методов для работы с API
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const axios = require('axios');
const gallery = document.querySelector('.gallery')
import { renderHtml } from './modules/renderHtml';
const searchForm = document.querySelector('.search-form')
const loadMore = document.querySelector('.load-more')
const btnSerch = document.querySelector('.btn-serch')

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
            console.log(response)
       if(response === 0){
        Notify.warning("Sorry, there are no images matching your search query. Please try again.");
       }
      renderHtml(response)
    
      })
      loadMore.style.display = 'block';
}

function onLoadMore(){
    if(!getRequesApi.serchQuery){
        Notify.warning(`Строка поиска пуста, введи к примеру: "cat"...`); 
        return
    }
    getRequesApi.getRequesImg().then((response)=>{
      
       renderHtml(response)
       Notify.success(`Найдено: ${response.length} картинок`);  
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

