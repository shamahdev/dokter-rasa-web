const assert = require('assert');

Feature('Add And Remove Restaurant Bookmark');
Before((I) => {
    I.amOnPage('/#/bookmark');
});

Scenario('Showing empty bookmark', (I) => {
    I.see('Belum ada restoran yang ditambahkan ke bookmark', 'p.center.mh-auto');
});

Scenario('Add and remove one bookmark', async (I) => {
    I.click(locate('a.btn.primary').first());

    I.seeElement('button[data-bookmark]');
    const firstRestaurantCard = locate('.card-text h3').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurantCard);
    I.click(locate('button[data-bookmark]').first());
    I.see('bookmark', 'button[data-bookmark] span');
    I.amOnPage('/#/bookmark');

    I.waitForElement('restaurant-card', 3);
    const bookmarkedRestaurantCard = locate('.card-text h3').first();
    const bookmarkedRestaurantName = await I.grabTextFrom(bookmarkedRestaurantCard);
   
    assert.strictEqual(bookmarkedRestaurantName, firstRestaurantName);

    I.see('Lihat detail', 'a.trigger')
    I.click(locate('a.trigger').first());

    I.waitForElement('restaurant-detail', 3);
    I.pressKey('B'); /* Press bookmark button with accessibility key */

    I.dontSeeElement('button[data-bookmark]');
});