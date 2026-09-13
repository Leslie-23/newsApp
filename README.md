# NewsApp - React Native News Application

## 📱 Project Overview

NewsApp is a modern, cross-platform mobile application built with React Native and Expo Router that delivers real-time news from various sources using the NewsAPI. The app features a clean, intuitive interface with four main sections for browsing, searching, and saving news articles.

---

## 🚀 Features

### Core Features

- **Top Headlines**: Browse latest news from multiple categories
- **Category-based News**: Filter news by specific categories (Business, Technology, Sports, etc.)
- **Advanced Search**: Search through news articles with intelligent suggestions
- **Bookmarks**: Save articles for later reading (UI ready for implementation)
- **Real-time Updates**: Pull-to-refresh functionality
- **Responsive Design**: Optimized for both iOS and Android

### Technical Features

- **Expo Router**: File-based navigation system
- **Modern UI**: Consistent design language with proper spacing and colors
- **API Integration**: Full integration with The News API
- **Error Handling**: Comprehensive error states and loading indicators
- **TypeScript Ready**: Structured for easy TypeScript integration

---

## 🛠 Tech Stack

### Frontend

- **React Native** (0.81.5) - Cross-platform mobile framework
- **Expo** (54.0.23) - Development platform
- **Expo Router** (6.0.14) - File-based routing
- **React Navigation** - Tab navigation

### API & Services

- **The News API** - News data provider
- **Axios** - HTTP client for API requests

### UI Components

- **Expo Vector Icons** - Icon library
- **Expo Image** - Optimized image handling
- **React Native Reanimated** - Smooth animations

---

## 📁 Project Structure

```
newsapp/
├── app/                    # Expo Router pages
│   ├── _layout.js         # Root layout with tab navigation
│   ├── index.js           # Home screen
│   ├── categories.js      # Category-based news
│   ├── search.js          # Search functionality
│   └── bookmarks.js       # Saved articles
├── components/            # Reusable components
│   ├── NewsCard.js        # Article card component
│   └── NewsList.js        # Articles list component
├── services/              # API services
│   └── newsService.js     # News API integration
├── constants/             # App constants
│   └── config.js          # API configuration
├── assets/               # Static assets
│   ├── icon.png          # App icon
│   └── splash.png        # Splash screen
└── app.json             # Expo configuration
```

---

## 🎨 UI/UX Design

### Color Palette

- **Primary**: `#1e40af` (Blue)
- **Background**: `#f8fafc` (Light gray)
- **Text Primary**: `#1e293b` (Dark gray)
- **Text Secondary**: `#64748b` (Medium gray)
- **Cards**: `#ffffff` (White)

### Typography

- **Headers**: 28-32px, Bold
- **Subtitles**: 16px, Regular
- **Body**: 14-16px
- **Captions**: 12-14px

### Components

- **NewsCard**: Clean card layout with image, title, description, source, and date
- **NewsList**: Virtualized list with pull-to-refresh
- **Category Chips**: Horizontal scrollable category filters
- **Search Bar**: Enhanced search with suggestions and history

---

## 🔌 API Integration

### NewsAPI Configuration

```javascript
// constants/config.js
export const NEWS_API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
export const NEWS_API_BASE_URL = "https://api.thenewsapi.com/v1/news";
```

### Available Endpoints

- **Top Headlines**: `/all?locale=us&language=en`
- **Category News**: `/all?categories=technology&language=en`
- **Search**: `/all?search=query&language=en`

### Service Methods

```javascript
// services/newsService.js
newsService.getTopHeadlines(country);
newsService.getNewsByCategory(category, country);
newsService.searchNews(query, options);
```

---

## 📱 Screens

### 1. Home Screen (`/`)

- Displays top headlines from general, business, and tech categories
- Pull-to-refresh functionality
- Clean header with article count

### 2. Categories Screen (`/categories`)

- Horizontal category selector
- Category-specific news feeds
- Visual category indicators

### 3. Search Screen (`/search`)

- Advanced search with real-time suggestions
- Search history
- Popular topic chips
- Results counter

### 4. Bookmarks Screen (`/bookmarks`)

- Saved articles interface
- Empty state with instructions
- Ready for bookmark functionality implementation

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Studio (for development)
- Physical device with Expo Go app (for testing)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd newsapp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   # Copy the example and fill in your key
   cp .env.example .env
   ```

4. **Get API Key**

   - Register at [The News API](https://www.thenewsapi.com/)
   - Set `EXPO_PUBLIC_NEWS_API_KEY` in `.env` to your key

5. **Start Development**
   ```bash
   npm start
   ```

### Building for Production

```bash
# Prebuild for specific platforms
npx expo prebuild

# Build using EAS
npx eas build --platform android
npx eas build --platform ios
```

---

## 🔧 Configuration

### Environment Variables

```env
EXPO_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
```

### App Configuration (app.json)

- App name: "NewsApp"
- Bundle identifiers
- Orientation: Portrait
- Splash screen configuration
- Icon assets

---

## 📊 API Response Handling

### Article Object Structure

```javascript
{
  uuid: "string",
  title: "string",
  description: "string",
  url: "string",
  image_url: "string",
  source: "string",
  published_at: "ISO_date_string"
}
```

### Error Handling

- Network request failures
- API rate limits
- Empty results
- Invalid search queries

---

## 🎯 Future Enhancements

### Planned Features

- [ ] Bookmark functionality with local storage
- [ ] Article detail screen
- [ ] Offline reading capability
- [ ] Push notifications for breaking news
- [ ] Dark mode support
- [ ] Share functionality
- [ ] Multiple language support
- [ ] Custom news sources selection

### Technical Improvements

- [ ] TypeScript migration
- [ ] Unit and integration tests
- [ ] Performance optimization
- [ ] Advanced caching strategies
- [ ] Analytics integration

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🐛 Troubleshooting

### Common Issues

1. **API Key Issues**: Ensure correct API key in `.env`
2. **Network Errors**: Check internet connection and API status
3. **Build Failures**: Clear cache with `npm start -- --reset-cache`
4. **Navigation Issues**: Verify Expo Router configuration

### Support

- Check Expo documentation
- Review React Navigation guides
- Consult NewsAPI documentation

---

## 👨‍💻 Developer

Built with ❤️ using React Native and Expo

**Portfolio Project** - Demonstrating modern mobile app development practices with React Native, Expo Router, and API integration.

---

_Last Updated: ${new Date().toLocaleDateString()}_
