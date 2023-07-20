import { useState, useContext, useEffect } from "react";
import S from "./series.module.scss";
import { Data } from "../../types/Data.types";
import SearchContext from "../../context/Search/SearchContext";
import axios from "axios";
import { featchFilteredData } from "../../utils/featchData";
import Grid from "../../components/Grid";

function Series() {
  const [data, setData] = useState<Data[] | []>([]);
  const [filteredItens, setFilteredItens] = useState<Data[] | null>([]);

  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    const featchData = async () => {
      try {
        const { data } = await axios.get(
          "https://raw.githubusercontent.com/lucaspeixotochv/entertainment-web-api/main/data.json"
        );
        const series = data.filter(
          (item: Data) => item.category === "TV Series"
        );
        setData(series);
      } catch (error) {
        console.log(error);
      }
    };
    featchData();
  }, []);

  useEffect(() => {
    featchFilteredData(searchValue, setFilteredItens, data);
  }, [searchValue]);

  console.log(data);
  return (
    <>
      <div className={S.padding}>
        {filteredItens ? (
          <>
            <h3 className="title">
              Found {filteredItens.length} results for '{searchValue}'
            </h3>
            <Grid data={filteredItens} />{" "}
          </>
        ) : (
          <>
            <h3 className="title">TV Series</h3>
            <Grid data={data} />
          </>
        )}
      </div>
    </>
  );
}

export default Series;
