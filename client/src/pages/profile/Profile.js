import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Profile = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:4000', // Set your custom base URL here
  });

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [isLoading, setIsLoading] = useState(true);


  const fetchUser = async () => {
    const res = await instance.get(`/api/users?username=${username}`);
    setUser(res.data.data);
    setIsLoading(false);
  };


  useEffect(() => {
    fetchUser();
  }, [username]);


  if (isLoading) {
    // You can render a loading spinner or message while waiting for the data
    return <p>Loading...</p>;
  }
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user?.coverPicture
                    ? PF + user?.coverPicture
                    : PF + "person/noCover.png"
                    
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user?.profilePicture
                    ? PF + user?.profilePicture
                    // : PF + "person/noAvatar.png"
                    : PF + "person/123.jpg"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              {/* <span className="profileInfoDesc">{user?.desc}</span> */}
              <span className="profileInfoDesc">Young computer science student, addicted success and learning</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;