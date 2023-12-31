import { v4 as uuidv4 } from 'uuid';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../stores/store';
import { fetchTodoListApi } from './todoAPI';

export type TodoState = {
    todoList: { id: string, content: string, isDone: boolean }[];
}

const initialState: TodoState = {
    todoList: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchTodoListAsync = createAsyncThunk(
    'todo/fetchTodoList',
    async () => {
        const response = await fetchTodoListApi();
        // The value we return becomes the `fulfilled` action payload
        return response;
    }
);

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        fetchTodoRealTime:(state,action) => {
            state.todoList = [...state.todoList, action.payload];
        },
        updateTodoRealTime:(state, action) => {
            const targetTodo = state.todoList.find((todo) => {
                return todo.id === action.payload.id;
            })
            if(targetTodo){
                targetTodo.isDone=action.payload.isDone;
            }
        },
        deleteTodoRealTime:(state, action) => {
            state.todoList = state.todoList.filter((todo) => {
                return todo.id !== action.payload.id;
            })
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodoListAsync.fulfilled, (state, action) => {
                state.todoList = action.payload;
            });
    },
});

export const { fetchTodoRealTime, updateTodoRealTime, deleteTodoRealTime } = todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodoList = (state: RootState) => state.todo.todoList;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//         (dispatch, getState) => {
//             const currentValue = selectCount(getState());
//             if (currentValue % 2 === 1) {
//                 dispatch(incrementByAmount(amount));
//             }
//         };

export default todoSlice.reducer;
