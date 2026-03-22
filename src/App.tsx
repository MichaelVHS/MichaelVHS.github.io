import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { Note } from './types'

const getRandomColor = () => {
  const colors = [
    '#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA',
    '#FFDFBA', '#E2F0CB', '#F0BBDD', '#C7CEEA',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [noteText, setNoteText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const addNote = () => {
    if (!noteText.trim()) return
    setNotes(prev => [...prev, {
      id: Date.now(),
      text: noteText,
      backgroundColor: getRandomColor()
    }])
    setNoteText('')
  }

  const deleteNote = (id: number) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  const swapFirstAndLast = () => {
    if (notes.length < 2) return
    setNotes(prev => {
      const newNotes = [...prev]
      const temp = newNotes[0]
      newNotes[0] = newNotes[newNotes.length - 1]
      newNotes[newNotes.length - 1] = temp
      return newNotes
    })
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addNote()
  }

  const filteredNotes = notes.filter(note =>
      note.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
      <div className="container">
        <h1>Заметки</h1>

        <div className="search-container">
          <input
              type="text"
              placeholder="Поиск заметок..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
          />
        </div>

        <div className="add-note-container">
          <input
              type="text"
              placeholder="Введите текст заметки..."
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="note-input"
          />
          <button onClick={addNote} className="add-button">
            Добавить
          </button>
        </div>

        <button
            onClick={swapFirstAndLast}
            className="swap-button"
            disabled={notes.length < 2}
        >
          Поменять местами
        </button>

        <div className="notes-list">
          {filteredNotes.length === 0 ? (
              <p className="no-notes">
                {searchQuery ? 'Заметки не найдены.' : 'Пока нет заметок. Добавьте первую!'}
              </p>
          ) : (
              filteredNotes.map(note => (
                  <div
                      key={note.id}
                      className="note"
                      style={{ backgroundColor: note.backgroundColor }}
                  >
                    <p className="note-text">{note.text}</p>
                    <button
                        onClick={() => deleteNote(note.id)}
                        className="delete-button"
                    >
                      ✕
                    </button>
                  </div>
              ))
          )}
        </div>

        {searchQuery && (
            <p className="count">
              Показано {filteredNotes.length} из {notes.length} заметок
            </p>
        )}
      </div>
  )
}

export default App