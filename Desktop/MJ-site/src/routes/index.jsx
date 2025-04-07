import { createBrowserRouter } from 'react-router-dom';
import HomeClient from '../pages/Home/HomeClient';
import HomePage from '../pages/Home/HomePage';
import OrderPage from '../pages/Home/OrderPage';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <HomeClient />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/orders',
                element: <OrderPage />
            }
        ]
    }
])