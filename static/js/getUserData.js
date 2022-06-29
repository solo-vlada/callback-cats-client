const getUserData = async () => {
  let fetchUserData;
  const accessToken = sessionStorage.getItem("accesstoken");
  const userId = jwt_decode(accessToken);
  const options = new Headers({
    accesstoken: sessionStorage.getItem("accesstoken"),
  });
  try {
    fetchUserData = await fetch(
      `https://callback-cats-server.herokuapp.com/users/${userId.id}`,
      {
        headers: new Headers({
          accesstoken: sessionStorage.getItem("accesstoken"),
        }),
      }
    );
  } catch (err) {
    console.log(err);
  }

  let result = await fetchUserData.json();
  // this line might be wrong
  return result.data.user;
};

module.exports = getUserData;
