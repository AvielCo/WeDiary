export function setAccessToken(at: {
  accessToken: string;
  expireDate: number;
}) {
  if (at) {
    window.localStorage.setItem('accessToken', JSON.stringify(at));
  }
}

export function getAccessToken(): {
  accessToken: string;
  expireDate: number;
} | null {
  const storagedAccessToken = window.localStorage.getItem('accessToken');
  if (storagedAccessToken) {
    const accessTokenObject = JSON.parse(storagedAccessToken);
    const now = new Date().getTime();
    if (now < accessTokenObject.expireDate) {
      return accessTokenObject;
    }
  }
  window.localStorage.removeItem('accessToken');
  return null;
}
