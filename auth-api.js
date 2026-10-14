async function postAuth(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  const result = await response.json();
  if (!response.ok) {
    const error = new Error(result.message || "The request could not be completed.");
    error.status = response.status;
    error.retryAfterSeconds = Number(result.retryAfterSeconds) || 0;
    throw error;
  }
  return result;
}

export function requestRegistrationOtp(details) {
  return postAuth("/api/auth/register/request-otp", details);
}

export function verifyRegistrationOtp(details) {
  return postAuth("/api/auth/register/verify-otp", details);
}

export function registerAccount(account) {
  return postAuth("/api/auth/register", account);
}

export function createSession(credentials) {
  return postAuth("/api/auth/login", credentials);
}

export function requestPasswordReset(email) {
  return postAuth("/api/auth/forgot-password", { email });
}

export function verifyPasswordResetOtp(details) {
  return postAuth("/api/auth/verify-reset-otp", details);
}

export function resetPassword(details) {
  return postAuth("/api/auth/reset-password", details);
}
