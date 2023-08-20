import { DataStore } from "aws-amplify";
import { Todo } from "../../../models";

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