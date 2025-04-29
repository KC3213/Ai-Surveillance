# Hawkeye Dashboard

A modern dashboard application for monitoring and analytics.

## Project Structure

```
hawkeye-dashboard/
├── src/                 # Frontend React application
├── public/             # Static files
|── package.json
server/             # Backend Node.js server
│   ├── routes/         # API routes
│   ├── models/         # Database models
│   ├── controller/     # Business logic
│   └── config.js       # email configuration
│   └── app.js       # Server configuration
│   └── package.json       

```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd hawkeye-dashboard
```

### 2. Install Dependencies

#### Frontend
```bash
cd hawkeye-dashboard
npm install
```

#### Backend
```bash
cd server
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory with the following variables:
```
REACT_APP_API_URL=http://localhost:5000
PORT=5000
```

### 4. Configuration

Create a `config.js` file in the server directory with the following content:
```javascript
module.exports = {
    email: {
        user: 'your-email@gmail.com',
        password: 'your-app-specific-password'
    }
};
```

Note: For Gmail, you'll need to use an App Password instead of your regular password. To generate an App Password:
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Go to App Passwords
5. Generate a new app password for your application

### 5. Running the Application

#### Start the Backend Server
```bash
cd server
npm start
```

#### Start the Frontend Development Server
```bash
cd hawkeye-dashboard
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Features

- Real-time data monitoring
- Interactive dashboards
- User authentication
- Data visualization
- API integration

## Development

### Available Scripts

In the project directory, you can run:

#### `npm start`
Runs the app in development mode.

#### `npm test`
Launches the test runner.

#### `npm run build`
Builds the app for production.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
