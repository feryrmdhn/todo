import { ReactElement } from "react";

export interface GlobalTypes {
    id?: number;
    name?: string;
    status?: boolean;
}

export interface RouteProps {
    path: string;
    component: ReactElement<any>;
    exact?: boolean;
}

export interface UrlParams extends GlobalTypes {
    _page?: number;
    _limit?: number;
    filter_by?: 'string';
    sort_by?: 'string';
}

export interface ComponentProps {
    id?: number;
    title?: string;
    desc?: string;
    status?: boolean;
    modalType?: string;
    sizeModal?: CustomSizeModal;
    isLoading?: boolean;
    onSubmit: (params?: any) => void;
    onCancel?: () => void;
}

export type CustomSizeModal = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface FuncModal {
    data?: DataTodo;
    open: boolean;
    close: () => void;
}

export interface DataTodo extends GlobalTypes {
    description?: string;
}