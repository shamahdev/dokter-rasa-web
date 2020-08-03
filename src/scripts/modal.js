import { getData } from "./data.js";

const modal = document.querySelector(".modal");
const content = modal.querySelector(".modal-content");
const closeButton = modal.querySelector(".close-button");


const initModal = _ => {
    closeButton.addEventListener("click", _ => {
        toggleModal();
    });
}

const trapFocus = _ => {
    const el = document.querySelectorAll("a, button:not(.close-button)");
    console.log(el);
    if(modal.classList.contains("show-modal")) {
        console.log("Opened");
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
    return new Promise((resolve, reject) => {
        getData(id)
        .then(restaurant => {
            content.innerHTML= 
            `<h3>${restaurant.name}</h3>
            <p>${restaurant.description}</p>`;
        });
        resolve(console.log(id));
    });
}

const toggleModal = (id = null) => {
    if(id !== null) {
        modal.classList.toggle("show-modal");  
        getModalData(id);
    } else {
        modal.classList.remove("show-modal");
    }
    trapFocus();
}

export { initModal, toggleModal };