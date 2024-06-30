import { userModel } from "../../userService/model/user-schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(200).json({ token, userId: user._id });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  export const signUp=async (req, res) => {
    const { name, mobileNo, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = new userModel({ name, mobileNo, email, password: hashedPassword });
    await user.save();
    res.status(201).send('User created');
  }