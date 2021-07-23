import React, { FC } from 'react'
import { Spacer, Flex } from '@chakra-ui/react'

// components
import Full from '../components/Full'
import Minimal from '../components/Minimal'

const Home: FC = () => (
  <Flex direction='column'>
    <Full />
    <Spacer h='sm' />
    <Minimal />
  </Flex>
)

export default Home
