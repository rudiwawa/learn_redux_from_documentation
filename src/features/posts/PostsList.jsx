import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'

import { selectAllPosts, fetchPosts } from './postsSlice'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


export const PostsList = () => {
  const dispatch = useDispatch()

  // const posts = useSelector(state => state.posts)
  const posts = useSelector(selectAllPosts)

  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  useEffect(() => {
    // menjalankan dispatch hanya jika postStatus dalam keadaan idle biar ga mubazir request tiap rerender
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
    return () => {

    }
  }, [postStatus, dispatch])
  console.log("PostsList -> orderedPosts", orderedPosts)
  const PostExcerpt = ({post}) => {
  console.log("PostsList -> post", post)
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>

      <p className="post-content">{post.content.substring(0, 100)}</p>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )

}

let content

if (postStatus === 'loading') {
  content = <div className="loader">Loading...</div>
} else if (postStatus === 'succeeded') {
  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))

  content = orderedPosts.map(post => (
    <PostExcerpt key={post.id} post={post} />
  ))
} else if (postStatus === 'failed') {
  content = <div>{error}</div>
}

return (
  <section className="posts-list">
    <h2>Posts</h2>
    {content}
  </section>
)
}