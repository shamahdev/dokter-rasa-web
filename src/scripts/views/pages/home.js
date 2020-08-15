import RestaurantDataSource from "scripts/data/data";
import Card from "scripts/components/card";

const Home = {
    async render() {
      return `
        <div class="hero">
            <img src="./images/heros/hero-image_2.jpg" alt="Dokter rasa">
            <div class="overlay">
                <div class="content">
                    <p class="title">dokter rasa</p>
                    <p>Mari temukan restoran yang dapat menyembuhkan rasa laparmu sekarang juga!</p>
                </div>
            </div>
            <div class="group">
                <a tabindex="0" href="#card" class="btn primary">Cari restoran</a>
            </div>
        </div>
        <article id="main">
            <h2 class="center">Kenapa pilih kami</h2>
            <div class="showcase">
                <div class="icon-group">
                    <i class="material-icons">bookmark</i>
                    <p>Simpan Restoran favoritmu untuk dikunjungi nanti</p>
                </div>
                <div class="icon-group">
                    <i class="material-icons">star</i>
                    <p>Cari tahu sebagus apa resoran dengan fitur rating dari pengunjung</p>
                </div>
                <div class="icon-group">
                    <i class="material-icons">local_dining</i>
                    <p>Pilih restoran dengan menu yang cocok untuk kamu dan keluarga</p>
                </div>
            </div>
            <h2 class="center">Restoran paling populer</h2>
            <div id="card-group">
              <loading-spinner/>
            </div>
        </article>
      `;
    },
   
    async afterRender() {
      const restaurantList = await RestaurantDataSource.list();
      const cardGroup = document.getElementById("card-group")
      let restaurantHTML = ``;
      restaurantList.forEach(restaurant => {
        restaurantHTML += Card.render(restaurant);
      });
      cardGroup.innerHTML = restaurantHTML;
    },
  };
   
  export default Home;