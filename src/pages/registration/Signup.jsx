import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import toast from "react-hot-toast";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Loader from "../../components/loader/Loading";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const genders = ["male", "female", "other"];

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});

  // ✅ Validation function
  const validateSignup = () => {
    const newErrors = {};
    if (!userSignup.name.trim()) {
      newErrors.name = "Name is required";
    } else if (userSignup.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!userSignup.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userSignup.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!userSignup.password.trim()) {
      newErrors.password = "Password is required";
    } else if (userSignup.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!userSignup.gender) {
      newErrors.gender = "Please select a gender";
    }

    return newErrors;
  };

  const userSignupFunction = async () => {
    const validationErrors = validateSignup();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return toast.error("Please fix the errors");
    }

    setErrors({});
    setLoading(true);

    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        gender: userSignup.gender,
        time: Timestamp.now(),
        date: new Date().toLocaleDateString("en-Us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userReference = collection(fireDB, "user");
      await addDoc(userReference, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
        gender: "",
        role: "user",
      });

      toast.success("Signup Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500 ">
            Signup
          </h2>
        </div>

        {/* Name */}
        <div className="mb-3">
          <input
            type="text"
            value={userSignup.name}
            onChange={(e) =>
              setUserSignup({ ...userSignup, name: e.target.value })
            }
            placeholder="Full Name"
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name}</p>
          )}
        </div>

        {/* Gender */}
        <div className="mb-3">
          <select
            value={userSignup.gender}
            onChange={(e) =>
              setUserSignup({ ...userSignup, gender: e.target.value })
            }
            className={`bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none ${
              userSignup.gender === "" ? "text-pink-200" : "text-black"
            }`}
          >
            <option disabled value="">
              Select Gender
            </option>
            {genders.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-red-400 text-sm">{errors.gender}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            value={userSignup.email}
            onChange={(e) =>
              setUserSignup({ ...userSignup, email: e.target.value })
            }
            placeholder="Email Address"
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5">
          <input
            type="password"
            value={userSignup.password}
            onChange={(e) =>
              setUserSignup({ ...userSignup, password: e.target.value })
            }
            placeholder="Password"
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Signup Button */}
        <div className="mb-5">
          <button
            type="button"
            onClick={userSignupFunction}
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
          >
            Signup
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Have an account{" "}
            <Link className="text-pink-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
