import '@/components/restaurant-detail';
import RestaurantApiData from '@/data/restaurant-api-data';
// import BookmarkEvent from '@/utils/bookmark-event-init';

const RestaurantDetail = {
  async init(restaurantId, container) {
    this._container = container;
    this._restaurantId = restaurantId;

    this._RestaurantDetailElement = document.createElement('restaurant-detail');
    const restaurantData = await RestaurantApiData.getRestaurantDetail(this._restaurantId);
    this._RestaurantDetailElement.restaurant = restaurantData.restaurant;
    this._container.appendChild(this._RestaurantDetailElement);

    this._modal = document.querySelector('restaurant-detail');
    this._modalContent = this._modal.querySelector('.modal-content');
    this._modalCategory = this._modal.querySelector('.modal-category');
    this._modalMenu = this._modal.querySelector('.modal-menu');
    this._reviewForm = this._modal.querySelector('form#review-form');
    this._reviewContent = this._modal.querySelector('.modal-review');

    this._renderModalComponent();
  },

  _renderModalComponent() {
    const modalCategory = this._modalCategory;
    const reviewContent = this._reviewContent;
    modalCategory.innerHTML = this._RestaurantDetailElement.categories;
    reviewContent.innerHTML = this._RestaurantDetailElement.reviewList;
    this._renderMenuList();
  },

  _renderMenuList() {
    const foodListHtml = this._modalMenu.querySelector('.food');
    const drinkListHtml = this._modalMenu.querySelector('.drink');
    foodListHtml.innerHTML += this._RestaurantDetailElement.foods;
    drinkListHtml.innerHTML += this._RestaurantDetailElement.drinks;
  },
};

export default RestaurantDetail;
