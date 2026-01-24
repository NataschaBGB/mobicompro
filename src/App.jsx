import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home';
import Thermostat from './pages/Thermostat';
import Statistics from './pages/Statistics';
import Error from './pages/Error';
import './style/_layout.sass'
import Heat from './pages/Heat';


export default function App() {

  const browserRouter = createBrowserRouter(
    [
      {
        path: '/',
        element: <Home />,
        // loader: loadUserAndPets,
        // hydrateFallbackElement: <p>Loading Pets...</p>
      },
      {
        path: '/thermostat',
        element: <Thermostat />
      },
      {
        path: '/statistics',
        element: <Statistics />,
        // loader: loadDetails,
        // hydrateFallbackElement: <p>Loading Details...</p>
      },
      {
        path: '/heat',
        element: <Heat />
      },
      {
        path: '*',
        element: <Error />
      }
    ],
    {
      basename: ""
    }
  );

  return (
    <RouterProvider router={browserRouter} />
  )

}