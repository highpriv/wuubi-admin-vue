let authValue = true;

export function login() {
  authValue = true;
}

export function logout() {
  authValue = false;
}

export function isAuthenticated() {
  return authValue;
}
