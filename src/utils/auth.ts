function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log(payload.exp * 1000 > Date.now());
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export { isTokenValid };
