// ===============================================================================================================
// ^^==>Email
export const EMAIL_MESSAGES = {
  REQUIRED: "Email Is Required",
  INVALID: "Please Enter Avalid Email",
};

// ==============================================================================================================
// ^^==> Password
export const PASSWORD_MESSAGES = {
  REQUIRED: "Password Is Required",
  PATTERN:
    "Password must have at least 8 characters, including uppercase, lowercase, number, and special symbol.",
};

// =================================================================================================================
// ^^==> Confirm Password
export const CONFIRM_PASSWORD_MESSAGES = {
  REQUIRED: "Confirm Password Is Requird",
  IDENTICAL: "Confirm Password And Password Dont Match",
};
// =============================================================================================================
// ^^==> Old Password
export const OLD_PASSWORD_MESSAGES = {
    REQUIRED:"Old Password Is Required",
}
// ==============================================================================================================
// ^^==> Verify Otp

export const VERIFY_OTP_MESSAGES={
    LENGTH:"Your one-time password must be 6 characters.",
}
// ===============================================================================================================
// ^^==> First & Last Name
export const FIRST_LAST_MESSAGES = {
  REQUIRED: (fieldName: string) => `${fieldName} Is Required`,
  PATTERN: (fieldName: string) => `${fieldName} must only letters`,
  MIN_LENGTH: (fieldName: string) => `${fieldName}at least 3 characters`,
};
// ===============================================================================================================
// ^^==> User Name
export const USER_NAME_MESSAGES = {
  REQUIRED: "User Name Is Required",
  PATTERN: "User Name At least 3 Characters",
};

// ================================================================================================================
// ^^==> Phone
export const PHONE_MESSAGE = {
  REQUIRED: "Phone is required",
  PATTERN: "Egyptian Number Only Accepted",
};
