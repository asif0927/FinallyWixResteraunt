import Home from "../pages/User/Home";
import MainRoot from "../pages/MainRoot";
import AdminRoot from "../pages/Admin/AdminRoot";
import Dashboard from "../pages/Admin/Dashboard";
import ReservationCrud from "../pages/Admin/ReservationCrud";
import Sliders from "../pages/Admin/Sliders";
import Subscribers from "../pages/Admin/Subscribers";
import AdressandTelephone from "../pages/Admin/AdressandTelephone";
import Login from "../pages/Admin/Login";
import GalleryCrud from "../pages/Admin/GalleryCrud";
import WorkTime from "../pages/Admin/WorkTime";
import GifCrud from "../pages/Admin/GifCrud";
import SocialMedia from "../pages/Admin/SocialMedia";
import ServiceCrud from "../pages/Admin/ServiceCrud";
import NotFound from "../pages/User/NotFound";
import Contact from "../pages/User/Contact";
import FoodDetail from "../pages/User/FoodDetail";
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
                path:'foods/:id',
                element:<FoodDetail/>
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
    {
        path: '/admin',
        element: <AdminRoot/>,
        children: [
            {
                path: 'dashboards',
                element: <Dashboard/>
            },
            {
                path: 'sliders',
                element:<Sliders/>
            },
            {
                path: '*',
                element: <Login/>
            },
            {
                path:'adress',
                element:<AdressandTelephone/>
            },
            {
                path:'gallerycrud',
                element:<GalleryCrud/>,
            },
            {
                path:'worktime',
                element:<WorkTime/>
            },
            {
                path:'socailmedia',
                element:<SocialMedia/>
            },
            {
                path:'servicecrud',
                element:<ServiceCrud/>
            },
            {
                path:'subscribers',
                element:<Subscribers/>
            },
            {
                path:'reservations',
                element:<ReservationCrud/>,
            },
            {
                path:'gifcrud',
                element:<GifCrud/>
            }
        ]
    }
]