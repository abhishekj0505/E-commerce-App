import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = JSON.parse(localStorage.getItem("users"));

  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);

  const logOut = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  // navList Data
  const navList = (
    <ul className="flex space-x-7 text-white font-medium text-md px-3 ">
      {/* Home */}
      <li>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "font-bold p-2 rounded-md" : "text-white"}`
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>

      {/* All Product */}
      <li>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "font-bold p-2 rounded-md" : "text-white"}`
          }
          to={"/allproduct"}
        >
          All-Product
        </NavLink>
      </li>

      {/* Signup */}
      {!user ? (
        <li>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "font-bold  p-2 rounded-md" : "text-white"}`
            }
            to={"/signup"}
          >
            Signup
          </NavLink>
        </li>
      ) : (
        ""
      )}

      {/* Login*/}
      {!user ? (
        <li>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "font-bold p-2 rounded-md" : "text-white"}`
            }
            to={"/login"}
          >
            Login
          </NavLink>
        </li>
      ) : (
        ""
      )}

      {/* User */}
      {user?.role == "user" && (
        <li>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "font-bold p-2 rounded-md" : "text-white"}`
            }
            to={"/user-dashboard"}
          >
            {user.name}
          </NavLink>
        </li>
      )}

      {/* Admin */}
      {user?.role == "admin" && (
        <li>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "font-bold p-2 rounded-md" : "text-white"}`
            }
            to={"/admin-dashboard"}
          >
            {user.name}
          </NavLink>
        </li>
      )}

      {/* logout */}
      {user && (
        <li className="cursor-pointer" onClick={logOut}>
          Logout
        </li>
      )}

      {/* Cart */}
      <li>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? "font-bold  p-2 rounded-md" : "text-white"}`
          }
          to={"/cart"}
        >
          Cart({cartItems.length})
        </NavLink>
      </li>
    </ul>
  );
  return (
    <nav className="bg-pink-600 sticky top-0 z-10 ">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2
              onClick={() => {
                navigate("/");
              }}
              className="font-bold text-white text-2xl text-center"
            >
              CARTIFY
            </h2>
          </Link>
        </div>

        {/* right  */}
        <div className="right flex justify-center mb-4 lg:mb-0 capitalize">
          {navList}
        </div>

        {/* Search Bar  */}
        <SearchBar />
      </div>
    </nav>
  );
};

export default NavBar;
