import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {nanoid} from "@reduxjs/toolkit";
import {postAdded} from "./postsSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const dispatch = useDispatch();

    const onTitleChanget = e => setTitle(e.target.value);
    const onContentChanget = e => setContent(e.target.value);

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postAdded({id: nanoid(), title, content}));
            setTitle("");
            setContent("");
        }
    }
    return (
        <section>
            <h2>Add A New Post</h2>
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
