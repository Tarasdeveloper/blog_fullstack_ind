const e = require('express');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose
    .connect(
        'mongodb+srv://tomahavki1:z2BXLywMcMzqiTLQ@cluster0.sxfj8jh.mongodb.net/'
    )
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
