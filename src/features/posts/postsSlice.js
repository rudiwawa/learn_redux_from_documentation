import { sub } from 'date-fns'
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
    posts: [],
    status: 'idle',
    error: 'null'
}

//state awal
// Remember that the name of this reducer should be a good description of what's happening,

//CATATAN UPDATE POST
// The ID of the post being updated, so that we can find the right post object in the state
// The new title and content fields that the user typed in

// Redux action objects aslinya kayak gini {type: 'posts/postUpdated', payload: {id, title, content}}.
// reducer responsible for determing how the state should actually be updated when an action is dispatched.

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.posts
})
export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async initialPost => {
        const response = await client.post('/fakeApi/posts', { post: initialPost })
        return response.post
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        date: new Date().toISOString(),
                        content,
                        user: userId
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.posts.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addNewPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload)
        }
    }
})
// Remember: reducer functions must always create new state values immutably, 
// by making copies! It's safe to call mutating functions like Array.push() 
// or modify object fields like state.someField = someValue inside of createSlice(), 
// because it converts those mutations into safe immutable updates internally using 
// the Immer library, but don't try to mutate any data outside of createSlice!

export const { postAdded, postUpdated } = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts
export const selectPostById = (state, postId) =>
    state.posts.posts.find(post => post.id === postId)