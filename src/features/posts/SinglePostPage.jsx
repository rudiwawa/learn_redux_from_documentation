import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {selectPostById} from './postsSlice'
export const SinglePostPage = ({ match }) => {
    const { postId } = match.params

    const post = useSelector(state => selectPostById(state, postId))
    //semacam fungsi yang meminta parameter fungsi, ANJINK INI KENAPA NJINK
    // console.log(useSelector(
    //     function (state) {
    //         return state.posts.find(post => post.id === postId)
    //     }
    // ))

    if (!post) {
        return (
            <section>
                <h2>Post not found</h2>
            </section>
        )
    }

    return (
        <section>
            <article className="post">
                <h2>{post.title}</h2>
                <p className="post-content">{post.content}</p>
                <Link to={`/editPost/${post.id}`} className="button">
                    Edit Post
        </Link>
            </article>
        </section>
    )
}
