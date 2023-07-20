import axios from "axios";
import { Data } from "../types/Data.types";

export const featchFilteredData = async (
  searchValue: string,
  setFilteredItens: React.Dispatch<React.SetStateAction<Data[] | null>>,
  data: Data[]
) => {
  if (searchValue === "") {
    setFilteredItens(null);
  } else {
    try {
      const filteredItens = data.filter((item: Data) =>
        item.title.toLowerCase().includes(searchValue)
      );
      setFilteredItens(filteredItens);
    } catch (error) {
      console.log(error);
    }
  }
};
