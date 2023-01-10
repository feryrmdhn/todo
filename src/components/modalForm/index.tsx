import { FC, useEffect } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import { ComponentProps, DataTodo, FuncModal } from "../../types";
import { useFormik } from "formik";

const initialValues: DataTodo = {
    name: '',
    description: '',
    status: false
}

const ModalForm: FC<ComponentProps & FuncModal> = (props) => {

    const formik = useFormik<DataTodo>({
        initialValues,
        onSubmit: (values, { resetForm }) => {
            props.onSubmit(values)
            if (!props.isLoading) props.close()
            resetForm()
        },
    })

    useEffect(() => {
        if (!props.open) formik.resetForm()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open])

    return (
        <>
            <Modal isOpen={props.open} onClose={props.close} size={props.sizeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.modalType === 'edit' ? 'Edit' : 'Add'}</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={formik.handleSubmit}>
                        <ModalBody>
                            <FormControl isRequired>
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                <Input
                                    name='name'
                                    type='text'
                                    mb={5}
                                    onChange={formik.handleChange}
                                    defaultValue={props.data?.name || formik.values.name}
                                    placeholder='Input Name'
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor='description'>Description</FormLabel>
                                <Textarea
                                    name='description'
                                    mb={5}
                                    onChange={formik.handleChange}
                                    defaultValue={props.data?.description || formik.values.description}
                                    placeholder='Input Description'
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor='status'>Status</FormLabel>
                                <RadioGroup
                                    name="status"
                                    onChange={(value) => formik.setFieldValue('status', !!value)}
                                    defaultValue={props.data?.status?.toString() || initialValues.status?.toString()}
                                >
                                    <Stack direction='row'>
                                        <Radio value='true'>Done</Radio>
                                        <Radio value='false'>On Process</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={props.close}>
                                Cancel
                            </Button>
                            <Button isLoading={props.isLoading} colorScheme='green' type="submit">
                                {props.modalType === 'add' ? 'Add' : 'Update'}
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalForm;