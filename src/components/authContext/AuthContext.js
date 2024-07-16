import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function AuthContext({ children }) {
    const location = useLocation();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const pathName = window.location.pathname;
    const navigate = useNavigate()

    useEffect(() => {
        const newLocation = location.pathname + location.search;
        localStorage.setItem('currentLocation', JSON.stringify(newLocation)); // Lưu dữ liệu dưới dạng chuỗi JSON
    }, [location]);
    
    if (currentUser === null) {
        if (pathName === '/login') {
            return children
        }
        if (pathName !== "/login" && pathName !== "/register") {
            return <Navigate to="/login"/>
        }
    } else {
        axios.get(`http://localhost:8080/token/checkToken?token=${currentUser.accessToken}`).then(res => {
        }
    ).catch(e => {
        axios.post(`http://localhost:8080/logoutUser?token=${currentUser.accessToken}`).then(res => {
            if(res.data === "Logout success"){
                localStorage.setItem('currentLocation', '');
                localStorage.removeItem("currentUser"); // Xóa thông tin người dùng khỏi localStorage
                enqueueSnackbar(res.data, { variant: "success", anchorOrigin: { horizontal: "right", vertical: "top" } });
                navigate("/login");// Điều hướng người dùng đến trang chủ
            }else if(res.data === "Invalid token"){
                localStorage.setItem('currentLocation', '');
                localStorage.removeItem("currentUser"); // Xóa thông tin người dùng khỏi localStorage
                enqueueSnackbar(res.data, { variant: "success", anchorOrigin: { horizontal: "right", vertical: "top" } });
                navigate("/login");// Điều hướng người dùng đến trang chủ
            }
        }).catch(e => {
            console.error(e); // In lỗi ra console
        });
    })

        const roles = currentUser.roles.map(role => role.authority);
        const isAdmin = roles.includes('ROLE_ADMIN');
        const isUser = roles.includes('ROLE_USER');
        
        if(pathName === "/login" || pathName === "/register"){
            return <Navigate to="/homePage"/>
        }
    }
    return children ? <>{children}</> : <Navigate to="/login" />;
}


// Hàm đăng xuất
export async function doLogout(navigate) {
    const user = JSON.parse(localStorage.getItem("currentUser")); // Lấy thông tin người dùng hiện tại từ localStorage
    if (user != null) {
         axios.post(`http://localhost:8080/logoutUser?token=${user.accessToken}`).then(res => {
            if(res.data === "Logout success"){
                localStorage.setItem('currentLocation', '');
                localStorage.removeItem("currentUser"); // Xóa thông tin người dùng khỏi localStorage
                enqueueSnackbar(res.data, { variant: "success", anchorOrigin: { horizontal: "right", vertical: "top" } });
                navigate("/login"); // Điều hướng người dùng đến trang chủ
            }else if(res.data === "Invalid token"){
                enqueueSnackbar(res.data, { variant: "error", anchorOrigin: { horizontal: "right", vertical: "top" } });
            }
        }).catch(e => {
            console.error(e); // In lỗi ra console
        });
    } else {
        navigate("/login"); // Nếu không có người dùng, điều hướng trực tiếp đến trang chủ
    }
}

export default AuthContext;