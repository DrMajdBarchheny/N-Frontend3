import {
  // User actions
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  
  // Profile actions
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  
  // User requests actions
  USER_REQUESTS_REQUEST,
  USER_REQUESTS_SUCCESS,
  USER_REQUESTS_FAIL,
  USER_REQUEST_CREATE_REQUEST,
  USER_REQUEST_CREATE_SUCCESS,
  USER_REQUEST_CREATE_FAIL,
  USER_REQUEST_UPDATE_REQUEST,
  USER_REQUEST_UPDATE_SUCCESS,
  USER_REQUEST_UPDATE_FAIL,
  

} from './constants';

// Initial States
const userInitialState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  loading: false,
  error: null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false
};

const profileInitialState = {
  profile: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null
};

const requestsInitialState = {
  requests: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  updateLoading: false,
  updateError: null
};



// User Reducer
const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        error: null
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
        token: null,
        isAuthenticated: false
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: null
      };
    default:
      return state;
  }
};

// Profile Reducer
const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
        error: null
      };
    case USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case USER_PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateError: null
      };
    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        profile: action.payload,
        updateError: null
      };
    case USER_PROFILE_UPDATE_FAIL:
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload
      };
    default:
      return state;
  }
};

// Requests Reducer
const requestsReducer = (state = requestsInitialState, action) => {
  switch (action.type) {
    case USER_REQUESTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case USER_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        requests: action.payload,
        error: null
      };
    case USER_REQUESTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case USER_REQUEST_CREATE_REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null
      };
    case USER_REQUEST_CREATE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        requests: [...state.requests, action.payload],
        createError: null
      };
    case USER_REQUEST_CREATE_FAIL:
      return {
        ...state,
        createLoading: false,
        createError: action.payload
      };
    case USER_REQUEST_UPDATE_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateError: null
      };
    case USER_REQUEST_UPDATE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        requests: state.requests.map(request => 
          request.id === action.payload.id ? action.payload : request
        ),
        updateError: null
      };
    case USER_REQUEST_UPDATE_FAIL:
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload
      };
    default:
      return state;
  }
};

// Root Reducer
const rootReducer = {
  user: userReducer,
  profile: profileReducer,
  requests: requestsReducer
};

export default rootReducer; 