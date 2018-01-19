import { NAVIGATE_PAGE } from '../actions/types';
import * as ASSETS from '../asset_mapping.json';

const initialState = {
  activeMenuItem: 'standings',
  normalizers: {...ASSETS }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NAVIGATE_PAGE:
      return {
        ...state,
        activeMenuItem: action.page
      };
    default:
      return state;
  }
}
