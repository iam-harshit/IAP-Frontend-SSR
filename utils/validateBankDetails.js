export const validateBankForm = (bankDetails) => {
  const errors = {};

  const nameRegex = /^[a-zA-Z\s]+$/;
  const accountNumberRegex = /^\d+$/;
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/; // Proper IFSC format
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z][a-zA-Z0-9.\-]{2,64}$/;

  // Account Holder Name
  const name = bankDetails.accountHolderName?.trim() || '';
  if (!name) {
    errors.accountHolderName = 'Account holder name is required.';
  } else if (name.length < 2) {
    errors.accountHolderName = 'Name must be at least 2 characters long.';
  } else if (!nameRegex.test(name)) {
    errors.accountHolderName = 'Name should contain only letters and spaces.';
  }

  // Bank Name
  const bankName = bankDetails.bankName?.trim() || '';
  if (!bankName) {
    errors.bankName = 'Bank name is required.';
  } else if (bankName.length < 2) {
    errors.bankName = 'Bank name must be at least 2 characters long.';
  } else if (!nameRegex.test(bankName)) {
    errors.bankName = 'Bank name should contain only letters and spaces.';
  }

  // Account Number
  const accountNumber = bankDetails.accountNumber?.trim() || '';
  if (!accountNumber) {
    errors.accountNumber = 'Account number is required.';
  } else if (!accountNumberRegex.test(accountNumber)) {
    errors.accountNumber = 'Account number should contain only digits.';
  } else if (accountNumber.length < 9 || accountNumber.length > 18) {
    errors.accountNumber = 'Account number must be between 9 and 18 digits.';
  }

  // IFSC Code
  const ifsc = bankDetails.ifscCode?.trim().toUpperCase() || '';
  if (!ifsc) {
    errors.ifscCode = 'IFSC code is required.';
  } else if (!ifscRegex.test(ifsc)) {
    errors.ifscCode = 'Invalid IFSC code format. Example: SBIN0001234';
  }

  // UPI ID (optional but validate if provided)
  const upiId = bankDetails.upiId?.trim() || '';
  if (upiId && !upiRegex.test(upiId)) {
    errors.upiId = 'Invalid UPI ID format. Example: user@paytm';
  }

  return errors;
};
