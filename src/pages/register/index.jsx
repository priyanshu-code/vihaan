import { useState } from "react";
import styles from "./register.module.css";
import { useRouter } from "next/router";
// import { useSelector } from "react-redux";
import Link from "next/link";
// import axios from "axios";
// import Loading from "@/components/Loading/Loading";
export default function Register() {
  // const { isAuth } = useSelector((store) => store.User);
  const router = useRouter();
  const formData = new FormData();
  const [picture, setPicture] = useState("");
  const [user, setUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value, files } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: name === "picturePath" ? files[0] : value };
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    //   formData.append("username", user.username);
    //   formData.append("firstname", user.firstname);
    //   formData.append("lastname", user.lastname);
    //   formData.append("email", user.email);
    //   formData.append("password", user.password);
    //   formData.append("picture", picture);
    //   try {
    //     const response = await axios.post("http://localhost:5000/api/v1/auth/register", formData, {
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "multipart/form-data",
    //       },
    //     });
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // if (isAuth) {
    //   router.push("/dashboard");
    //   return <Loading />;
  };
  return (
    <div className={styles.regContainer}>
      <h1 className={styles.regHead}>Register</h1>
      <form className={styles.regFrom} encType="multipart/form-data">
        <label className={styles.regLabel} htmlFor="username">
          Username
        </label>
        <input className={styles.regInput} type="text" id="username" name="username" onChange={handleChange} value={user.username} required />
        <label className={styles.regLabel} htmlFor="firstname">
          First Name
        </label>
        <input className={styles.regInput} type="text" id="firstname" name="firstname" onChange={handleChange} value={user.firstname} required />
        <label className={styles.regLabel} htmlFor="lastname">
          Last Name
        </label>
        <input className={styles.regInput} type="text" id="lastname" name="lastname" onChange={handleChange} value={user.lastname} required />
        <label className={styles.regLabel} htmlFor="email">
          E-mail
        </label>
        <input className={styles.regInput} type="email" id="email" name="email" onChange={handleChange} value={user.email} required />
        <label className={styles.regLabel} htmlFor="password">
          Password
        </label>
        <input className={styles.regInput} type="password" id="password" name="password" onChange={handleChange} value={user.password} required />
        <label className={styles.regLabel} htmlFor="picture">
          Profile Picture
        </label>
        <input
          className={styles.regInput}
          style={{ cursor: "pointer" }}
          type="file"
          name="picturePath"
          accept="image/*"
          onChange={(e) => {
            setPicture(e.target.files[0]);
          }}
        />
        <button className={styles.regButton} type="submit" onClick={handleSubmit}>
          Register
        </button>
      </form>
      <p>
        Already Registered?{" "}
        <Link className={styles.areg} href="/login">
          Login here
        </Link>
      </p>
    </div>
  );
}
