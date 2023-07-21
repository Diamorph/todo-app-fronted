import './Counter.css';
import { useState } from 'react';
import CounterButton from './CounterButton';

export default function Counter() {
    const [count, setCount] = useState(0);

    function incrementCounter(by) {
        if (count + by < 0) {
            return;
        }
        setCount(count + by);
    }

    function resetCounter() {
        setCount(0);
    }

    return (
        <>
            <span className="count">{count}</span>
            <CounterButton by={1} incrementCounter={incrementCounter}/>
            <CounterButton by={2} incrementCounter={incrementCounter}/>
            <CounterButton by={5} incrementCounter={incrementCounter}/>
            <button className="reset-button" onClick={resetCounter}>Reset</button>
        </>
    );
}


