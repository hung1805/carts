import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "configs/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ChangePass from "./ChangePass";
import ChangeUserName from "./ChangeUserName";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => setUser(null);
  }, []);

  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const userName = useSelector((state) => state.auth.user.name);
  const photoURL = useSelector((state) => state.auth.user.photoURL);

  const [showChangePass, setshowChangePass] = useState(false);
  const [showChangeName, setShowChangeName] = useState(false);

  const handleChangeUsername = () => {
    setShowChangeName(true);
    setshowChangePass(false);
  };

  const handleChangePassword = () => {
    setshowChangePass(true);
    setShowChangeName(false);
  };

  if (!userId) {
    navigate(-1);
  }
  return (
    <div className="container">
      <div className="bg-white my-10">
        <>
          <Link
            to="/"
            className="mb-4 mt-6 ml-6 inline-block text-custom_red text-xl font-medium uppercase"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="mr-1" />
            Back To Home
          </Link>
          <div className="flex md:p-6 flex-col md:flex-row">
            <ul className="md:w-3/12 lg:w-1/5">
              <li className="pl-4 md:text-lg lg:text-lg font-medium mb-2">
                Choose an Action below
              </li>
              <li
                className="py-1 pl-4 border-b border-t border-custom_grey"
                onClick={handleChangePassword}
              >
                <span className="cursor-pointer">Change Password</span>
              </li>
              <li
                className="py-2 pl-4 border-b border-custom_grey"
                onClick={handleChangeUsername}
              >
                <span className="cursor-pointer">Change Name</span>
              </li>

              <li className="py-2 pl-4 border-b border-custom_grey">
                <Link className="cursor-pointer" to="user/cart">
                  Change My Cart Settings
                </Link>
              </li>
            </ul>
            <div className="mt-6 md:mt-0 md:w-9/12 lg:w-4/5 pl-12">
              <div />
              <div className="flex items-center justify-between lg:justify-around border-b pb-4">
                <ul className="w-1/2 flex flex-col">
                  <li className="w-full inline-flex items-center justify-between">
                    <label className="text-lg font-medium text-custom_blue">Name:</label>
                    <p>{userName}</p>
                  </li>
                  <li className="w-full inline-flex items-center justify-between">
                    <label className="text-lg font-medium text-custom_blue">Id:</label>
                    <p> {userId} </p>
                  </li>
                  <li className="w-full inline-flex items-center justify-between">
                    <label className="text-lg font-medium text-custom_blue">
                      Create at:
                    </label>
                    <p>11/18/2021</p>
                  </li>
                  <li className="w-full inline-flex items-center justify-between">
                    <label className="text-lg font-medium text-custom_blue">Type:</label>
                    <p> Gold Member</p>
                  </li>
                </ul>
                <div className=" rounded-full border border-custom_grey md:max-w-28 overflow-hidden">
                  {photoURL && <img src={photoURL} alt="avatar" className="p-6" />}
                </div>
              </div>
              {showChangePass && <ChangePass user={user} />}
              {showChangeName && <ChangeUserName user={user} />}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default UserProfile;
