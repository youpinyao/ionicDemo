import tabs from '../pages/tabs';
import second from '../pages/second';

const router = [{
  state: 'tabs',
  url: '/tabs',
  ...tabs,
}, {
  state: 'second',
  url: '/second',
  ...second,
}];


export default router;
