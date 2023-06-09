import s from "./dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import Loading from "@/components/Loading/Loading";
import axios from "axios";
import im from "./TEST.jpg";
import { useState } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const formData = new FormData();
  const router = useRouter();
  const [patientName, setPatientName] = useState("");
  const [file, setFile] = useState("");
  const { isAuth, user, token } = useSelector((store) => store.User);
  if (!isAuth) {
    router.push("/login");
  }
  const { asPath } = useRouter();
  const url = "http://localhost:5000/assets/";
  console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.append("patientName", patientName);
    formData.append("picture", file);
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/v1/patient", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      formData.delete("patientName");
      formData.delete("picture");
      const temp = await res.data.result.split("/n");
      setLoading(false);
      setResponse(temp[temp.length - 1]);
      console.log(temp[temp.length - 1]);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <main className={s.dashboard}>
      <h1 className={s.dashName}>{`Hi  ${user.firstname} !`}</h1>
      <h1 className={s.dashHead}>Welcome to your Dashboard</h1>
      <div className={s.card}>
        <h2>Select Image</h2>
        <label className={s.label} htmlFor="patient">
          Patient Name
        </label>
        <input
          value={patientName}
          onChange={(e) => {
            const { value } = e.target;
            setPatientName(value);
          }}
          className={s.input}
          type="text"
          name="patientName"
          placeholder="Patient name"
        ></input>
        <label className={s.label} htmlFor="patient">
          Patient Image
        </label>
        <input
          className={s.input}
          type="file"
          name="picturePath"
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        ></input>
        <button className={s.submitButton} onClick={handleSubmit}>
          Submit
        </button>
        {response !== "" && <h2>{response}</h2>}
      </div>
    </main>
  );
}
