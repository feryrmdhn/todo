import { FC, useEffect, useState, useTransition } from "react";
import { Box, Button, Center, Flex, Heading, Input, InputGroup, InputLeftElement, Switch, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import { DataTodo } from "../types";
import { createTodo, deleteTodo, getAllTodo, getDetailTodo, updateStatusTodo, updateTodo } from "../service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import ModalDialog from "../components/dialog";
import ModalForm from "../components/modalForm";
import { SearchIcon } from "@chakra-ui/icons";
import { useDebounce } from "../hooks";
import { useFormik } from "formik";

interface Searching {
    q: string;
}

const editIcon = <FontAwesomeIcon icon={faPencil} />
const initialValuesSearching: Searching = { q: '' }

const Home: FC = () => {
    const [data, setData] = useState<Array<DataTodo>>([])
    const [isPending, startTransition] = useTransition()
    const [limit, setLimit] = useState<number>(5)
    const [maxLength, setMaxLength] = useState([])
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingDel, setLoadingDel] = useState<boolean>(false)
    const [modalType, setModalType] = useState<string>('')
    const [saveId, setSaveId] = useState<number>(0)
    const [dataDetail, setDataDetail] = useState<DataTodo>({})
    const { isOpen, onOpen, onClose } = useDisclosure()

    const getTodos = (name?: string, _page?: number, _limit?: number) => {
        getAllTodo({ name, _page, _limit })
            .then((res) => {
                startTransition(() => {
                    setData(res.data as Array<DataTodo> | any)
                })
            })
            .catch(err => { console.log(err.message) })
    }

    const getLengthTodos = (name?: string, _page?: number, _limit?: number) => {
        getAllTodo({ name, _page, _limit })
            .then((res) => {
                setMaxLength(res.data as Array<DataTodo> | any)
            })
            .catch(err => { console.log(err.message) })
    }

    const formikSearch = useFormik<Searching>({
        initialValues: initialValuesSearching,
        onSubmit: (values) => { }
    })

    useEffect(() => {
        // getTodos(undefined, undefined, limit)
        getLengthTodos()
    }, [limit])

    useDebounce(getTodos, [formikSearch.values.q || undefined, undefined, limit], 400)

    const handleBounce = (val: any) => {
        startTransition(() => {
            formikSearch.setFieldValue('q', val)
        })
    }

    const statusTitle = (status: boolean) => {
        if (status) return <Text fontSize='25px' color='green.500'>Done</Text>
        else return <Text fontSize='25px' color='gray.500'>On Process</Text>
    }

    const openModal = (type: string, id?: number) => {
        if (id) {
            detailTodo(id)
            setSaveId(id)
        }
        onOpen()
        setModalType(type)
    }

    const addTodo = (data: DataTodo) => {
        setLoading(true)
        createTodo(undefined, data)
            .then(() => {
                getTodos(undefined, undefined, limit)
            })
            .catch(err => { console.log(err.message) })
            .finally(() => setLoading(false))
    }

    const handleChangeStatus = (id: number, checked: boolean) => {
        setData((prevState) => {
            const newState = [...prevState];
            const index = newState.findIndex((item) => item.id === id);
            newState[index].status = !checked;
            return newState;
        });
        const payload = data.find(item => item.id === id)
        updateStatusTodo(id, payload as DataTodo)
            .then(() => {
                getTodos(undefined, undefined, limit)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    const detailTodo = (id: number) => {
        getDetailTodo(id)
            .then((res) => {
                setDataDetail(res.data as DataTodo)
            })
            .catch(err => { console.log(err.message) })
            .finally(() => { })
    }

    const editTodo = (data: DataTodo) => {
        setLoading(true)
        updateTodo(saveId, data)
            .then(() => {
                getTodos(undefined, undefined, limit)
            })
            .catch(err => { console.log(err.message) })
            .finally(() => setLoading(false))
    }

    const delTodo = (id: number) => {
        setLoadingDel(true)
        deleteTodo(id)
            .then(() => {
                getTodos(undefined, undefined, limit)
            })
            .catch(err => { console.log(err.message) })
            .finally(() => setLoadingDel(false))
    }

    return (
        <>
            <Box mx={20}>
                <Heading
                    as='h1'
                    textAlign='center'
                    color='blackAlpha.700'
                    fontWeight='normal'
                    letterSpacing='1.5px'
                >
                    Todo App
                </Heading>
                <Flex mx={10} justifyContent='space-between'>
                    <InputGroup w='230px'>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.500' />}
                        />
                        <Input
                            name="search"
                            onChange={(value) => handleBounce(value)}
                            placeholder='Search'
                            size='md'
                        />
                    </InputGroup>
                    <Button colorScheme='pink' size='md' onClick={() => openModal('add')}>+ Add New</Button>
                </Flex>
                <Box mt={10}>
                    {isPending ?
                        <Center>Loading...</Center>
                        :
                        <>
                            {data.map(item => (
                                <Box
                                    key={item.id}
                                    mb='25px'
                                    mx={10}
                                    p='20px'
                                    border='1px solid #d9d7d7'
                                    borderRadius='8px'
                                >
                                    <Flex justifyContent='space-between' wrap='wrap'>
                                        <Box w={500}>
                                            <Flex>
                                                <Text fontSize='25px'>
                                                    {item.name} &bull; &nbsp;
                                                </Text>
                                                {statusTitle(item.status as boolean)}
                                            </Flex>
                                            <Text
                                                fontSize='13px'
                                                fontStyle='italic'
                                                color='blackAlpha.500'
                                            >
                                                {item.description}
                                            </Text>
                                        </Box>
                                        <Flex w={155} pt={1} justifyContent='space-between'>
                                            <Tooltip label='Change Status' placement='top'>
                                                <Switch colorScheme='pink' py={3} size='md' isChecked={item.status} onChange={() => handleChangeStatus(item.id as number, item.status as boolean)} />
                                            </Tooltip>
                                            <Tooltip label='Edit Todo' placement='top'>
                                                <Button colorScheme='blue' onClick={() => openModal('edit', item.id)}>{editIcon}</Button>
                                            </Tooltip>
                                            <ModalDialog
                                                title="Delete Todo"
                                                desc="Are you sure want to delete this todo ?"
                                                isLoading={loadingDel}
                                                onSubmit={() => delTodo(item.id as number)}
                                                onCancel={() => { }}
                                            />
                                        </Flex>
                                    </Flex>
                                </Box>
                            ))}
                        </>
                    }
                </Box>
                {data.length === 0 || data.length === maxLength.length ?
                    null
                    :
                    <Center mb={10}>
                        <Button onClick={() => setLimit(limit + 5)}>Load more...</Button>
                    </Center>
                }
            </Box>
            <ModalForm
                open={isOpen}
                close={onClose}
                modalType={modalType}
                data={modalType === 'edit' ? dataDetail : undefined}
                isLoading={loading}
                onSubmit={(e) => modalType === 'edit' ? editTodo(e) : addTodo(e)}
                onCancel={() => { }}
            />
        </>
    )
}

export default Home;