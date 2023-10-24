import React from "react";

const CommentList = ({ comments }) => {
    const renderedComments = comments.map(comment => {

        let content

        if (comment.status === 'pending') {
            comment.content = 'This comment is awaiting moderation';
        }

        if (comment.status === 'rejected') {
            comment.content = 'This comment has been rejected';
        }

        if (comment.status === 'approved') {
            content = comment.content;
        }

        return <li key={comment.id}>{comment.content}</li>
    })

    return <ul>
        {renderedComments}
    </ul>
}

export default CommentList;