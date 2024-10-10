# JetBrains Internship 2024

## Gamification in IDE - Frontend Developer

### Test Task: React Timer Component

![Timer Component](https://github.com/SKom2/kotlin-js-text-editor/assets/103752057/bcfd650a-ca87-4e7c-b52d-533e6a20f982)

### Overview

This project showcases a React-based timer component designed for functionality and user experience. It includes essential timer controls and adheres to specified design parameters.

### Functionality

- **Control Buttons**: The timer features **start**, **pause**, and **reset** buttons. The **reset** button sets the timer back to `00:00`, ignoring the `elapsedTime` prop.
- **Time Format**: Remaining time is displayed in the format `MM:SS`.
- **Duration Limit**: The timer supports a maximum duration of **59 minutes and 59 seconds**. An exception will be thrown if `endTime` exceeds this limit.
- **End Animation**: Upon reaching the end, the circle background alternates between **green** and **red** colors with an indefinite linear animation, enhancing visual feedback.

### Technologies Used

- **React**
- **Vite**
- **TypeScript**
- **Tailwind CSS**

### Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/SKom2/react-timer.git
   ```
2. Navigate to the project directory:
   ```bash
   cd react-timer
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Start the development server:
    ```bash
   npm run dev
    # or
    yarn dev
   ```
