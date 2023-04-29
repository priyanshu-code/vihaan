import s from "./Loading.module.css";
export default function Loading() {
  return (
    <div className={s.body}>
      <div className={s.spinnerSquare}>
        <div className={`${s.square1} ${s.square}`}></div>
        <div className={`${s.square2} ${s.square}`}></div>
        <div className={`${s.square3} ${s.square}`}></div>
      </div>
    </div>
  );
}
