const initialState = {};

export default (
  state = initialState,
  {type, payload}: {type: string; payload: unknown},
) => {
  switch (type) {
    case 'CLEAR_ON_LOGOUT':
      return initialState;
    default:
      return state;
  }
};
