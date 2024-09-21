import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CreateRoom } from "./pages/CreateRoom";
import { Playground } from "./pages/Playground";

import "react-toastify/dist/ReactToastify.css";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CreateRoom />} />
        <Route path="/room/:id/playground" element={<Playground />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </BrowserRouter>
  );
};
