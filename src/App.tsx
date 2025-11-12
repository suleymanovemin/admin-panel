import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import PostsPage from "./pages/PostsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Navigate to="posts" replace />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="media-library" element={<div></div>} />
        <Route path="system-settings" element={<div></div>} />
        <Route path="library" element={<div></div>} />
        <Route path="meteorology" element={<div></div>} />
        <Route path="museum" element={<div></div>} />
      </Route>
    </Routes>
  );
}

export default App;
