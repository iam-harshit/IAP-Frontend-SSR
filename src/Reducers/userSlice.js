// src/Reducers/userSlice.js
import pkg from '@reduxjs/toolkit';
import axios from 'axios';
import { profileEndpoints } from '@/services/BackendApis';

const { createSlice, createAsyncThunk } = pkg;
// Define the async action
export const updateUserAsync = createAsyncThunk(
  'user/updateUserAsync',
  async (user, { dispatch, getState }) => {
    const updatedUserResponse = {
      ...getState().user.currentUser,
      ...user,
    };

    try {
      const response = await axios.put(
        profileEndpoints.UPDATE_PROFILE_API,
        updatedUserResponse,
        { withCredentials: true }
      );
      dispatch(updateUser(response.data.data));
      return response.data.data;
    } catch (error) {
      console.error(error.response.data);
      throw error;
    }
  }
);

const initialState = {
  currentUser: null,
  profileDetails: null,
  loading: false,
  error: false,
  section: '',
  isEditing: false,
};

const parseDate = (dateStr) => {
  if (!dateStr) {
    return { startDate: null, endDate: null };
  }

  const dateParts = dateStr.split('–');
  try {
    if (dateParts.length === 2) {
      const startDate = new Date(dateParts[0].trim()).toISOString();
      const endDate = new Date(dateParts[1].trim()).toISOString();
      return { startDate, endDate };
    }
    return {
      startDate: new Date(dateParts[0].trim()).toISOString(),
      endDate: null,
    };
  } catch (error) {
    console.error(
      'Error parsing date:',
      error,
      'Original date string:',
      dateStr
    );
    return { startDate: null, endDate: null };
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      // console.log(action.payload)
      state.loading = false;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      Object.assign(state, initialState);
    },
    updateUser: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
        // userResponse: p{
        //   ...state.currentUser.userResponse,
        //   ...action.payload,
        // },
      };
    },
    updateAbout: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        userResponse: {
          ...state.currentUser.userResponse,
        },
      };
    },
    // Mentor/Mentee Update
    updateProfileDetails: (state, action) => {
      state.profileDetails = action.payload;
    },
    // Mentor/Mentee Update
    toggleShowOnProfile: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        showOnProfile: action.payload === false ? 0 : 1,
      };
    },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setSection: (state, action) => {
      state.section = action.payload;
    },
    setJsonData: (state, action) => {
      const { education, experience } = action.payload;

      const formattedEducation = education.map((edu) => {
        const { startDate, endDate } = parseDate(edu.dates);
        return {
          degree: edu.degree,
          clgName: edu.institution,
          startDate,
          endDate,
        };
      });

      const formattedWork = experience?.map((exp) => {
        const { startDate, endDate } = parseDate(exp.dates);
        return {
          jobTitle: exp.title,
          compName: exp.company,
          startDate,
          endDate,
          description: exp.description,
        };
      });

      state.currentUser = {
        ...state.currentUser,
        userResponse: {
          ...state.currentUser.userResponse,
          userProfile: {
            ...state.currentUser.userResponse.userProfile,
            workAndEducation: {
              work: formattedWork,
              education: formattedEducation,
            },
          },
        },
      };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(updateUserAsync.fulfilled, (state, action) => {
  //     state.currentUser.userResponse = action.payload;
  //   });
  // },

  extraReducers: (builder) => {
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      state.currentUser.userResponse = action.payload;
    });
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUser,
  setSection,
  updateProfileDetails,
  setEditing,
  logoutUser,
  setJsonData,
  toggleShowOnProfile,
} = userSlice.actions;

export default userSlice.reducer;
