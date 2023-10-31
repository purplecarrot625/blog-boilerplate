import React, {useState} from "react";
import axios from "axios";

/*
** 1. Need a piece of state to track the content of the input.
** 2. A event handler of the form itself.
** 3. A function to make a post request to the backend API.
*/
const CommentCreate = ({postId}) => {
    const [content, setContent] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault(); // prevent page refresh
        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content
        })

        setContent('')
    }

    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New Comment</label>
                <input
                value={content}
                onChange={e => setContent(e.target.value)} className="form-control" />
            </div>
            <button className="btn btn-primary"> Submit </button>
        </form>
    </div>
}

export default CommentCreate;
