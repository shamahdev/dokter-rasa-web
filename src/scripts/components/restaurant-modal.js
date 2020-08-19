class RestaurantModal extends HTMLElement {
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
    this.setAttribute('role', 'dialog');
    this.classList.add('modal');
    this.id = restaurant.id;
    this.innerHTML =
        `<div class="modal-body">
            <div class="btn-group">
                <button tabindex="0" data-bookmark="${restaurant.id}"aria-label="Add to bookmark" class="btn bookmark-button icon side right">
                    <span class="material-icons" aria-hidden="true" >bookmark_border</span>
                </button>
                <button tabindex="0" aria-label="Close modal" class="btn close-button primary side icon">
                    <span class="material-icons" aria-hidden="true" >close</span>
                </button>
            </div>
            <div class="modal-content" tabindex="0" aria-label="${restaurant.name} Detail">
                <small class="guide">Press B to add to bookmark</small>
                <h3 class="modal-title">${restaurant.name}</h3>
                <div class="star">
                    <span>${this._getStarRating(restaurant.rating)}</span>
                    <p>${restaurant.rating}/5</p>
                </div>
                <small class="guide"><i class="material-icons inherit mr1" aria-hidden="true">place</i>${restaurant.address}, ${restaurant.city}</small>
                <p class="modal-description">${restaurant.description.substring(0, 128)}.</p>
                <h3 class="modal-title">Kategori</h3>
                <div class="modal-category"></div>
                <h3 class="modal-title">Menu</h3>
                <div class="modal-menu">
                  <div class="food">
                    <p class="big-guide"><span class="material-icons mr1" aria-hidden="true">fastfood</span>Makanan</p>
                  </div>
                  <div class="drink">
                    <p class="big-guide"><span class="material-icons mr1" aria-hidden="true">emoji_food_beverage</span>Minuman</p>
                  </div>
                </div>
                <p>
                <h3 class="modal-title">Review Pengunjung</h3>
                <div class="modal-review"></div>
            </div>
            <div class="modal-form">
                <div class="btn-group">
                    <h3 class="collabsible-title"><i class="material-icons mr1 ml2" aria-hidden="true">add_comment</i>Berikan Review</h3>
                    <button tabindex="0" id="review-collapse" aria-label="Open Review tab" class="btn primary side icon">
                        <span class="material-icons" aria-hidden="true">keyboard_arrow_up</span>
                    </button>
                </div>
                <form id="review-form">
                <div class="form-input">
                    <input type="text" id="name" name="name" placeholder="Nama" required>
                    <textarea type="text" rows="1" id="review" name="review" placeholder="Tanggapan anda" required></textarea>
                </div>
                    <button id="submit-review" class="btn dark full" type="submit"><i class="material-icons mr1" aria-hidden="true">send</i>Kirim </button>
                </form>
            </div>
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
customElements.define('restaurant-modal', RestaurantModal);
