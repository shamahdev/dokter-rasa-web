import { getStars, getData } from "../data/data.js";
import Toast from "./toast.js";

const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const content = modal.querySelector(".modal-content");
const closeButton = modal.querySelector(".close-button");
const bookmarkButton = modal.querySelector(".bookmark-button")

const initModal = _ => {
    closeButton.addEventListener("click", _ => {
        toggleModal();
    });
    bookmarkButton.addEventListener("click", _ => {
        Toast.show("Bookmark added.", "success");
    })
}

const accessiblityKey = e => {
    if (e.keyCode === 27) {
        toggleModal();
    } else if (e.keyCode === 70) {
        bookmarkButton.click();
    }
}

const trapFocus = _ => {
    const el = document.querySelectorAll("li a, a, button:not(.close-button):not(.bookmark-button)");
    if (modal.classList.contains("show-modal")) {
        document.addEventListener("keyup", accessiblityKey);
        closeButton.focus();
        el.forEach(e => {
            e.tabIndex = "-1"
        });
    } else {
        el.forEach(e => {
            e.tabIndex = "0"
        });
    }
}

const getModalData = id => {
    content.innerHTML = ``;
    getData(id)
        .then(restaurant => {
            content.innerHTML =
                `<small class="guide">Press F to add to bookmark</small>
                <h3 class="modal-title">${restaurant.name}</h3>
                <div class="star">
                    <span>${getStars(restaurant.rating)}</span>
                    <p>${restaurant.rating}/5</p>
                </div>
                <p>${restaurant.description}</p>`;
        })
        .catch(err => console.log(err));
}

const toggleModal = (id = null) => {
    if (id !== null) {
        body.classList.toggle("opened2")
        modal.classList.toggle("show-modal");
        modal.setAttribute("aria-hidden", false);
        getModalData(id);
    } else {
        document.removeEventListener("keyup", accessiblityKey);
        body.classList.remove("opened2")
        modal.classList.remove("show-modal");
        modal.setAttribute("aria-hidden", true);
    }
    trapFocus();
}

export { initModal, toggleModal };