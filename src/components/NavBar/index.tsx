import { useContext, useEffect, useState } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { MdLocalMovies, MdLogout } from "react-icons/md";
import { PiTelevisionFill, PiBookmarkSimpleFill } from "react-icons/pi";
import S from "./Navbar.module.scss";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function NavBar() {
  const location = useLocation();
  const { dispatch } = useContext(AuthContext);
  const { pathname } = location;
  const [page, setPage] = useState("");

  useEffect(() => {
    switch (pathname) {
      case "/":
        setPage("home");
        break;
      case "/movies":
        setPage("movies");
        break;
      case "/series":
        setPage("series");
        break;
      case "/bookedmarked":
        setPage("bookedmarked");
        break;
      default:
        setPage("");
        break;
    }
  }, [pathname]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className={S.navbarContainer}>
      <img src="/logo.png" alt="logo" className={S.navbarContainer__image} />
      <nav>
        <ul className={S.list}>
          <li>
            <Link to="/">
              <button className={S.btn}>
                <AiFillAppstore
                  size={24}
                  color={page === "home" ? "#fff" : "#5A698F"}
                  className={S.icon}
                />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/movies">
              <button className={S.btn}>
                <MdLocalMovies
                  size={24}
                  color={page === "movies" ? "#fff" : "#5A698F"}
                  className={S.icon}
                />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/series">
              <button className={S.btn}>
                <PiTelevisionFill
                  size={24}
                  color={page === "series" ? "#fff" : "#5A698F"}
                  className={S.icon}
                />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/bookedmarked">
              <button className={S.btn}>
                <PiBookmarkSimpleFill
                  size={24}
                  color={page === "bookedmarked" ? "#fff" : "#5A698F"}
                  className={S.icon}
                />
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      <button className={S.logoutBtn} onClick={handleLogout}>
        <MdLogout size={24} color="white" />
      </button>
    </div>
  );
}

export default NavBar;
