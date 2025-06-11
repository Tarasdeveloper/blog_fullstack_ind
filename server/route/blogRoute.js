const express = require('express');
const blogRouter = express.Router();

const {
    fetchListOfBlogs,
    addNewBlog,
    deleteBlog,
    updateBlog,
} = require('../controller/blogController');

blogRouter.get('/', fetchListOfBlogs);
blogRouter.post('/add', addNewBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.delete('/delete/:id', deleteBlog);

module.exports = blogRouter;
