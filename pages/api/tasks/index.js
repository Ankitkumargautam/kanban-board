import { authenticate } from '../../../middleware/auth';
import connectToDatabase from '../../../lib/mongodb';
import Task from '../../../models/Task';

const handler = async (req, res) => {
  await connectToDatabase();

  const { user } = req;

  if (req.method === 'GET') {
    const tasks = await Task.aggregate([
      {
        $match: { user: user._id },
      },
      {
        $lookup: {
          from: 'boards', // Ensure this matches the actual name of the board collection
          localField: 'board',
          foreignField: '_id',
          as: 'board',
        },
      },
      {
        $unwind: '$board',
      },
      {
        $group: {
          _id: '$board._id', // Group by the board ID
          board: { $first: '$board' }, // Get board details
          tasks: { $push: '$$ROOT' }, // Push all tasks into an array within each group
        },
      },
    ]);
    return res.status(200).json({
      status: 200,
      message: 'Tasks fetched successfully',
      data: tasks,
    });
  }

  if (req.method === 'POST') {
    const { title, description, dueDate, priority, boardId } = req.body;
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      board: boardId,
      user: user._id,
    });
    await newTask.save();
    return res.status(201).json({
      status: 201,
      message: 'Task added successfully',
      data: newTask,
    });
  }

  if (req.method === 'DELETE') {
    const { taskId } = req.body;
    try {
      const task = await Task.findOne({ _id: taskId });
      if (!task) {
        return res.status(400).json({
          status: 400,
          message: 'Task not Found',
        });
      }
      await Task.findByIdAndDelete({ _id: taskId });
      return res.status(200).json({
        status: 200,
        message: 'Task deleted successfully',
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: 'Task not deleted',
      });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
};

export default authenticate(handler);
