import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import * as IndexRoute from './routes/index';
import * as RootRoute from './routes/root';
import * as CountryRoute from './routes/countries/[code]';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootRoute.RouteComponent />}>
      <Route index element={<IndexRoute.RouteComponent />} />
      <Route path="countries/:code" element={<CountryRoute.RouteComponent />} />
    </Route>
  )
);
