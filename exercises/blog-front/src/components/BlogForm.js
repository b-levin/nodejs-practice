import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handeUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            like: 0
        })

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <div>
            <h2>Create a new blog</h2>

            <form onSubmit={addBlog}>
                <div>
                    title: <input
                        value={newTitle}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author: <input
                        value={newAuthor}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    URL: <input
                        value={newUrl}
                        onChange={handeUrlChange}
                    />
                </div>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm