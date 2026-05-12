# 🎮 Wordle Escape Room - Literacy & Math

A fun and educational web-based Wordle game designed for **Grade 6 students** combining literacy and math challenges!

## 🎯 Features

✅ **Mixed Challenges**
- Literacy: Spell grade 6 vocabulary words
- Math: Solve math problems and spell the answer

✅ **Three Difficulty Levels**
- **Easy**: 4-letter words, 8 guesses
- **Medium**: 5-letter words, 6 guesses
- **Hard**: 6-letter words, 5 guesses

✅ **Interactive Gameplay**
- On-screen keyboard
- Physical keyboard support (type to play)
- Hint system (one per game)
- Real-time feedback on letter accuracy

✅ **Statistics & Tracking**
- Score calculation based on difficulty and guesses
- Streak tracking
- Win counter
- Persistent stats (saved in browser)

✅ **User-Friendly Design**
- Beautiful gradient interface
- Fully responsive (mobile, tablet, desktop)
- Clear instructions and challenge descriptions
- Colorful feedback (green, yellow, gray)

## 🚀 How to Play

1. **Read the Challenge** - Read the literacy or math challenge carefully
2. **Make a Guess** - Click letters or type on your keyboard
3. **Get Feedback**
   - 🟩 **Green** = Correct letter in correct position
   - 🟨 **Yellow** = Correct letter in wrong position
   - ⬜ **Gray** = Letter not in the word
4. **Use Your Hint** - Click the hint button for help (once per game)
5. **Win or Try Again** - Complete the word before running out of guesses!

## 📁 File Structure

```
Wordle-Escape-Room-Literacy-and-Math/
├── index.html      # Main game interface
├── styles.css      # Game styling and animations
├── script.js       # Game logic and state management
└── README.md       # This file
```

## 🎓 Educational Value

- **Literacy**: Practice spelling with contextual clues
- **Math**: Solve real math problems to find answers
- **Logic**: Deductive reasoning through letter elimination
- **Persistence**: Encourage trying again with different strategies

## 🛠️ Customization

### Add More Words

Edit `script.js` and add words to the `gameData` object:

```javascript
{ 
  word: 'EXAMPLE', 
  type: 'Literacy', 
  challenge: 'A sample or instance of something' 
},
```

### Change Difficulty Settings

Modify the `maxAttempts` in `gameData`:

```javascript
easy: {
    words: [...],
    maxAttempts: 8  // Change this number
}
```

### Customize Colors

Edit color values in `styles.css`:
- `#667eea` - Primary purple
- `#764ba2` - Secondary purple
- `#6aaa64` - Correct green
- `#c9b458` - Present yellow

## 🌐 Deployment

### GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Select `main` branch
3. Visit `https://yourusername.github.io/Wordle-Escape-Room-Literacy-and-Math`

### Local Use
Simply open `index.html` in any web browser!

## 💡 Tips for Teachers

- Use as a warm-up activity
- Create competition tournaments with high scores
- Add grade-specific vocabulary
- Combine with reading or math lessons
- Customize words for current units

## 🎮 Browser Support

- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓
- Mobile browsers ✓

## 📝 License

Feel free to use and modify for educational purposes!

## 🤝 Contributing

To add more words or features:
1. Edit the `gameData` object in `script.js`
2. Follow the existing format
3. Test the game with new content

---

**Have fun learning! 🚀📚➕**