type Props = {
  name: string;
  password: string;
};

export function NewPasswordTemplate({ name, password }: Props) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Your new password is: {password}</p>
      <p>
        Sign in here:
        <a href={`${process.env.BETTER_AUTH_URL}/auth/signin`}>Sign in</a>
      </p>
    </div>
  );
}
