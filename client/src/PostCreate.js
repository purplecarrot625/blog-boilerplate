import React, {useState } from "react";
import axios from "axios";

const PostCreate = () => {
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault(); // prevent page refresh

        await axios.post('http://my-app.org/posts/create', {
            title
        });

        setTitle(''); // clear input field, reset to empty string
    };

    return <div>
        <form onSubmit={ onSubmit }>
            <div className="form-group">
                <label>Title</label>
                <input value={ title } onChange={ e=> setTitle(e.target.value)} className="form-control" />
            </div>
            <button className="btn btn-primary"> Submit </button>
        </form>
    </div>
}

export default PostCreate;
