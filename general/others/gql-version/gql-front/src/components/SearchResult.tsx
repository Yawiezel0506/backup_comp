import { Result } from "./Header";

interface SearchResultProps {
  result: Result;  
}

const SearchResult = ({ result}: SearchResultProps) => {
  return (
    <div>
    {result.label}
  </div>
  )
}

export default SearchResult