const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('reqbody', function(request){
    return JSON.stringify(request.body)
})

app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :reqbody'
    )
)

//get base page
app.get('/', (req, res) => {
    res.send('<h1>Phonebook</h1>')
})

//get info on length of phonebook
app.get('/info', (req, res) => {
    res.send(`<div><p>Phonebook has info for ${persons.length} people</p>${Date()}<p></div>`)
})

//get the json of all phonebook entries
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

//add an entry to the phonebook
app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    } /*else if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    */

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
})

//get phonebook entry by id
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

//delete phonebook entry by id
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

//update phonebook entry
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({
            error: 'name of number missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

//unknown endpoint error handler
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//other error handler
const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})