import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Catalog from './pages/Catalog.jsx';
import ListingDetail from './pages/ListingDetail.jsx';
import AddListing from './pages/AddListing.jsx';
import EditListing from './pages/EditListing.jsx';
import MapView from './pages/MapView.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import RequireAuth from './components/RequireAuth.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="map" element={<MapView />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="listing/:id" element={<ListingDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="profile/listings/new"
          element={
            <RequireAuth>
              <AddListing />
            </RequireAuth>
          }
        />
        <Route
          path="profile/listings/:id/edit"
          element={
            <RequireAuth>
              <EditListing />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
