const State = require('../models/State'); 

// Get all states
exports.getAllStates = async (req, res) => {
    try {
        const states = await State.find();
        res.json(states);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a random fun fact for a specific state
exports.getRandomFunFact = async (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    try {
        const state = await State.findOne({ stateCode: stateCode });
        if (state && state.funfacts && state.funfacts.length > 0) {
            const funFact = state.funfacts[Math.floor(Math.random() * state.funfacts.length)];
            res.json({ funFact: funFact });
        } else {
            res.status(404).json({ message: 'No fun facts found for this state.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving fun fact: ' + error.message });
    }
};

// Add fun facts to a specific state
exports.addFunFacts = async (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const { funfacts } = req.body;
    if (!funfacts || !Array.isArray(funfacts) || funfacts.length === 0) {
        return res.status(400).json({ message: 'Please provide an array of fun facts.' });
    }
    try {
        const updatedState = await State.findOneAndUpdate(
            { stateCode: stateCode },
            { $push: { funfacts: { $each: funfacts } } },
            { new: true, upsert: true }
        );
        res.json(updatedState);
    } catch (error) {
        res.status(500).json({ message: 'Error updating fun facts: ' + error.message });
    }
};

// Update a specific fun fact
exports.updateFunFact = async (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const { index, funfact } = req.body;
    if (!index || index < 1 || !funfact) {
        return res.status(400).json({ message: 'Invalid index or fun fact provided.' });
    }
    try {
        const state = await State.findOne({ stateCode: stateCode });
        if (!state) {
            return res.status(404).json({ message: 'State not found.' });
        }
        const funFactIndex = index - 1; 
        if (state.funfacts.length <= funFactIndex) {
            return res.status(404).json({ message: 'Fun fact index out of bounds.' });
        }
        state.funfacts[funFactIndex] = funfact;
        await state.save();
        res.json(state);
    } catch (error) {
        res.status(500).json({ message: 'Error updating fun fact: ' + error.message });
    }
};

// Remove a specific fun fact
exports.removeFunFact = async (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const { index } = req.body;
    if (!index || index < 1) {
        return res.status(400).json({ message: 'Invalid index provided.' });
    }
    try {
        const state = await State.findOne({ stateCode: stateCode });
        if (!state) {
            return res.status(404).json({ message: 'State not found.' });
        }
        const funFactIndex = index - 1; 
        if (state.funfacts.length <= funFactIndex) {
            return res.status(404).json({ message: 'Fun fact index out of bounds.' });
        }
        state.funfacts.splice(funFactIndex, 1);
        await state.save();
        res.json(state);
    } catch (error) {
        res.status(500).json({ message: 'Error removing fun fact: ' + error.message });
    }
};

// Placeholder for additional state-specific data (finish later :( )
exports.getStateData = async (req, res) => {
    res.json({ message: "State data not yet implemented." });
};

exports.getStateCapital = async (req, res) => {
    res.json({ message: "State capital data not yet implemented." });
};

exports.getStateNickname = async (req, res) => {
    res.json({ message: "State nickname data not yet implemented." });
};

exports.getStatePopulation = async (req, res) => {
    res.json({ message: "State population data not yet implemented." });
};

exports.getStateAdmission = async (req, res) => {
    res.json({ message: "State admission data not yet implemented." });
};
