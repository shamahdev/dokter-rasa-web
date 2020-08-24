import CONFIG from '@/global/config';
import SlugParser from '@/routes/slugparser';

class RestaurantCard extends HTMLElement {
  set detailPage(page) {
    this._detailPage = page;
  }

  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this._detailPage = this._detailPage || 'restaurant';
    this._render();
  }

  _render() {
    const restaurant = this._restaurant;
    this.classList.add('card');
    this.innerHTML =
      `<img class="responsive" src="${CONFIG.BASE_IMAGE_URL}small/${restaurant.pictureId}" alt="${restaurant.name}, ${restaurant.city}">
       <div class="card-panel">
        <div class="card-text">
          <p class="city"><i class="material-icons inherit mr1" aria-hidden="true">place</i>${restaurant.city}</p>
          <h3>${restaurant.name}</h3>
          <div class="star">
            <span>${this._getStarRating(restaurant.rating)}</span>
            <p>${restaurant.rating}/5</p>
          </div>
          <p class="description">${restaurant.description.substring(0, 72)}</p>
        </div>
        <div class="btn-group">
          <button tabindex="0" data-bookmark=${restaurant.id} aria-label="Add to bookmark" class="btn rounded-top-left icon right"><span class="material-icons" aria-hidden="true">bookmark_border</span></button>
          <a tabindex="0" href="#/${this._detailPage}/${SlugParser.parseToSlug(restaurant.name)}" class="trigger btn primary side">Lihat detail</a>
        </div>
        </div>
      </div>`;
  }

  _getStarRating(rating) {
    let stars = ``;
    for (let i = 0; i < parseFloat(rating); i++) {
      if ((parseFloat(rating)) > i && i === (parseInt(rating))) {
        stars += `<i class="material-icons" aria-hidden="true">star_half</i>`;
      } else {
        stars += `<i class="material-icons" aria-hidden="true">star</i>`;
      }
    }
    return stars;
  }
}
customElements.define('restaurant-card', RestaurantCard);
