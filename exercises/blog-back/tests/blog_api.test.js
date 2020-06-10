const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

//delete and reset test Db to defaults before each test
beforeEach(async () => {
    await Blog.deleteMany({})

    helper.initialBlogs.forEach(async (blog) => {
        let blogObject = new Blog(blog)
        await blogObject.save()
    })
})

//verify blogs are returned as json
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

//verify that all notes are returned
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

//verify that a blog can be added
test('the total number of blogs is increase by one when a blog is added', async () => {
    const blog = new Blog({
        title: 'Temp blog',
        author: 'temp McTmp',
        url: 'temp.gg',
        likes: 1
    })

    await blog.save()

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

//close the mongoDb connect after all tests
afterAll(() => {
    mongoose.connection.close()
})