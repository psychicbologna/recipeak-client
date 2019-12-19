import jwtDecode from 'jwt-decode';

let _timeoutId
const _TEN_SECONDS_IN_MS = 10000;

const TokenService = {
  saveAuthToken(token) {
    return window.sessionStorage.setItem('token', token)
  },
  getAuthToken() {
    return window.sessionStorage.getItem('token')
  },
  clearAuthToken() {
    console.info('clearing auth token')
    return window.sessionStorage.removeItem('token')
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
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
    const msUntilExpiry = TokenService._getMsUntilExpiry(TokenService.readJwtToken())
    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS)
  },
  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId)
  },
  fetchUsername() {
    return TokenService.readJwtToken().sub;
  },
}

export default TokenService
