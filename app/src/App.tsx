import { useContext, useState, useEffect } from "react";
import NavBar from "./components/NavBar/index.tsx";
import "normalize-css";
import "./index.css";
import S from "./app.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BsArrowUp } from "react-icons/bs";
import SearchContext from "./context/Search/SearchContext.tsx";

function App() {
  const { setSearchValue } = useContext(SearchContext);

  const location = useLocation();
  const { pathname } = location;
  const [search, setSearch] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    switch (pathname) {
      case "/":
        setSearch("movies or TV series");
        break;
      case "/movies":
        setSearch("movies");
        break;
      case "/series":
        setSearch("TV series");
        break;
      case "/bookedmarked":
        setSearch("bookmarked shows");
        break;
      default:
        setSearch("");
        break;
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollSize = 200;
      if (window.scrollY > scrollSize) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={S.container}>
      <NavBar />
      <div className={S.appContainer}>
        <button
          className={S.appContainer__scrollBtn}
          onClick={scrollToTop}
          style={{ display: showScrollButton ? "block" : "none" }}
        >
          <BsArrowUp size={24} color="white" />
        </button>
        <div className={S.formContainer}>
          <form>
            <button>
              <FaSearch size={18} color="white" />
            </button>
            <input
              type="text"
              placeholder={`Search for ` + search}
              onChange={(e) =>
                setSearchValue(e.target.value.trim().toLowerCase())
              }
            />
          </form>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
