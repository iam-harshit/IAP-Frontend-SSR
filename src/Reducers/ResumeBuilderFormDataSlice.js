import pkg from '@reduxjs/toolkit';

const { createSlice } = pkg;

const FormDataSlice = createSlice({
  name: 'resumeFormData',
  initialState: {
    userData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export const selectUserData = (state) => state.resumeFormData.userData;
export const { setUserData } = FormDataSlice.actions;
export default FormDataSlice.reducer;

const experience = {
  experienceData: null,
};

const education = {
  educationData: null,
};

const ExperienceSlice = createSlice({
  name: 'resumeExperience',
  initialState: experience,
  reducers: {
    setExperienceData: (state, action) => {
      state.experienceData = action.payload;
    },
  },
});

// for experience
export const selectExperienceData = (state) =>
  state.resumeExperience.experienceData;
export const { setExperienceData } = ExperienceSlice.actions;
export const ResumeBuilderExperienceDataReducer = ExperienceSlice.reducer;

const EducationSlice = createSlice({
  name: 'resumeEducation',
  initialState: education,
  reducers: {
    setEducationData: (state, action) => {
      state.educationData = action.payload;
    },
    deleteEducationData: (state, action) => {
      state.educationData = state.educationData.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

// for education
export const selectEducationData = (state) =>
  state.resumeEducation.educationData;
export const { setEducationData, deleteEducationData } = EducationSlice.actions;
export const ResumeBuilderEducationDataReducer = EducationSlice.reducer;
