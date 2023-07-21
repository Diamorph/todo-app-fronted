import { Link, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { getHelloWorld, getHelloWorldBean, getHelloWorldBeanPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

export default function WelcomeComponent() {

    const {username} = useParams();
    
    const [message, setMessage] = useState(null);

    const authContext = useAuth();

    function callHelloWorldRestApi() {
        console.log('API call');
        getHelloWorld()
            .then(response => successfulResponse(response))
            .catch(err => errorResponse(err));
    }

    function callHelloWorldBeanRestApi() {
        console.log('API call');
        getHelloWorldBean()
            .then(response => successfulResponseBean(response))
            .catch(err => errorResponse(err));
    }

    function callHelloWorldBeanRestApiPathVariable() {
        getHelloWorldBeanPathVariable("diamorph", authContext.token)
            .then(response => successfulResponseBean(response))
            .catch(err => errorResponse(err));

    }

    function successfulResponse(response) {
        console.log(response);
        setMessage(response.data);
    }

    function successfulResponseBean(response) {
        console.log(response);
        setMessage(response.data.message);
    }

    function errorResponse(error) {
        console.log(error);
        setMessage(error.message);
    }

    return (
        <div className="welcome-component">
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Call Hello World</button>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldBeanRestApi}>Call Hello World Bean</button>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldBeanRestApiPathVariable}>Call Hello World Bean Path Variable</button>
            </div>
            <div className="text-info">
                {message}
            </div>
        </div>
    )
}
