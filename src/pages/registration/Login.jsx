/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, onSnapshot, query, QuerySnapshot, where } from "firebase/firestore";
import Loader from "../../components/loader/Loading";

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({})

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const userLoginFunction = async ()=>{
    const newErrors = {};

    if (!userLogin.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userLogin.email)) {
      newErrors.email = "Enter a valid email";
    }
  
    if (!userLogin.password.trim()) {
      newErrors.password = "Password is required";
    } else if (userLogin.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return toast.error("Please fix the errors");
    }
  
    setErrors({});
    setLoading(true);
  
    
    try{

      const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)

      try {
        const q = query(
          collection(fireDB, 'user'),
          where('uid', '==', users?.user?.uid  )
        )
        const data = onSnapshot(q, (QuerySnapshot)=>{
          let user;
          QuerySnapshot.forEach((doc)=>user = doc.data())
          localStorage.setItem('users', JSON.stringify(user))
          setUserLogin({
            email : '',
            password : ''
          })
          toast.success('Sucessfully LoggedIn')
          setLoading(false)

          if(user.role === 'user'){
            navigate('/user-dashboard')
          }else{
            navigate('/admin-dashboard')
          }

          return ()=> data

        })
      }catch(error){
        console.log(error)
        setLoading(false)
        
      }


    }catch(error){
      console.log(error)
      setLoading(false)
      toast.error('Invalid Credentials');
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {/* loading component */}
      {loading && <Loader/>}
      {/* Login Form  */}
      <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500 ">
            Login
          </h2>
        </div>

        {/* Email Field  */}
        <div className="mb-3">
          <input
            type="email"
            value={userLogin.email}
            onChange={(e)=>setUserLogin({
              ...userLogin, email:e.target.value})}
            placeholder="Email Address"
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
          {
            errors.email && <p className="text-red-400 text-sm">
              {errors.email}
            </p>
          }
        </div>

        {/* Password Field */}
        <div className="mb-5">
          <input
            type="password"
            value={userLogin.password}
            onChange={(e)=>setUserLogin({
              ...userLogin, password:e.target.value})}
            placeholder="Password"
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
          {
            errors.password && <p className="text-red-400 text-sm">
              {errors.password}
            </p>
          }
        </div>

        {/* Signup Button  */}
        <div className="mb-5">
          <button
            type="button"
            onClick={userLoginFunction}
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
          >
            Login
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Don't Have an account{" "}
            <Link className=" text-pink-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
