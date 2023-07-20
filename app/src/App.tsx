import { useContext, useState, useEffect } from "react";
import NavBar from "./components/NavBar/index.tsx";
import "normalize-css";
import "./index.css";
import S from "./app.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import SearchContext from "./context/Search/SearchContext.tsx";

function App() {
  const { setSearchValue } = useContext(SearchContext);

  const location = useLocation();
  const { pathname } = location;
  const [search, setSearch] = useState("");

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

  return (
    <div className={S.container}>
      <NavBar />
      <div className={S.appContainer}>
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
