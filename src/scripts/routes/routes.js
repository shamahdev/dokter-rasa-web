import Home from 'scripts/views/pages/home';
import Bookmark from 'scripts/views/pages/bookmark';
import Detail from 'scripts/views/pages/detail';
 
const routes = {
  '/': Home,
  '/home': Home,
  '/bookmark': Bookmark,
  '/detail/:id': Detail,
};
 
export default routes;