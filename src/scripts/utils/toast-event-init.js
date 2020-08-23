import '@/components/toast-alert';

const ToastEvent = {
  _container: document.getElementById('toast-container'),

  async init({message, type = 'default'}) {
    const TOAST_ID = Math.random().toString(36).substring(5);
    const ToastElement = document.createElement('toast-alert');

    ToastElement.message = {
      id: TOAST_ID,
      text: message,
      type: type,
    };

    this._container.appendChild(ToastElement);
    this._toast = document.getElementById(TOAST_ID);
    this._closeBtn = this._toast.querySelector('.close-toast');

    await this._createEvent();
    setTimeout(() => {
      this._toast.classList.add('show-toast');
    }, 5);
    setTimeout(() => {
      this._closeBtn.click();
    }, 2500);
  },

  async _createEvent() {
    const closeBtn = this._closeBtn;
    closeBtn.addEventListener('click', this._hideAndRemove.bind(this));
    document.addEventListener('keyup', (event) => {
      event.stopPropagation();
      if (event.keyCode === 27) {
        closeBtn.click();
      }
    }, {once: true});
  },

  _hideAndRemove() {
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
