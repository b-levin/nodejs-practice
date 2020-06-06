import React from 'react'
import Person from './Person'

const Persons = ({ personsToShow, setPersons }) => {
    return (
        <ul>
            {personsToShow.map(person =>
                <Person key={person.id} person={person} 
                persons={personsToShow} setPersons={setPersons}/>  
            )}
        </ul>
    )
}

export default Persons