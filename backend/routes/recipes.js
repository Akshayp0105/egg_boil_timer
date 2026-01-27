import express from 'express';

const router = express.Router();

// Default recipes
const recipes = [
  {
    id: 1,
    name: 'Soft Boiled',
    time: 360,
    timeFormatted: '6:00',
    description: 'Runny yolk with soft whites',
    difficulty: 'Easy',
    color: '#FFE5B4',
    emoji: '🟡',
    tips: ['Cool immediately in ice water', 'Best for dippy eggs']
  },
  {
    id: 2,
    name: 'Medium Boiled',
    time: 600,
    timeFormatted: '10:00',
    description: 'Creamy yolk with firm whites',
    difficulty: 'Medium',
    color: '#FFA500',
    emoji: '🟠',
    tips: ['Perfect for salads', 'Creamy yolk texture']
  },
  {
    id: 3,
    name: 'Hard Boiled',
    time: 840,
    timeFormatted: '14:00',
    description: 'Fully cooked throughout',
    difficulty: 'Hard',
    color: '#FF8C00',
    emoji: '🔴',
    tips: ['Store in fridge up to 7 days', 'Great for meal prep']
  }
];

// Get all recipes
router.get('/', (req, res) => {
  res.json({ success: true, data: recipes });
});

// Get single recipe
router.get('/:id', (req, res) => {
  const recipe = recipes.find(r => r.id === parseInt(req.params.id));
  if (recipe) {
    res.json({ success: true, data: recipe });
  } else {
    res.status(404).json({ success: false, error: 'Recipe not found' });
  }
});

// Add custom recipe
router.post('/custom', (req, res) => {
  const { name, time, description } = req.body;
  
  if (!name || !time) {
    return res.status(400).json({ success: false, error: 'Name and time required' });
  }

  const newRecipe = {
    id: recipes.length + 1,
    name,
    time,
    timeFormatted: `${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`,
    description: description || 'Custom recipe',
    difficulty: 'Custom',
    color: '#FF6B35',
    emoji: '✨'
  };

  recipes.push(newRecipe);
  res.json({ success: true, data: newRecipe, message: 'Recipe added' });
});

export default router;
