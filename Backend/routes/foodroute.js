import express from 'express';
import { addFoodItem, listFoodItems, removeFoodItem } from '../controllers/foodcontroller.js';
import multer from 'multer';//for image upload handling

const foodroute = express.Router(); 

// Create uploads directory if it doesn't exist
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = join(__dirname, '../uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

//image storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }//generate unique file names
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// POST route for adding food items (handles both JSON and form-data)
foodroute.post('/add', (req, res, next) => {
    console.log('Content-Type:', req.headers['content-type']);
    
    // If multipart/form-data, use multer for file upload
    if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
        upload.single('image')(req, res, (err) => {
            if (err) {
                console.log('Multer error:', err);
                return res.status(400).json({ error: err.message });
            }
            next();
        });
    } else {
        // For JSON requests, skip multer
        next();
    }
}, addFoodItem);

// GET route to list all food items
foodroute.get('/list', listFoodItems);

// POST route to remove a food item (expects ID in request body)
foodroute.post('/remove', removeFoodItem);

export default foodroute;