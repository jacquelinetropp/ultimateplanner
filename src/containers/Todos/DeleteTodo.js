import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Forms/Button";
import Heading from "../../components/UI/Headings/Headings";
import Message from "../../components/UI/Messages/Message";

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  justify-content: space-around;
`;
const MessageWrapper = styled.div`
  position: absolute;
  bottom: 0 rem;
  width: 100%;
  padding: 0 3rem;
`;

const TodoWrapper = styled.div`
  margin: 1rem 0rem;
  font-size: 1.3rem;
  text-align: center;
  color: var(--color-white);
`;

const DeleteTodo = ({ show, close, todo, deleteTodo, loading, error }) => {
  return (
    <Modal opened={show} close={close}>
      <Heading noMargin size="h1" color="white">
        Deleting Todo
      </Heading>
      <Heading bold size="h4" color="white">
        Are you sure you want to delete this todo?
      </Heading>
      <TodoWrapper>{todo.todo}</TodoWrapper>
      <ButtonsWrapper>
        <Button
          contain
          color="red"
          onClick={async () => await deleteTodo(todo.id)}
          disabled={loading}
          loading={loading ? "Deleting..." : null}
        >
          Delete
        </Button>
        <Button type="button" color="main" contain onClick={close}>
          Cancel
        </Button>
      </ButtonsWrapper>
      <MessageWrapper>
        <Message error show={error}>
          {error}
        </Message>
      </MessageWrapper>
    </Modal>
  );
};

const mapStateToProps = ({ todos }) => ({
  error: todos.deleteTodo.error,
  loading: todos.deleteTodo.loading,
});

const mapDispatchToProps = {
  deleteTodo: actions.deleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTodo);
