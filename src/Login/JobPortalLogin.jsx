import React, { useEffect, useState } from 'react';
import Auth from "../pages/AuthUser";

const JobPortalLogin = () => {
  const [loginData, setLoginData] = useState([]);
  const { http } = Auth();
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const fetchLoginData = async () => {
    try {
      const response = await http.get("/user/list");
      setLoginData(response.data);
    } catch (error) {
      console.error("Error fetching login data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchLoginData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = loginData.find(user => user.user_email === username);
    console.log(user);

    if (user) {
      
      if (user.user_pass === password) {
        setMessage("Login successful");
      } else {
        setMessage("Password incorrect");
      }
    } else {
      setMessage("Username or password incorrect");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '300px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {message && <div className="alert alert-info">{message}</div>}
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobPortalLogin;
