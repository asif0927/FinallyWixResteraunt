import Home from "../pages/User/Home";
import MainRoot from "../pages/MainRoot";
import NotFound from "../pages/User/NotFound";
import Contact from "../pages/User/Contact";
import Ourplace from "../pages/User/Ourplace";
import Reservations from "../pages/User/Reservations";
import Gallery from "../pages/User/Gallery";
import Menu from "../pages/User/Menu";
export const ROUTES = [
    {
        path: '/',
        element: <MainRoot/>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'contact',
                element: <Contact/>
            },
            {
                path: 'menu',
                element: <Menu/>
            },
            {
                path: 'ourplace',
                element: <Ourplace/>
            },
            {
                path: 'gallery',
                element: <Gallery/>
            },
            {
                path: 'reservations',
                element: <Reservations/>
            },
            {
                path: '*',
                element: <NotFound/>
            }
        ]
    },
]