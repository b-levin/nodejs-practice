import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //store user login token to local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  })

  //handle the user logging in
  const handleLogin = async (event) => {
    event.preventDefault()

    const user = await loginService.login({
      username, password,
    })

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )

    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  }

  //handle the user logging out
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  //adds a new blog
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  //form for the user login
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username: <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password: <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  //form for adding a new blog
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title: <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author: <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        url: <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  //display login only if no user is logged in
  if (user === null) {
    return (
      <div>
        <h2>Log into application</h2>
        {loginForm()}
      </div>
    )
  }
  
  //return the blog if user is logged in
  return (
    <div>
    <h2>blogs</h2>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>

      <div>
        {blogForm()}
      </div>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App