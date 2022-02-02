import './sass/main.scss';
import SimpleLightbox from 'simplelightbox'; //Галерея картинок
import 'simplelightbox/dist/simple-lightbox.min.css';
import GetRequesApi from './modules/GetRequestApi'; //Класс всех методов для работы с API
import { Notify } from 'notiflix/build/notiflix-notify-aio'; // Модуль уведомлений 
const axios = require('axios'); // Библиотека для работы с промисами
const uikit = require('uikit'); // 
const gallery = document.querySelector('.gallery');
import { renderHtml } from './modules/renderHtml'; // Рендер иображений
const searchForm = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');
const btnSerch = document.querySelector('.btn-serch');
const inputSerch = document.querySelector('.input-serch');
const galleryItem = document.querySelector('.gallery__item');


let countTotalPage = 1;
const getRequesApi = new GetRequesApi(); //Экземпляр класса

loadMore.style.display = 'none';

searchForm.addEventListener('submit', onSerch);
loadMore.addEventListener('click', onLoadMore);

function onSerch(e) {
  e.preventDefault();
  getRequesApi.query = e.target.searchQuery.value.trim();
  clearingHtml();
  getRequesApi.resetPage();
  if (getRequesApi.query === '') {
    Notify.warning('Нужно что-то найти');
    return;
  }

  getRequesApi.getRequesImg().then(response => {
    loadMore.style.display = 'none';
    // hidenBtn();
      console.log(response.totalHits)
      if(response.totalHits > 0){
        Notify.success(`Ура! Мы нашли изображения с общим количеством просмотров: ${response.totalHits}`);
      }
    countTotalPage += response.hits.length - 1;
    if (response.hits.length === 0) {
      Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      countTotalPage = 1;
    }
    loadMore.setAttribute('uk-spinner', 'true')
    
    renderHtml(response.hits);
    hidenBtn()
   
    loadMore.removeAttribute('uk-spinner')
    const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionPosition: 'bottom',
        captionClass: "center"
    });

  });
  
}

function onLoadMore() {
  if (!getRequesApi.serchQuery) {
    Notify.warning(`Строка поиска пуста, введи к примеру: "cat"...`);
    return;
  }
  getRequesApi.getRequesImg().then(response => {
    countTotalPage += response.hits.length;
    loadMore.setAttribute('uk-spinner', 'ratio:1')
    setTimeout(()=>{
        loadMore.style.display = 'none';
        renderHtml(response.hits);
        loadMore.style.display = 'block';
        loadMore.removeAttribute('uk-spinner')
        const lightbox = new SimpleLightbox('.gallery a', {
          captionDelay: 250,
          captionPosition: 'bottom',
          captionClass: "center"
      
      });
      lightbox.refresh();
    }, 500);
    
    
    if (countTotalPage >= response.totalHits) {
      loadMore.style.display = 'none';
      Notify.warning("We're sorry, but you've reached the end of search results.");
      setTimeout(() => {
        alert('Через 10 секунд страница будет перезагруженна');
        setTimeout(() => {
          location.reload();
        }, 10000);
      }, 2000);
    }

  });
}

function clearingHtml() {
  gallery.innerHTML = '';
}
function hidenBtn(){
    // loadMore.style.display = 'none';
    setTimeout(()=>{
        loadMore.style.display = 'block';
    }, 1000)
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
