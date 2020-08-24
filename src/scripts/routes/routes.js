import Home from '@/views/pages/home';
import Bookmark from '@/views/pages/bookmark';
import Restaurant from '@/views/pages/restaurant';
import NotFound from '@/views/pages/notfound';

const Routes = {
  '/': Home,
  '/home': Home,
  '/bookmark': Bookmark,
  '/bookmark/:slug': Restaurant,
  '/restaurant': Home,
  '/restaurant/:slug': Restaurant,
  '/404': NotFound,
};

export default Routes;
