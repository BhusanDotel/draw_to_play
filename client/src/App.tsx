import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CreateRoom } from "./pages/CreateRoom";
import { JoinRoom } from "./pages/JoinRoom";
import { DrawScreen } from "./components/DrawScreen";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CreateRoom />} />
        <Route path="/room/:id" element={<JoinRoom />} />
        <Route path="/room/:id/playground" element={<DrawScreen />} />
      </Routes>
    </BrowserRouter>
  );
};
