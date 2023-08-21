import axios from "axios";
import FormAuth from "./FormAuth";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { API_URL } from "../const2";
import useLocalStorage from "use-local-storage";

const FormAuthIn = () => {
  const navigate = useNavigate();

  // const [user, setUser] = useLocalStorage("user", "");

  const onSubmit = async (data) => {
    try {
      const isExistUser = await axios.get(
        `${API_URL}/users?email=${data.email}`
      );
        const createdUserName = data.email.split("@")[0]

      if (isExistUser.data.length > 0) {
        alert("this user exists");
        navigate(`../sign_up`);
        return;
      }

      const res = await axios.post(`${API_URL}/users`, {
        email: data.email,
        password: data.password,
        userName: createdUserName
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: res.data.email,
          password: res.data.password,
          id: res.data.id,
          userName: createdUserName
        })
      );
      alert("You've registered and logged in");
      navigate(`../`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-purple-100 h-screen">
      <p className=" text-center text-2xl py-10 text-purple-950">
      Create an account and log in
      </p>
      <FormAuth onSubmit={onSubmit} />
      <div className=" mt-4 m-auto flex w-96 justify-between">
        <NavLink to={`../`}>
          <p className="  text-gray-600">
            <AiOutlineArrowLeft className=" inline-block" /> Home page
          </p>
        </NavLink>
        <NavLink to={`../sign_up`}>
          <p className=" text-right  text-blue-800">
            Login <AiOutlineArrowRight className=" inline-block" />
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default FormAuthIn;
