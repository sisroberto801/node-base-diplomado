import {Router} from 'express';
import userController from '../controllers/user.controller.js';
import validate from '../validate/validate.js';
import {schema} from '../validate/user.validate.js';

const router = Router();

router.route('/')
  .get(userController.get)
  .post(validate(schema), userController.create);

router.route('/:id')
  .get(userController.find)
  .put(validate(schema), userController.update)
  .patch(userController.activateInactivate)
  .delete(userController.remove);

export default router