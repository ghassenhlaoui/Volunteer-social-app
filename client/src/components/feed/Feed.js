import { useContext, useEffect, useState } from "react";
import Share from "../share/Share";
import "./feed.css";
import Post from "../post/Post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


const Feed = ({ username }) => {
    const instance = axios.create({
        baseURL: 'http://localhost:4000', // Set your custom base URL here
      });
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
        const res = username
            ? await instance.get("/api/posts/profile/" + username)
            : await instance.get("/api/posts/timeline/" + user._id);
        setPosts(
            res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
        );
        };
        fetchPosts();
    }, [username, user._id]);

    return (
        <div className="feed">
        <div className="feedWrapper">
            {(!username || username === user.username) && <Share />}
            {posts.map((p) => (
            <Post key={p._id} post={p} />
            ))}
        </div>
        </div>
    );
}
 
export default Feed;