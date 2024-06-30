import  {userModel} from '../model/user-schema.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const createUser = async (req, res) => {
    const { name, mobile, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Email or mobile already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, mobile, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
export const getAllUsers=async (req, res) => {
    try {
      const users = await userModel.find({});
      res.send(users);
    } catch (error) {
      res.status(500).send();
    }
  }
  // export const createUser= async (req, res) => {
  //   try {
  //     const user = new userModel(req.body);
  //     await user.save();
  //     res.status(201).send(user);
  //   } catch (error) {
  //     res.status(400).send(error);
  //   }
  // }
  export const getUserById=async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send();
    }
  }
  export const updateUser= async (req, res) => {
    try {
      const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  export const deleteUser=async (req, res) => {
    try {
      const user = await userModel.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
      
    } catch (error) {
      res.status(500).json({message:'Server error'});
    }
  }
  export const searchUsersByName=async (req, res) => {
    try {
      const { name } = req.body;
      const users = await userModel.find({ name: new RegExp(name, 'i') });
      res.status(200).json(users);
    } catch (err) {
      // logger.error(`Error searching users: ${err.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  export const followUser=async (req, res) => {
    // async (req, res) => {
    //     try {
    //       const user = await User.findById(req.body.userId);
    //       const userToFollow = await User.findById(req.params.id);
    //       if (!user || !userToFollow) {
    //         return res.status(404).send();
    //       }
    //       user.following.push(userToFollow._id);
    //       await user.save();
    //       res.send(user);
    //     } catch (error) {
    //       res.status(500).send();
    //     }
    //   }
    try {
      const userEmail = req.body.email; 
      const followUserId = req.params.id;
      const user = await userModel.findOne({email:userEmail});
      const followUser = await userModel.findById(followUserId);

      if (!user || !followUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (!user.following.includes(followUserId)) {
        user.following.push(followUserId);
        await user.save();
  
        // Add the current user to the follower's list
        followUser.followers.push(user._id);
        await followUser.save();
  
        // logger.info(`User ${user._id} followed user ${followUserId} successfully`);
        res.status(200).json({ message: 'User followed successfully' });
      } else {
        res.status(400).json({ message: 'User is already followed' });
      }
    } catch (err) {
      console.log("GOTERROR",err)
      // logger.error(`Error following user: ${err.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
