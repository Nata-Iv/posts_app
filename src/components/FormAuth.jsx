import { useForm } from "react-hook-form";

const FormAuth = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => console.log(data);

  console.log(watch("email")); // watch input value by passing the name of it

  return (
    <div className="bg-purple-100 h-screen">
      <p className=" text-center text-2xl py-10 text-purple-950">Sign in</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
        placeholder="Email address"
          className=" block mx-auto w-96 input"
          defaultValue=""
          {...register("email", {
            required: "Required field",
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
          {...register("password", {
            required: true,
            minLength: {
              value: 5,
              message: "Min is 5 symbols",
            },
            maxLength: {
              value: 15,
              message: "Max is 15 symbols",
            },
          })}
        />
        <div className=" h-6">
          {errors?.password && (
            <p className=" block text-center text-red-800">
              {errors?.password?.message || "Error"}
            </p>
          )}
        </div>

        <input
          disabled={!isValid}
          type="submit"
          className="block mx-auto mt-5 py-1 px-3 border-2 rounded-full border-indigo-600 text-indigo-600 hover:text-white hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-violet-300"
        />
      </form>
    </div>
  );
};

export default FormAuth;
