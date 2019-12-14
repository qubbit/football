import Competition from '../components/pages/Competition/index';
import Roster from '../components/pages/Team/Roster';
import Home from '../components/pages/Home';

// export interface ROute
export const routes = [
  {
    path: '/',
    component: Home,
    props: {exact: true}
  },
  {
    path: '/competitions/:id',
    component: Competition
  },
  {
    path: '/teams/:fe_id/:id/roster',
    component: Roster
  }
];
