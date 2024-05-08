const express = require('express');
const router = express.Router();
const statesController = require('../controllers/statesController');

// Route to get all states
router.get('/', statesController.getAllStates);

// Route to get a random fun fact for a specific state
router.get('/:state/funfact', statesController.getRandomFunFact);

// Route to add new fun facts to a specific state
router.post('/:state/funfact', statesController.addFunFacts);

// Route to update a specific fun fact in a specific state
router.patch('/:state/funfact', statesController.updateFunFact);

// Route to delete a specific fun fact from a specific state
router.delete('/:state/funfact', statesController.removeFunFact);

// Additional routes for state specific data 
router.get('/:state', statesController.getStateData);
router.get('/:state/capital', statesController.getStateCapital);
router.get('/:state/nickname', statesController.getStateNickname);
router.get('/:state/population', statesController.getStatePopulation);
router.get('/:state/admission', statesController.getStateAdmission);

module.exports = router;