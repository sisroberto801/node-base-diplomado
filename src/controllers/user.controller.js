import logger from '../logs/logger.js';
import {User} from '../models/user.js';

async function create(req, res) {
  const {username, password} = req.body;
  try {
    const newUser = await User.create({
      username, password
    });
    const response = res.json(newUser);
    console.log(response, 'hello------');
    return response;
  } catch (error) {
    logger.error(error);
    return res.json(error);
  }
}

export default {
  create,
};