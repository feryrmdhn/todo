import { RouteProps } from "../types";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export const pageRoutes: Array<RouteProps> = [
    { path: "/", exact: true, component: <Home /> },
    { path: "*", component: <NotFound /> },
]