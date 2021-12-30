export default function () {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.access) {
    return { Authorization: `Bearer ${user.access}` };
  }
  return {};
}
