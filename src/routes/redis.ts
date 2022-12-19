import express from 'express';
import controller from '../controllers/redis';
const router = express.Router();

router.get('/', controller.getCache);
router.get('/example', controller.getExample);

export = router;
