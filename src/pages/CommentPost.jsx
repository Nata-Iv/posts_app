import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { API_URL } from '../constants';
import { NumberParam, useQueryParam, withDefault } from 'use-query-params';
import useLocalStorage from 'use-local-storage';

const CommentPost = () => {
  const today = new Date().toLocaleString();
  const [user] = useLocalStorage('user', '');
  const [page] = useQueryParam('page', withDefault(NumberParam, 1));

  const params = useParams();

  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const isAreaDisabled = text.length === 0;
  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.patch(`${API_URL}/${post.id}`, {
      ...post,
      comments: [
        ...comments,
        { body: text, id: user.id, userName: user.userName, time: today },
      ],
    });
    setText('');
    await axios
      .get(`${API_URL}/${params.id}`)
      .then((res) => {
        setComments(res.data.comments);
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/${params.id}`)
      .then((res) => {
        setComments(res.data.comments);
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  }, [params.id]);

  return (
    <div className=" mx-auto mt-10 w-3/5 py-2 px-6 bg-purple-50 border-2 rounded-3xl border-white mb-2">
      <div className=" mb-4 text-base  text-gray-500 hover:text-indigo-600 ">
        <NavLink to={`../?page=${page}`}>Return to all posts</NavLink>
      </div>
      <h3 className="font-bold text-xl text-purple-950">{post.title}</h3>
      <p className=" text-blue-950 ">{post.body}</p>

      {!!comments &&
        comments.map((comment) => (
          <div key={Math.random()} className="my-4">
            <p className="bg-purple-100 text-sm rounded-3xl  px-6 text-gray-700">
              {comment.body}
            </p>
            <p className=" flex justify-between text-xs ">
              <span>{comment.time}</span>
              <span>{comment.userName}</span>
            </p>
          </div>
        ))}
      <div className="bg-purple-100 rounded-3xl my-4 px-4 py-2">
        <form onSubmit={onSubmit} action="">
          <textarea
            className=" text-sm outline-none h-20 text-gray-600 px-2 rounded-md w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className=" flex justify-end">
            <button
              disabled={isAreaDisabled}
              type="submit"
              className=" bg-purple-300 px-2 btn-decorate "
            >
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentPost;
