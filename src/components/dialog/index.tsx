import { FC, useEffect, useRef } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Tooltip,
    useDisclosure
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ComponentProps } from "../../types";

const ModalDialog: FC<ComponentProps> = ({ onSubmit, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<any>()
    const deleteIcon = <FontAwesomeIcon icon={faTrash} />

    const onSubmited = () => {
        onSubmit()
    }

    useEffect(() => {
        if (!!props.isLoading) onClose()
    }, [])

    return (
        <>
            <Tooltip label='Delete Todo' placement='top'>
                <Button colorScheme='red' onClick={onOpen}>{deleteIcon}</Button>
            </Tooltip>

            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                size='md'
                onClose={onClose}
                isOpen={isOpen}
                isCentered={false}
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>{props.title}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {props.desc}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}> No</Button>
                        <Button isLoading={props.isLoading} colorScheme='red' ml={3} onClick={onSubmited}>Yes</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default ModalDialog;