const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// This should be replaced with a proper database in production

// Endpoint for user registration

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
