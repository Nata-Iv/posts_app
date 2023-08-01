import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import axios from "axios";


const Search = () => {
  // const [value, setValue] = useState("");
  // const filteredPosts = posts.filter((post) => {
  //   return post.title.toLowerCase().includes(value.toLowerCase());
  // })

  
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true)
        searchCharacters(debouncedSearchTerm)
        setIsSearching(false)
      } else {
        setResults([])
      }
    },
    [debouncedSearchTerm]
  );

  function searchCharacters(search) {
    
    axios.get(`${API_URL}?q=${search}`).then((res) => {
      const filteredPosts = res.data.filter((post) => {
        return post.title.toLowerCase().includes(search.toLowerCase());
      })
      setResults(filteredPosts)
    })
  }

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(
      () => {
        const handler = setTimeout(() => {
          setDebouncedValue(value)
        }, delay)
  
        return () => {
          clearTimeout(handler)
        }
      },
    );
  
    return debouncedValue;
  }


  return (
    <div className="mt-4">
      <form className=" w-1/2 mx-auto">
        <input
          className="w-full p-2 outline-gray-100 outline hover:outline-gray-400 rounded-sm active:outline-gray-400 "
          type="text"
          placeholder="Search post"
          onChange={e => setSearchTerm(e.target.value)}
        />

      {isSearching && <div>Searching ...</div>}

      {results.map(result => (
        <div key={result.id}>
          <h4>{result.title}</h4>
        </div>
      ))}
      </form>
      
      {/* <div className="p-4">
        {filteredPosts.map((post, i) => (
          <div
            className=" py-2 px-6 bg-purple-50 border-2 rounded-3xl border-white mb-2"
            key={post.id}
          >
            <h3 className="font-bold text-xl text-purple-950">{post.title}</h3>
            <p className=" text-blue-950">{post.body}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Search;
