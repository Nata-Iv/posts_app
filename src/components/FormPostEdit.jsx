import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
// import { NumberParam, useQueryParam } from "use-query-params";
import { API_URL } from "../constants";
import axios from "axios";

const initialValues = {
  id: null,
  titleValue: '',
  bodyValue: ''
}

const FormPostEdit = () => {
  const [values, setValues] = useState(initialValues)
  // const [page] = useQueryParam('page', NumberParam)
  const [editableUserData, setEditableUserData] = useState(null);
  // const navigate = useNavigate()
  const params = useParams();``
  // console.log(params.id)

  useEffect(() => {
    axios.get(`${API_URL}/${params.id}`)
    .then((res) => setEditableUserData(res.data))
    .catch(err => console.log(err))
  }, []);

  // const handleEditPost = (event) => {
  //   event.preventDefault()
  //     axios.put(`${API_URL}/${params.id}`, values)
  //    .then(res => console.log(res))
  //    .catch(err => console.log(err))
  // }

  if (!editableUserData) {
    return null;
  }

  return (
    <div className=" bg-purple-100 h-screen">
      <p className=" text-center text-2xl py-10 text-purple-950">Edit post</p>
      <div className="mx-auto ">
        <form
          // onSubmit={handleEditPost}
          className=" items-center"
          action=""
        >
          <input
            value={editableUserData.title}
            onChange={e => setEditableUserData({...values, titleValue: e.target.value})}
            className=" block mx-auto w-5/6 my-5 input"
            type="text"
            placeholder="Title"
            
          />
          <textarea
            className=" block mx-auto w-5/6 my-5 input"
            type="textarea"
            placeholder="Body"
          />
          <button
            type="submit"
            className="mx-4 py-1 px-3 border-2 rounded-full border-indigo-600 text-indigo-600 hover:text-white hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-violet-300"
          >
            Save
          </button>
        </form>
        <div>
          {/* {posts.map((post, index) => (
          <div className='oneCard' key={post.id}>
            <h1>{post.titleValue}</h1>
            <p>{post.bodyValue}</p>
          </div>
        ))} */}
        </div>
      </div>
    </div>
  );
};

export default FormPostEdit;
