import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <p>
            {text} {value}
        </p>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    let avg = 0.0
    let total = 0.0
    total = good + neutral + bad
    avg = good + (-1.0 * bad)
    if (total === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <div>
            <h1>statistics</h1>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={total} />
            <Statistic text='average' value={avg} />
            <p>postive {good / total * 100} %</p>
        </div>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handeGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handBad = () => setBad(bad + 1)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={handeGood} text='good' />
            <Button handleClick={handleNeutral} text='neutral' />
            <Button handleClick={handBad} text='bad' />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)