import React from "react";
import { logout } from "../../actions/authActions";
import { useDispatch } from "react-redux";
import { NavLink } from "reactstrap";

export default function Logout() {
  const dispatch = useDispatch();

  const logoutFunc = () => {
    dispatch(logout());
  };

  return (
    <>
      <NavLink onClick={logoutFunc} href="#">
        Logout
      </NavLink>
    </>
  );
}
