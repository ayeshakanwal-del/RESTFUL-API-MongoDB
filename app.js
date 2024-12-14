const express = require('express');
const connectDB = require('./config/connection');
const itemsRoutes = require('./routes/itemsRoutes');

const app = express();


connectDB();

app.use(express.json());

const cors = require('cors');
app.use(cors()); // Enable CORS for all routes
app.use('/api/items', itemsRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
