import RestaurantDataSource from '@/data/data';
import RestaurantBookmark from '@/data/restaurant-idb';
import BookmarkBtnInitiator from '@/utils/bookmark-button-initiator';

const Modal = {
  async init(restaurantId, getFromBookmark = false) {
    this._getFromBookmark = getFromBookmark;
    this._restaurantId = restaurantId;
    const body = document.querySelector('body');
    const restaurantDetail = await this._getData();

    body.appendChild(await this._render(restaurantDetail));

    setTimeout(() => {
      this._afterRender(restaurantDetail);
    }, 100);
  },

  async _getData() {
    let restaurantData = '';
    if (this._getFromBookmark) {
      restaurantData = await RestaurantBookmark.getBookmark(this._restaurantId);
      console.warn('Data is collected from IndexedDB.');
    } else {
      restaurantData = await RestaurantDataSource.detail(this._restaurantId);
      restaurantData = restaurantData.restaurant;
    }
    return restaurantData;
  },

  _render(restaurant) {
    const modalHtml = document.createElement('div');
    modalHtml.classList.add('modal');
    modalHtml.id = restaurant.id;
    modalHtml.setAttribute('role', 'dialog');

    modalHtml.innerHTML =`
            <div class="modal-body">
                <div class="btn-group">
                    <button tabindex="0" data-bookmark="${restaurant.id}"aria-label="Add to bookmark" class="btn bookmark-button icon side right"><i
                            class="material-icons">bookmark_border</i></button>
                    <button tabindex="0" aria-label="Close modal" class="btn close-button primary side icon"><i
                            class="material-icons">close</i></button>
                </div>
                <div class="modal-content">
                    <small class="guide">Press F to add to bookmark</small>
                    <h3 class="modal-title">${restaurant.name}</h3>
                    <div class="star">
                        <span>${this._getStars(restaurant.rating)}</span>
                        <p>${restaurant.rating}/5</p>
                    </div>
                    <small class="guide"><i class="material-icons inherit mr1" aria-hidden="true">place</i>${restaurant.address}, ${restaurant.city}</small>
                    <p class="modal-description">${restaurant.description.substring(0, 125)}</p>
                    <h3 class="modal-title">Kategori</h3>
                    <p class="modal-description">${restaurant.categories}</p>
                    <h3 class="modal-title">Menu</h3>
                    <div id="restaurantMenu">
                    <i class="material-icons" aria-hidden="true">fastfood</i>
                    <i class="material-icons" aria-hidden="true">emoji_food_beverage</i>
                    </div>
                    <p>
                    <h3 class="modal-title">Review Pengunjung</h3>
                    <div class="modal-review">
                        <loading-spinner/>
                    </div>
                </div>
                <div class="modal-form">
                    <div class="btn-group">
                        <h3 class="collabsible-title"><i class="material-icons mr1 ml2" aria-hidden="true">add_comment</i>Berikan Tanggapan</h3>
                        <button tabindex="0" id="review-collapse" aria-label="Open Review tab" class="btn close-button primary side icon">
                            <i class="material-icons" aria-hidden="true">keyboard_arrow_up</i>
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
    return modalHtml;
  },

  async _renderReview(reviewContent, reviews) {
    reviewContent.innerHTML = ``;
    reviews.forEach((review) => {
      reviewContent.innerHTML += `
            <div class="review-container" id="123">
                <p class="name">${review.name}</p>
                <p class="review">${review.review}</p>
                <small class="guide"><i class="material-icons inherit mr1" aria-hidden="true">access_time</i>${review.date}</small>
            </div>
            `;
    });
  },

  _getStars(rating) {
    let stars = ``;
    for (let i = 0; i < parseFloat(rating); i++) {
      if ((parseFloat(rating)) > i && i === (parseInt(rating))) {
        stars += `<i class="material-icons">star_half</i>`;
      } else {
        stars += `<i class="material-icons">star</i>`;
      }
    }
    return stars;
  },

  async _afterRender(restaurant) {
    const modal = document.getElementById(restaurant.id);
    const reviewContent = modal.querySelector('.modal-review');
    const allModalButtons = modal.querySelectorAll('button, a');
    const reviewForm = modal.querySelector('form#review-form');
    const closeButton = modal.querySelector('.close-button');
    const bookmarkButton = modal.querySelector(`button[data-bookmark="${modal.id}"]`);
    const notModalButtons = document.querySelectorAll('li a, a, button:not(.close-button):not(.bookmark-button):not(#review-collapse):not(#submit-review)');

    await this._renderReview(reviewContent, restaurant.consumerReviews);
    await BookmarkBtnInitiator.init(bookmarkButton);
    await this._initReviewForm(modal, reviewForm, reviewContent);

    this._toggleModal(modal, notModalButtons);
    closeButton.focus();

    document.addEventListener('keyup', (event) => {
      event.stopPropagation();
      this._keyEvent(event, modal, notModalButtons, bookmarkButton, allModalButtons);
    });
    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      this._closeModal(modal, notModalButtons, bookmarkButton);
    });
  },

  async _initReviewForm(modal, form, content) {
    const modalForm = modal.querySelector('.modal-form');
    const collapseToggler = modal.querySelector('#review-collapse');
    const iconToggler = collapseToggler.querySelector('i');

    const getCollapseIcon = () => {
      if (modalForm.classList.contains('collapse')) {
        return 'keyboard_arrow_down';
      } else {
        return 'keyboard_arrow_up';
      }
    };

    collapseToggler.addEventListener('click', (event) => {
      event.stopPropagation();
      modalForm.classList.toggle('collapse');
      iconToggler.innerHTML = getCollapseIcon();
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const nameInput = form.querySelector('input#name');
      const reviewInput = form.querySelector('textarea#review');
      const reviewData = {
        id: modal.id,
        name: nameInput.value,
        review: reviewInput.value,
      };

      const updatedReview = await RestaurantDataSource.review(reviewData);
      form.reset();
      this._renderReview(content, updatedReview.customerReviews);
    });
  },

  _keyEvent(event, modal, notModalButtons, bookmarkButton, allModalButtons) {
    if (modal.id) {
      if (event.keyCode === 27) {
        this._closeModal(modal, notModalButtons);
        modal = null;
      }
      if (event.keyCode === 70) {
        BookmarkBtnInitiator._renderButton(bookmarkButton);
      }
      if (event.keyCode === 9) {
        if (event.target === allModalButtons[allModalButtons.length - 2]) {
          const collapseToggler = modal.querySelector('#review-collapse');
          collapseToggler.click();
        }
      }
    }
  },

  _toggleModal(modal, notModalButtons) {
    const body = document.querySelector('body');
    body.classList.toggle('opened2');
    modal.classList.toggle('show-modal');

    notModalButtons.forEach((element) => {
      element.tabIndex = '-1';
    });
  },

  _closeModal(modal, notModalButtons) {
    const body = document.querySelector('body');
    body.classList.remove('opened2');
    modal.classList.remove('show-modal');
    notModalButtons.forEach((element) => {
      element.tabIndex = '0';
    });

    setTimeout(async () => {
      await document.querySelector(`button[data-modal="${modal.id}"]`).focus();
      modal.remove();
    }, 300);
  },


};
export default Modal;
