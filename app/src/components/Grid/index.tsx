import S from "./grid.module.scss";
import { Data } from "../../types/Data.types";
import { MdLocalMovies } from "react-icons/md";
import {
  PiBookmarkSimpleLight,
  PiBookmarkSimpleFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { BsDot } from "react-icons/bs";

function Grid({ data }: { data: Data[] }) {
  return (
    <div className={S.mainCotainer__grid}>
      {data?.map((item, index) => (
        <div key={index} className={S.mainCotainer__grid__item}>
          <img src={item.thumbnail.regular.large} alt={item.title} />
          <div className={S.mainCotainer__grid__item__container}>
            <p>{item.year}</p>
            <BsDot size={18} color="#8A8E97" />
            <div
              style={{
                display: "flex",
                gap: "0.25rem",
                alignItems: "center",
              }}
            >
              {item.category === "Movie" ? (
                <MdLocalMovies size={18} color="#8A8E97" />
              ) : (
                <PiTelevisionFill size={18} color="#8A8E97" />
              )}
              <p>{item.category}</p>
            </div>
            <BsDot size={18} color="#8A8E97" />
            <p>{item.rating}</p>
          </div>
          <h3>{item.title}</h3>
          <div className={S.mainCotainer__grid__item__bookMark}>
            {item.isBookmarked ? (
              <PiBookmarkSimpleFill size={24} color="white" />
            ) : (
              <PiBookmarkSimpleLight size={24} color="white" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Grid;
