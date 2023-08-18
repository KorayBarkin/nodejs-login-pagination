const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = [];
let userIdCounter = 1;

// Create a new user
app.post('/users', (req, res) => {
  const { username, password } = req.body;
  const newUser = { id: userIdCounter++, username, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Login a user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  let user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Retrieve the name of a user by their ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  let user = users.find(u => u.id == userId);

  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(3007, () => {
  console.log('Server is listening on port 3007');
});
//----------------------------------------------------------------

app.use((req, res, next) => {
  const startTime = new Date();
  res.on('finish', () => {
    const endTime = new Date();
    const responseTime = endTime - startTime;
    console.log(`${req.method} ${res.statusCode} ${req.url} - ${responseTime}ms`);
  });
  next();
});

//-----------------------------------------------------------


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});


