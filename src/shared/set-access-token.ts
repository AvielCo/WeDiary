export function setAccessToken(at: any) {
  if (at) {
    window.localStorage.setItem('accessToken', at);
  }
}
