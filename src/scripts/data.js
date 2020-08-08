import { toggleModal } from "./components/modal.js";
import Toast from "./components/toast.js";
import * as json from "../data.json";
const data = json.default.restaurants;

const getStars = rating => {
    let stars = ``;
    for (let i = 0; i < parseFloat(rating); i++) {
        if ((parseFloat(rating)) > i && i === (parseInt(rating))) {
            stars += `<i class="material-icons">star_half</i>`;
        } else {
            stars += `<i class="material-icons">star</i>`;
        }
    }
    return stars;
}

const getData = (id = 0) => {
    return new Promise((resolve, reject) => {
        if (id === 0) {
            resolve(data);
        } else {
            for (let r of data) {
                if (r.id === id) {
                    resolve(r);
                }
            }
            reject("Data tidak ada.");
        }
    });
}

const renderData = (element, restaurant) => {
    element.innerHTML = ``;
    restaurant.forEach(r => {
        element.innerHTML +=
            `<div class="card">
            <img class="responsive" src="${r.pictureId}" alt="${r.name}, ${r.city}">
            <div class="card-panel">
                <div class="card-text">
                    <p class="city">${r.city}</p>
                    <h3>${r.name}</h3>
                    <div class="star">
                        <span>${getStars(r.rating)}</span>
                        <p>${r.rating}/5</p>
                    </div>
                </div>
                <div class="btn-group">
                    <button tabindex="0" data-bookmark=${r.id} aria-label="Add to bookmark" class="btn icon right"><i class="material-icons">bookmark_border</i></button>
                    <button tabindex="0" data-modal="${r.id}" class="trigger btn primary side">Lihat detail</a>
                </div>
            </div>
            
        </div>`;
    });
    const bookmarkBtn = document.querySelectorAll("button[data-bookmark]");
    bookmarkBtn.forEach(e => {
        e.addEventListener("click", _ => {
            Toast.show("Bookmark added.", "success");
        });
    });

    const trigger = document.querySelectorAll("button[data-modal]");
    trigger.forEach(e => {
        e.addEventListener("click", _ => {
            e.blur();
            toggleModal(e.dataset.modal);
        });
    });
}
export {
    getStars,
    getData,
    renderData
};