import { Navigate } from "react-router-dom";

function RotaProtegida({ children, perfil }) {
    const token = localStorage.getItem("token");
    const tipoPerfil = localStorage.getItem("tipoPerfil");

    if (!token) return <Navigate to="/login" />;

    if (perfil && tipoPerfil !== perfil) {
        if (tipoPerfil === "CLIENTE") return <Navigate to="/feed" />;
        if (tipoPerfil === "EMPRESARIO") return <Navigate to="/dashboard" />;
        if (tipoPerfil === "ADMIN") return <Navigate to="/admin" />;
    }

    return children;
}

export default RotaProtegida;