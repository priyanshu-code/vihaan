import s from "./dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((store) => store.User);
  const { asPath } = useRouter();
  const url = "http://localhost:5000/assets/";
  console.log(user);
  return (
    <main className={s.dashboard}>
      <h1 className={s.dashName}>{`Hi  ${user.firstname} !`}</h1>
      <Image src={`${url + user.picturePath}`} width={100} height={100} alt="Profile picture"></Image>
      <h1 className={s.dashHead}>Welcome to your Dashboard</h1>
      <div className={s.card}>
        <h2>Your Portfolio</h2>
        <ul>
          <li>
            <Link href="#">Take me to Portfolio</Link>
          </li>
          <li>
            <Link href="#">Edit portfolio information</Link>
          </li>
        </ul>
      </div>
      <div className={s.card}>
        <h2>Your Projects</h2>
        <ul>
          <li>
            <Link href="#">Add new project</Link>
          </li>
          <li>
            <Link href="#">Edit existing project</Link>
          </li>
        </ul>
      </div>
      <div className={s.card}>
        <h2>Account</h2>
        <ul>
          <li>
            <a href="#">Edit user information</a>
          </li>
          <li>
            <a href="">Delete account</a>
          </li>
        </ul>
      </div>
      <div className={s.projects}>
        <h1>Project Name</h1>
      </div>
    </main>
  );
}
export async function getStaticProps() {
  return {
    props: {},
  };
}
