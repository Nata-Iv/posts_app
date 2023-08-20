import { NavLink } from "react-router-dom";
import CommentPost from "./CommentPost";
import ViewPost from "./ViewPost";

const Posts = ({
  showPreview,
  togglePreview,
  loading,
  posts,
  handleRemoveClick,
  page,
  likePost,
}) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-4">
      {posts.map((post, i) => (
        <div
          className="  py-2 px-6 bg-purple-50 border-2 rounded-3xl border-white mb-2"
          key={post.id}
        >
          <div>
            <h3 className="overflow-hidden text-ellipsis h-7 font-bold text-xl text-purple-950">
              {post.title}
            </h3>
            <p className=" overflow-hidden h-20 text-blue-950">{post.body}</p>
          </div>
          <div>
            {showPreview ? (
              <div className="post-preview">
              
               <p>show post show post</p>
                <button onClick={() => togglePreview(post.id)}>Return</button>
              </div>
            ) : (
              <button onClick={ () => togglePreview(post.id)}>Preview</button>
            )}
          </div>
          <div className=" text-right  text-gray-700">
            <button onClick={() => likePost(post)}>
              Likes {post.likes.length}
            </button>
            <button type="button" href="#" className="ml-8 text-gray-500">
              <NavLink to={`comment_post/${post.id}?page=${page}`}>
                Comment post ({post.comments.length})
              </NavLink>
            </button>
            <button
              type="button"
              href="#"
              className=" ml-8 text-base  text-gray-500 hover:text-indigo-600 "
            >
              <NavLink to={`view/${post.id}?page=${page}`}>View post</NavLink>
            </button>

            <button
              type="button"
              href="#"
              className=" ml-8 text-base  text-gray-500 hover:text-indigo-600 "
            >
              <NavLink to={`edit/${post.id}?page=${page}`}>Edit post</NavLink>
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
        </div>
      ))}
    </div>
  );
};

export default Posts;
