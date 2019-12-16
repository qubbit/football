import Competition from '../components/pages/Competition/index';
import Roster from '../components/pages/Team/Roster';
import Home from '../components/pages/Home';
import Fixtures from '../components/pages/Competition/Fixtures';
import Teams from '../components/pages/Competition/Teams';
import Standings from '../components/pages/Competition/Standings';

export interface RouteEntry {
  path: string;
  component: React.Component;
  props?: object;
}

export const routes: RouteEntry[] = [
  {
    path: '/',
    component: Home,
    props: { exact: true }
  },
  {
    path: '/competitions/:id',
    component: Competition
  },
  {
    path: '/teams/:competition_id/:team_id/roster',
    component: Roster
  },
  {
    path: '/competitions/:id/fixtures',
    props: { exact: true },
    component: Fixtures
  },
  {
    path: '/competitions/:id/standings',
    props: { exact: true },
    component: Standings
  },
  {
    path: '/competitions/:id/teams',
    props: { exact: true },
    component: Teams
  }
];
