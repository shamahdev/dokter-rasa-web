import '@/components/toast-alert';

const ToastEvent = {
  async init({message, type = 'default'}) {
    this._body = document.querySelector('body');
    this._TOAST_ID = Math.random().toString(36).substring(5);
    const ToastElement = document.createElement('toast-alert');
    ToastElement.message = {
      id: this._TOAST_ID,
      text: message,
      type: type,
    };

    this._body.appendChild(await ToastElement);

    this._thisToast = document.getElementById(this._TOAST_ID);
    this._closeBtn = this._thisToast.querySelector('.close-toast');
    await this._createEvent();

    setTimeout(() => {
      this._hideAndRemove();
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
    const thisToast = this._thisToast;
    thisToast.className = thisToast.className.replace('show-toast', '');
    setTimeout(() => {
      thisToast.remove();
    }, 300);
  },

};

export default ToastEvent;
