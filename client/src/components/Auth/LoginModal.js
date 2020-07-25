import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

export default function LoginModal() {
  const [loginState, setloginState] = useState({
    modal: false,
    email: "",
    password: "",
    msg: "",
  });

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);

  const prevError = useRef(error);

  const { modal, email, password, msg } = loginState;

  const toggle = () => {
    // Clear errors
    dispatch(clearErrors());
    setloginState((prevState) => ({
      ...prevState,
      modal: !modal,
    }));
  };

  useEffect(() => {
    if (prevError.current !== error) {
      if (error.id === "LOGIN_FAIL") {
        setloginState((prevState) => ({
          ...prevState,
          msg: error.msg.msg,
        }));
      } else {
        setloginState((prevState) => ({
          ...prevState,
          msg: null,
        }));
      }
    }
    prevError.current = error;
  }, [error]);

  useEffect(() => {
    if (loginState.modal && isAuthenticated) {
      toggle();
    }
  }, [isAuthenticated, toggle]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setloginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginState;

    const newUser = {
      email,
      password,
    };

    dispatch(login(newUser));
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {loginState.msg ? (
            <Alert color="danger">{loginState.msg}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
                className="mb-3"
                autoComplete="off"
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
                className="mb-3"
                autoComplete="off"
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
