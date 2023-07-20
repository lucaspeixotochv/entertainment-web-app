import { createContext, Dispatch, SetStateAction } from "react";

interface SearchContextValue {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextValue>({
  searchValue: "",
  setSearchValue: () => {},
});

export default SearchContext;
