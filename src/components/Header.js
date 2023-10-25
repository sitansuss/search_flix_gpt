import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSerachView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  //const showGptSerach = useSelector((store) => store.gpt.showGptSerach)
  const gptView = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));

        navigate("/browse");
        //navigate("/browse");
        // ...
      } else {
        dispatch(removeUser());
        navigate("/");

        // User is signed out
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSerachView());
  };

  const handleLanguageChange = (e) => {
    //console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen flex flex-col md:flex-row items-center md:justify-between md:items-center md:px-8 px-2 py-2 bg-gradient-to-b from-black z-10">
      <img className="w-44" src={LOGO} alt="" />
      {user && (
        <div className="flex p-2 ">
          {gptView && (
            <select
              className="py-2 px-4 rounded-md text-white bg-black border-2 border-red-500 outline-none"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-2 my-2 bg-purple-950 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {gptView ? "HomePage" : "Try Gpt Serach"}
          </button>
          <img
            className=" h-10 w-10"
            src="https://th.bing.com/th?id=OIP.LTTKrxNWDr_k74wz6jKqBgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
            alt=""
          />
          <button onClick={handleSignOut} className="font-bold text-white">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
