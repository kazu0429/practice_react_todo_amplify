import { Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react'
import {RiCheckboxBlankCircleLine, RiCheckboxBlankFill } from 'react-icons/ri'
import {BsTrash} from 'react-icons/bs'

type Props = {
    id:string;
    content:string;
    isDone:boolean;
}

const TodoItem:React.VFC<Props> = ({id,content, isDone}) => {
  return (
    <Flex w='100%' align='center' justify='space-between'>
        <Flex align='center'>
            <Icon 
                as={isDone ? RiCheckboxBlankFill : RiCheckboxBlankCircleLine} 
                color='purple.400'
                cursor='pointer'
                h={6}
                mr={2}
                w={6}
            />
            <Text fontSize='xl'>{content}</Text>
        </Flex>
        <Icon as={BsTrash} color='blue.600' cursor='pointer' h={5} w={5}/>
    </Flex>
  )
}

export default TodoItem