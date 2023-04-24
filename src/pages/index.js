import { Navbar } from "@/components/Navbar";
import { Inter } from "next/font/google";
import s from "@/styles/Home.module.css";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const handle = (e) => {
    e.preventDefaults();
    router.push("/login");
  };
  return (
    <>
      {" "}
      <Navbar />
      <div className={s.home}>
        <div className={s.hero}>
          <h1 className={`${s.heroHead} "`}>D</h1>
          <h1 className={`${s.heroHead} "`}>E</h1>
          <h1 className={`${s.heroHead} "`}>E</h1>
          <h1 className={`${s.heroHead} "`}>P</h1>
          <h1 className={`${s.heroHead} "`}>V</h1>
          <h1 className={`${s.heroHead} "`}>I</h1>
          <h1 className={`${s.heroHead} "`}>S</h1>
          <h1 className={`${s.heroHead} "`}>I</h1>
          <h1 className={`${s.heroHead} "`}>O</h1>
          <h1 className={`${s.heroHead} "`}>N</h1>
          <h1 className={`${s.heroHead} " `}>-</h1>
          <h1 className={`${s.heroX}`}>X</h1>
        </div>
        <button onClick={handle} className={s.tryNow}>
          Try Now
        </button>
      </div>
    </>
  );
}
