import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const getRand = () => {
    return Math.floor((Math.random() * 6))
  }

  const vote = () => {
    copy[selected] += 1
    console.log(copy[selected])
  }

  const handleSelected = () => setSelected(getRand)

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {copy[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={handleSelected}>next anecdote</button>
    </div>
  )
}

const points = [0, 0, 0, 0, 0, 0]

const copy = [...points]

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)