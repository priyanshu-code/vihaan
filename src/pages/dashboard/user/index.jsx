import s from "./user.module.css";
import Link from "next/link";

export default function User() {
  const handleForm = (e) => {
    e.preventDefaukts();
  };
  const form = {};
  const userForm = (
    <form className={s.portForm}>
      <label className={s.portLabel} htmlFor="firstName">
        First Name
      </label>
      <input className={s.portInput} onChange={handleForm} type="email" name="workEmail" value={form.workEmail}></input>
      <label className={s.portLabel} htmlFor="occupation">
        Occupation / Job Title
      </label>
      <input className={s.portInput} onChange={handleForm} type="text" name="occupation" value={form.occupation}></input>
      <label className={s.portLabel} htmlFor="template">
        Template
      </label>
      <div className={s.template}>
        <input className={s.portInput} disabled={true} type="text" name="template" value={form.template} />
        <Link href="/templates" className={s.portNavBtn}>
          Select / Change
        </Link>
      </div>
    </form>
  );
  return (
    <div className={s.portEdit}>
      <h1>User Page</h1>
      {userForm}
    </div>
  );
}
