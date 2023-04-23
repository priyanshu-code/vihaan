import styles from "./login.module.css";
// import Loading from "@/components/Loading/Loading";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { loginUser } from "@/features/user/userSlice";
export default function Login() {
  // const { isAuth } = useSelector((store) => store.User);
  const router = useRouter();
  // const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(loginUser(form));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };
  // if (isAuth) {
  //   router.push("/dashboard");
  //   return <></>;
  // }
  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginHead}>Login</h1>
      <form className={styles.loginFrom}>
        <label className={styles.loginLabel} htmlFor="email">
          Email
        </label>
        <input className={styles.loginInput} type="email" id="email" name="email" value={form.email} onChange={handleChange} required />

        <label className={styles.loginLabel} htmlFor="password">
          Password
        </label>
        <input className={styles.loginInput} type="password" id="password" name="password" value={form.password} onChange={handleChange} required />

        <button className={styles.loginButton} type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
      <p>
        Don&apos;t have an account?{" "}
        <Link className={styles.aLogin} href="/register">
          Register here
        </Link>
      </p>
    </div>
  );
}
