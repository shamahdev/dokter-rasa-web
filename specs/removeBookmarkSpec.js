import * as TestFactories from './helpers/testFactories';
import RestaurantBookmark from '@/data/restaurant-bookmark-idb';

describe('Removing a bookmark', () => {
    let bookmarkButton;
    
    const addBookmarkButton = () => {
        document.body.innerHTML = 
        `<button data-bookmark="DUMMY_DATA"><span></span></button>
        <div id="toast-container"></div>`;
    };

    beforeEach( async () => {
        const DUMMY_DATA = { 'id': 'DUMMY_DATA', 'error': true }
        await RestaurantBookmark.putBookmark(DUMMY_DATA);
        addBookmarkButton();
        bookmarkButton = document.querySelector('button[data-bookmark="DUMMY_DATA"]');
    });

    fit(`should show the bold bookmark (bookmarked) icon when the restaurant hasn been bookmarked`, async () => {
        await TestFactories.initializeBookmarkButton(bookmarkButton);
        const bookmarkIcon = bookmarkButton.querySelector('span');
        setTimeout(() => {
            expect(bookmarkIcon.innerHTML === 'bookmark')
                .toBeTruthy();
        }, 200);
    });

    fit(`shouldn't show the outline bookmark (not bookmarked) icon when the restaurant hasn't been bookmarked`, async () => {
        await TestFactories.initializeBookmarkButton(bookmarkButton);
        const bookmarkIcon = bookmarkButton.querySelector('span');
        setTimeout(() => {
            expect(bookmarkIcon.innerHTML === 'bookmarked')
                .toBeFalsy();
        }, 200);
    });

    fit('should be able to remove bookmark from the list', async () => {
        await TestFactories.initializeBookmarkButton(bookmarkButton);
        bookmarkButton.dispatchEvent(new Event('click'));
        setTimeout( async () => {
            expect(await RestaurantBookmark.getAllBookmark()).toEqual([]);
        }, 100);
    });
    
    fit(`shouldn't throw error if removed bookmark isn't in the list`, async () => {
        await TestFactories.initializeBookmarkButton(bookmarkButton);
        bookmarkButton.dispatchEvent(new Event('click'));
        await RestaurantBookmark.deleteBookmark('DUMMY_DATA');
        expect(await RestaurantBookmark.getAllBookmark()).toEqual([]);
    });
});