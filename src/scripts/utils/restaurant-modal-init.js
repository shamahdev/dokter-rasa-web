import '@/components/restaurant-modal';
import RestaurantApiData from '@/data/restaurant-api-data';
import RestaurantBookmark from '@/data/restaurant-bookmark-idb';
import BookmarkEvent from '@/utils/bookmark-event-init';

const ModalInitiator = {
  async init(restaurantId, getFromBookmark = false) {
    this._body = document.querySelector('body');
    this._restaurantId = restaurantId;
    this._getFromBookmark = getFromBookmark;

    this._RestaurantModalElement = document.createElement('restaurant-modal');
    this._RestaurantModalElement.restaurant = await this._getData();
    this._body.appendChild(this._RestaurantModalElement);

    // Modal
    this._modal = document.getElementById(this._restaurantId);
    this._allFocusableElement = this._modal.querySelectorAll('button, a, .modal-content');
    this._bookmarkButton = this._modal.querySelector(`button[data-bookmark="${this._modal.id}"]`);
    this._closeButton = this._modal.querySelector('button.close-button');
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
    modalCategory.innerHTML = this._RestaurantModalElement.categories;
    reviewContent.innerHTML = this._RestaurantModalElement.reviewList;
    this._renderMenuList();
    this._createEvent();
  },

  _renderMenuList() {
    const foodListHtml = this._modalMenu.querySelector('.food');
    const drinkListHtml = this._modalMenu.querySelector('.drink');

    foodListHtml.innerHTML += this._RestaurantModalElement.foods;
    drinkListHtml.innerHTML += this._RestaurantModalElement.drinks;
  },

  _resyncReview(review) {
    console.log('Review re-sync complete.');
    const reviewContent = this._reviewContent;
    const RestaurantModalElement = this._RestaurantModalElement;
    RestaurantModalElement.reviews = review;
    reviewContent.innerHTML = RestaurantModalElement.reviewList;
  },

  async _getData() {
    let restaurantData = '';
    if (this._getFromBookmark) {
      restaurantData = await RestaurantBookmark.getBookmark(this._restaurantId);
      console.log('Data is collected from IndexedDB.');
    } else {
      restaurantData = await RestaurantApiData.getRestaurantDetail(this._restaurantId);
      restaurantData = restaurantData.restaurant;
    }
    return restaurantData;
  },

  async _createEvent() {
    this._toggleModal();
    const bookmarkButton = this._bookmarkButton;
    const closeButton = this._closeButton;

    await BookmarkEvent.init(bookmarkButton);
    this._initReviewForm();

    document.addEventListener('keyup', this._keyEvent.bind(this));
    closeButton.addEventListener('click', this._closeModal.bind(this));
    bookmarkButton.addEventListener('click', this._closeModal.bind(this));
  },

  async _initReviewForm() {
    const modalForm = this._modal.querySelector('.modal-form');
    const reviewForm = this._reviewForm;
    const collapseToggler = this._modal.querySelector('#review-collapse');
    const iconToggler = collapseToggler.querySelector('span');

    const getCollapseIcon = () => {
      return (modalForm.classList.contains('collapse') ? 'keyboard_arrow_down' : 'keyboard_arrow_up');
    };

    collapseToggler.addEventListener('click', (event) => {
      event.stopPropagation();
      modalForm.classList.toggle('collapse');
      iconToggler.innerHTML = getCollapseIcon();
    });

    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const nameInput = reviewForm.querySelector('input#name');
      const reviewInput = reviewForm.querySelector('textarea#review');
      const reviewData = {
        id: this._modal.id,
        name: nameInput.value,
        review: reviewInput.value,
      };

      const updatedReview = await RestaurantApiData.addReview(reviewData);
      reviewForm.reset();
      this._resyncReview(updatedReview.customerReviews);
    });
  },

  _keyEvent(event) {
    const modal = this._modal;
    const allFocusableElement = this._allFocusableElement;
    const bookmarkButton = this._bookmarkButton;
    const trapButton = document.querySelector('to-top button');
    if (modal.id) {
      if (event.keyCode === 27) {
        this._closeModal();
      } else if (event.keyCode === 66) {
        bookmarkButton.click();
      } else if (event.keyCode === 9 ) {
        // Shift + Tab
        if (event.shiftKey) {
          if (event.target === trapButton) {
            allFocusableElement[0].focus();
          } else if (event.target === allFocusableElement[allFocusableElement.length - 3]) {
            const collapseToggler = modal.querySelector('#review-collapse');
            collapseToggler.click();
          }
        // Tab
        } else {
          if (event.target === allFocusableElement[allFocusableElement.length - 2]) {
            const collapseToggler = modal.querySelector('#review-collapse');
            collapseToggler.click();
          }
        }
      }
    }
    event.preventDefault();
  },

  _toggleModal() {
    const body = this._body;
    const modal = this._modal;
    const bookmarkBtn = this._bookmarkButton;
    body.classList.toggle('opened-modal');
    modal.classList.toggle('show-modal');

    setTimeout(() => {
      bookmarkBtn.focus();
    }, 200);
  },

  _closeModal() {
    const body = document.querySelector('body');
    const modal = this._modal;
    body.classList.remove('opened-modal');
    modal.classList.remove('show-modal');

    // Remove event listener
    document.removeEventListener('keyup', this._keyEvent.bind(this));

    setTimeout(async () => {
      await document.querySelector(`button[data-modal="${modal.id}"]`).focus();
      modal.remove();
    }, 300);
  },


};
export default ModalInitiator;
