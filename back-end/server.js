const express = require('express');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())

// Require the routes defined in routes/index.js
const routes = require('./routes/index.js');
const port = process.env.PORT || 5000;

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
