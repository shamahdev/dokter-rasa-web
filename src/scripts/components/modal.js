import RestaurantDataSource from "@/data/data";
import BookmarkBtnInitiator from "@/utils/bookmark-button-initiator";

const Modal = {
    async init(restaurantId) {
        const body = document.querySelector("body");
        const restaurantDetail = await RestaurantDataSource.detail(restaurantId);
        body.appendChild(this._render(restaurantDetail.restaurant));

        setTimeout(() => {
            this._afterRender(restaurantDetail.restaurant);
        }, 100);
    },

    _render(restaurant) {
        const modalHtml = document.createElement("div");
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
                    <small class="guide">${restaurant.address}, ${restaurant.city}</small>
                    <p class="modal-description">${restaurant.description.substring(0,125)}</p>
                    <h3 class="modal-title">Review Pengunjung</h3>
                    <div class="modal-review">
                        <loading-spinner/>
                    </div>
                </div>
                <div class="modal-form">
                    <h3 class="modal-title">Berikan Tanggapan</h3>
                    <form id="review-form">
                    <div class="form-input">
                        <input type="text" id="name" name="name" placeholder="Nama" required>
                        <textarea type="text" rows="1" id="review" name="review" placeholder="Tanggapan anda" required></textarea>
                    </div>
                        <button class="btn dark full" type="submit"><i class="material-icons" aria-hidden="true">send</i></button>
                    </form>
                </div>
            </div>
        `
        return modalHtml;
    },

    async _renderReview(reviewContent, reviews) {
        reviewContent.innerHTML = ``;
        reviews.forEach(review => {
            reviewContent.innerHTML += `
            <div class="review-container" id="123">
                <p class="name">${review.name}</p>
                <p class="review">${review.review}</p>
            </div>
            `
        });
    },

    _getStars(rating){
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
        const reviewForm = modal.querySelector("form#review-form");
        const closeButton = modal.querySelector(".close-button");
        const bookmarkButton = modal.querySelector(`button[data-bookmark="${modal.id}"]`);
        const notModalButtons = document.querySelectorAll("li a, a, button:not(.close-button):not(.bookmark-button)");
        
        await this._renderReview(reviewContent, restaurant.consumerReviews);

        await BookmarkBtnInitiator.init(bookmarkButton);

        reviewForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const nameInput = reviewForm.querySelector("input#name");
            const reviewInput = reviewForm.querySelector("textarea#review");
            const reviewData = {
                id: modal.id,
                name: nameInput.value,
                review: reviewInput.value
            };

            const updatedReview = await RestaurantDataSource.review(reviewData);
            reviewForm.reset();
            this._renderReview(reviewContent, updatedReview.customerReviews);
        })

        this._toggleModal(modal, notModalButtons);
        closeButton.focus();

        document.addEventListener("keyup", event => {
            event.stopPropagation();
            this._keyEvent(event, modal, notModalButtons, bookmarkButton);
        });
        closeButton.addEventListener("click", event => {
            event.stopPropagation();
            this._closeModal(modal, notModalButtons, bookmarkButton);
        })
    },

    _keyEvent(event, modal, notModalButtons, bookmarkButton) {
        if (event.keyCode === 27) {
            this._closeModal(modal, notModalButtons);
        } else if (event.keyCode === 70) {
            bookmarkButton.click();
        }
    },

    _toggleModal(modal, notModalButtons) {
        const body = document.querySelector("body");
        body.classList.toggle("opened2")
        modal.classList.toggle("show-modal");

        notModalButtons.forEach(element => {
            element.tabIndex = "-1"
        });
    },

    _closeModal(modal, notModalButtons) {
        const body = document.querySelector("body");
        body.classList.remove("opened2")
        modal.classList.remove("show-modal");
        notModalButtons.forEach(element => {
            element.tabIndex = "0"
        });

        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    

}
export default Modal;