import { useEffect, useState, useContext } from "react";
import S from "./Home.module.scss";
import { MdLocalMovies } from "react-icons/md";
import {
  PiBookmarkSimpleLight,
  PiBookmarkSimpleFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { BsDot } from "react-icons/bs";
import axios from "axios";
import { Data } from "../../types/Data.types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SearchContext from "../../context/Search/SearchContext";
import { featchFilteredData } from "../../utils/featchData";
import Grid from "../../components/Grid";

function Home() {
  const [data, setData] = useState<Data[] | []>([]);
  const [trendingData, setTrendingData] = useState<Data[] | []>([]);
  const [filteredItens, setFilteredItens] = useState<Data[] | null>([]);

  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    const featchData = async () => {
      try {
        const { data } = await axios.get(
          "https://raw.githubusercontent.com/lucaspeixotochv/entertainment-web-app/main/api/data.json"
        );
        const trendingData = data.filter(
          (item: Data) => item.isTrending === true
        );
        setData(data);
        setTrendingData(trendingData);
      } catch (error) {
        console.log(error);
      }
    };
    featchData();
  }, []);

  useEffect(() => {
    featchFilteredData(searchValue, setFilteredItens, data);
  }, [searchValue]);
  return (
    <>
      <div className={S.padding}>
        <h3 className="title">Trending</h3>
      </div>
      <div className={S.swiperContainer}>
        <Swiper
          slidesPerView="auto"
          style={{ marginLeft: "1rem" }}
          spaceBetween={16}
        >
          {trendingData.map((item, index) => (
            <SwiperSlide
              key={index}
              style={{
                flexShrink: 1,
              }}
            >
              <div className={S.swiperSlide}>
                <img
                  src={item.thumbnail.trending.large}
                  alt={"thumbnail of " + item.title}
                  className={S.swiperSlide__image}
                />
                <div className={S.swiperSlide__text}>
                  <div className={S.swiperSlide__text__container}>
                    <p>{item.year}</p>
                    <BsDot size={18} color="#8A8E97" />
                    <div style={{ display: "flex", gap: "0.25rem" }}>
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
                </div>
                <div className={S.swiperSlide__bookMark}>
                  {item.isBookmarked ? (
                    <PiBookmarkSimpleFill size={24} color="white" />
                  ) : (
                    <PiBookmarkSimpleLight size={24} color="white" />
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={S.mainCotainer}>
        {filteredItens ? (
          <>
            <h3 className="title">
              Found {filteredItens.length} results for '{searchValue}'
            </h3>
            <Grid data={filteredItens} />
          </>
        ) : (
          <>
            <h3 className="title">Recommended for you</h3>
            <Grid data={data} />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
