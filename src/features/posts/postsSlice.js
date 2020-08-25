import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit';

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
]//state awal
// Remember that the name of this reducer should be a good description of what's happening,

//CATATAN UPDATE POST
// The ID of the post being updated, so that we can find the right post object in the state
// The new title and content fields that the user typed in

// Redux action objects aslinya kayak gini {type: 'posts/postUpdated', payload: {id, title, content}}.
// reducer responsible for determing how the state should actually be updated when an action is dispatched.
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user: userId
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
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