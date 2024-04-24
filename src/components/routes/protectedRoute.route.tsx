import { FC, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { MyContext } from '../context/MyContext/MyContext';
import { ChildrenType } from '../context/ContextProvider';


interface ProtectedRouteProps extends ChildrenType {
    isAdmin?: boolean;
}


const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, isAdmin = false }) => {
    const { isAuthenticated, isAdmin: isAdminContext } = useContext(MyContext)

    if (!isAuthenticated && isAdmin ? !isAdminContext : true) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;