import { useSelector, useDispatch } from 'react-redux';
import {
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserRequests,
  createUserRequest,
  updateUserRequest
} from './actions';

// User hooks
export const useUser = () => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  
  return {
    ...userState,
    login: (email, password) => dispatch(loginUser(email, password)),
    logout: () => dispatch(logoutUser())
  };
};

// Profile hooks
export const useProfile = () => {
  const dispatch = useDispatch();
  const profileState = useSelector(state => state.profile);
  
  return {
    ...profileState,
    fetchProfile: () => dispatch(getUserProfile()),
    updateProfile: (profileData) => dispatch(updateUserProfile(profileData))
  };
};

// Requests hooks
export const useRequests = () => {
  const dispatch = useDispatch();
  const requestsState = useSelector(state => state.requests);
  
  return {
    ...requestsState,
    fetchRequests: () => dispatch(getUserRequests()),
    createRequest: (requestData) => dispatch(createUserRequest(requestData)),
    updateRequest: (requestId, requestData) => dispatch(updateUserRequest(requestId, requestData))
  };
};

// Combined hook for profile page
export const useProfilePage = () => {
  const user = useUser();
  const profile = useProfile();
  const requests = useRequests();
  
  return {
    user,
    profile,
    requests
  };
}; 