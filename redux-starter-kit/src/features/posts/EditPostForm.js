import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useEditPostMutation, useGetPostQuery} from '../../api/apiSlice'
import {Spinner} from "../../components/Spinner";

export const EditPostForm = ({match}) => {

    const {postId} = match.params

    const {data: post} = useGetPostQuery(postId)
    const [updatePost, {isLoading}] = useEditPostMutation()

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)
    const navigate = useNavigate()

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostClicked = async () => {
        if (title && content) {
            await updatePost({id: postId, title, content})
            navigate(`/posts/${postId}`)
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                {isLoading && <Spinner text="Updating"/>}
                <label htmlFor='postTitle'>Post Title:</label>
                <input
                    type='text'
                    id='postTitle'
                    name='postTitle'
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor='postContent'>Content:</label>
                <textarea
                    id='postContent'
                    name='postContent'
                    value={content}
                    onChange={onContentChanged}
                />
                <button type='button' onClick={onSavePostClicked} disabled={isLoading}>Save Post</button>
            </form>
        </section>
    )
}
