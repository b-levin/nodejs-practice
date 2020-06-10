const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//gets all of the blogs stores in the database
blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))
})

//adds a blog to the databage
blogsRouter.post('/', async (req, res) => {
    const body = req.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = await blog.save()
    res.json(savedBlog.toJSON())
})

//gets a blog from the database by its id
blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog.toJSON())
    } else {
        res.status(404)
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const newBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    if (newBlog) {
        res.json(newBlog.toJSON())
    } else {
        res.status(404).end()
    }
})

module.exports = blogsRouter