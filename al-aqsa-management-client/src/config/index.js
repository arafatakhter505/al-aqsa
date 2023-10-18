const dev = {
  serverUrl: process.env.REACT_APP_serverUrl,
  jwt: JSON.parse(localStorage.getItem("user")).token,
};

export default dev;
