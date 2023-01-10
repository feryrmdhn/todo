import { Box } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { pageRoutes } from "./routes/pageRoute";
import { RouteProps } from "./types";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Header */}
        <Box px="40px" pt="25px" h='full'>
          <Routes>
            {pageRoutes.map((route: RouteProps) => (
              <Route key={route.path} path={route.path} element={route.component} />
            ))}
          </Routes>
        </Box>
        {/* Footer */}
      </BrowserRouter>
    </>
  );
}

export default App;