import axios from "axios";
import { API_URL } from "../constants";
import Header from "./Header";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Posts from "./Posts";
import {
  NumberParam,
  StringParam,
  useQueryParam,
  withDefault,
} from "use-query-params";
import useLocalStorage from "use-local-storage";

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

const Home = () => {
  const [user] = useLocalStorage("user", "");

  const [totalPosts, setTotalPosts] = useState(0);
  const limit = 3;
  const [page, setPage] = useQueryParam("page", withDefault(NumberParam, 1));

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useQueryParam(
    "search",
    withDefault(StringParam, "")
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    setPage(newOffset);
  };

  const handleClick = (id) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id ? { ...post, isActive: !post.isActive } : post
      )
    );     
  };

  const likePost = async (post) => {
    if (user.length != 0) {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (post.likes.includes(userData.id)) {
        const indexToDelete = post.likes.findIndex(
          (like) => like == userData.id
        );
        const newLikes = [
          ...post.likes.slice(0, indexToDelete),
          ...post.likes.slice(indexToDelete + 1),
        ];
        const res = await axios.patch(`${API_URL}/${post.id}`, {
          ...post,
          likes: newLikes,
        });
        const newPosts = posts.map((post) => {
          if (post.id === res.data.id) {
            return res.data;
          }
          return post;
        });
        setPosts(newPosts);
      } else {
        const response = await axios.patch(`${API_URL}/${post.id}`, {
          // ...post, likeCount: post.likeCount + 1
          ...post,
          likes: [...post.likes, userData.id],
        });
        const newPosts = posts.map((post) => {
          if (post.id === response.data.id) {
            return response.data;
          }

          return post;
        });
        setPosts(newPosts);
      }
    } else {
      alert("log in to like post");
    }
    // const updatedPostIndex = posts.findIndex(post => post.id === response.data.id)
    // const newPosts = [
    //   ...posts.slice(0,updatedPostIndex),
    //   response.data,
    //   ...posts.slice(updatedPostIndex + 1)
    // ]
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      
      searchCharacters();
      
      return;
    }
    setLoading(true)
    axios
      .get(`${API_URL}?_page=${page}&_limit=${limit}&_sort=id&_order=desc`)
      .then((res) => {
        setPosts(res.data, res.data.id);
        setTotalPosts(Math.ceil(res.headers.get("X-Total-Count") / limit));
        setLoading(false);
      });
  }, [page, debouncedSearchTerm]);

  const handleRemoveClick = async (postData) => {
    if (localStorage.user.includes(user.email)) {
      try {
        const isDelete = await axios.delete(`${API_URL}/${postData.id}`);
        if (isDelete) {
          axios
            .get(
              `${API_URL}?_page=${page}&_limit=${limit}&_sort=id&_order=desc`
            )
            .then((data) => {
              setPosts(data.data);
            });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("log in to delete post");
    }
  };

  

  function searchCharacters() {
    axios
      .get(
        `${API_URL}?_page=${page}&_limit=${limit}&_order=desc&title_like=${searchTerm}`
      )
      .then((res) => { 
       
        setPosts(res.data);
        console.log(res.data)
        setTotalPosts(Math.ceil(res.headers.get("X-Total-Count") / limit));
        setLoading(false);
      });
  }
  const handleSearchTermChange = (value) => {
    setPage(1)
    setLoading(true)
    setSearchTerm(value)
  }

  return (
    <div className="min-h-full w-screen h-screen max-w-screen-xl mx-auto grid grid-rows-[auto_1fr_auto] ">
      <div>
        <Header />
        <form className="w-1/2 mx-auto">
          <input
            className="mt-4 w-full p-2 outline-gray-100 outline hover:outline-gray-400 rounded-sm active:outline-gray-400 "
            type="text"
            placeholder="Search post"
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}

          />
        </form>
      </div>

      <Posts      
        handleClick={handleClick}
        likePost={likePost}
        page={page}
        posts={posts}
        loading={loading}
        handleRemoveClick={handleRemoveClick}
      />
{
  !loading && <Pagination
  page={page}
  handlePageClick={handlePageClick}
  pageCount={totalPosts}
/>
}
      
    </div>
  );
};

export default Home;
