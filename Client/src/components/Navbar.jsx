import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/features/user/userSlice";
import { useRouter } from "next/router";
import s from "./Navbar.module.css";
export const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.User);
  return (
    <nav className={s.navMain}>
      {/* <header className={s.navMainHeader}>ProjectX</header> */}
      <ul className={s.navMainLinks}>
        <li>
          <Link className={s.navMainLinksLink} href={"/"}>
            Home
          </Link>
        </li>

        <li>
          {isAuth ? (
            <Link
              onClick={(e) => {
                e.preventDefault();
                dispatch(logoutUser());
                router.push("/");
              }}
              href={"#"}
              className={s.navLogout}
            >
              Logout
            </Link>
          ) : (
            <Link className={s.navMainLinksLink} href="/login">
              Login
            </Link>
          )}
        </li>
      </ul>
      <header className={s.navMainButtons}></header>
    </nav>
  );
};
