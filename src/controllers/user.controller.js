import logger from '../logs/logger.js';
import {User} from '../models/user.js';
import {Message, Status} from '../constants/constants.js';
import {encritpar} from '../common/bycrypt.js';
import {Task} from '../models/task.js';
import {Op} from 'sequelize';

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const search = req.query.search || '';

    const orderBy = req.query.orderBy || 'id';
    const orderDir = req.query.orderDir || 'DESC';

    const whereCondition = {};

    if (search) {
      whereCondition.username = {
        [Op.iLike]: `%${search}%`
      };
    }

    const validOrderFields = ['id', 'username', 'status'];
    const validOrderDir = ['ASC', 'DESC'];

    const finalOrderBy = validOrderFields.includes(orderBy) ? orderBy : 'id';
    const finalOrderDir = validOrderDir.includes(orderDir.toUpperCase()) ? orderDir.toUpperCase() : 'DESC';

    const users = await User.findAndCountAll({
      attributes: ['id', 'username', 'status'],
      order: [[finalOrderBy, finalOrderDir]],
      where: whereCondition,
      limit: limit,
      offset: offset
    });

    const totalPages = Math.ceil(users.count / limit);

    res.json({
      total: users.count,
      page: page,
      pages: totalPages,
      data: users.rows,
    });

  } catch (error) {
    logger.error(error);
    return res.status(500).json({message: error.message});
  }
}

const bulkUsers = async (req, res) => {
  try {
    const {countUser, username, password} = req.body;

    const list = [];

    for (let i = 1; i <= countUser; i++) {
      list.push({
        username: `${username}${i}`,
        password: await encritpar(password),
        status: Status.ACTIVE
      });
    }

    const users = await User.bulkCreate(list);
    return res.json(users);

  } catch (error) {
    logger.error(error);
    return res.json(error.message);
  }
}

const getTasks = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await User.findOne({
      attributes: ['username'],
      include: [{model: Task, attributes: ['name', 'done']}],
      where: {id}
    });

    return res.json(user);
  } catch (error) {
    logger.error(error);
    return res.json(error.message);
  }
}

async function create(req, res) {
  const {username, password} = req.body;
  try {
    const newUser = await User.create({
      username, password
    });
    return res.json(newUser);
  } catch (error) {
    logger.error(error);
    return res.json(error.message);
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
    });

    res.json({
      total: users.count,
      data: users.rows,
    });
  } catch (error) {
    logger.error(error);
    return res.json(error.message);
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
    return res.json(error.message);
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

const eliminar = async (req, res) => {
  const {id} = req.params;
  try {
    await Task.destroy({where: {userId: id}});
    await User.destroy({where: {id}});
    return res.sendStatus(204);
  } catch (error) {
    logger.error(error);
    return res.json(error.message);
  }
};

const activateInactivate = async (req, res) => {
  const {id} = req.params;
  const {status} = req.body;

  if (!status) {
    return res.status(400).json({message: 'No existe el status'});
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({message: 'No existe el usuario'});
    }

    if (user.status === status) {
      return res.status(409).json({message: `El usuario ya se encuentra ${status}`});
    }

    user.status = status;
    await user.save();
    res.json(user);

  } catch (error) {
    logger.error(error);
    return res.json(error.message);
  }
};

export default {
  create,
  get,
  find,
  update,
  eliminar,
  activateInactivate,
  getTasks,
  getAll: getAll,
  bulkUsers: bulkUsers,
};