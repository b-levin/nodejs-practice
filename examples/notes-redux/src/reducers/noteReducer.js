import noteServive from '../services/notes'

const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'INIT_NOTES':
      return action.data
    case 'TOGGLE_IMPORTANCE': {
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
     }
    default:
      return state
  }
}

export const createNote = (content) => {
  return async dispath => {
    const newNote = await noteServive.createNew(content)
    dispath({
      type: 'NEW_NOTE',
      data: newNote,
    })
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export const initializeNotes = () => {
  return async dispath => {
    const notes = await noteServive.getAll()
    dispath({
      type:'INIT_NOTES',
      data: notes,
    })
  }
}

export default noteReducer