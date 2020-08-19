import Home from '@/views/pages/home';
import Bookmark from '@/views/pages/bookmark';
import NotFound from '@/views/pages/notfound';

const Routes = {
  '/': Home,
  '/home': Home,
  '/bookmark': Bookmark,
  '/404': NotFound,
};

export default Routes;
