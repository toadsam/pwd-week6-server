const express = require('express');
const restaurantsController = require('../controllers/restaurants.controller');

const router = express.Router();

// 공개 엔드포인트 (모든 사용자 접근 가능)
router.get('/popular', restaurantsController.getPopularRestaurants);
router.get('/', restaurantsController.getRestaurants);
router.get('/:id', restaurantsController.getRestaurant);

// 관리자 전용 엔드포인트
router.post('/', restaurantsController.createRestaurant);
router.put('/:id', restaurantsController.updateRestaurant);
router.delete('/:id', restaurantsController.deleteRestaurant);

module.exports = router;
