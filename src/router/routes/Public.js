// all the public pages should be included here

import CodeEditor from "../../views/VideoCall/codeeditor";
import Chat from "../../views/VideoCall/videocall";

export const PublicRoutes = [
    {
        path: "/chat",
        element: <Chat />,
        layout: "default"
    },
    {
        path: "/codeeditor",
        element: <CodeEditor />,
        layout: "default"
    }
]