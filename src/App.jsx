import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home';
import homeLoader from './loaders/homeLoader';
import devicesLoader from './loaders/devicesLoader';
import statisticsLoader from './loaders/statisticsLoader';
import Thermostat from './pages/Thermostat';
import Statistics from './pages/Statistics';
import Error from './pages/Error';
import Heat from './pages/Heat';
import Light from './pages/Light';
import './style/_layout.sass'


export default function App() {

  const browserRouter = createBrowserRouter(
    [
      {
        path: '/',
        element: <Home />,
        loader: homeLoader,
        hydrateFallbackElement: <p>Finder Statistik...</p>
      },
      {
        path: '/thermostat',
        element: <Thermostat />
      },
      {
        path: '/statistics/:deviceId',
        element: <Statistics />,
        loader: statisticsLoader,
        hydrateFallbackElement: <p>Finder Statistik...</p>
      },
      {
        path: '/heat',
        element: <Heat />,
        loader: devicesLoader,
        hydrateFallbackElement: <p>Finder dine devices...</p>
      },
      {
        path: '/light',
        element: <Light />
      },
      {
        path: '*',
        element: <Error />
      }
    ],
    {
      basename: '/mobicompro'
    }
  );

  return (
    <RouterProvider router={browserRouter} />
  )

}