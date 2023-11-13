import axios from 'axios';
import { useState } from 'react';
import { API_URL } from '../constants';
import { NumberParam, useQueryParam, withDefault } from 'use-query-params';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  id: null,
  titleValue: '',
  bodyValue: '',
  likes: [],
  comments: [],
};

const FormPostAdd = () => {
  const [page] = useQueryParam('page', withDefault(NumberParam, 1));
  const navigate = useNavigate();

  const [postData, setPostData] = useState(initialValues);
  const [posts, setPosts] = useState([]);

  const isFilledFields = postData.titleValue || postData.bodyValue;

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (isFilledFields) {
      setPosts((prevState) => [
        ...prevState,
        { ...postData, id: `${Date.now()}` },
      ]);
      setPostData(initialValues);
    }
    axios
      .post(API_URL, {
        title: postData.titleValue,
        body: postData.bodyValue,
        likes: postData.likes,
        comments: postData.comments,
      })
      .then(navigate(`/?page=${page}`));
  };

  return (
    <div className=" bg-purple-100 h-screen">
      <p className=" text-center text-2xl py-10 text-purple-950">
        Add new post
      </p>
      <div className="mx-auto ">
        <form onSubmit={handleSubmitPost} className=" items-center" action="">
          <input
            className=" block mx-auto w-5/6 my-5 input"
            type="text"
            placeholder="Title"
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                titleValue: e.target.value,
              }))
            }
            value={postData.titleValue}
          />
          <textarea
            className=" block mx-auto w-5/6 my-5 input"
            placeholder="Body"
            onChange={(e) =>
              setPostData((prevState) => ({
                ...prevState,
                bodyValue: e.target.value,
              }))
            }
            value={postData.bodyValue}
          />
          <div className=" flex justify-center">
            <button
              disabled={!isFilledFields}
              type="submit"
              className=" py-1 px-3 border-2 btn-decorate"
            >
              Add
            </button>
          </div>
        </form>
        <div>
          {posts.map((post) => (
            <div className="oneCard" key={post.id}>
              <h1>{post.titleValue}</h1>
              <p>{post.bodyValue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormPostAdd;
