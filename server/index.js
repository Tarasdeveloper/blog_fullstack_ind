const express = require('express');
const cors = require('cors');
const blogRouter = require('./route/blogRoute');

require('./db/indexDb');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

app.use('/api', (req, res) => {
    res.json({
        message: 'Hello from the server!',
    });
});

app.listen(5000, () => console.log(`App is running at 5000`));
