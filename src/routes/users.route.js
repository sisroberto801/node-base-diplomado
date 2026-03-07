import {Router} from 'express';
import userController from '../controllers/user.controller.js';
import validate from '../validate/validate.js';
import {createSchema} from '../validate/user.validate.js';

const router = Router();

router.route('/').post(validate(createSchema), userController.create)

export default router