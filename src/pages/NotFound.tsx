import { Center, Text } from "@chakra-ui/react";
import { FC } from "react";

const NotFound: FC = () => {
    return (
        <>
            <Center>
                <Text fontSize='2xl' fontWeight='bold'>PAGE NOT FOUND!</Text>
            </Center>
        </>
    )
}

export default NotFound;