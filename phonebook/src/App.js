import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNum, setNewNum ] = useState('')
    const [ filterName, setFilterName ] = useState('')

    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }

    useEffect(hook, [])

    const addPerson = (event) => {
        let hasName = false
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNum,
            id: persons.length + 1,
        }
        persons.forEach(person => {
            if (person.name === newName) {
                hasName = true
            }
        })
        if (hasName) {
            window.alert(newName + ' is already added to phonebook')
        } else {
            setPersons(persons.concat(personObject))
            setNewName('')
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumChange = (event) => {
        console.log(event.target.value)
        setNewNum(event.target.value)
    }

    const handleFilterNameChange = (event) => {
        setFilterName(event.target.value)
    }

    const personsToShow = filterName
        ? persons.filter(person => person.name.search(filterName) !== -1)
        : persons;

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filterName} onChange={handleFilterNameChange} />
            <h3>add a new</h3>
            <PersonForm addPerson={addPerson} newName={newName} 
            handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange}/>
            <h3>Numbers</h3>
            <Persons personsToShow={personsToShow} />
        </div>
    )
}

export default App