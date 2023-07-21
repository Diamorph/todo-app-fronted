import PropTypes from 'prop-types';

export default function CounterButton({by, incrementCounter}) {
    return (
        <div className="Counter">
            <div className="counter-row">
                <button className="increment-button"
                        onClick={() => incrementCounter(by)}
                >+{by}</button>
                <button className="increment-button"
                        onClick={() => incrementCounter(by * -1)}
                >-{by}</button>
            </div>
        </div>
    )
}

CounterButton.propTypes = {
    by: PropTypes.number,
    incrementCounter: PropTypes.func
}

CounterButton.defaultProps = {
    by: 1
}
