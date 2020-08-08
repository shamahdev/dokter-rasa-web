const body = document.querySelector("body");

class Toast {
    static show(msg, type = "default") {
        const UNIQUE_ID = Math.random().toString(36).substring(7);
        const content = document.createElement("div");

        content.id = UNIQUE_ID;
        content.classList.add("toast", "show-toast", type);
        content.setAttribute("role", "modal");
        content.innerHTML = `
            <p>${msg}</p>
            <button tabindex="0" aria-label="Close toast" class="btn close-toast success side icon">
                <i class="material-icons">close</i>
            </button>`;

        body.appendChild(content);

        const toast = document.getElementById(UNIQUE_ID);
        const closeBtn = toast.querySelector(".close-toast");

        const hide = e => {
            e.className = e.className.replace("show-toast", "");
            setTimeout(() => {
                e.remove();
            }, 300);
        }

        closeBtn.addEventListener("click", _ => {
            hide(toast);
        });

        document.addEventListener("keyup", e => {
            e.stopPropagation();
            if (e.keyCode === 27) {
                closeBtn.click();
            }
        });


        setTimeout(() => {
            hide(toast);
        }, 2000);
    }
}

export default Toast;