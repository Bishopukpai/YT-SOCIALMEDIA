const express = require('express');
const app = express()

const port = 9090;

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
})