import CONFIG from "@/global/config";
import Modal from "@/components/modal";
import BookmarkBtnInitiator from "@/utils/bookmark-button-initiator";

const Card = {
    render(restaurant) {
      return `
      <div class="card">
            <img class="responsive" src="${CONFIG.BASE_IMAGE_URL}small/${restaurant.pictureId}" alt="${restaurant.name}, ${restaurant.city}">
            <div class="card-panel">
                <div class="card-text">
                    <p class="city">${restaurant.city}</p>
                    <h3>${restaurant.name}</h3>
                    <div class="star">
                        <span>${this._getStars(restaurant.rating)}</span>
                        <p>${restaurant.rating}/5</p>
                    </div>
                </div>
                <div class="btn-group">
                    <button tabindex="0" data-bookmark=${restaurant.id} aria-label="Add to bookmark" class="btn icon right"><i class="material-icons">bookmark_border</i></button>
                    <button tabindex="0" data-modal="${restaurant.id}" class="trigger btn primary side">Lihat detail</a>
                </div>
            </div>
        </div>`;
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
   
    createEvent() {
        const bookmarkButton = document.querySelectorAll("button[data-bookmark]");
        bookmarkButton.forEach(async(element) => {
            await BookmarkBtnInitiator.init(element);
        });
        const detailButton = document.querySelectorAll("button[data-modal]");
        detailButton.forEach(element => {
            element.addEventListener("click", async(event) => {
                event.stopPropagation();
                await Modal.init(element.dataset.modal);
                console.log("Modal initialized.");
            });
        });
    },
  };
   
export default Card;