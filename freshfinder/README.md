# FreshFinder

FreshFinder is a web application designed to help users locate nearby and affordable grocery stores, particularly in food desert areas. The app provides essential information such as prices, availability, distance, and store hours, making it easier for users to access nutritious food options.

## Features

- **Search & Filter**: Users can input their Zip Code to find grocery stores in their vicinity.
- **Store Information**: Displays relevant details about each store, including pricing and availability.
- **Navigation**: Integrated with Google Maps API for easy navigation to selected stores.
- **Offline Functionality**: Designed as a Progressive Web App (PWA) to allow offline access to cached grocery store data.

## Tech Stack

- **Frontend**: Built with React for a responsive and dynamic user interface.
- **Backend**: JavaScript with GCP Firestore for data retrieval.
- **APIs**: Google Maps API for navigation and location services.

## Getting Started

1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/freshfinder.git
   ```

2. **Navigate to the project directory**:
   ```
   cd freshfinder
   ```

3. **Install dependencies**:
   ```
   npm install
   ```

4. **Run the application**:
   ```
   npm start
   ```

5. **Open your browser** and go to `http://localhost:3000` to view the app.

## Future Plans

- Implement offline capabilities to enhance usability in low-connectivity areas.
- Containerize the backend using Docker and deploy with Kubernetes for better scalability and maintenance.

## Try it Out!

Visit [freshfinder.co](https://freshfinder.co) to explore our live solution and help combat food deserts in your area!