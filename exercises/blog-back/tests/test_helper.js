const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Testing is important',
        author: 'Some Dev',
        url: 'site.cc',
        likes: 5
    },
    {
        title: 'Just say no to PHP',
        author: 'Smart Bird',
        url: 'ok.gg',
        likes: 666
    }
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'Temp blog',
        author: 'temp McTmp',
        url: 'temp.gg',
        likes: 1
    })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}