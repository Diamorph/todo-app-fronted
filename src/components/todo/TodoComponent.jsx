import { useNavigate, useParams } from 'react-router-dom';
import { createTodoApi, retrieveTodoApi, updateTodoApi } from './api/TodoApiService';
import { useAuth } from './security/AuthContext';
import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export default function TodoComponent() {

    const {id} = useParams();

    const authContext = useAuth();

    const navigate = useNavigate();

    const [description, setDescription] = useState('');

    const [targetDate, setTargetDate] = useState('');

    useEffect(
        () => retrieveTodoData(), [id]
    )

    function isEdit() {
        return +id !== -1;
    }

    function retrieveTodoData() {
        console.log(isEdit());
        if (isEdit()) {
            retrieveTodoApi(authContext.username, id)
                .then((response) => {
                    setDescription(response.data.description);
                    setTargetDate(response.data.targetDate)
                })
                .catch(err => console.log(err));
        }
    }

    function onSubmit(values) {
        const username = authContext.username;
        if (isEdit()) {
            const todo = {
                id,
                username,
                description: values.description,
                targetDate: values.targetDate,
                done: false
            }
            updateTodoApi(username, id, todo)
                .then((response) => {
                    console.log(response);
                    navigate('/todos');
                }).catch(err => console.log(err));
        } else {
            const todo = {
                username: username,
                description: values.description,
                targetDate: values.targetDate,
                done: false
            };
            createTodoApi(username, todo)
                .then((response) => {
                    console.log(response);
                    navigate('/todos');
                }).catch(err => console.log(err));
        }
    }

    function validate(values) {
        const errors = {};
        if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters';
        }
        if (!values.targetDate) {
            errors.targetDate = 'Enter a target date';
        }
        return errors;
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={ {description, targetDate} }
                        enableReinitialize="true"
                        onSubmit={onSubmit}
                        validate={validate}
                        validateOnChange="false"
                        validateOnBlur="false"
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"></Field>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
                {description && <div>Description: {description}</div>}
                {targetDate && <div>Target date: {targetDate}</div>}
            </div>
        </div>
    );
}
