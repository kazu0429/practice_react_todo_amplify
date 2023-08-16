import React from 'react'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'
import { VStack } from '@chakra-ui/react'

const Main = () => {
  return (
    <VStack spacing={4} align='stretch' p={8}>
      <TodoList/>
      <AddTodo/>
    </VStack>
  )
}

export default Main