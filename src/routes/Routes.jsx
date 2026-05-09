import React from 'react'
import {
    createHashRouter,
    RouterProvider,
} from 'react-router-dom'
import ErrorPage from '../ErrorPage'
import Root from './Root'
import Article, { loader as articleLoader } from './Article'

const router = createHashRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
    },
    {
        path: "article/:id",
        element: <Article />,
        loader: articleLoader,
    },
])

export default function AppRoutes(){
    return <RouterProvider router={router} />
}