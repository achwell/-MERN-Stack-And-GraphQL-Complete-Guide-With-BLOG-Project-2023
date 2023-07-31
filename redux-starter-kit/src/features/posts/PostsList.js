import React, {memo, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Spinner} from "../../components/Spinner";
import {PostAuthor} from "./PostAuthor";
import {TimeAgo} from "./TimeAgo";
import {ReactionButtons} from './ReactionButtons'
import {fetchPosts, selectAllPosts, selectPostIds, selectPostsById} from "./postsSlice";

let PostExcerpts = ({ postId }) => {
    const post = useSelector(state => selectPostsById(state, postId))
    return (
        <article className='post-excerpt' key={post.id}>
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className='post-content'>{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className='button muted-button'>
                View Post
            </Link>
        </article>
    )
}

PostExcerpts = memo(PostExcerpts)

export const PostsList = () => {
    const posts = useSelector(selectAllPosts)
    const dispatch = useDispatch()
    const orderedPostsIds = useSelector(selectPostIds)
    const postStatus = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    let content

    if (postStatus === "loading") {
        content = <Spinner text="Loading..."/>
    } else if (postStatus === "succeded") {
        content = orderedPostsIds.map(postId => <PostExcerpts key={postId} postId={postId}/>)

    } else if (postStatus === "error") {
        content = <div>{error}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}
