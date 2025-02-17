import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

export default function AuthenticatePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    
    useEffect(() => {
        const publicRoutes = ["/sign-up", "/sign-in", "/onboarding"];
        if (isAuthenticated)
            navigate("/");
        else if (!publicRoutes.includes(location.pathname))
            navigate("/onboarding");
    }, [isAuthenticated, navigate]);

    return null;
}