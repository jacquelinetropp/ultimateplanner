import * as actions from "./actionTypes";

//add todo
export const addTodo = (data) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;

  dispatch({ type: actions.ADD_TODO_START });
  try {
    const res = await firestore.collection("todos").doc(userId).get();

    const newTodo = {
      todo: data.todo,
      id: new Date().valueOf(),
    };
    if (!res.data()) {
      firestore
        .collection("todos")
        .doc(userId)
        .set({
          todos: [newTodo],
        });
    } else {
      firestore
        .collection("todos")
        .doc(userId)
        .update({
          todos: [...res.data().todos, newTodo],
        });
    }
    dispatch({ type: actions.ADD_TODO_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
  }
};

//delete todo
export const deleteTodo = (id) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.DELETE_TODO_START });
  try {
    const res = await firestore.collection("todos").doc(userId).get();
    const previousTodos = res.data().todos;
    const newTodos = previousTodos.filter((todo) => todo.id !== id);
    await firestore.collection("todos").doc(userId).update({
      todos: newTodos,
    });
    dispatch({ type: actions.DELETE_TODO_FAIL });
  } catch (err) {
    dispatch({ type: actions.DELETE_TODO_FAIL, payload: err.message });
  }
};

//edit todo
export const editTodo = (id, data) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.ADD_TODO_START });
  try {
    const res = await firestore.collection("todos").doc(userId).get();
    const todos = res.data().todos;
    const index = todos.findIndex((todo) => todo.id === id);
    todos[index].todo = data.todo;

    await firestore.collection("todos").doc(userId).update({
      todos,
    });
    console.log("This ran once");
    dispatch({ type: actions.ADD_TODO_SUCCESS });
    return true;
  } catch (err) {
    dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
  }
};