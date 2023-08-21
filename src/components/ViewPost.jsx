import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { API_URL } from "../constants";
import { NumberParam, useQueryParam, withDefault } from 'use-query-params';
import { useNavigate } from "react-router-dom";

const ViewPost = () => {
  const [page] = useQueryParam('page', withDefault(NumberParam, 1))
  const navigate = useNavigate()

  const params = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([])
  useEffect(() => {
    axios
      .get(`${API_URL}/${params.id}`)
      .then((res) => {
        setPost(res.data)
        setComments(res.data.comments)
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRemoveClick = (postData) => {
    if (localStorage.length > 1) {
      axios.delete(`${API_URL}/${postData.id}`)
    .then(response  => {
      {navigate(`/?page=${page}`)}
    })
    } else {alert('log in for delete')}
  }

  return (
    <div className=" mx-auto mt-10 w-3/5 py-2 px-6 bg-purple-50 border-2 rounded-3xl border-white mb-2">
      <button
        type="button"
        href="#"
        className=" mb-4 text-base  text-gray-500 hover:text-indigo-600 "
      >
        <NavLink to={`../?page=${page}`}>Return to all posts</NavLink>
      </button>
      <h3 className="font-bold text-xl text-purple-950">{post.title}</h3>
      <p className=" text-blue-950">{post.body}</p>
      <div className=" text-right">
        <button
          type="button"
          href="#"
          className=" ml-8 text-base  text-gray-500 hover:text-indigo-600 "
        >
          <NavLink to={`../edit/${params.id}?page=${page}`}>Edit post</NavLink>
        </button>
        <button
          className="ml-8 text-base  text-gray-500 hover:text-red-600 "
          onClick={() => handleRemoveClick(post)}
          type="button"
          href="#"
        >
          Delete post
        </button>
      </div>
      {!!comments && comments.map((comment) => (
        <div key={comment.id} className="my-4">
            <p className="bg-purple-100 text-sm rounded-3xl  px-6 text-gray-700">{comment.body}</p>
            <p className=" flex justify-between text-xs ">
            <span >{comment.time}</span>
            <span >{comment.userName}</span>          
            </p>
        </div>
      ))}
      <div className=" text-center">
      <button
          type="button"
          href="#"
          className=" ml-8 text-base  text-gray-500 hover:text-indigo-600 "
        >
          <NavLink to={`../comment_post/${params.id}?page=${page}`}>Comment post</NavLink>
        </button>
      </div>
    </div>
  );
};

export default ViewPost;
