import React from 'react'
import { Center, Flex, Heading, StackDivider, VStack, Text } from '@chakra-ui/react'
import TodoItem from './TodoItem'

const TodoList = () => {

    const todoList = [
        { id: '001', content: 'test01', isDone: true },
        { id: '002', content: 'test02', isDone: false },
        { id: '003', content: 'test03', isDone: true },
        { id: '004', content: 'test04', isDone: false },
    ]

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
                overflow='scroll'
            >
                {todoList.length === 0 ? (
                    <Text align='center' fontWeight='bold' fontSize='lg'>
                        Not Todo
                    </Text>
                ): (
                    todoList.map((item) => {
                        return <TodoItem 
                                    id={item.id} 
                                    content={item.content} 
                                    isDone={item.isDone} 
                                />
                    })
                )}
            </VStack>
        </Flex>
    )
}

export default TodoList