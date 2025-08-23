# 📱 Receipt Tracker App

A comprehensive mobile application built with React Native and Expo for tracking expenses, managing receipts, and maintaining grocery lists. This app helps users organize their financial records by scanning receipts with AI-powered text extraction and providing detailed expense analytics.

## ✨ Features

### 🔐 Authentication & User Management
- Secure user registration and login
- Firebase Authentication integration
- Persistent user sessions
- User profile management

### 📸 Smart Receipt Scanning
- **AI-Powered Receipt Processing**: Uses OpenAI's GPT-4 Vision to automatically extract receipt information
- **Automatic Data Extraction**: 
  - Purchase date
  - Suggested category classification
  - Item details (name, quantity, price per piece)
- **Image Processing**: Built-in image manipulation and optimization
- **Error Handling**: Smart validation for receipt quality and readability

### 💰 Expense Management
- **Daily & Monthly Tracking**: View expenses by date with calendar integration
- **Category Classification**: Pre-defined categories including:
  - Grocery, Transport, Bills, Entertainment
  - Eating Out, Health, Shopping, Others
- **Manual Entry**: Add expenses manually with custom details
- **Real-time Updates**: Instant synchronization with Firebase

### 📊 Analytics & Insights
- **Monthly Expense Charts**: Visual representation of spending patterns
- **Category Breakdown**: Pie charts showing spending distribution
- **Yearly Overview**: Track expenses across different years
- **Budget Tracking**: Set and monitor monthly spending limits

### 🛒 Grocery List Management
- **Dynamic Lists**: Create and manage shopping lists
- **Auto-save**: Automatic synchronization with cloud storage
- **Item Details**: Track item names, quantities, and prices
- **Real-time Updates**: Instant sync across devices

### 📅 Calendar Integration
- **Date Selection**: Easy navigation between different dates
- **Expense Overview**: Quick view of daily expenses
- **Monthly Summaries**: Track spending patterns over time

## 🛠️ Tech Stack

### Frontend
- **React Native** (0.79.5) - Cross-platform mobile development
- **Expo** (53.0.22) - Development platform and tools
- **React Navigation** - Navigation between screens
- **Victory Native** - Data visualization and charts
- **React Native Reanimated** - Smooth animations

### Backend & Services
- **Firebase** (12.0.0) - Backend-as-a-Service
  - **Firestore** - NoSQL database for expenses and user data
  - **Firebase Auth** - User authentication
  - **Firebase Storage** - Image storage for receipts
- **OpenAI API** - AI-powered receipt text extraction

### State Management & Data
- **React Context** - Global state management
- **AsyncStorage** - Local data persistence
- **Day.js** - Date manipulation and formatting

### Development Tools
- **Jest** - Testing framework
- **React Native Testing Library** - Component testing
- **Babel** - JavaScript compiler

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd receipt-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   - Create a Firebase project and add your configuration to `src/firebase.js`
   - Set up OpenAI API credentials in `src/config/receipt-ai.js`
   - Configure your development environment

4. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Authentication, Firestore, and Storage
3. Update `src/firebase.js` with your project credentials

### OpenAI API Setup
1. Get your OpenAI API key
2. Update `src/config/receipt-ai.js` with your API key and endpoint

## 📱 Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm test` - Run test suite

## 🧪 Testing

The app includes comprehensive testing with Jest and React Native Testing Library:

```bash
npm test
```

Test coverage includes:
- Component rendering and interactions
- Modal functionality
- List operations
- Profile statistics

## 📁 Project Structure

```
receipt-app/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Main app screens
│   ├── navigation/         # Navigation configuration
│   ├── context/           # React Context providers
│   ├── styles/            # Component styling
│   ├── utils/             # Utility functions and constants
│   └── firebase.js        # Firebase configuration
├── assets/                # Images and static assets
├── App.js                 # Main app component
└── package.json           # Dependencies and scripts
```

## 🔒 Security Features

- Firebase Authentication with secure user sessions
- Data isolation between users
- Secure API key management
- Input validation and sanitization

## 📊 Performance Features

- Lazy loading of expense data
- Monthly expense caching
- Optimized image processing
- Efficient database queries

## 🚧 Future Enhancements

- [ ] Export functionality (PDF, CSV)
- [ ] Multi-currency support
- [ ] Advanced analytics and insights
- [ ] Offline mode support

## 📄 License

This project is created for educational purposes as a final year project.

## 👨‍💻 Author

**Zay Paing Latt** - Receipt Tracker App

## 🙏 Acknowledgments

- OpenAI for AI-powered receipt processing
- Firebase for backend services
- Expo team for the development platform
- React Native community for excellent documentation and support

---

**Note**: This app requires proper API keys and Firebase configuration to function. Please ensure all environment variables and configurations are properly set up before running the application.
