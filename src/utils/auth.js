export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (email, password) => {
  console.log("password: ", password);
  console.log("email: ", email);

  return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
  })
  .then((response) => {
    try {
      if (response.status === 200){
        return response.json();
      }
    } catch(e){
      return (e)
    }
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then((response => response.json()))
  .then((data) => {
    // console.log("data: ", data.token);
    if (data.token){
      console.log("data: ", data.token);
      localStorage.setItem("jwt", data.token);
      return data;
    } else {
      return;
    }
  })
  .catch(err => console.log(err))
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
  .then(res => res.json())
  .then(data => data)
} 