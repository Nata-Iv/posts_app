import { NavLink } from 'react-router-dom';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

const Posts = ({ posts, handleRemoveClick, page, likePost, handleClick }) => {
  return (
    <div className="p-4">
      {posts.map((post) => {
        return (
          <div
            className=" py-2 px-6 bg-purple-50 border-2 rounded-3xl border-white mb-2"
            key={post.id}
          >
            <div className=" ">
              <h3
                className={` font-bold text-xl text-purple-950 ${
                  post.isActive
                    ? ' overflow-visible h-max'
                    : 'overflow-hidden h-7 '
                }`}
              >
                {post.title}
              </h3>
              <p
                className={` text-blue-950  ${
                  post.isActive && post.body.length > 100
                    ? ' overflow-visible w-max-content'
                    : ' overflow-hidden h-20 '
                }`}
              >
                {post.body}
              </p>
            </div>
            <div className="block md:hidden text-sm text-gray-500">
              {post.isActive ? (
                <button type="button" onClick={() => handleClick(post.id)}>
                  {' '}
                  hide <AiOutlineArrowUp className=" inline-block" />
                </button>
              ) : (
                <button type="button" onClick={() => handleClick(post.id)}>
                  {' '}
                  ...show more <AiOutlineArrowDown className=" inline-block" />
                </button>
              )}
            </div>
            <div className="text-right  text-gray-700">
              <button type="button" onClick={() => likePost(post)}>
                Likes {post.likes.length}
              </button>
              <div className=" inline-block ml-8 text-gray-500">
                <NavLink to={`comment_post/${post.id}?page=${page}`}>
                  Comment post ({post.comments.length})
                </NavLink>
              </div>
              <div className=" inline-block ml-8 text-base  text-gray-500 hover:text-indigo-600 ">
                <NavLink to={`view/${post.id}?page=${page}`}>View post</NavLink>
              </div>

              <div className=" inline-block ml-8 text-base  text-gray-500 hover:text-indigo-600 ">
                <NavLink to={`edit/${post.id}?page=${page}`}>Edit post</NavLink>
              </div>

              <button
                type="button"
                className=" ml-8 text-base  text-gray-500 hover:text-red-600 "
                onClick={() => handleRemoveClick(post)}
              >
                Delete post
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
