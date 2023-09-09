import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import FormAuth from '../components/FormAuth';
import axios from 'axios';
import { API_URL2 } from '../constants';

const FormAuthUp = () => {
  const navigate = useNavigate();

  const logInUser = async (data) => {
    try {
      const isLogged = await axios.get(`${API_URL2}/users`, {
        email: data.email,
        password: data.password,
        userName: data.userName,
      });
      const res = isLogged.data.find(
        (user) => user.email === data.email && user.password === data.password,
      );

      if (!res) {
        alert('wrong email or password, try again');
        return;
      }
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: res.email,
          password: res.password,
          id: res.id,
          userName: res.userName,
          name: res.name,
          country: res.country,
        }),
      );
      alert('You are logged in');
      navigate(`../`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-purple-100 h-screen">
      <p className=" text-center text-2xl py-10 text-purple-950">Login</p>
      <FormAuth onSubmit={logInUser} />
      <div className=" mx-auto w-96 flex justify-between mt-4 ">
        <NavLink to={`../`}>
          <p className="  text-gray-500">
            <AiOutlineArrowLeft className=" inline-block" /> Home page
          </p>
        </NavLink>
        <NavLink to={`../sign_in`}>
          <p className=" text-right  text-blue-800">
            Registration <AiOutlineArrowRight className=" inline-block" />
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default FormAuthUp;
