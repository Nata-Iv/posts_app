import axios from 'axios';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { API_URL2 } from '../constants';
import { useForm } from 'react-hook-form';

const FormAuthIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const isExistUser = await axios.get(
        `${API_URL2}/users?email=${data.email}`,
      );
      const createdUserName = data.email.split('@')[0];

      if (isExistUser.data.length > 0) {
        alert('this user exists');
        navigate(`../sign_up`);
        return;
      }

      const res = await axios.post(`${API_URL2}/users`, {
        email: data.email,
        password: data.password,
        userName: createdUserName,
        name: data.name,
        country: data.country,
      });
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: res.data.email,
          password: res.data.password,
          id: res.data.id,
          name: data.name,
          country: data.country,
          userName: createdUserName,
        }),
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Name"
          className=" block mx-auto w-96 input"
          defaultValue=""
          {...register('name', {
            required: 'Required field',
          })}
        />
        <div className=" h-6"></div>
        <div className=" h-6"></div>
        <input
          placeholder="Country"
          className=" block mx-auto w-96 input"
          defaultValue=""
          {...register('country', {
            required: 'Required field',
          })}
        />
        <div className=" h-6"></div>
        <div className=" h-6"></div>
        <input
          placeholder="Email address"
          className=" block mx-auto w-96 input"
          defaultValue=""
          {...register('email', {
            required: 'Required field',
          })}
        />
        <div className=" h-6">
          {errors.email && (
            <span className=" block text-center text-red-800">
              This field is required
            </span>
          )}
        </div>

        <input
          placeholder="Password"
          type="password"
          className=" block mx-auto w-96 mt-5 input"
          {...register('password', {
            required: true,
            minLength: {
              value: 5,
              message: 'Min is 5 symbols',
            },
            maxLength: {
              value: 15,
              message: 'Max is 15 symbols',
            },
            validate: (value) => {
              return (
                [/[a-z]/, /[A-Z]/, /[0-9]/, /[!@#$%^&*]/].every((pattern) =>
                  pattern.test(value),
                ) || 'must include lower, upper, number, and special chars'
              );
            },
          })}
        />
        <div className=" h-6">
          {errors?.password && (
            <p className=" block text-center text-red-800">
              {errors?.password?.message || 'Error'}
            </p>
          )}
        </div>

        <input
          disabled={!isValid}
          type="submit"
          value="Send Request"
          className="block mx-auto mt-5 py-1 px-3 border-2 rounded-full border-indigo-600 text-indigo-600 hover:text-white hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-violet-300"
        />
      </form>
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
