import { useState, useContext, useEffect } from "react";
import S from "./bookemarked.module.scss";
import { Data } from "../../types/Data.types";
import SearchContext from "../../context/Search/SearchContext";
import axios from "axios";
import { featchFilteredData } from "../../utils/featchData";
import Grid from "../../components/Grid";

interface IBookeMarkedState {
  all: Data[];
  movies: Data[];
  series: Data[];
}

function BookMarked() {
  const [data, setData] = useState<IBookeMarkedState>({
    all: [],
    movies: [],
    series: [],
  });
  const [filteredItens, setFilteredItens] = useState<Data[] | null>([]);

  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    const featchData = async () => {
      try {
        const res = await axios.get(
          "https://raw.githubusercontent.com/lucaspeixotochv/entertainment-web-app/main/api/data.json"
        );
        const data = res.data.filter((item: Data) => item.isBookmarked);
        const movies = data.filter(
          (item: Data) => item.category === "Movie" && item.isBookmarked
        );
        const series = data.filter(
          (item: Data) => item.category === "TV Series" && item.isBookmarked
        );
        setData({
          all: data,
          movies: movies,
          series: series,
        });
      } catch (error) {
        console.log(error);
      }
    };
    featchData();
  }, []);

  useEffect(() => {
    featchFilteredData(searchValue, setFilteredItens, data.all);
  }, [searchValue]);

  console.log(data);
  return (
    <>
      <div className={S.padding}>
        {filteredItens ? (
          <>
            <h3 className="title">Bookmarked Movies and TV Series</h3>
            <Grid data={filteredItens} />
          </>
        ) : (
          <>
            <h3 className="title">Bookmarked Movies</h3>
            <Grid data={data.movies} />
            <h3 className="title">Bookmarked Series</h3>
            <Grid data={data.series} />
          </>
        )}
      </div>
    </>
  );
}

export default BookMarked;
