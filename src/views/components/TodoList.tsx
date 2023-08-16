import React from 'react'
import { Center, Flex, Heading, StackDivider, VStack, Text } from '@chakra-ui/react'
import TodoItem from './TodoItem'
import { useAppSelector } from '../../stores/hooks'
import { selectTodoList } from '../../stores/slices/todo/todoSlice'

const TodoList = () => {

    const todoList = useAppSelector(selectTodoList);

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