import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

export default function AuthenticatePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    useEffect(() => {
        const publicRoutes = ["/sign-up", "/sign-in", "/onboarding"];
        const protectedRoutes = ["/", "/assessment", "/sounds", "/journal", "/report", "/account", "/sleep"];
        
        if (publicRoutes.includes(location.pathname) || isAuthenticated)
            navigate(location.pathname);
        else if (protectedRoutes.includes(location.pathname))
            navigate("/onboarding");
        else 
            navigate("/404")
    }, [isAuthenticated, navigate]);

    return null;
}