import { authenticate } from '../../../middleware/auth';
import connectToDatabase from '../../../lib/mongodb';
import Board from '../../../models/Board';

const handler = async (req, res) => {
  await connectToDatabase();

  const { user } = req;

  if (!user) {
    return res.status(400).json({
      status: 400,
      message: 'Please login again',
    });
  }

  if (req.method === 'GET') {
    const boards = await Board.find({ user: user._id });
    return res.status(200).json({
      status: 200,
      message: 'Boards fetched successfully',
      data: boards,
    });
  }

  if (req.method === 'POST') {
    const { name } = req.body;
    const newBoard = new Board({ name, user: user._id });
    await newBoard.save();
    return res.status(201).json({
      status: 201,
      message: 'Board added successfully',
      data: newBoard,
    });
  }

  res.status(405).json({ message: 'Method not allowed' });
};

export default authenticate(handler);
