import { Discussion } from '../model/discussion-schema.js';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from 'path'
import fs from 'fs';
    // Get the current file's directory
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
// Function to encode image to base64 format
function encodeImageToBase64(imagePath) {
    // Read the image file
    const img = fs.readFileSync(imagePath);

    // Convert image file to base64-encoded string
    const base64Image = Buffer.from(img).toString('base64');

    return base64Image;
}
// Function to ensure the 'assets' directory exists
function ensureAssetsDirExists() {
    const assetsDir = join(__dirname, 'assets');
    if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir);
    }
}

//user's post which contain texts, images , hashtags and createdon field
export const userPost = async (req, res) => {
    const user=req.body;
  const { text,image,hashtags } = req.body;
  const createdBy = req.body._id;  // Assuming user._id is part of the request body
  ensureAssetsDirExists();
  const base64Image=encodeImageToBase64(image).split(';base64,').pop();
  const filename = `image-${Date.now()}.jpg`; // Example filename
  const filePath = path.join(__dirname, 'assets', filename);
  fs.writeFile(filePath, base64Image, { encoding: 'base64' }, (err) => {
    if (err) {
        return res.status(500).json({ error: 'Failed to save image' });
    }
    console.log('Image saved successfully:', filename);
});
  try {
    const newDiscussion = new Discussion({ text, image, hashtags, createdBy });
    await newDiscussion.save();
    res.status(201).json(newDiscussion);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Discussion
export const updatePost = async (req, res) => {
  const { id } = req.params;
//   const { text, hashtags } = req.body;
  try {
    const discussion = await Discussion.findByIdAndUpdate(id,req.body, { new: true, runValidators: true });
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    await discussion.save();
    res.status(200).json(discussion);
  } catch (error) {
    console.log("oops",error)
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Discussion
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const discussion = await Discussion.findByIdAndDelete(id);
    
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.status(200).json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Discussions by Tag
export const getPostByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const discussions = await Discussion.find({ hashtags: tag });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Search Discussions by Text
export const searchPost = async (req, res) => {
  const { text } = req.query;
  try {
    const discussions = await Discussion.find({ text: new RegExp(text, 'i') });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
