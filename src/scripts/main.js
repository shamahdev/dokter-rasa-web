import navbar from "./navbar.js";
import { renderData } from "./data.js";
import { initModal } from "./modal.js";

const main = _ => {
    const card = document.getElementById("card");
    renderData(card);
    
    navbar();
    initModal();
}

export default main;