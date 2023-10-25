import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
 
  const fullname = useRef(null);
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(
      //fullname.current.value,
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        //fullname.current.value,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullname.current.value,
            //photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              //navigate("/browse");
              // ...

              //navigate("/browse");
              // Profile updated!
              // ...
            })
            .catch((error) => {
              setErrorMessage(error.message);
              // An error occurred
              // ...
            });

          //console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
        className="bg-image bg-cover bg-center min-h-screen object-cover"
        
          src={BG_URL}
          alt=""
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-11/12 md:w-1/4 bg-black bg-opacity-80 py-14 px-8 absolute my-36 right-0 left-0 mx-auto text-white rounded-md"
      >
        <h1 className="font-bold text-3xl py-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={fullname}
            type="text"
            placeholder="full name"
            className="p-4 text-sm my-4 w-full bg-gray-600  rounded-md focus:outline-none"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 text-sm my-4 w-full bg-gray-600  rounded-md focus:outline-none"
        />

        <input
          ref={password}
          type="password"
          placeholder="password"
          className="p-4 text-sm my-4 w-full bg-gray-600 rounded-md focus:outline-none"
        />
        <p className="text-red-600">{errorMessage}</p>
        <button
          className="p-3 my-6 bg-red-700 w-full rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-2 text-sm cursor-pointer" onClick={toggleSignInForm}>
        {isSignInForm ? (
            <div>
              New to Netflix?{" "}
              <span className="text-red-600 font-semibold"> Sign Up Now!</span>
            </div>
          ) : (
            <div>
              Already an User?{" "}
              <span className="text-red-600 font-semibold"> Sign In Now!</span>
            </div>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
