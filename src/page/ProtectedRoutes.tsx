import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Candidate from "./candidate";
import CandidateForm from "./candidate/add/page";
import CandidateInfo from "./candidate/Info/[id]";
import Cookies from "universal-cookie";
import { parseJwt } from "../utils/parseJwt";
import { ProgressIndicator } from "../components/ProgressIndicator";
import Login from "./Login";

function ProtectedRoutes() {
  const [isSuperAdmin, setIsSuperAdmin] = useState(null);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      console.log("Token:", token);
      if (token) {
        const decodedToken = parseJwt(token);
        setIsSuperAdmin(decodedToken?.is_super_admin || false);
      } else {
        navigate("/login");
      }
    };

    checkToken();
  }, [token, navigate]);

  if (location.pathname !== "/login" && isSuperAdmin === null) {
    return <ProgressIndicator open />;
  }
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Candidate />} />
        <Route path="/candidate/Info/:id" element={<CandidateInfo />} />
        <Route path="/candidate/add" element={<CandidateForm />} />

      </Routes>
    </>
  );
}

export default ProtectedRoutes;
