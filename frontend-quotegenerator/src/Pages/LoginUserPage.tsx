import axios, { AxiosResponse } from "axios";
import { useState, FormEvent } from "react";
import { Link, redirect } from "react-router-dom";
import { TextInput } from "../Components/TextInput";

function LoginUserPage() {
  const [infoInputs, setInfoInputs] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("");

  const handleUserLogin = async (event: FormEvent) => {
    event.preventDefault();
    const user = { user: {...infoInputs} };
    const url = process.env.API_URL;
    axios
      .post(`${url}/login`, user)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          console.log("Log in successful");
          setStatus("Login Successful.  Redirecting to Home Page");
          localStorage.setItem("ACCESS_TOKEN_NAME", response.data.token);
          //redirectToHome();
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("Server Issue While Logging In");
      });
  };

  return (
    <main>
      <div className="container">
        <div className="login-title-container">
          <h4>Log In</h4>
        </div>
        <form className="sign-in-form" onSubmit={(e) => handleUserLogin(e)}>
          <div className="input-fields">
            <TextInput
              id="email"
              type="email"
              value={infoInputs.email}
              placeholder="Enter Email"
              onChange={(e) =>
                setInfoInputs({ ...infoInputs, email: e.currentTarget.value })
              }
            />
            <div>
              <label className="sign-in-label">Password</label>
              <input
                id="password"
                type="password"
                value={infoInputs.password}
                placeholder="Enter Password"
                onChange={(e) =>
                  setInfoInputs({ ...infoInputs, password: e.target.value })
                }
              ></input>
            </div>
          </div>
          <button className="sign-in-button" type="submit">
            Log In
          </button>
          <div>{status}</div>
        </form>
        <div className="login-redirect">
          <span>{"Don't Have an Account? "}</span>
          <Link className="clickable-text" to="/createUserPage">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}

export default LoginUserPage;