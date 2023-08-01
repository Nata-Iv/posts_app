import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import FormAuth from "./FormAuth";

const FormAuthUp = () => {
  return (
    <div className="bg-purple-100 h-screen">
      <p className=" text-center text-2xl py-10 text-purple-950">Войти</p>
      <FormAuth />
      <div className=" mx-auto w-96 flex justify-between mt-4 ">
        <NavLink to={`../`}>
          <p className="  text-gray-500">
            <AiOutlineArrowLeft className=" inline-block" /> Home page
          </p>
        </NavLink>
        <NavLink to={`../sign_in`}>
          <p className=" text-right  text-blue-800">
            Регистрация <AiOutlineArrowRight className=" inline-block" />
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default FormAuthUp;
