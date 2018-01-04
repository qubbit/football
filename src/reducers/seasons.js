const initialState = {
  currentSeason: {},
  seasons: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_SEASONS_SUCCESS':
      return {
        ...state,
        seasons: action.response.data
      };
    case 'FETCH_SEASON_SUCCESS':
      return {
        ...state,
        currentSeason: action.response.data
      };
    default:
      return state;
  }
}
