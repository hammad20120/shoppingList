import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { addItem } from "../actions/itemActions";
import { useDispatch, useSelector } from "react-redux";

export default function ItemModal() {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem({ name }));
    toggle();
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please login to manage items.</h4>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={onChange}
                autoComplete="off"
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                {" "}
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
