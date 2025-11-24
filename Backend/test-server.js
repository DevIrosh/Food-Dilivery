import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 40000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test routes
app.get('/', (req, res) => {
    res.send('Test server working!');
});

app.post('/test', (req, res) => {
    console.log('POST request received:', req.body);
    res.json({ 
        message: 'POST is working!', 
        received: req.body 
    });
});

// Simple food add route
app.post('/api/food/add', (req, res) => {
    console.log('Food add request:', req.body);
    const { name, description, price, category } = req.body;
    
    // Simple validation
    if (!name || !description || !price || !category) {
        return res.status(400).json({ 
            error: 'Missing required fields: name, description, price, category' 
        });
    }
    
    // Mock successful response
    const mockFood = {
        _id: '12345',
        name,
        description,
        price: parseFloat(price),
        category,
        image: '',
        createdAt: new Date()
    };
    
    res.status(201).json(mockFood);
});

app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
});