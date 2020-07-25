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
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { REGISTER_FAIL } from "../../actions/types";

export default function RegisterModal() {
  const [regState, setRegState] = useState({
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: "",
  });

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const error = useSelector((state) => state.error);

  const prevError = useRef(error);

  const { modal, name, email, password, msg } = regState;

  const toggle = () => {
    // Clear errors
    dispatch(clearErrors());
    setRegState((prevState) => ({
      ...prevState,
      modal: !modal,
    }));
  };

  useEffect(() => {
    if (prevError.current !== error) {
      if (error.id === "REGISTER_FAIL") {
        setRegState((prevState) => ({
          ...prevState,
          msg: error.msg.msg,
        }));
      } else {
        setRegState((prevState) => ({
          ...prevState,
          msg: null,
        }));
      }
    }
    prevError.current = error;
  }, [error]);

  useEffect(() => {
    if (regState.modal && isAuthenticated) {
      toggle();
    }
  }, [isAuthenticated, toggle]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = regState;

    const newUser = {
      name,
      email,
      password,
    };

    dispatch(register(newUser));
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {regState.msg ? <Alert color="danger">{regState.msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={onChange}
                className="mb-3"
                autoComplete="off"
              />

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
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
