import styles from "./login.module.css";
// import Loading from "@/components/Loading/Loading";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "@/features/user/userSlice";
export default function Login() {
  const { isAuth } = useSelector((store) => store.User);
  const router = useRouter();
  const { asPath } = router;
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(form));
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };
  if (isAuth) {
    router.push("/dashboard");
    return <></>;
  }
  return (
    <div className={styles.bodyBackground}>
      <div className={styles.loginContainer}>
        <div className={styles.loginBody}>
          <h1 className={styles.loginHead}>Login</h1>
          <form className={styles.loginFrom}>
            <div className={styles.inputBox}>
              <input
                className={styles.loginInput}
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <label className={styles.loginLabel} htmlFor="email">
                Email
              </label>
            </div>
            <div className={styles.inputBox}>
              <input
                className={styles.loginInput}
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <label className={styles.loginLabel} htmlFor="password">
                Password
              </label>
            </div>

            <button className={styles.loginButton} type="submit" onClick={handleSubmit}>
              Login
            </button>
            <div className={styles.registerContainer}>
              <p>Don't have an Account</p>
              <Link className={styles.aLogin} href="/register">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
