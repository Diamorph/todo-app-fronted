import { useEffect, useState } from 'react';
import { deleteTodoApi, retrieveAllTodosForUserApi } from './api/TodoApiService';
import { useAuth } from './security/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ListTodosComponent() {

    const [todos, setTodos] = useState([]);

    const [message, setMessage] = useState('');

    const authContext = useAuth();

    const navigate = useNavigate();

    function refreshTodos() {
        retrieveAllTodosForUserApi(authContext.username)
            .then(response => setTodos(response.data))
            .catch(err => console.log(err));
    }

    function deleteTodo(id) {
        console.log('delete todo', id);
        deleteTodoApi(authContext.username, id)
            .then(() => {
                setMessage(`Todo ${id} successfully deleted`);
                refreshTodos();
            })
            .catch(err => console.log(err));
    }

    function updateTodo(id) {
        console.log('update todo', id);
        navigate(`/todo/${id}`);
    }

    function addTodo() {
        navigate(`/todo/-1`);
    }

    useEffect(
        () => refreshTodos, []
    );

    return (
        <div className="container">
            <h1>Things You Want To Do!</h1>
            {message && <div className="alert alert-warning">{message}</div> }
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Description</th>
                        <th>Done</th>
                        <th>Target Date</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo =>
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div>
                <button className="btn btn-success m-3" onClick={() => addTodo()}>Add Todo</button>
            </div>
        </div>
    )
}
