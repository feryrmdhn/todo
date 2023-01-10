import { extendTheme } from '@chakra-ui/react'

//default theme
const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

export const theme = extendTheme({ config })