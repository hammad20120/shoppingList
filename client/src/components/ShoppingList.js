import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useSelector, useDispatch } from "react-redux";
import { getItems, delItem } from "../actions/itemActions";

function ShoppingList(props) {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getItems()), [dispatch]);

  const { items } = useSelector((state) => state.item);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {isAuthenticated ? (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      dispatch(delItem(_id));
                      // setItems((items)=> items.filter(item => item.id !== id))
                    }}
                  >
                    &times;
                  </Button>
                ) : null}

                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

export default ShoppingList;
