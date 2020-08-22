import RestaurantApiData from '@/data/restaurant-api-data';
import RestaurantCatalog from '@/utils/restaurant-catalog-init';

const Home = {
  async render() {
    return `
        <div class="hero">
            <img class="teardrop" src="./images/heros/dokterrasa_hero.jpg" alt="Dokter rasa">
            <div class="teardrop overlay">
                <div class="content">
                    <p class="title">dokter rasa</p>
                    <p>Mari temukan restoran yang dapat menyembuhkan rasa laparmu sekarang juga!</p>
                </div>
            </div>
            <div class="group">
                <a tabindex="0" href="#/bookmark" class="btn rounded primary">Lihat Bookmark</a>
            </div>
        </div>
        <article class="mt8">
            <h2 class="center">Kenapa pilih kami</h2>
            <div class="showcase">
                <div class="icon-group">
                    <span class="material-icons" aria-label="Bookmark">book</span>
                    <p>Simpan Restoran favoritmu untuk dikunjungi nanti</p>
                </div>
                <div class="icon-group">
                    <span class="material-icons" aria-label="Rating & Review">star</span>
                    <p>Cari tahu sebagus apa restoran dengan fitur rating dan review dari pengunjung</p>
                </div>
                <div class="icon-group">
                    <span class="material-icons" aria-label="Menu Pilihan">local_dining</span>
                    <p>Pilih restoran dengan menu yang cocok untuk kamu dan keluarga</p>
                </div>
            </div>
            <h2 class="center">Restoran paling populer</h2>
            <div id="card-group">
              <loading-spinner></loading-spinner>
            </div>
        </article>
      `;
  },

  async afterRender() {
    const cardGroup = document.getElementById('card-group');
    try {
      const restaurantCatalogData = await RestaurantApiData.getCatalog();
      cardGroup.innerHTML = ``;
      await RestaurantCatalog.init(restaurantCatalogData, cardGroup);
    } catch (err) {
      cardGroup.innerHTML =
      `<div class="msg-group">
        <p class="center mh-auto"><span class="material-icons mr1" aria-hidden="true">wifi_off</span>List Restoran tidak dapat di tampilkan. Periksa kembali internet anda :)</p>
        <a tabindex="0" href="#/home" class="btn primary rounded center mh-auto">Refresh</a>
      </div>`;
    }
  },
};

export default Home;
