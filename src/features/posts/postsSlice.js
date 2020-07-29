import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
]//state awal

const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{}
})
// Hasilnya tar kayak gini
// {
//     posts: [
//       {
//         id: '1',
//         title: 'First Post!',
//         content: 'Hello!'
//       },
//       {
//         id: '2',
//         title: 'Second Post',
//         content: 'More text'
//       }
//     ]
//   }

export default postsSlice.reducer