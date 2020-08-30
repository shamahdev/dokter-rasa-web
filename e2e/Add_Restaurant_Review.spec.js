const assert = require('assert');

Feature('Add Restaurant Review');
Before((I) => {
    I.amOnPage('/');
});
Scenario('Add review', (I) => {
    const reviewText = 'Melakukan Review dengan E2E Testing';

    I.seeElement('restaurant-card');
    I.click(locate('a.trigger').first());
    I.waitForElement('restaurant-detail', 3);

    I.fillField('Name', 'Shaddam');
    I.fillField('Your review', reviewText);
    I.click('#submit-review');
    
    I.see(reviewText, 'p.review');
});