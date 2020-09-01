import * as TestFactories from '../specs/helpers/testFactories';
import RestaurantBookmark from '@/data/restaurant-bookmark-idb';

describe('Bookmarking a restaurant', () => {
    let bookmarkButton;
    let bookmarkButtonNoData;
    
    const addBookmarkButton = () => {
        document.body.innerHTML = 
        `<button data-bookmark="DUMMY_DATA"><span></span></button>
        <button data-bookmark=""><span></span></button>
        <div id="toast-container"></div>`;
    };

    beforeEach(() => {
        addBookmarkButton();
        bookmarkButton = document.querySelector('button[data-bookmark="DUMMY_DATA"]');
        bookmarkButtonNoData = document.querySelector('button[data-bookmark=""]');
    });

    fit(`should show the outline bookmark (not bookmarked) icon when the restaurant hasn't been bookmarked`, async () => {
        await TestFactories.initializeBookmarkButton(bookmarkButton);
        const bookmarkIcon = bookmarkButton.querySelector('span');
        setTimeout(() => {
            expect(bookmarkIcon.innerHTML === 'bookmark_border')
                .toBeTruthy();
        }, 200);
    });

    fit(`shouldn't show the bold bookmark (bookmarked) icon when the restaurant hasn't been bookmarked`, async () => {
        await TestFactories.initializeBookmarkButton(bookmarkButton);
        const bookmarkIcon = bookmarkButton.querySelector('span');
        setTimeout(() => {
            expect(bookmarkIcon.innerHTML === 'bookmark')
                .toBeFalsy();
        }, 200);
    });

    fit(`should be able to bookmark a restaurant`, async () => {
        await TestFactories.initializeBookmarkButton(bookmarkButton);
        bookmarkButton.dispatchEvent(new Event('click'));

        setTimeout( async () => {
            const restaurantId = await RestaurantBookmark.getBookmark(bookmarkButton.dataset.bookmark);
            expect(restaurantId).toEqual({ id: bookmarkButton.dataset.bookmark });
        }, 200);

        RestaurantBookmark.deleteBookmark(bookmarkButton.dataset.bookmark);
    });

    fit(`shouldn't be able to bookmark a bookmarked restaurant`, async () => {
        const DUMMY_DATA = { 'id': 'DUMMY_DATA', 'error': true }

        await TestFactories.initializeBookmarkButton(bookmarkButton);
        await RestaurantBookmark.putBookmark(DUMMY_DATA);
        bookmarkButton.dispatchEvent(new Event('click'));

        setTimeout( async () => {
            const restaurantId = await RestaurantBookmark.getBookmark(bookmarkButton.dataset.bookmark);
            expect(restaurantId).toEqual({ id: bookmarkButton.dataset.bookmark });
            expect(await RestaurantBookmark.getAllBookmark()).toEqual([DUMMY_DATA]);
        }, 200);
    });

    fit('should unable to bookmark restaurant with no id', async () => {
        await TestFactories.initializeBookmarkButton(bookmarkButtonNoData);
        bookmarkButtonNoData.dispatchEvent(new Event('click'));
        setTimeout( async () => {
            expect(await RestaurantBookmark.getAllBookmark()).toEqual([]);
        }, 200);
    });
});