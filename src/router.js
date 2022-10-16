import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LayoutFrame from './styled-component/layoutFrame';
import Dashboard from './components/pages/dashboard';

const Routers = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <Dashboard />
        } />
      <Route path='/' element={
        <LayoutFrame />
      }>
        {/* for element with header and footer */}
        <Route path="/dashboard" exact element={
          <Dashboard />
        } />
      </Route>
    </Routes>
  </BrowserRouter>
);

export { Routers };
