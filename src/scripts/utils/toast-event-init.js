import '@/components/toast-alert';

const ToastEvent = {
  async init({message, type = 'default'}) {
    this._container = document.getElementById('toast-container');

    // Init toast
    this._TOAST_ID = Math.random().toString(36).substring(5);
    const ToastElement = document.createElement('toast-alert');
    ToastElement.message = {
      id: this._TOAST_ID,
      text: message,
      type: type,
    };

    await this._container.appendChild(ToastElement);

    this._toast = document.getElementById(this._TOAST_ID);
    this._closeBtn = this._toast.querySelector('.close-toast');
    await this._createEvent();
    this._toast.classList.add('show-toast');

    setTimeout(() => {
      this._closeBtn.click();
    }, 2000);
  },

  async _createEvent() {
    const closeBtn = this._closeBtn;
    closeBtn.addEventListener('click', this._hideAndRemove.bind(this));
    document.addEventListener('keyup', (event) => {
      event.stopPropagation();
      if (event.keyCode === 27) {
        closeBtn.click();
      }
    });
  },

  _hideAndRemove() {
    this._closeBtn.removeEventListener('click', this._hideAndRemove);
    const thisToast = document.querySelectorAll('#toast-container toast-alert');
    if (thisToast[0]) {
      if (thisToast[0].classList.contains('show-toast')) {
        thisToast[0].className = thisToast[0].className.replace('show-toast', '');
      }
      setTimeout(() => {
        thisToast[0].remove();
      }, 300);
    }
  },

};

export default ToastEvent;
