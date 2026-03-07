import logger from '../logs/logger.js';
import {User} from '../models/user.js';
import {Message, Status} from '../constants/constants.js';
import {encritpar} from '../common/bycrypt.js';

async function create(req, res) {
  const {username, password} = req.body;
  try {
    const newUser = await User.create({
      username, password
    });
    return res.json(newUser);
  } catch (error) {
    logger.error(error);
    return res.json(error);
  }
}

async function get(_req, res) {
  try {
    const users = await User.findAndCountAll({
      attributes: ['id', 'username', 'password', 'status'],
      order: [['id', 'DESC']],
      where: {
        status: Status.ACTIVE
      }
    })
    res.json({
      total: users.count,
      data: users.rows,
    });
  } catch (error) {
    logger.error(error);
    return res.json(error);
  }
}

const find = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await User.findOne({
      attributes: ['id', 'username', 'password', 'status'],
      where: {id}
    })

    if (!user) {
      return res.status(404).json({message: Message.USER_NOT_FOUND});
    }

    res.json(user);
  } catch (error) {
    logger.error(error);
    return res.json(error);
  }
};


const update = async (req, res) => {
  const {id} = req.params;
  const {username, password} = req.body;
  const passwordHash = await encritpar(password);
  try {
    const user = await User.update({username, password: passwordHash}, {where: {id}});
    return res.json(user);
  } catch (error) {
    logger.error(error);
    return res.json(error.message);
  }
};

const remove = async (req, res) => {
  const {id} = req.params;
  try {
    await User.destroy({where: {id}});
    return res.sendStatus(204);
  } catch (error) {
    logger.error(error);
    return res.json(error);
  }
};

export default {
  create,
  get,
  find,
  update,
  remove,
};