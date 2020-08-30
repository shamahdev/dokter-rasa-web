import * as TestFactories from '../specs/helpers/testFactories';
import RestaurantBookmark from '@/data/restaurant-bookmark-idb';

describe('Removing a bookmark', () => {
    let bookmarkButton;
    
    const addBookmarkButton = () => {
        document.body.innerHTML = 
        `<button data-bookmark="DUMMY_DATA"><span></span></button>
        <div id="toast-container"></div>`;
    };

    beforeEach( async () => {
        addBookmarkButton();
        bookmarkButton = document.querySelector('button[data-bookmark="DUMMY_DATA"]');
        const DUMMY_DATA = { 'id': 'DUMMY_DATA', 'error': true }
        await RestaurantBookmark.putBookmark(DUMMY_DATA);
    });

    it(`should show the bold bookmark (bookmarked) icon when the restaurant hasn been bookmarked`, async () => {
        await TestFactories.initializeBookmarkButton(bookmarkButton);
        const bookmarkIcon = bookmarkButton.querySelector('span');
        expect(bookmarkIcon.innerHTML === 'bookmark')
            .toBeTruthy();
    });

    it(`shouldn't show the outline bookmark (not bookmarked) icon when the restaurant hasn't been bookmarked`, async () => {
        await TestFactories.initializeBookmarkButton(bookmarkButton);
        const bookmarkIcon = bookmarkButton.querySelector('span');
        expect(bookmarkIcon.innerHTML === 'bookmarked')
            .toBeFalsy();
    });

    it('should be able to remove bookmark from the list', async () => {
        await TestFactories.initializeBookmarkButton(bookmarkButton);
        bookmarkButton.dispatchEvent(new Event('click'));
        expect(await RestaurantBookmark.getAllBookmark()).toEqual([]);
    });
    
    it(`shouldn't throw error if removed bookmark isn't in the list`, async () => {
        await TestFactories.initializeBookmarkButton(bookmarkButton);
        bookmarkButton.dispatchEvent(new Event('click'));
        await RestaurantBookmark.deleteBookmark('DUMMY_DATA');
        expect(await RestaurantBookmark.getAllBookmark()).toEqual([]);
    });
});