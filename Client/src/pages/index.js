import { Navbar } from "@/components/Navbar";
import { Inter } from "next/font/google";
import s from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isAuth } = useSelector((store) => store.User);
  const [number, setNumber] = useState(0);
  const router = useRouter();
  const handle = (e) => {
    e.preventDefault();
    if (isAuth) router.push("/dashboard");
    else router.push("/login");
  };
  // console.log(number);
  // useEffect(() => {
  //   function brr() {
  //     setTimeout(() => {
  //       setNumber(number + Math.floor(Math.random() * 30));
  //     }, Math.random() * 100);
  //   }
  //   if (number < 90) {
  //     brr();
  //   }
  //   return () => {
  //     clearTimeout(brr);
  //   };
  // }, [number]);
  // if (number < 100) {
  //   return <h1 className={s.baap}>{number}% Accurate</h1>;
  // }
  return (
    <>
      {" "}
      <div className={s.home}>
        <div className={s.temp}>
          <div className={s.hero}>
            <h1
              data-value="DEEPVISION-X"
              className={s.heroHead}
              onMouseOver={(event) => {
                const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let interval = null;
                let iteration = 0;
                clearInterval(interval);

                interval = setInterval(() => {
                  event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                      if (index < iteration) {
                        return event.target.dataset.value[index];
                      }
                      return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("");
                  if (iteration >= event.target.dataset.value.length) {
                    clearInterval(interval);
                  }
                  iteration += 1 / 3;
                }, 50);
              }}
            >
              Innovations&
            </h1>
          </div>
          <div className={s.containerBody}>
            <button onClick={handle} className={s.tryNow}>
              Try Now
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        <p className={s.desc}>
          Our project uses deep learning and machine learning techniques to analyze chest X-rays and
        </p>
        <p className={s.desc}>
          accurately diagnose pneumonia. We aim to create a tool that can assist radiologists in
        </p>
        <p className={s.desc}>
          diagnosing pneumonia quickly and accurately, ultimately leading to better outcomes for
          patients.
        </p>
      </div>
    </>
  );
}
