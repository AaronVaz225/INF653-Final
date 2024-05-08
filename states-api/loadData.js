require('dotenv').config();
const mongoose = require('mongoose');
const State = require('./models/State'); 
const fs = require('fs');

// Path to JSON file
const rawdata = fs.readFileSync('./states.json', 'utf-8');
const statesData = JSON.parse(rawdata).map(item => ({
  stateCode: item.code,
  funfacts: item.funfacts || []  
}));

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const importData = async () => {
  try {
    await State.create(statesData); // Uses transformed data
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log('Error loading data:', err);
  } finally {
    mongoose.disconnect();
  }
};

if (process.argv[2] === '--import') {
  importData();
}
