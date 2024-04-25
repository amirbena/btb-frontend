import { FC, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { MyContext } from '../context/MyContext/MyContext';
import { ChildrenType } from '../context/ContextProvider';
import { useMutation } from '@tanstack/react-query';


interface ProtectedRouteProps extends ChildrenType {
    isAdmin?: boolean;
}


const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, isAdmin = false }) => {
    const { isAuthenticated, isAdmin: isAdminContext } = useContext(MyContext);

    const [handleNavigate, setHandleNavigate] = useState(false);


    if (handleNavigate && (!isAuthenticated && isAdmin ? !isAdminContext : true)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;