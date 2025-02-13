const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello World for testing user-auth server!');
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});