// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// require('dotenv').config();

// const adminRoutes = require('./routes/admin');
// const clientRoutes = require('./routes/client');
// const workerRoutes = require('./routes/worker');

// const app = express();

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// // View Engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Routes
// app.get('/', (req, res) => res.send('Hello World'));
// app.use('/api/admin', adminRoutes);
// app.use('/api/client', clientRoutes);
// app.use('/api/worker', workerRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log('MongoDB Connection Error:', err));

// // Start Server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// require('dotenv').config();

// const adminRoutes = require('./routes/admin');
// const clientRoutes = require('./routes/client');
// const workerRoutes = require('./routes/worker');

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.get('/', (req, res) => res.render('index')); // Homepage
// app.use('/api/admin', adminRoutes);
// app.use('/api/client', clientRoutes);
// app.use('/api/worker', workerRoutes);

// mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log('MongoDB Connection Error:', err));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// console.log('Views path:', path.join(__dirname, 'views'));

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const path = require('path');
// const session = require('express-session');
// const flash = require('connect-flash');
// require('dotenv').config();

// const adminRoutes = require('./routes/admin');
// const clientRoutes = require('./routes/client');
// const workerRoutes = require('./routes/worker');

// const app = express();

// // Use bodyParser middleware for form data and JSON
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Use cookieParser middleware
// app.use(cookieParser());

// // Test route to check JWT cookie
// app.get('/test-cookie', (req, res) => {
//   const token = req.cookies.jwt;
//   if (token) {
//       return res.send('JWT Cookie is set');
//   } else {
//       return res.send('No JWT Cookie found');
//   }
// });

// // Static file serving
// app.use(express.static(path.join(__dirname, 'public')));

// // Set up session middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
// }));

// // Use connect-flash middleware for flash messages
// app.use(flash());

// // Global variables for flash messages
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   next();
// });

// // Set the view engine to EJS and configure views path
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Routes
// app.get('/', (req, res) => res.render('index')); // Homepage
// app.use('/api/admin', adminRoutes);
// app.use('/api/client', clientRoutes);
// app.use('/api/worker', workerRoutes);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log('MongoDB Connection Error:', err));

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');
const workerRoutes = require('./routes/worker');

const app = express();

// Use bodyParser middleware for form data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use cookieParser middleware
app.use(cookieParser());

// Test route to check JWT cookie
app.get('/test-cookie', (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    return res.send('JWT Cookie is set');
  } else {
    return res.send('No JWT Cookie found');
  }
});

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Set up session middleware with MongoDB store
app.use(session({
  secret: process.env.SESSION_SECRET || 'RfGzlWClyL1HVDiLuFdviYr7BwKYtOxyhd9se/Wp5k=',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_CONNECTION_URI,
    ttl: 14 * 24 * 60 * 60 // 14 days
  })
}));

// Use connect-flash middleware for flash messages
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Set the view engine to EJS and configure views path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => res.render('index')); // Homepage
app.use('/api/admin', adminRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/worker', workerRoutes);

// Set Mongoose strictQuery option to suppress deprecation warning
mongoose.set('strictQuery', true);

// Reuse MongoDB connection for serverless
const mongooseConnection = mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
});

// Export a handler for Vercel
// module.exports = async (req, res) => {
//   try {
//     console.log('Attempting to connect to MongoDB...');
//     if (mongoose.connection.readyState !== 1) {
//       await mongooseConnection;
//       console.log('MongoDB Connected');
//     } else {
//       console.log('MongoDB connection already established');
//     }
//     return app(req, res);
//   } catch (err) {
//     console.error('MongoDB Connection Error:', err);
//     res.status(500).send('Internal Server Error');
//   }
// };

// mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('✅ Connected to MongoDB Atlas');

//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server is running at http://localhost:${PORT}`);
//   });
// }).catch(err => {
//   console.error('❌ MongoDB Connection Error:', err);
// });

if (process.env.VERCEL) {
  module.exports = async (req, res) => {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
    }
    return app(req, res);
  };
} else {
  mongoose.connect(process.env.MONGODB_CONNECTION_URI)
    .then(() => {
      app.listen(process.env.PORT || 3000, () =>
        console.log(`Server running at http://localhost:${process.env.PORT || 3000}`)
      );
    })
    .catch(err => console.error('MongoDB Connection Error:', err));
}
// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// console.log('Views path:', path.join(__dirname, 'views'));

