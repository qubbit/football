import { NAVIGATE_PAGE } from '../actions/types';

const initialState = {
  activeMenuItem: 'standings',
  normalizers: {}
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
