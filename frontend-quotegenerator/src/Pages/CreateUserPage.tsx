import axios, { AxiosResponse } from "axios";
import { redirect, Link } from "react-router-dom";
import { useState } from "react";
import { Form } from '../Components'

function CreateUserPage() {
  const [infoInputs, setInfoInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState("");
  const url = process.env.API_URL;

  const handleCreateUser = async () => {
    const user = { user: {...infoInputs} };
    axios
      .post(`${url}/createUserPage/createUser`, user)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setStatus("Login Successful.  Redirecting to Home Page");
          localStorage.setItem("ACCESS_TOKEN_NAME", response.data.token);
          //redirectToHome();
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("Server Issue Creating the User");
      });
  };

  return (
    <main>
      <div className="container">
        <div className="login-title-container">
          <h4>Register User</h4>
        </div>
        <Form onSubmit={handleCreateUser}>
          <>
          <label className="sign-in-label">Full Name</label>
          <input
            id="name"
            value={infoInputs.name}
            placeholder="Enter Name"
            onChange={(e) =>
              setInfoInputs({ ...infoInputs, name: e.target.value })
            }
          ></input>
          <label className="sign-in-label">Email</label>
          <input
            id="email"
            type="email"
            value={infoInputs.email}
            placeholder="Enter Email"
            onChange={(e) =>
              setInfoInputs({ ...infoInputs, email: e.target.value })
            }
          ></input>
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
          <label className="sign-in-label">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={infoInputs.confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) =>
              setInfoInputs({ ...infoInputs, confirmPassword: e.target.value })
            }
          ></input>
          <button className="sign-in-button" type="submit">
            Register
          </button>
          <div>{status}</div>
          </>
        </Form>
        <div className="login-redirect">
          <span>{"Already Have an Account? "}</span>
          <Link className="clickable-text" to="/login">
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
}

export default CreateUserPage;