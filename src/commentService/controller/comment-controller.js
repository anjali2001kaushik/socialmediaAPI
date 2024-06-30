import {Comment} from '../model/comment-schema.js';

// Create Comment
export const createComment = async (req, res) => {
  const { text, discussionId } = req.body;
  try {
    const newComment = new Comment({ text, discussion: discussionId });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Comment
export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const comment = await Comment.findByIdAndUpdate(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
  
    res.status(200).json(comment);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Like Comment
export const likeComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.body._id;
  try {
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (!comment.likes.includes(userId)) {
      comment.likes.push(userId);
      await comment.save();
      res.status(200).json({ message: 'Comment liked' });
    } else {
      res.status(400).json({ message: 'Already liked' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Reply to Comment
export const replyToComment = async (req, res) => {
  const { text, parentId } = req.body;
  const createdBy = req.body._id;
  try {
    const parentComment = await Comment.findOne({text});
    if (!parentComment) {
      return res.status(404).json({ message: 'Parent comment not found' });
    }
    const reply = new Comment({ text, createdBy, parent: parentId });
    await reply.save();
    parentComment.replies.push(reply._id);
    await parentComment.save();
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
