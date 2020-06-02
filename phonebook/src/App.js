import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNum, setNewNum ] = useState('')
    const [ filterName, setFilterName ] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPerons => {
                setPersons(initialPerons)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNum,
        }
        const duplicatePerson = persons.filter(
            person => person.name === newName
        )
        if (duplicatePerson.length) {
            const personToUpdate = duplicatePerson[0]
            const replace = window.confirm(
                `${personToUpdate.name} is already added to the phonebook. Replace the old number with the new one?`
            )
            if (replace) {
                personToUpdate.number = newNum
                personService
                    .update(personToUpdate)
                    .then(response => {
                        setPersons(
                            persons.map(person => {
                                return person.id === response.id ? response : person
                            })
                        )
                    })
            }
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNum('')
                })
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
            <Persons personsToShow={personsToShow} setPersons={setPersons}/>
        </div>
    )
}

export default App