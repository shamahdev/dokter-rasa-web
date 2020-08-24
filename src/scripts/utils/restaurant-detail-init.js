import '@/components/restaurant-detail';
import UrlParser from '@/routes/urlparser';
import RestaurantApiData from '@/data/restaurant-api-data';
import BookmarkEvent from '@/utils/bookmark-event-init';

const RestaurantDetail = {
  async init(restaurantId, container) {
    this._container = container;
    this._restaurantId = restaurantId;

    this._RestaurantDetailElement = document.createElement('restaurant-detail');
    await this._initRestaurantDetailElement();

    this._restaurantDetail = document.querySelector('restaurant-detail');
    this._restaurantContent = this._restaurantDetail.querySelector('.restaurant-content');
    this._restaurantCategory = this._restaurantDetail.querySelector('.restaurant-category');
    this._restaurantMenu = this._restaurantDetail.querySelector('.restaurant-menu');
    this._bookmarkButton = this._restaurantDetail.querySelector(`button[data-bookmark="${this._restaurantId}"]`);
    this._reviewShortcutButton = this._restaurantDetail.querySelector('button#review-shortcut');
    this._reviewForm = this._restaurantDetail.querySelector('form#review-form');
    this._reviewContent = this._restaurantDetail.querySelector('.restaurant-review');

    this._renderDetailComponent();
    this._createEvent();
  },

  async _initRestaurantDetailElement() {
    const restaurantDetailElement = this._RestaurantDetailElement;
    const restaurantData = await RestaurantApiData.getRestaurantDetail(this._restaurantId);
    if (JSON.stringify(restaurantData) === '{}') {
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      this._container.innerHTML =
        `<div class="msg-group">
          <p class="center mh-auto"><span class="material-icons mr1" aria-hidden="true">wifi_off</span>Detail Restoran tidak dapat di tampilkan. Periksa kembali internet anda :)</p>
          <a tabindex="0" href="#/restaurant/${url.slug}" class="btn primary rounded center mh-auto">Refresh</a>
        </div>`;
    } else {
      restaurantDetailElement.restaurant = restaurantData.restaurant;
      this._container.appendChild(restaurantDetailElement);
    }
  },

  _renderDetailComponent() {
    const restaurantCategory = this._restaurantCategory;
    const reviewContent = this._reviewContent;
    restaurantCategory.innerHTML = this._RestaurantDetailElement.categories;
    reviewContent.innerHTML = this._RestaurantDetailElement.reviewList;
    this._renderMenuList();
  },

  _renderMenuList() {
    const foodListHtml = this._restaurantMenu.querySelector('.food');
    const drinkListHtml = this._restaurantMenu.querySelector('.drink');
    foodListHtml.innerHTML += this._RestaurantDetailElement.foods;
    drinkListHtml.innerHTML += this._RestaurantDetailElement.drinks;
  },

  async _createEvent() {
    const reviewShortcutButton = this._reviewShortcutButton;
    const bookmarkButton = this._bookmarkButton;
    await BookmarkEvent.init(bookmarkButton);
    this._initReviewForm();

    document.addEventListener('keyup', this._keyEvent.bind(this));
    reviewShortcutButton.addEventListener('click', (event) => {
      event.stopPropagation();
      document.body.scrollTop = document.body.scrollHeight;
      document.documentElement.scrollTop = document.documentElement.scrollHeight;
      this._reviewForm.querySelector('input#name').focus();
    });
  },

  _keyEvent(event) {
    const bookmarkButton = this._bookmarkButton;
    if (event.keyCode === 66) {
      if (!(document.activeElement.hasAttribute('required'))) {
        bookmarkButton.click();
      }
    }
    event.preventDefault();
  },

  async _initReviewForm() {
    const reviewForm = this._reviewForm;
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const nameInput = reviewForm.querySelector('input#name');
      const reviewInput = reviewForm.querySelector('textarea#review');
      const reviewData = {
        id: this._restaurantId,
        name: nameInput.value,
        review: reviewInput.value,
      };

      const updatedReview = await RestaurantApiData.addReview(reviewData);
      console.log(updatedReview);
      reviewForm.reset();
      this._resyncReview(updatedReview.customerReviews);
    });
  },

  _resyncReview(review) {
    console.log('Review re-sync complete.');
    const reviewContent = this._reviewContent;
    const RestaurantDetailElement = this._RestaurantDetailElement;
    RestaurantDetailElement.reviews = review;
    reviewContent.innerHTML = RestaurantDetailElement.reviewList;
  },
};

export default RestaurantDetail;
