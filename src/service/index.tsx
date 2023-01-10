import { DataTodo, GlobalTypes, UrlParams } from "../types";
import apiInstance from "./instance";
import { ResponseAPI } from "./types";


export const getAllTodo = (params: UrlParams) => apiInstance.get<ResponseAPI<Array<DataTodo>>>('/todolist', { params })
export const createTodo = (params: any, payload: GlobalTypes) => apiInstance.post<ResponseAPI<boolean>>('/todolist', payload)
export const getDetailTodo = (params: number) => apiInstance.get<ResponseAPI<DataTodo>>(`/todolist/${params}`)
export const updateTodo = (params: number, payload: GlobalTypes) => apiInstance.put<ResponseAPI<boolean>>(`/todolist/${params}`, payload)
export const updateStatusTodo = (id: number, payload: DataTodo) => apiInstance.patch<ResponseAPI<boolean>>(`/todolist/${id}`, payload)
export const deleteTodo = (params: number) => apiInstance.delete<ResponseAPI<boolean>>(`/todolist/${params}`)

