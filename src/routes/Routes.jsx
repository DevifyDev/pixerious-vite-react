import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import ErrorPage from '../ErrorPage'
import Root from './Root'
import Article, { loader as articleLoader } from './Article'

const router = createBrowserRouter([
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