import './sass/main.scss';
import SimpleLightbox from 'simplelightbox'; //Галерея картинок
import 'simplelightbox/dist/simple-lightbox.min.css';
import GetRequesApi from './modules/GetRequestApi'; //Класс всех методов для работы с API
import { Notify } from 'notiflix/build/notiflix-notify-aio'; // Модуль уведомлений 
const axios = require('axios'); // Бтблиотека для работы с промисами
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
  // gallery.innerHtml = "";
  getRequesApi.query = e.target.searchQuery.value.trim();
  clearingHtml();
  getRequesApi.resetPage();
  if (getRequesApi.query === '') {
    Notify.warning('Нужно что-то найти');
    return;
  }

  getRequesApi.getRequesImg().then(response => {
    Notify.success(`Ура! Мы нашли изображения с общим количеством просмотров: ${response.totalHits}`);
    countTotalPage += response.hits.length - 1;
    console.log(response.hits);
    if (response.hits.length === 0) {
      Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      countTotalPage = 1;
    }
    renderHtml(response.hits);
    const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionPosition: 'bottom',
        captionClass: "center"
    
    });

  });
  loadMore.style.display = 'block';
}

function onLoadMore() {
  if (!getRequesApi.serchQuery) {
    Notify.warning(`Строка поиска пуста, введи к примеру: "cat"...`);
    return;
  }
  getRequesApi.getRequesImg().then(response => {
    console.log(response.hits);
    countTotalPage += response.hits.length;
    console.log(countTotalPage);
    console.log(response.totalHits);
    renderHtml(response.hits);
    
    const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionPosition: 'bottom',
        captionClass: "center"
    
    });
    lightbox.refresh();
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

    console.log(response.totalHits);
    console.log(getRequesApi.totalHits);
  });
}

function clearingHtml() {
  gallery.innerHTML = '';
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
