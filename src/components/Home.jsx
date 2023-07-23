import axios from "axios";
import { API_URL } from "../constants";
import Header from "./Header";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Posts from "./Posts";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = posts.slice(firstPostIndex, lastPostIndex);
  const pageCount = Math.ceil(posts.length / postsPerPage);
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (event) => {
    const newOffset = event.selected + 1;
    // console.log(newOffset)
    setCurrentPage(newOffset);
  };

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}?_page=${currentPage}`).then((res) => {
      // console.log(res.data);
      setPosts(res.data, res.data.id);
      setLoading(false);
    });
  }, []);

  const handleRemoveClick = (postData) => {
    axios.delete(`${API_URL}/${postData.id}`);
    axios.get(`${API_URL}`).then((data) => {
      setPosts(data.data);
    });
  };

  return (
    <div className="w-screen h-screen max-w-screen-xl mx-auto grid grid-rows-[auto_1fr_auto] ">
      <Header />

      <Posts
        posts={posts}
        currentPost={currentPost}
        loading={loading}
        handleRemoveClick={handleRemoveClick}
      />

      {/* <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} 
      paginate={paginate} setCurrentPage={setCurrentPage} /> */}

      <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
    </div>
  );
};

export default Home;
