import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SideBar from "./components/Sidebar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import WithAuth from "./components/WithAuth";
import ProtectedRoutes from "./page/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
          <React.StrictMode>
            <BrowserRouter>
              <WithAuth>
                <SideBar />
                <div style={{ paddingLeft: 45 }}>
                  <ProtectedRoutes />
                </div>
              </WithAuth>
            </BrowserRouter>
          </React.StrictMode>
        </Provider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
