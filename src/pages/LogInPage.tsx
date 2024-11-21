import style from '../styles/helpers/container.module.scss';

export const LogInPage: React.FC = () => {
  return (
    <div className={style.container}>
      <div className="mb-24">
        <h1 className="flex justify-center">Sign Up</h1>
      </div>
      <form className="flex justify-center flex-col gap-16">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded p-16 hover:border-icons transition-colors duration-300 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded p-16 hover:border-icons transition-colors duration-300 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded p-16 hover:border-icons transition-colors duration-300 outline-none"
        />
        <button className="bg-slate-950 text"> Sign Up</button>
        <button> Enter as a guest</button>
      </form>
      <p>Log In</p>
      ------------------or--------------
      <button>Sign Up with google</button>
    </div>
  );
};
