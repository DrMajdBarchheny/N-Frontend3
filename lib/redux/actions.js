import axios from 'axios';
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

// API base URL
const API_BASE_URL = 'https://n-backend-six.vercel.app';

// Helper function to get auth token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to set auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Token ${token}` })
  };
};

// User Login Action
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    
    const response = await axios.post(`${API_BASE_URL}/user/token/`, {
      username: email, // Backend expects username
      password
    });
    
    const { key, user } = response.data; // Changed from 'access' to 'key'
    
    // Store token in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', key);
    }
    
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { user, token: key }
    });
    
    return { success: true };
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.detail || 'Login failed'
    });
    return { success: false, error: error.response?.data?.detail || 'Login failed' };
  }
};

// Handle Google Login Data Action
export const handleGoogleLoginData = (token, userData) => (dispatch) => {
  // Store token in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
  
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: { user: userData, token }
  });
  
  return { success: true };
};

// User Logout Action
export const logoutUser = () => (dispatch) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
  dispatch({ type: USER_LOGOUT });
};

// Get User Profile Action
export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });
    
    const response = await axios.get(`${API_BASE_URL}/user/profile/`, {
      headers: getAuthHeaders()
    });
    
    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: error.response?.data?.detail || 'Failed to fetch profile'
    });
  }
};

// Update User Profile Action
export const updateUserProfile = (profileData) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST });
    
    const response = await axios.put(`${API_BASE_URL}/user/profile/update/`, profileData, {
      headers: getAuthHeaders()
    });
    
    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: response.data
    });
    
    return { success: true };
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload: error.response?.data?.detail || 'Failed to update profile'
    });
    return { success: false, error: error.response?.data?.detail || 'Failed to update profile' };
  }
};

// Get User Requests Action - Now fetches from backend endpoint
export const getUserRequests = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_REQUESTS_REQUEST });
    // Get user ID from profile state
    const state = getState();
    const userId = state.profile.profile?.id;
    if (!userId) throw new Error('User ID not found');
    const response = await axios.get(`${API_BASE_URL}/api/design-request-detail/${userId}/`, {
      headers: getAuthHeaders()
    });
    dispatch({
      type: USER_REQUESTS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: USER_REQUESTS_FAIL,
      payload: error.response?.data?.detail || error.message || 'Failed to fetch requests'
    });
  }
};

// Create User Request Action
export const createUserRequest = (requestData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REQUEST_CREATE_REQUEST });
    
    const response = await axios.post(`${API_BASE_URL}/api/design-request/`, requestData, {
      headers: getAuthHeaders()
    });
    
    dispatch({
      type: USER_REQUEST_CREATE_SUCCESS,
      payload: response.data
    });
    
    return { success: true };
  } catch (error) {
    dispatch({
      type: USER_REQUEST_CREATE_FAIL,
      payload: error.response?.data?.detail || 'Failed to create request'
    });
    return { success: false, error: error.response?.data?.detail || 'Failed to create request' };
  }
};

// Update User Request Action
export const updateUserRequest = (requestId, requestData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REQUEST_UPDATE_REQUEST });
    
    const response = await axios.put(`${API_BASE_URL}/user/requests/${requestId}/`, requestData, {
      headers: getAuthHeaders()
    });
    
    dispatch({
      type: USER_REQUEST_UPDATE_SUCCESS,
      payload: response.data
    });
    
    return { success: true };
  } catch (error) {
    dispatch({
      type: USER_REQUEST_UPDATE_FAIL,
      payload: error.response?.data?.message || 'Failed to update request'
    });
    return { success: false, error: error.response?.data?.message || 'Failed to update request' };
  }
};

 