import { countStar, getData } from "./data.js";

const modal = document.querySelector(".modal");
const content = modal.querySelector(".modal-content");
const closeButton = modal.querySelector(".close-button");


const initModal = _ => {
    closeButton.addEventListener("click", _ => {
        toggleModal();
    });
}

const trapFocus = _ => {
    const el = document.querySelectorAll("a, button:not(.close-button):not(.bookmark-button)");
    if(modal.classList.contains("show-modal")) {
        closeButton.focus();
        el.forEach(e => {
            e.tabIndex = "-1"
        });
    } else {
        console.log("Closed");
        el.forEach(e => {
            e.tabIndex = "0"
        });
    }
}

const getModalData = id => {
        getData(id)
        .then(restaurant => {
            content.innerHTML= 
            `<h3 class="modal-title">${restaurant.name}</h3>
            <div class="star">
                <span>${countStar(restaurant.rating)}</span>
                <p>${restaurant.rating}/5</p>
            </div>
            <p>${restaurant.description}</p>`;
        });
}

const toggleModal = (id = null) => {
    if(id !== null) {
        document.querySelector("body").classList.toggle("opened2")
        modal.classList.toggle("show-modal");
        getModalData(id);
    } else {
        document.querySelector("body").classList.remove("opened2")
        modal.classList.remove("show-modal");
    }
    trapFocus();
}

export { initModal, toggleModal };