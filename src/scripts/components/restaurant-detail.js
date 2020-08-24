import CONFIG from '@/global/config';
class RestaurantDetail extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this._restaurantReviews = this._restaurant.consumerReviews;
    this._restaurantCategories = this._restaurant.categories;
    this._restaurantMenu = this._restaurant.menus;
    this._render();
  }

  set reviews(reviews) {
    this._restaurantReviews = reviews;
  }

  get foods() {
    const foodList = this._restaurantMenu.foods;
    let foodListHtml = ``;
    foodList.forEach((food) => {
      foodListHtml +=
          `<p>${food.name}</p>`;
    });
    return foodListHtml;
  }

  get drinks() {
    const drinkList = this._restaurantMenu.drinks;
    let drinkListHtml = ``;
    drinkList.forEach((drink) => {
      drinkListHtml +=
          `<p>${drink.name}</p>`;
    });
    return drinkListHtml;
  }

  get categories() {
    const restaurantCategories = this._restaurantCategories;
    let categoryListHtml = ``;
    restaurantCategories.forEach((category) => {
      categoryListHtml +=
          `<p class="capsule">${category.name}</p>`;
    });
    return categoryListHtml;
  }

  get reviewList() {
    const restaurantReviews = this._restaurantReviews;
    let reviewListHtml = ``;
    restaurantReviews.forEach((review) => {
      reviewListHtml +=
          `<div class="review-container" id="123">
              <p class="name">${review.name}</p>
              <p class="review">${review.review}</p>
              <small class="guide"><i class="material-icons inherit mr1" aria-hidden="true">access_time</i>${review.date}</small>
          </div>`;
    });
    return reviewListHtml;
  }

  async _render() {
    const restaurant = this._restaurant;
    this.innerHTML =
      `<div class="hero teardrop">
          <img class="teardrop" src="${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}" alt="${restaurant.name}">
      </div>
      <div class="btn-group">
        <button tabindex="0" data-bookmark=${restaurant.id} aria-label="Add to bookmark" class="btn icon right"><span class="material-icons" aria-hidden="true">bookmark_border</span></button>
        <button tabindex="0" id="review-shortcut" aria-label="Add Review" class="btn primary icon"><span class="material-icons mr1" aria-hidden="true">comment</span>${restaurant.consumerReviews.length}</button>
      </div>
      <div class="restaurant-content" aria-label="${restaurant.name} Detail">
        <small class="guide">Press <b>B</b> to add to bookmark</small>
        <h3 class="restaurant-title">${restaurant.name}</h3>
        <div class="star">
            <span>${this._getStarRating(restaurant.rating)}</span>
            <p>${restaurant.rating}/5</p>
        </div>
        <a href="https://www.google.com/maps/search/${restaurant.address}" target="_blank" class="guide"><i class="material-icons inherit mr1" aria-hidden="true">place</i>${restaurant.address}, ${restaurant.city}</a>
        <p class="restaurant-description">${restaurant.description}.</p>
        <h3 class="restaurant-title">Kategori</h3>
        <div class="restaurant-category"></div>
        <h3 class="restaurant-title">Menu</h3>
        <div class="restaurant-menu">
          <div class="food">
            <p class="big-guide"><span class="material-icons mr1" aria-hidden="true">fastfood</span>Makanan</p>
          </div>
          <div class="drink">
            <p class="big-guide"><span class="material-icons mr1" aria-hidden="true">emoji_food_beverage</span>Minuman</p>
          </div>
        </div>
        <h3 class="restaurant-title">Review Pengunjung</h3>
        <div class="restaurant-review"></div>
    </div>
    <div class="restaurant-form">
    <h3 class="collabsible-title"><i class="material-icons mr1 ml2" aria-hidden="true">add_comment</i>Berikan Review</h3>
        <form id="review-form">
        <div class="form-input">
            <input type="text" id="name" name="name" placeholder="Nama" required>
            <textarea type="text" rows="1" id="review" name="review" placeholder="Tanggapan anda" required></textarea>
        </div>
            <button id="submit-review" class="btn teardrop dark full" type="submit"><i class="material-icons mr1" aria-hidden="true">send</i>Kirim </button>
        </form>
    </div>
      `;
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
customElements.define('restaurant-detail', RestaurantDetail);
