import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const Rightbar = ({user}) => {
    const instance = axios.create({
      baseURL: 'http://localhost:4000', // Set your custom base URL here
    });
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);

    const [followed, setFollowed] = useState(
      currentUser.followings.includes(user?.id)
    );

    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await instance.get("/api/users/friends/" + currentUser._id);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }, [user]);
  
    const handleClick = async () => {
      try {
        if (followed) {
          await instance.put(`/api/users/${user._id}/unfollow`, {
            userId: currentUser._id,
          });
          dispatch({ type: "UNFOLLOW", payload: user._id });
        } else {
          await instance.put(`/api/users/${user._id}/follow`, {
            userId: currentUser._id,
          });
          dispatch({ type: "FOLLOW", payload: user._id });
        }
        setFollowed(!followed);
      } catch (err) {
      }
    };
    const HomeRightbar = () => {
        return (
            <>
              <div className="birthdayContainer">
                <img className="birthdayImg" src="assets/gift.png" alt="" />
                <span className="birthdayText">
                  <b>Ghassen Helaoui </b> and <b>2 other friends</b> have a birhday today.
                </span>
              </div>
              <img className="rightbarAd" src="assets/ad.jpg" alt="" />
              <h4 className="rightbarTitle">Online Friends</h4>
              <ul className="rightbarFriendList">
                {Users.map((u) => (
                  <Online key={u.id} user={u} />
                ))}
              </ul>
            </>
          );
        };
    
      const ProfileRightbar = () => {
        return (
          <>
            {user?.username !== currentUser?.username && (
              <button className="rightbarFollowButton" onClick={handleClick}>
                {followed ? "Unfollow" : "Follow"}
                {followed ? <RemoveIcon /> : <AddIcon />}
              </button>
            )}
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                {/* <span className="rightbarInfoValue">{user.city}</span> */}
                <span className="rightbarInfoValue">Ksour Essef, Mahdia</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                {/* <span className="rightbarInfoValue">{user.from}</span> */}
                <span className="rightbarInfoValue">Tunisia</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Age:</span>
                {/* <span className="rightbarInfoValue">{user.from}</span> */}
                <span className="rightbarInfoValue">23</span>
              </div>
              {/* <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">
                  {user.relationship === 1
                    ? "Single"
                    : user.relationship === 1
                    ? "Married"
                    : "-"}
                </span>
              </div> */}
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">
              {friends.map((friend) => (
                <Link
                  to={"/profile/" + friend.username}
                  style={{ textDecoration: "none" }}
                >
                  <div className="rightbarFollowing">
                    <img
                      src={
                        friend.profilePicture
                          ? PF + friend.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">{friend.username}</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        );
      };
      return (
        <div className="rightbar">
          <div className="rightbarWrapper">
            {user ? <ProfileRightbar /> : <HomeRightbar />}
          </div>
        </div>
      );
    }
 
export default Rightbar;