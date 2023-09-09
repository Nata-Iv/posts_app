import { useForm } from 'react-hook-form';

const FormAuth = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  return (
    <div className="bg-purple-100">
      <form onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
};

export default FormAuth;
