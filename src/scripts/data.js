import * as json from "../data.json";
import {
    toggleModal
} from "./modal.js";
const data = json.default.restaurants;

const countStar = rating => {
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
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    resolve(data[i]);
                }
            }
        }
    });
}

const renderData = element => {
    console.log(data);
    element.innerHTML = ``;
    data.forEach(restaurant => {
        element.innerHTML +=
            `<div class="card">
            <img class="responsive" src="${restaurant.pictureId}" alt="${restaurant.name}, ${restaurant.city}">
            <div class="card-panel">
                <div class="card-text">
                    <p class="city">${restaurant.city}</p>
                    <h3>${restaurant.name}</h3>
                    <div class="star">
                        <span>${countStar(restaurant.rating)}</span>
                        <p>${restaurant.rating}/5</p>
                    </div>
                </div>
                <div class="btn-group">
                    <button tabindex="0" aria-label="Add to bookmark" class="btn icon right"><i class="material-icons">bookmark_border</i></button>
                    <button tabindex="0" data-modal="${restaurant.id}" class="trigger btn primary side">Lihat detail</a>
                </div>
            </div>
            
        </div>`;
    });

    const trigger = document.querySelectorAll("button[data-modal]");
    trigger.forEach(e => {
        const id = e.dataset.modal;
        e.addEventListener("click", _ => {
            e.blur();
            toggleModal(id);
        });
    });
}
export {
    countStar,
    getData,
    renderData
};