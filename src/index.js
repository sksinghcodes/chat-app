import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import ErrorHome from './components/error/ErrorHome';
import SignUp from './components/authentication/SignUp';
import SignIn from './components/authentication/SignIn';
import Home from './components/pages/Home';
import Protected from './components/authentication/Protected'

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorHome />,
        children: [
            {
                path: "",
                element: <Protected ifLoggedIn={true}><Home /></Protected>,
            },
            {
                path: "sign-up",
                element: <Protected ifLoggedIn={false}><SignUp /></Protected>,
            },
            {
                path: "sign-in",
                element: <Protected ifLoggedIn={false}><SignIn /></Protected>,
            },
        ],
    },
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);