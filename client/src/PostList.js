import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://posts.com/posts'); // get all posts by using query service
        console.log(res.data);
        setPosts(res.data);
    }

    useEffect(()=>{
        fetchPosts();
    }, []) // empty array means only run this function one time

    const renderedPosts = Object.values(posts).map(post => {
        return (
        <div
            className="card"
            style={{ width: '30%', marginBottom: '20px'}}
            key={post.id}
        >
        <div className="card-body">
            <h3>{post.title}</h3>
            <CommentList comments = {post.comments} />
            <CommentCreate postId={post.id} />
        </div>
        </div> // react required key prop , use id as key
        )
    })

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        { renderedPosts}
    </div>
}

export default PostList;