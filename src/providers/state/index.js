import * as actions from '../../utils/actions';

export const state = {
  authUser: null,
  currentNav: 'home',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.AUTH_STATE_CHANGED:
      return {
        ...state,
        authUser: action.value,
      };
    case actions.NAV_CHANGED:
      return {
        ...state,
        currentNav: action.value,
      };
    default:
      return { ...state };
  }
};
