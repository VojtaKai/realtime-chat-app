import "./App.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Join } from "./components/Join"
import { Chat } from "./components/Chat"
import { ErrorElement } from "./components/Error"

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Join />,
            errorElement: <ErrorElement />,
        },
        {
            path: "/chat",
            element: <Chat />,
            errorElement: <ErrorElement />,
        },
    ])

    return <RouterProvider router={router} fallbackElement={<ErrorElement />} />
}
export default App
