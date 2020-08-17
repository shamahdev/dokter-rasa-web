const Toast = {
  async init(msg, type = 'default') {
    const body = document.querySelector('body');
    const content = document.createElement('div');
    const TOAST_ID = Math.random().toString(36).substring(7);

    content.id = TOAST_ID;
    content.classList.add('toast', 'show-toast', type);
    content.setAttribute('role', 'modal');
    content.innerHTML = await this._render(msg, type);
    body.appendChild(content);

    const thisToast = document.getElementById(TOAST_ID);
    const closeBtn = thisToast.querySelector('.close-toast');
    await this._createEvent(thisToast, closeBtn);


    setTimeout(() => {
      this._hideAndRemove(thisToast);
    }, 2000);
  },

  async _render(msg, type) {
    return `<p>${msg}</p>
    <button tabindex="0" aria-label="Close toast" class="btn close-toast ${type} side icon">
        <i class="material-icons">close</i>
    </button>`;
  },

  async _createEvent(thisToast, closeBtn) {
    closeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      this._hideAndRemove(thisToast);
    });

    document.addEventListener('keyup', (event) => {
      event.stopPropagation();
      if (event.keyCode === 27) {
        closeBtn.click();
      }
    });
  },

  _hideAndRemove(toast) {
    toast.className = toast.className.replace('show-toast', '');
    setTimeout(() => {
      toast.remove();
    }, 300);
  },

};

export default Toast;
