import { Workbox } from 'workbox-window'

const swRegister = async () => {
    if ('serviceWorker' in navigator) {
        const wb = new Workbox('./sw.js')
        await wb.register();
        return;
    }
    console.log('Service worker not supported in this browser');
}

export default swRegister;