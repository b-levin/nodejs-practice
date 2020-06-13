import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  const blogFormRef = React.createRef()

  //adds a new blog
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisiblity()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

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


  //form for the user login
  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  //form for adding a new blog
  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
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
        <h2>create new</h2>
        {blogForm()}
      </div>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App