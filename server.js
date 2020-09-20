const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

var app = express();

//connect database
connectDB();

//init middleware
app.use(express.json());

//define routes
app.use('/api/users', require('./routes/api/users.route'));
app.use('/api/auth', require('./routes/api/auth.route'));
app.use('/api/profile', require('./routes/api/profile.route'));
app.use('/api/bank', require('./routes/api/bank.route'));
app.use('/api/transaction', require('./routes/api/transaction.route'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
