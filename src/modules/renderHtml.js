export const renderHtml = (dataObj) =>{
    const gallery = document.querySelector('.gallery');
    const markup = dataObj.map((elem,index)=>{
        return `<div class="photo-card">
        <div class="img_box">
            <img class="imgLink"src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy" />
        </div>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${elem.likes}</b>
            <b>id: ${index +1}</b>
          </p>
          <p class="info-item">
            <b>Views: ${elem.views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${elem.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads:${elem.downloads}</b>
          </p>
        </div>
      </div>`
    }).join('')
    gallery.insertAdjacentHTML('beforeend',markup)
 
}