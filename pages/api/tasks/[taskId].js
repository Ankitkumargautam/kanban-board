import { authenticate } from '../../../middleware/auth';
import connectToDatabase from '../../../lib/mongodb';
import Task from '../../../models/Task';

const handler = async (req, res) => {
  await connectToDatabase();

  const { user } = req;
  const { taskId } = req.query;
  console.log(req.query, 'ssssss');

  try {
    if (req.method === 'PUT') {
      const { title, description, dueDate, priority, boardId } = req.body;

      // Validate if user is authorized to update this task (optional step)

      // Find the task by taskId and update its fields
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { title, description, dueDate, priority, board: boardId },
        { new: true } // Return the updated task
      );

      if (!updatedTask) {
        return res.status(404).json({
          status: 404,
          message: 'Task not found',
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'Task updated successfully',
        data: updatedTask,
      });
    }

    // Handle other HTTP methods if needed
    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default authenticate(handler);
