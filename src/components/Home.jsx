import axios from "axios";
import { API_URL } from "../constants";
import Header from "./Header";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Posts from "./Posts";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";
import Search from "./Search";

const Home = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [limit] = useQueryParam("limit", withDefault(NumberParam, 3));
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  // const lastPostIndex = currentPage * postsPerPage;
  // const firstPostIndex = lastPostIndex - postsPerPage;
  // const currentPost = posts.slice(firstPostIndex, lastPostIndex);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    setPage(newOffset);
    // setCurrentPage(newOffset)
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}?_page=${page}&_limit=${limit}&_sort=id&_order=desc`)
      .then((res) => {
        setPosts(res.data, res.data.id);
        setTotalPosts(
          Math.ceil(res.headers.get("X-Total-Count") / postsPerPage)
        );
        setLoading(false);
      });
  }, [page, limit]);

  const handleRemoveClick = (postData) => {
    axios.delete(`${API_URL}/${postData.id}`);
    axios
      .get(`${API_URL}?_page=${page}&_limit=${limit}&_sort=id&_order=desc`)
      .then((data) => {
        setPosts(data.data);
      });
  };

  // const [value, setValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  
  useEffect(() => {
    if (!debouncedSearchTerm) {axios
      .get(`${API_URL}?_page=${page}&_limit=${limit}&_sort=id&_order=desc`)
      .then((data) => {
        setPosts(data.data);
      })} else
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchCharacters(debouncedSearchTerm);
      setIsSearching(false);
    } else {
      setPosts([]);
    }
  }, [debouncedSearchTerm]);

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    });

    return debouncedValue;
  }
  // const handleSearch = async (e) => {
  //   e.preventDefault()
  //   setValue(e.target.value)
  //   return await axios.get(`${API_URL}?q=${value}`)
  //   .then((res) => {
  //     setPosts(res.data.filter((post) => {
  //         return post.title.toLowerCase().includes(value.toLowerCase());
  //        }))
  //     setValue("")
  //   })
  //   .catch(er => console.log(er))
  // }
 
  function searchCharacters(search) {
    axios.get(`${API_URL}?_page=${page}&_limit=${limit}&_sort=id&_order=desc&q=${search}`).then((res) => {
      setPosts(
        res.data.filter((post) => {
          return post.title.toLowerCase().includes(search.toLowerCase());
        })      
      )
      setTotalPosts(
        Math.ceil(res.headers.get("X-Total-Count") / postsPerPage)
      )
    });
  }

  return (
    <div className=" min-h-full w-screen h-screen max-w-screen-xl mx-auto grid grid-rows-[auto_1fr_auto] ">
      <div>
        <Header />
        {/* <Search /> */}
        <form className=" w-1/2 mx-auto">
          <input
            className="mt-4 w-full p-2 outline-gray-100 outline hover:outline-gray-400 rounded-sm active:outline-gray-400 "
            type="text"
            placeholder="Search post"
            // value={value}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isSearching && <div>Searching ...</div>}
        </form>
      </div>

      <Posts
        page={page}
        posts={posts}
        loading={loading}
        handleRemoveClick={handleRemoveClick}
      />

      <Pagination handlePageClick={handlePageClick} pageCount={totalPosts} />
    </div>
  );
};

export default Home;
