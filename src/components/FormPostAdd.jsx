
import axios from "axios";
import { useState } from "react";
import {API_URL} from "../constants"

const initialValues = {
  id: null,
  titleValue: '',
  bodyValue: ''
}

const FormPostAdd = () => {
  const [postData, setPostData] = useState(initialValues)
  const [posts, setPosts] = useState([])

  const isFilledFields = postData.titleValue || postData.bodyValue

  const handleSubmitPost = (e) => {
    e.preventDefault()
    if (isFilledFields) {
      setPosts((prevState) => [...prevState, { ...postData, id: `${Date.now()}` }])
      setPostData(initialValues)
    }
    axios.post(API_URL, {
      title: postData.titleValue,
      body: postData.bodyValue
    })
    
  }
  console.log(posts)
  return (
    <div className=" bg-purple-100 h-screen">
      <p className=" text-center text-2xl py-10 text-purple-950">
        Add new post
      </p>
      {/* <FormPost   /> */}
      <div className="mx-auto ">
      <form  onSubmit={handleSubmitPost} className=" items-center" action="">
        <input className=" block mx-auto w-5/6 my-5 input" type="text" placeholder="Title"
        onChange={(e) => setPostData((prevState) => ({
          ...prevState,
          titleValue: e.target.value
        }))}
        value={postData.titleValue} />
        <textarea className=" block mx-auto w-5/6 my-5 input" type="textarea" placeholder="Body"
        onChange={(e) => setPostData((prevState) => ({
          ...prevState,
          bodyValue: e.target.value
        }))}
        value={postData.bodyValue}  />
        <button disabled={!isFilledFields} type="submit" className="mx-4 py-1 px-3 border-2 rounded-full border-indigo-600 text-indigo-600 hover:text-white hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-violet-300">Add</button>
      </form>
      <div>
        {posts.map((post, index) => (
          <div className='oneCard' key={post.id}>
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
