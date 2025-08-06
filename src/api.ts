// src/api.ts

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

// Image Tool Endpoints
export const CONVERT_IMAGE_ENDPOINT = '/api/image/convert/';
export const GET_JOB_STATUS_BASE_ENDPOINT = '/api/image/jobs/'; // Base for /jobs/{id}/status/
export const GET_JOB_DOWNLOAD_BASE_ENDPOINT = '/api/image/jobs/'; // Base for /jobs/{id}/download/

// Authentication Endpoints
export const AUTH_REGISTER_ENDPOINT = '/api/auth/register/';
export const AUTH_LOGIN_ENDPOINT = '/api/auth/login/';
export const AUTH_LOGOUT_ENDPOINT = '/api/auth/logout/';
export const AUTH_USER_ENDPOINT = '/api/auth/user/'; // For GET (fetch) and PATCH/PUT (update) user details
export const AUTH_CSRF_ENDPOINT = '/api/auth/csrf/';

// Password Reset Endpoints (NEW)
export const AUTH_PASSWORD_RESET_REQUEST_ENDPOINT = '/api/auth/users/reset_password/'; // POST to request reset email
export const AUTH_PASSWORD_RESET_CONFIRM_ENDPOINT = '/api/auth/users/reset_password_confirm/'; // POST to confirm reset with UID/token