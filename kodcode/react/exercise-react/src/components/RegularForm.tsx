import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const ReactHookForm =()=> {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        rules={{ required: true, minLength: 2 }}
        render={({ field }) => (
          <>
            <input {...field} placeholder="Username" />
            {errors.username && (
              <p>Username is required and must have at least 2 characters</p>
            )}
          </>
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{ required: true, pattern: /^\S+@\S+$/i }}
        render={({ field }) => (
          <>
            <input {...field} placeholder="Email" />
            {errors.email && (
              <p>Email is required and must be in a valid format</p>
            )}
          </>
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: true,
          pattern:
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/,
        }}
        render={({ field }) => (
          <>
            <input {...field} placeholder="Password" type="password" />
            {errors.password && (
              <p>
                Password must contain at least one uppercase letter, one
                lowercase letter, one number, one special character, and be 8-20
                characters long
              </p>
            )}
          </>
        )}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default ReactHookForm
