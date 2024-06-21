import jwt from 'jsonwebtoken';
import User from '../models/User';
import connectToDatabase from '../lib/mongodb';

export const authenticate = (handler) => async (req, res) => {
  await connectToDatabase();
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      status: 401,
      message: 'No token provided',
    });
  }

  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: 'User not found',
      });
    }
    req.user = user;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: 'Invalid token',
    });
  }
};
