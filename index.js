const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://my.bhaskar.lol', 'https://www.my.bhaskar.lol'] 
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

// Parse JSON request body
app.use(express.json());

// Helper function to ensure directory exists
const ensureDirectoryExists = (filePath) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(process.cwd(), 'uploads');
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Keep the original filename
    cb(null, file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit
  fileFilter: (req, file, cb) => {
    // Accept audio files only
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed!'), false);
    }
  }
});

// API endpoints for profile data
app.get('/api/profile', (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'db', 'profile_data.json');
    
    if (!fs.existsSync(filePath)) {
      // Create default profile data if file doesn't exist
      const defaultData = {
        name: "Bhaskar",
        description: "Welcome to my personal website!",
        profilePic: "https://i.postimg.cc/NFncZ9Jz/default-profile-image.jpg",
        background: {
          enabled: false,
          url: "",
          customBackground: false
        }
      };
      
      ensureDirectoryExists(filePath);
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
      return res.json(defaultData);
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(data);
  } catch (error) {
    console.error('Error reading profile data:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/profile', (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'db', 'profile_data.json');
    ensureDirectoryExists(filePath);
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'Profile data saved successfully' });
  } catch (error) {
    console.error('Error writing profile data:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.patch('/api/profile', (req, res) => {
  try {
    const { field, value } = req.body;
    const filePath = path.join(process.cwd(), 'db', 'profile_data.json');
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Profile data not found' });
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Handle nested fields with dot notation (e.g., 'background.url')
    if (field.includes('.')) {
      const fields = field.split('.');
      let current = data;
      
      // Navigate to the nested object
      for (let i = 0; i < fields.length - 1; i++) {
        if (!current[fields[i]]) {
          current[fields[i]] = {};
        }
        current = current[fields[i]];
      }
      
      // Set the value at the final level
      current[fields[fields.length - 1]] = value;
    } else {
      // Simple top-level field
      data[field] = value;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json({ success: true, message: `Field '${field}' updated successfully` });
  } catch (error) {
    console.error(`Error updating profile field:`, error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// API endpoints for social links
app.get('/api/social-links', (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'db', 'social_links.json');
    
    if (!fs.existsSync(filePath)) {
      // Create default social links if file doesn't exist
      const defaultData = {
        discord: { url: "", enabled: false },
        github: { url: "https://github.com/bhaskarkumar1", enabled: true },
        instagram: { url: "", enabled: false },
        twitter: { url: "", enabled: false },
        litecoin: { url: "", enabled: false },
        steam: { url: "", enabled: false },
        riotgames: { url: "", enabled: false },
        telegram: { url: "", enabled: false }
      };
      
      ensureDirectoryExists(filePath);
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
      return res.json(defaultData);
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(data);
  } catch (error) {
    console.error('Error reading social links:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/social-links', (req, res) => {
  try {
    const { platform, url, enabled } = req.body;
    const filePath = path.join(process.cwd(), 'db', 'social_links.json');
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Social links file not found' });
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Create or update the platform data
    data[platform] = { url, enabled };
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json({ success: true, message: `Social link for ${platform} updated successfully` });
  } catch (error) {
    console.error('Error updating social link:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/social-links', (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'db', 'social_links.json');
    ensureDirectoryExists(filePath);
    fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.json({ success: true, message: 'All social links saved successfully' });
  } catch (error) {
    console.error('Error writing social links:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/social-links/:platform', (req, res) => {
  try {
    const { platform } = req.params;
    const filePath = path.join(process.cwd(), 'db', 'social_links.json');
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Social links file not found' });
    }
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Remove the platform
    if (data[platform]) {
      delete data[platform];
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      res.json({ success: true, message: `Social link for ${platform} deleted successfully` });
    } else {
      res.status(404).json({ success: false, message: `Social link for ${platform} not found` });
    }
  } catch (error) {
    console.error('Error deleting social link:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// API endpoint for track uploads
app.post('/api/upload-track', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Return success response with file details
    res.json({
      success: true,
      file: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        size: req.file.size
      },
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API service is running' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`API service running on port ${port}`);
  });
}

// Export for serverless
module.exports = app;

// Crafted With <3 By Bhaskar 