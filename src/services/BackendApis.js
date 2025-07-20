const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1`;

// AUTH ENDPOINTS
export const authEndpoints = {
  SIGNUP_INTENT_API: BASE_URL + '/intent/pre-signup',
  SIGNUP_API: BASE_URL + '/auth/signup',
  SIGNIN_API: BASE_URL + '/auth/signin',
  GOOGLE_AUTH_API: BASE_URL + '/auth/google',
  GOOGLE_CALLBACK_API: BASE_URL + '/auth/google/callback',
  LOGOUT_API: BASE_URL + '/auth/logout',
  SEND_OTP_API: BASE_URL + '/auth/send-otp',
  VERIFY_OTP_API: BASE_URL + '/auth/verify-otp',
  SEND_RESET_OTP_API: BASE_URL + '/auth/send-reset-otp',
  VERIFY_RESET_OTP_API: BASE_URL + '/auth/verify-reset-otp',
  RESET_PASSWORD_API: BASE_URL + '/auth/reset-password',
};

// EVENT ENDPOINTS
export const eventEndpoints = {
  CREATE_EVENT_API: BASE_URL + '/slots/create', //newly added
  GET_ALL_VIEW_EVENTS_BY_MENTOR: BASE_URL + '/slots/mentor/history', //newly added
  CREATE_SESSION: BASE_URL + '/session/create', //newly added
  CANCEL_SLOT: BASE_URL + '/slots', //newly added
  GET_ALL_EVENTS_API: BASE_URL + '/events/get',
  GET_EVENT_BY_ID_API: BASE_URL + '/events/get/:id',
  GET_EVENTS_BY_CATEGORY_API: BASE_URL + '/events/getCategoryEvent/:category',
  SEARCH_EVENTS_API: BASE_URL + '/events/search/:query',
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  UPDATE_PROFILE_API: BASE_URL + '/user/update-profile', // delete
  GET_ALL_MENTORS_API: BASE_URL + '/user/get-all-mentors',
  GET_INSPIRED_MENTORS_API: BASE_URL + '/user/get-inspired-mentors',
  GET_USER_DATA: BASE_URL + '/user/data',
  // Newly Added
  UPDATE_COMMON_PROFILE_API: BASE_URL + '/profile/updateCommonProfileDetails',
  GET_COMMON_PROFILE_API: BASE_URL + '/profile/getCommonProfileDetails',
  UPDATE_MENTOR_PROFILE_API: BASE_URL + '/profile/mentor/updateMentorProfileDetails',
  UPDATE_MENTEE_PROFILE_API: BASE_URL + '/profile/mentee/updateMenteeProfileDetails',
  GET_MY_PROFILE_API: BASE_URL + '/profile/myprofile',
  GET_COMPANY_LOGO_API: BASE_URL + '/profile/company/logo',
  GET_PUBLIC_ROUTE: BASE_URL + '/profile/cbs-iap',
  FOLLOW_USER: BASE_URL + '/socials/follow',
  UNFOLLOW_USER: BASE_URL + '/socials/unfollow',
   IS_FOLLOWING: BASE_URL + '/socials/followers-stats', 
  FOLLOW_STATS: BASE_URL + '/socials/follow-stats',  
};

// SLOTS ENDPOINTS
export const availabilitySlotsEndPoints = {
  CREATE_SLOTS: BASE_URL + '/mentor/schedule',
  TOGGLE_VISIBILITY: BASE_URL + '/mentor/changeVisibility',
  BOOK_SLOTS: BASE_URL + '/session/bookSlot',
  VERIFY_PAYMENT: BASE_URL + '/session/verifyPayment',
  GET_MENTOR_SLOT_HISTORY: BASE_URL + '/slots/mentor/history',
  GET_ALL_SLOTS: BASE_URL + '/slots/list',
  GET_SLOTS_COUNT: BASE_URL + '/slots/count',
  SUBMIT_SLOT_REQUEST: BASE_URL + '/slots/request'
};

// Explore MENTOR ENDPOINTS
export const findMentorEndpoints = {
  SEARCH_MENTORS: BASE_URL + '/mentor/searchMentors',
  EXPLORE_MENTORS: BASE_URL + '/mentor/explore',
};

// PRICING ENDPOINTS
export const pricingEndPoints = {
  PRICE: BASE_URL + '/pricing',
};

// DASHBOARD ENDPOINTS
export const dashboardEndPoints = {
  PHONE_VISIBILITY: BASE_URL + '/user/changeNumberVisibility',
  EMAIL_VISIBILITY: BASE_URL + '/user/changeEmailVisibility',
  NEXT_SESSION: BASE_URL + '/session/nextSession/:username',
};

// SESSIONS ENDPOINTS
export const sessionEndPoints = {
  MENTEE_SESSIONS: BASE_URL + '/session/getMenteeSessions',
  MENTOR_SESSIONS: BASE_URL + '/session/getMentorSessions',
  RESCHEDULE_SESSIONS: BASE_URL + '/session/rescheduleSession',
  MENTOR_CANCEL_SESSION: BASE_URL + '/session/cancelSessionByMentor',
  MENTEE_CANCEL_SESSION: BASE_URL + '/session/cancelSessionByMentee',
  GET_DASHBOARD_SESSIONS: BASE_URL + '/session/dashboard',
  SESSION_GENERAL: BASE_URL + '/session',
};

// PAYMENT ENDPOINTS
export const paymentEndPoints = {
  CREATE_ORDER: BASE_URL + '/payment/create-order',
  VERIFY_PAYMENT: BASE_URL + '/payment/verify-payment',
  MENTEES_PER_MONTH: BASE_URL + '/mentor/menteesPerMonth',
  EARNING_PER_MONTH: BASE_URL + '/mentor/earningPerMonth',
  TOTAL_EARNING: BASE_URL + '/mentor/totalEarning',
  TOTAL_MENTEES_ATTENDED: BASE_URL + '/mentor/totalMenteesAttended',
  PAYMENT_HISTORY_MENTEE: BASE_URL + '/session/paymentHistoryMentee',
  PAYMENT_HISTORY_MENTOR: BASE_URL + '/session/paymentHistoryMentor',
  SESSIONS_PER_MONTH: BASE_URL + '/session/sessionsPerMonth',
};

// BANK DETAILS ENDPOINTS
export const bankDetailsEndPoints = {
  ADD_BANK_DETAILS: BASE_URL + '/payment/addBankDetails',
  GET_BANK_DETAILS: BASE_URL + '/payment/getBankDetails',
  UPDATE_BANK_DETAILS: BASE_URL + '/payment/updateBankDetails',
};

// BLOGS ENDPOINTS
export const blogEndPoints = {
  GET_ALL_BLOGS: BASE_URL + '/blogs/all',
  GET_ALL_SLOTS: BASE_URL + '/slots/',
  CREATE_BLOGS: BASE_URL + '/blogs/create',
  GET_BLOGS_BY_USERID: BASE_URL + '/blogs/user/:userid',
  GET_BLOG_BY_ID: BASE_URL + '/blogs',
  UPDATE_BLOG_BY_ID: BASE_URL + '/blogs',
  DELETE_BLOG_BY_ID: BASE_URL + '/blogs',
  GET_FEATURED_BLOG: BASE_URL + '/blogs/all/featured',
  LIKE_BLOG: BASE_URL + '/blogs',
  COMMENT_BLOG: BASE_URL + '/blogs',
};

//SUPPORT ENDPOINTS
export const supportEndPoints = {
  SEND_MESSAGE : BASE_URL + '/support/contact/submit'
}