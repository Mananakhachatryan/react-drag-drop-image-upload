const initialState = {
  pending: false,
  success: false,
  error: null,
};

const basicPageReducer = (
  state = initialState,
  { type, payload, error }
) => {
  switch (type) {
    default:
      return state;
  }
};

export default basicPageReducer;
