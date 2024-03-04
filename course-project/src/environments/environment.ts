interface Env {
  API_URL: string
  SIGN_UP_URL: string
  SIGN_IN_URL: string
}

const API_KEY = 'AIzaSyDAvxCA3XZycEPFnsZD1z0uNrZlqczIPiw'

export const environment: Env = {
  API_URL: 'https://ng-complete-guide-5df13-default-rtdb.europe-west1.firebasedatabase.app',
  SIGN_UP_URL: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
  SIGN_IN_URL: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
};
