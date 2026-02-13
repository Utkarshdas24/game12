# 🎯 Life Insurance GST Quiz Game

An interactive, gamified quiz application designed to educate users about Life Insurance and GST concepts through an engaging multi-screen experience. Built with React, Vite, and modern web technologies.

![Life Insurance GST Quiz](public/bajaj_life.png)

## ✨ Features

### 🎮 Interactive Gameplay
- **Welcome Screen**: Stunning holographic cyberpunk-style boot sequence with animated text and visual effects
- **Goal Selection**: Choose from multiple life insurance goals to customize your quiz experience
- **Countdown Screen**: Personalized countdown before the quiz begins
- **Goal Assessment**: Interactive quiz screen with visual feedback and scoring
- **Results Screen**: Animated score display with speedometer visualization and confetti effects
- **Thank You Screen**: Post-game appreciation with booking options

### 🎨 Premium UI/UX
- **Smooth Gradient Backgrounds**: Modern navy-to-royal blue gradients
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Micro-animations**: GSAP and Framer Motion powered animations
- **Interactive Elements**: Hover effects, transitions, and dynamic feedback
- **Toast Notifications**: Real-time success/feedback messages
- **Confetti Celebrations**: Canvas confetti for achievements

### 🔧 Technical Highlights
- **React 19**: Latest React with hooks and modern patterns
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first styling with custom configurations
- **Framer Motion**: Smooth page transitions and animations
- **GSAP**: Professional-grade animation library
- **Radix UI**: Accessible component primitives
- **Lazy Loading**: Code-split screens for optimal performance

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd game12
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Build for production**
   ```bash
   pnpm build
   # or
   npm run build
   ```

5. **Preview production build**
   ```bash
   pnpm preview
   # or
   npm preview
   ```

## 🚀 Deployment

This project is configured for seamless deployment on Vercel:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Import your repository on [Vercel](https://vercel.com)
   - Vercel will auto-detect Vite configuration
   - Deploy with one click!

The project includes a `vercel.json` configuration for proper routing and SPA support.

## 📁 Project Structure

```
game12/
├── public/
│   ├── assets/          # Images, videos, and other static assets
│   └── sounds/          # Audio files for game effects
├── src/
│   ├── components/      # React components
│   │   ├── WelcomeScreen.jsx
│   │   ├── GoalSelectionScreen.jsx
│   │   ├── CountdownScreen.jsx
│   │   ├── GoalAssessmentScreen.jsx
│   │   ├── ScoreResultsScreen.jsx
│   │   ├── ThankYouScreen.jsx
│   │   ├── Speedometer.jsx
│   │   ├── Confetti.jsx
│   │   └── ui/          # Reusable UI components
│   ├── data/            # Quiz data and configurations
│   ├── hooks/           # Custom React hooks
│   │   └── useGameState.js
│   ├── utils/           # Utility functions
│   ├── lib/             # Library configurations
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles and Tailwind config
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies and scripts
```

## 🎯 Game Flow

1. **Welcome Screen** → Animated intro with holographic effects
2. **Goal Selection** → User selects life insurance goals
3. **Countdown** → Personalized countdown with user's name
4. **Assessment** → Interactive quiz based on selected goals
5. **Results** → Score display with visual celebrations
6. **Thank You** → Option to book a slot or restart game

## 🛠️ Technologies Used

### Core
- **React 19.2.4** - UI library
- **Vite 7.2.4** - Build tool and dev server

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Class Variance Authority** - Component variants
- **Tailwind Merge** - Merge Tailwind classes

### Animations
- **Framer Motion 12.30.0** - Page transitions and animations
- **GSAP 3.14.2** - Advanced animations
- **Canvas Confetti 1.9.4** - Celebration effects
- **React Confetti 6.4.0** - Confetti component

### UI Components
- **Radix UI** - Accessible component primitives
  - Dialog
  - Label
  - Select
  - Slot
- **Lucide React** - Icon library
- **React Icons** - Additional icons

### Utilities
- **PropTypes** - Runtime type checking
- **clsx** - Conditional className utility

## 🎨 Design Features

- **Color Palette**: Navy blue (#142B57) to Royal blue (#2E5590) gradients
- **Typography**: Modern sans-serif fonts with proper hierarchy
- **Responsive**: Mobile-first design with media queries
- **Accessibility**: Semantic HTML and ARIA attributes
- **Performance**: Lazy loading, code splitting, optimized assets

## 📱 Mobile Optimization

- Viewport meta tags for proper mobile rendering
- Touch-friendly UI elements
- Responsive images and videos
- Optimized for various screen sizes
- No user scaling for consistent experience

## 🔄 State Management

Custom `useGameState` hook manages:
- Current screen navigation
- Selected goals tracking
- Score and lives system
- User data (name, progress)
- Toast notifications

## 🧪 Development Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📝 Configuration Files

- **vite.config.js** - Vite build and dev server settings
- **tailwind.config.js** - Custom Tailwind theme and utilities
- **postcss.config.js** - PostCSS plugins
- **vercel.json** - Vercel deployment configuration

## 🎓 Learning Objectives

This quiz game helps users understand:
- Life insurance concepts
- GST implications on insurance
- Financial planning basics
- Goal-based insurance selection

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Abhishek**

## 🙏 Acknowledgments

- React team for the amazing library
- Vite for blazing-fast development experience
- Tailwind CSS for utility-first styling
- Framer Motion and GSAP for smooth animations
- Radix UI for accessible components

---

Made with ❤️ for better financial literacy
