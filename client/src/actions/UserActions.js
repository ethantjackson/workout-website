import {
  SET_CURR_USER,
  SET_AUTHENTICATED,
  GET_CURR_USER_PLANS,
  DELETE_CURR_USER_PLAN,
  SET_MESSAGE,
  USERS_ERROR,
  CLEAR_USER,
} from './types';

export const loginUser = (user) => async (dispatch) => {
  try {
    const res = await fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status !== 401) {
      const data = await res.json();
      dispatch({
        type: SET_AUTHENTICATED,
        payload: true,
      });
      dispatch({
        type: SET_CURR_USER,
        payload: data.user,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: null,
      });
    } else {
      //dispatch error message username or password incorrect
      dispatch({
        type: CLEAR_USER,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: 'Incorrect email or password.',
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: USERS_ERROR, payload: err.response.data });
  }
};

export const getUserPlans = () => async (dispatch) => {
  try {
    const res = await fetch('/user/plans');
    if (res.status !== 401) {
      const data = await res.json();
      if (data.authenticated === true) {
        dispatch({
          type: GET_CURR_USER_PLANS,
          payload: data.workoutPlans,
        });
      }
    } else {
      dispatch({
        type: SET_MESSAGE,
        payload: "Cannot get user's workout plans",
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: USERS_ERROR, payload: err.response.data });
  }
};

export const deleteUserPlan = (planID) => async (dispatch) => {
  try {
    const res = await fetch('/user/plan/' + planID, {
      method: 'DELETE',
    });
    if (res.status !== 401) {
      const data = await res.json();
      if (!data.message.msgError) {
        dispatch({
          type: DELETE_CURR_USER_PLAN,
          payload: planID,
        });
      }
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: USERS_ERROR, payload: err.response.data });
  }
};

export const registerUser = (user) => async (dispatch) => {
  try {
    const res = await fetch('/user/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    dispatch({
      type: SET_MESSAGE,
      payload: data.message.msgBody,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: USERS_ERROR, payload: err.response.data });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const res = await fetch('/user/logout', {
      method: 'POST',
      credentials: 'same-origin',
    });
    const data = await res.json();
    if (data.success) {
      dispatch({
        type: CLEAR_USER,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: USERS_ERROR, payload: err.response.data });
  }
};

export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
};

export const checkAuthenticated = () => async (dispatch) => {
  try {
    const res = await fetch('/user/authenticated');
    if (res.status !== 401) {
      const data = await res.json();
      dispatch({
        type: SET_AUTHENTICATED,
        payload: true,
      });
      dispatch({
        type: SET_CURR_USER,
        payload: data.user,
      });
      return true;
    } else {
      dispatch({
        type: CLEAR_USER,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: USERS_ERROR, payload: err.response.data });
  }
  return false;
};
