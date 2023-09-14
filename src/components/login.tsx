import { type FormEvent, useRef } from "react";
import { useCookies } from "react-cookie";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [cookies, setCookie] = useCookies(["sessionId"]);

  return (
    <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-center text-3xl font-extrabold">Login</h2>
      <form
        className="mt-8 space-y-6"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={async (e: FormEvent) => {
          e.preventDefault();

          const res = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            body: JSON.stringify({
              email: emailRef.current?.value,
              password: passwordRef.current?.value,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = (await res.json()) as { session: string };
          setCookie("sessionId", data.session, { sameSite: "lax", path: "/" });
        }}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Adres e-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 w-full rounded-md border p-2"
            ref={emailRef}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Hasło
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 w-full rounded-md border p-2"
            ref={passwordRef}
          />
        </div>
        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Zaloguj
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
