require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3003; 

// Connect to MongoDB
mongoose.connect('mongodb+srv://shamodchamaththa:chamaththa123@cluster0.jbqtuwa.mongodb.net/learn_microservice?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB database successfully');
})
.catch((error) => {
  console.error('Error connecting to MongoDB database', error);
});

app.use(express.json());
app.use('/products', productRoutes); // Route for products

app.listen(PORT, () => {
  console.log(`Product service listening on port ${PORT}`);
});
