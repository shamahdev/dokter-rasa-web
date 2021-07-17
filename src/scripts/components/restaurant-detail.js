import CONFIG from '@/global/config'
class RestaurantDetail extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant
    this._restaurantReviews = this._restaurant.customerReviews
    this._restaurantCategories = this._restaurant.categories
    this._restaurantMenu = this._restaurant.menus
    this._render()
  }

  set reviews(reviews) {
    this._restaurantReviews = reviews
  }

  get foods() {
    const foodList = this._restaurantMenu.foods
    let foodListHtml = ``
    foodList.forEach((food) => {
      foodListHtml +=
          `<p>${food.name}</p>`
    })
    return foodListHtml
  }

  get drinks() {
    const drinkList = this._restaurantMenu.drinks
    let drinkListHtml = ``
    drinkList.forEach((drink) => {
      drinkListHtml +=
          `<p>${drink.name}</p>`
    })
    return drinkListHtml
  }

  get categories() {
    const restaurantCategories = this._restaurantCategories
    let categoryListHtml = ``
    restaurantCategories.forEach((category) => {
      categoryListHtml +=
          `<p class="capsule">${category.name}</p>`
    })
    return categoryListHtml
  }

  get reviewList() {
    const restaurantReviews = this._restaurantReviews
    let reviewListHtml = ``
    restaurantReviews.forEach((review) => {
      reviewListHtml +=
          `<div class="review-container" id="123">
              <p class="name">${review.name}</p>
              <p class="review">${review.review}</p>
              <small class="guide"><i class="material-icons inherit mr1" aria-hidden="true">access_time</i>${review.date}</small>
          </div>`
    })
    return reviewListHtml
  }

  async _render() {
    const restaurant = this._restaurant
    this.innerHTML =
      `<div class="hero teardrop">
          <img class="teardrop lazyload" src="./images/fallback.jpg" data-src="${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId}" alt="${restaurant.name}"
               srcset="${CONFIG.BASE_IMAGE_URL}small/${restaurant.pictureId} 480w, ${CONFIG.BASE_IMAGE_URL}medium/${restaurant.pictureId} 800w"
               sizes="(max-width: 600px) 480px, 800px"
          >
      </div>
      <div class="btn-group">
        <button tabindex="0" data-bookmark=${restaurant.id} aria-label="Add to bookmark" class="btn icon right"><span class="material-icons" aria-hidden="true">bookmark_border</span></button>
        <button tabindex="0" id="review-shortcut" aria-label="Add Review" class="btn primary icon"><span class="material-icons mr1" aria-hidden="true">comment</span>${restaurant.customerReviews.length}</button>
      </div>
      <div class="restaurant-content" aria-label="${restaurant.name} Detail">
        <small class="guide">Press <b>B</b> to add to bookmark</small>
        <h2 class="restaurant-title">${restaurant.name}</h2>
        <div class="star">
            <span>${this._getStarRating(restaurant.rating)}</span>
            <p>${restaurant.rating}/5</p>
        </div>
        <a href="https://www.google.com/maps/search/${restaurant.address}" rel="noreferrer" target="_blank" class="guide"><i class="material-icons inherit mr1" aria-hidden="true">place</i>${restaurant.address}, ${restaurant.city}</a>
        <p class="restaurant-description">${restaurant.description}.</p>
        <h2 class="restaurant-title">Kategori</h2>
        <div class="restaurant-category"></div>
        <h2 class="restaurant-title">Menu</h2>
        <div class="restaurant-menu">
          <div class="food">
            <h3 class="big-guide"><span class="material-icons mr1" aria-hidden="true">fastfood</span>Makanan</h3>
          </div>
          <div class="drink">
            <h3 class="big-guide"><span class="material-icons mr1" aria-hidden="true">emoji_food_beverage</span>Minuman</h3>
          </div>
        </div>
        <h2 class="restaurant-title">Review Pengunjung</h2>
        <div class="restaurant-review"></div>
    </div>
    <div class="restaurant-form">
    <h2 class="collabsible-title"><i class="material-icons mr1 ml2" aria-hidden="true">add_comment</i>Berikan Review</h2>
        <form id="review-form">
        <div class="form-input">
            <input aria-label="Name" type="text" id="name" name="name" placeholder="Nama" required>
            <textarea aria-label="Your review" type="text" rows="1" id="review" name="review" placeholder="Tanggapan anda" required></textarea>
        </div>
            <button id="submit-review" class="btn teardrop dark full" type="submit"><i class="material-icons mr1" aria-hidden="true">send</i>Kirim </button>
        </form>
    </div>
      `
  }

  _getStarRating(rating) {
    let stars = ``
    for (let i = 0; i < parseFloat(rating); i++) {
      if ((parseFloat(rating)) > i && i === (parseInt(rating))) {
        stars += `<i class="material-icons" aria-hidden="true">star_half</i>`
      } else {
        stars += `<i class="material-icons" aria-hidden="true">star</i>`
      }
    }
    return stars
  }
}
customElements.define('restaurant-detail', RestaurantDetail)
