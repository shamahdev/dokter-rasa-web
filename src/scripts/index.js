import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.sass';

import { getData, renderData } from "./data.js";
import { initModal } from "./components/modal.js";
import navbar from "./components/navbar.js";

const main = _ => {

    const card = document.getElementById("card");
    getData().then(data => {
        renderData(card, data);  
    });

    navbar();
    initModal();

    window.onscroll = _ => {
        const toTop = document.querySelector(".back-to-top");
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            toTop.classList.add("show-to-top");
        } else {
            toTop.classList.remove("show-to-top");
        }
    };
}

document.addEventListener("DOMContentLoaded", main);