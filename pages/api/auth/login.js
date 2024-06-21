import { generateToken } from '../../../lib/generateToken';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      await connectToDatabase();
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          status: 400,
          message: 'Please provide complete information',
        });
      }

      if (!password || password.length < 6) {
        return res.status(400).json({
          status: 400,
          message: 'Password length should be atleast 6 character',
        });
      }

      const user = await User.findOne({ email: email });

      if (!user)
        return res.status(400).json({
          status: 400,
          message: 'User not found',
        });

      const comparedPassword = await bcrypt.compareSync(
        password,
        user.password
      );

      if (Object.keys(user).length > 0 && comparedPassword) {
        return res.status(200).json({
          status: 200,
          message: 'User login successfully',
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: await generateToken(user._id),
          },
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: 'Wrong Credentials',
        });
      }
    } else {
      res.status(405).json({ status: 400, message: 'Method not allowed' });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Internal server error',
      stack: error.stack,
    });
  }
}
