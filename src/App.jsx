import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home';
import devicesLoader from './loaders/devicesLoader';
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
        path: '/mobicompro/',
        element: <Home />
      },
      {
        path: '/mobicompro/thermostat',
        element: <Thermostat />
      },
      {
        path: '/mobicompro/statistics',
        element: <Statistics />,
        // loader: devicesLoader,
        // hydrateFallbackElement: <p>Finder dine devices...</p>
      },
      {
        path: '/mobicompro/heat',
        element: <Heat />,
        loader: devicesLoader,
        hydrateFallbackElement: <p>Finder dine devices...</p>
      },
      {
        path: '/mobicompro/light',
        element: <Light />
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