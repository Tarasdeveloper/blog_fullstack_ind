const mongoose = require('mongoose');
const Blog = require('../model/Blog');

// fetch list of blogs
// add a new blog
// delete a blog
// update a blog

const fetchListOfBlogs = async (req, res) => {
    let blogList;
    try {
        blogList = await Blog.find();
    } catch (err) {
        console.log(err);
    }

    if (!blogList) {
        return res.status(404).json({ message: 'No blogs found' });
    }
    return res.status(200).json({ blogList });
};

const addNewBlog = async (req, res) => {
    const { title, description } = req.body;
    const currentDate = new Date();
    const newBlog = new Blog({
        title,
        description,
        date: currentDate,
    });

    try {
        // await newBlog.save();
    } catch (err) {
        console.log(err);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save(session);
        session.commitTransaction();
    } catch (err) {
        return res.status(500).json({ message: err });
    }

    return res.status(201).json({ newBlog });
};

const deleteBlog = async (req, res) => {
    const blogId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json({ message: 'Invalid blog ID format' });
    }

    try {
        const currentBlog = await Blog.findByIdAndDelete(blogId);
        // const currentBlog = await Blog.deleteOne({ _id: blogId });

        if (!currentBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.error('Delete error:', err.message, err.stack);
        return res.status(500).json({ message: 'Unable to delete' });
    }
};

const updateBlog = async (req, res) => {
    const blogId = req.params.id;
    const { title, description } = req.body;

    try {
        const currentBlog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
        });

        if (!currentBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.send(200).json({ currentBlog });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Unable to update' });
    }
};

module.exports = { fetchListOfBlogs, addNewBlog, deleteBlog, updateBlog };
