import { authenticate } from '../../../middleware/auth';
import connectToDatabase from '../../../lib/mongodb';
import Task from '../../../models/Task';
import Board from '../../../models/Board';

const handler = async (req, res) => {
  await connectToDatabase();

  const { user } = req;

  if (req.method === 'PATCH') {
    const { taskId, sourceBoardId, destinationBoardId, position } = req.body;

    try {
      // Find the task and update its board and position
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({
          status: 404,
          message: 'Task not found',
        });
      }

      // Update task's board if moved to a different board
      if (sourceBoardId !== destinationBoardId) {
        task.board = destinationBoardId;
      }

      // Update task's position (this part depends on your Task model's schema and how you store positions)
      // Assuming you have a 'position' field in your Task model
      task.position = position;

      await task.save();

      // Reorder tasks in both source and destination boards
      const sourceBoardTasks = await Task.find({ board: sourceBoardId }).sort({
        position: 1,
      });
      const destinationBoardTasks = await Task.find({
        board: destinationBoardId,
      }).sort({ position: 1 });

      // Reorder tasks in source board
      sourceBoardTasks.forEach(async (task, index) => {
        task.position = index;
        await task.save();
      });

      // Reorder tasks in destination board
      destinationBoardTasks.forEach(async (task, index) => {
        task.position = index;
        await task.save();
      });

      return res.status(200).json({
        status: 200,
        message: 'Task moved successfully',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        message: 'Internal server error',
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default authenticate(handler);
