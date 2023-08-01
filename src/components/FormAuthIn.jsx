import axios from "axios";
import FormAuth from "./FormAuth";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { API_URL } from "../const2";

const FormAuthIn = () => {
  const navigate = useNavigate();
  const onSubmit = (data) => {
    // console.log(data);
    axios.post(`${API_URL}/users`, {
      email: data.email,
      password: data.password,
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: data.email,
        password: data.password,
      })
    );
    navigate(`../`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-purple-100 h-screen">
      <p className=" text-center text-2xl py-10 text-purple-950">Зарегистр</p>
      <FormAuth onSubmit={onSubmit} />
      <div className=" mt-4 m-auto flex w-96 justify-between">
        <NavLink to={`../`}>
          <p className="  text-gray-600">
            <AiOutlineArrowLeft className=" inline-block" /> Home page
          </p>
        </NavLink>
        <NavLink to={`../sign_up`}>
          <p className=" text-right  text-blue-800">
            Уже есть аккаунт <AiOutlineArrowRight className=" inline-block" />
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default FormAuthIn;
