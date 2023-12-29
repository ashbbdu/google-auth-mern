function authHeader() {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null;
      console.log(token , "token from api services");
    if (token != null) {
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    } else {
      return {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
    }
  }
  
  const config = {
    // api: "https://book-store-backend-whzn.onrender.com/api/v1",
    api : "http://localhost:4000"
  };
  const httpGet = (endpoint , data) => {
    return fetch(`${config.api}${endpoint}`, {
      headers: authHeader(),
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };
  const httpPost = async (endpoint, data) => {
    return await fetch(`${config.api}${endpoint}`, {
      method: "post",
      body: data ? JSON.stringify(data) : null,
      headers: authHeader(),
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error, "error");
        throw Error(error);
      });
  };
  
  const httpPut = (endpoint, data) => {
    return fetch(`${config.api}${endpoint}`, {
      method: "PUT",
      body: data ? JSON.stringify(data) : null,
      headers: authHeader(),
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };
  const httpDelete = (endpoint, data) => {
    return fetch(`${config.api}${endpoint}`, {
      method: "delete",
      headers: authHeader(),
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };
  const handleResponse = (response) => {
    return response.json();
  };
  export default {
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
  };
  