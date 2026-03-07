import {Router} from 'express';
import userController from '../controllers/user.controller.js';
import validate from '../validate/validate.js';
import {createSchema} from '../validate/user.validate.js';

const router = Router();

router.route('/')
  .get(userController.get)
  .post(validate(createSchema), userController.create);

router.route('/:id')
  .get(userController.find)
  .put(validate(createSchema), userController.update)
  .delete(userController.remove);

export default router