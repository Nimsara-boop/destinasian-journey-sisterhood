
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Events from "./pages/events";
import EventDetail from "./pages/events/EventDetail";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Messages from "./pages/messages";
import NotFound from "./pages/NotFound";
import ExperienceProvider from "./components/ExperienceProvider";
import PackageDetail from "./pages/PackageDetail";

function App() {
  return (
    <Router>
      <ExperienceProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ExperienceProvider>
    </Router>
  );
}

export default App;
