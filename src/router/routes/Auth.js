// all the authentication pages should be included here

import Account from "../../views/Auth/Account";

export const AuthRoutes = [
    {
        path: "/account",
        element: <Account />,
        layout: "default"
    }
]