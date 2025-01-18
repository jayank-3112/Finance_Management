import express from 'express';
import cors from 'cors';
import db from './db/db.js'; // Corrected import for default export
import fs from 'fs'; // Import fs using ES module syntax
import dotenv from 'dotenv'; // Import dotenv properly
import cookieParser from "cookie-parser";
import path from 'path'
dotenv.config(); // Use dotenv to load environment variables
const app = express();
const PORT = process.env.PORT;
// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: 'https://finance-management-k9ar.onrender.com/', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true, // Allow cookies or authorization headers
  })
);
app.use(cookieParser());


const _dirname = path.resolve();
console.log(_dirname)
// Define an async function to handle route imports
const loadRoutes = async () => {
  const routesPath = path.join(_dirname+'/backend', 'routes'); // Absolute path to routes
  const files = fs.readdirSync(routesPath); // Read files in the routes folder
  for (const file of files) {
    const route = await import(path.join(routesPath, file)); // Import each route
    app.use('/api/v1', route.default); // Use route.default if the module exports a function
  }
};

// Routes
await loadRoutes(); // Call the async function to load routes

// Add the user authentication route
const authRoute = await import('./routes/auth.js');
app.use('/api/v1/auth', authRoute.default); // Add the authentication 
const transactionRoute = await import('./routes/transactions.js')
app.use('/api/v1/transactions', transactionRoute.default); // Add the transaction route

app.use(express.static(path.join(_dirname, "frontend", "build")));

// Serve index.html for all unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "frontend", "build", "index.html"));
});

// app.use(express.static(path.join(_dirname,'/frontend/dist')));

// //serve the frontend file

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"))
// })
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
  });
};

server();
