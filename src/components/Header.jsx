
import { NavLink } from "react-router-dom";
import useLocalStorage from "use-local-storage";

const Header = () => {

  const [user, setUser] = useLocalStorage("user", "")
   
  const logOutUser = () => {
    setUser("")
    localStorage.removeItem('user')
  }
  
  return (
  
    <div className="px-4">
      <div className="py-3 border-b border-indigo-100 flex items-center justify-between ">
        <a className="text-2xl font-bold text-purple-800 " href="#">
          appPosts
        </a>
        
        <ul className=" inline-flex items-center ">
          <li>
            
            {
              user.length != 0 ? <div>
              <button onClick={logOutUser}>Log out</button></div> :
              <div>
                <button className=" header-btn " href="#">
              <NavLink to={`sign_in`}>Registration</NavLink>
            </button>
              <button className=" header-btn " href="#">
              <NavLink to={`sign_up`}>Log in</NavLink>
            </button>
              </div>
            }
            
          </li>
        </ul>
      </div>
      <div className="flex justify-between p-2 border-b border-indigo-100">
        <div className=" text-base text-center text-gray-500 hover:text-indigo-600 ">
          <button type="button" href="#">
            <NavLink to={`add_post`}>Add new post</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
