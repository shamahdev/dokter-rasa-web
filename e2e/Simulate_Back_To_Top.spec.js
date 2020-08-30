Feature('Simulate Back To Top');
Before((I) => {
    I.amOnPage('/');
});

Scenario('Scroll down and interact with Back to Top button', (I) => {
    I.dontSeeElement('to-top.show-to-top');
    I.scrollTo('footer');

    I.waitForElement('to-top.show-to-top');
    I.click('to-top button');

    I.dontSeeElement('to-top.show-to-top');
})