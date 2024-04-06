import logo from './assets/images/logo.svg';
import './assets/styles/app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './features/homepage-feature/Home';  // Import components used via Layout's "outlet" here in App.js
import ReactDOM from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}> {/* Layout component, nested components will have a path of "/" and render the layout component (will be handled within navBar) */}
          <Route index element={<Home />} />  
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
