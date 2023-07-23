
import { useState } from "react";
import { NavLink } from "react-router-dom";


const Posts = ({ currentPost, loading, posts, handleRemoveClick }) => {

  const [value, setValue] = useState("");
  const filteredPosts = currentPost.filter((post) => {
    return post.title.toLowerCase().includes(value.toLowerCase());
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-4">
      <form className=" w-1/2 mx-auto">
        <input
          className="w-full p-2 outline-gray-100 outline hover:outline-gray-400 rounded-sm active:outline-gray-400 "
          type="text"
          placeholder="Search post"
          onChange={(e) => setValue(e.target.value)}
        />
      </form>

      {filteredPosts.map((post, i) => (
        <div
          className=" py-2 px-6 bg-purple-50 border-2 rounded-3xl border-white mb-2"
          key={post.id}
        >
          <h3 className="font-bold text-xl text-purple-950">{post.title}</h3>
          <p className=" text-blue-950">{post.body}</p>
          <div className=" text-base text-right text-gray-500 hover:text-indigo-600 ">
            <button type="button" href="#">
              <NavLink to={`${post.id}`}>Edit post</NavLink>
            </button>
          </div>
          <div className=" text-base text-right text-gray-500 hover:text-red-600 ">
            <button onClick={() => handleRemoveClick(post)} type="button" href="#">
              Delete post
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
