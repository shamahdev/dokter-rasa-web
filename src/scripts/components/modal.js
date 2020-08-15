import RestaurantDataSource from "@/data/data";

const Modal = {
    async init(restaurantId) {
        const body = document.querySelector("body");
        const restaurantDetail = await RestaurantDataSource.detail(restaurantId);
        body.appendChild(await this._render(restaurantDetail.restaurant));

        setTimeout(() => {
            this._createEvent(restaurantDetail.restaurant.id);
        }, 100);
    },

    async _render(restaurant) {
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
                    <p>${restaurant.description}</p
                </div>
            </div>
        `
        return modalHtml;
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

    _createEvent(modalId) {
        const modal = document.getElementById(modalId);
        const closeButton = modal.querySelector(".close-button");
        const bookmarkButton = modal.querySelector(".bookmark-button");
        const notModalButtons = document.querySelectorAll("li a, a, button:not(.close-button):not(.bookmark-button)");
        
        this._toggleModal(modal, notModalButtons);
        closeButton.focus();

        document.addEventListener("keyup", event => {
            event.stopPropagation();
            this._keyEvent(event, modal, notModalButtons);
        });
        closeButton.addEventListener("click", event => {
            event.stopPropagation();
            this._closeModal(modal, notModalButtons);
        })
    },

    _keyEvent(event, modal, notModalButtons) {
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

// const trapFocus = _ => {
//     const el = document.querySelectorAll("li a, a, button:not(.close-button):not(.bookmark-button)");
//     if (modal.classList.contains("show-modal")) {
//         document.addEventListener("keyup", accessiblityKey);
//         closeButton.focus();
//         el.forEach(e => {
//             e.tabIndex = "-1"
//         });
//     } else {
//         el.forEach(e => {
//             e.tabIndex = "0"
//         });
//     }
// }