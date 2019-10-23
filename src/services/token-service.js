import jwtDecode from 'jwt-decode';
import config from '../config';

let _timeoutId
const _TEN_SECONDS_IN_MS = 10000;

const TokenService = {
  saveAuthToken(token) {
    return window.localStorage.setItem(config.TOKEN_KEY, token)
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    return window.localStorage.removeItem(config.TOKEN_KEY)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
  parseJwt(jwt) {
    return jwtDecode(jwt)
  },
  readJwtToken() {
    return TokenService.parseJwt(TokenService.getAuthToken())
  },
  _getMsUntilExpiry(payload) {
    return (payload.exp * 1000) - Date.now()
  },
  queueCallbackBeforeExpiry(callback) {
    const msUntilExpiry = TokenService._getMsUntilExpiry(TokenService.readJwtToken)
    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS)
  },
  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId)
  },
  fetchUsername() {
    return TokenService.readJwtToken().sub;
  },
  setSessionUserData(userdata) {
    sessionStorage.setItem('user', JSON.stringify(userdata.user));
  },
  clearSessionUserdata() {
    sessionStorage.removeItem('user');
  },
  getSessionUserdata() {
    return JSON.parse(sessionStorage.getItem('user'));
  },
  hasSessionUserdata() {
    return !!TokenService.getSessionUserdata();
  }

}

export default TokenService
