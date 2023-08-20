import { DataStore } from "aws-amplify";
import { Todo } from "../../../models";
import { async } from "q";

export const createTodoApi = async(data:{content:string}) => {
    const {content} = data;

    try{
        await DataStore.save(
            new Todo({
                content:content,
                isDone:false,
            })
        )
    }catch(err){
        throw err;
    }
}

export const fetchTodoListApi = async() => {
    try{
        const todoList = await DataStore.query(Todo);
        return todoList;
    }catch(err){
        throw err;
    }
}

export const updateTodoApi = async(data:{id:string, isDone:boolean}) => {
    const {id, isDone} = data;
    try{
        // データベースの情報を取得
        const original = await DataStore.query(Todo, id);

        // データがない時
        if(!original){
            alert('指定されたTodoはデータベース城に存在しません。')
            return;
        }

        // 更新
        await DataStore.save(
            Todo.copyOf(original, (updated) => {
                updated.isDone = isDone;
            })
        )
    }catch(err){
        throw err
    }
}

export const deleteTodoApi = async(data:{id:string}) => {
    const {id} = data;
    try{
        const deleteTodo = await DataStore.query(Todo, id)

        if(!deleteTodo){
            alert('指定されたTodoはデータベース城に存在しません。');
            return;
        }

        await DataStore.delete(deleteTodo)
    }catch(err){
        throw err
    }
}