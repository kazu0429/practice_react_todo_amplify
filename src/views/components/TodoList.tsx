import React, { useEffect } from 'react'
import { Center, Flex, Heading, StackDivider, VStack, Text } from '@chakra-ui/react'
import TodoItem from './TodoItem'
import { Todo } from "../../models";
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { deleteTodoRealTime, fetchTodoListAsync, fetchTodoRealTime, selectTodoList, updateTodoRealTime } from '../../stores/slices/todo/todoSlice'
import { DataStore } from 'aws-amplify'

const TodoList = () => {

    const todoList = useAppSelector(selectTodoList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchTodoList = async () => {
            await dispatch(fetchTodoListAsync())
        }
        fetchTodoList();
    }, [dispatch])


    useEffect(() => {
        // todoテーブルの変更をリアルタイムに検知する
        const subscription = DataStore.observe(Todo).subscribe((msg) => {
            console.log(msg);
            switch (msg.opType) {
                case 'INSERT':
                    dispatch(fetchTodoRealTime(msg.element));
                    break;
                case 'UPDATE':
                    dispatch(updateTodoRealTime(msg.element));
                    break;
                case 'DELETE':
                    dispatch(deleteTodoRealTime(msg.element));
                    break;
            }
        });

        return () => {
            subscription.unsubscribe();
        };

    },[dispatch])

    return (
        <Flex flexDir='column' align='center'>
            <Center mb={8}>
                <Heading>Todo List</Heading>
            </Center>
            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                align='stretch'
                w={{ base: '90vw', sm: '80vw', md: '70vw', lg: '60vw' }}
                border='2px'
                borderColor='gray.300'
                borderRadius='md'
                p={4}
                maxH='65vh'
            // overflow='scroll'
            >
                {todoList.length === 0 ? (
                    <Text align='center' fontWeight='bold' fontSize='lg'>
                        Not Todo
                    </Text>
                ) : (
                    todoList.map((item) => {
                        return (
                            <TodoItem
                                key={item.id}
                                id={item.id}
                                content={item.content}
                                isDone={item.isDone}
                            />
                        )
                    })
                )}
            </VStack>
        </Flex>
    )
}

export default TodoList