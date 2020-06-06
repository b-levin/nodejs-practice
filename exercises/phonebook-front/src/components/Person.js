import React from 'react'
import personService from '../services/persons'

const Person = ({ person, persons, setPersons }) => {
    const handlePersonDelete = personToDelete => {
        const { id, name } = personToDelete
        const answer = window.confirm(`Delete ${name}?`)
        if (answer) {
            personService
                .deletePerson(id)
                .then(data => {
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
        console.log(answer, id)
    }
    return (
        <div>
        <li>{person.name} {person.number}
        <button onClick={() => handlePersonDelete(person)}>delete</button> 
        </li>
        </div>
    )
}

export default Person