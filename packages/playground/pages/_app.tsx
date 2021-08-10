import React, { FC } from "react"
import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider>
    <Component {...pageProps} />
  </ChakraProvider>
)

export default MyApp
