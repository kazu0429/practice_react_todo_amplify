import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react'
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from 'react-icons/ri'
import { BsTrash } from 'react-icons/bs'
import { useAppDispatch } from '../../stores/hooks';
import { updateTodo, deleteTodo } from '../../stores/slices/todo/todoSlice';

type Props = {
    id: string;
    content: string;
    isDone: boolean;
}

const TodoItem: React.VFC<Props> = ({ id, content, isDone }) => {
    const dispatch = useAppDispatch();
    const handleUpdate = () => {
        dispatch(updateTodo(id));
    }
    const handleDelete = () => {
        dispatch(deleteTodo(id))
    }
    return (
        <Flex w='100%' align='center' justify='space-between'>
            <Flex align='center'>
                <Icon
                    as={isDone ? RiCheckboxCircleFill : RiCheckboxBlankCircleLine}
                    color='purple.400'
                    cursor='pointer'
                    h={6}
                    mr={2}
                    w={6}
                    onClick={handleUpdate}
                />
                <Text fontSize='xl'>{content}</Text>
            </Flex>
            <Icon 
                as={BsTrash} 
                color='blue.600' 
                cursor='pointer' 
                h={5} 
                w={5} 
                onClick={handleDelete}
            />
        </Flex>
    )
}

export default TodoItem