const {Router} = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { searchCities } = require('../controllers/cityController');

const cityRouter = Router();

cityRouter.get('/getCities/:username/:user_role/:auth_token', authMiddleware, searchCities);

module.exports=cityRouter