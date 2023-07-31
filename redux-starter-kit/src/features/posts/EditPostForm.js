import React, { useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {postUpdated, selectPostsById} from "./postsSlice";

export const EditPostForm = ({match}) => {
    const {postId} = match.params;
    const post = useSelector(state => selectPostsById(state, postId));
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const dispatch = useDispatch();
    const history = useHistory();

    const onTitleChanget = e => setTitle(e.target.value);
    const onContentChanget = e => setContent(e.target.value);

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({...post, title, content}));
            setTitle("");
            setContent("");
            history.push(`/posts/${post.id}`)
        }
    }
    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanget}
                />
                <label htmlFor="postContent">Post Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanget}
                />
                <button type="button" onClick={onSavePostClicked}>Save Post</button>
            </form>
        </section>
    )
}
