import {
  FETCH_COMPETITION_REQUEST,
  FETCH_COMPETITION_SUCCESS
} from '../actions/types';
import { normalColor } from '../utils';

const initialState = {
  competition: {},
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPETITION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_COMPETITION_SUCCESS:
      return {
        competition: {
          ...action.response,
          color: normalColor(action.response.primaryColor),
          fe_id: action.response.uri.split('/')[1]
        },
        loading: false
      };
    default:
      return state;
  }
}
