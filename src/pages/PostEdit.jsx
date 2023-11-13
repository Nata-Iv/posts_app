import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NumberParam, useQueryParam } from 'use-query-params';
import { API_URL } from '../constants';
import axios from 'axios';

const FormPostEdit = () => {
  const [page] = useQueryParam('page', NumberParam);
  const navigate = useNavigate();

  const [editableUserData, setEditableUserData] = useState(null);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/${params.id}`)
      .then((res) => setEditableUserData(res.data))
      .catch((err) => console.log(err));
  }, [params.id]);

  const handleEditPost = (values) => {
    values.preventDefault();
    axios
      .put(`${API_URL}/${params.id}`, editableUserData)
      .then(navigate(`/?page=${page}`));
  };

  if (!editableUserData) {
    return null;
  }

  return (
    <div className=" bg-purple-100 h-screen">
      <p className=" text-center text-2xl py-10 text-purple-950">Edit post</p>
      <div className="mx-auto ">
        <form onSubmit={handleEditPost} className=" items-center" action="">
          <input
            value={editableUserData.title}
            onChange={(e) =>
              setEditableUserData((prevState) => ({
                ...prevState,
                title: e.target.value,
              }))
            }
            className=" block mx-auto w-5/6 my-5 input"
            type="text"
            placeholder="Title"
          />
          <textarea
            className=" block mx-auto w-5/6 my-5 input"
            placeholder="Body"
            value={editableUserData.body}
            onChange={(e) =>
              setEditableUserData((prevState) => ({
                ...prevState,
                body: e.target.value,
              }))
            }
          />
          <div className=" flex justify-center">
            <button type="submit" className=" py-1 px-3 border-2 btn-decorate">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPostEdit;
