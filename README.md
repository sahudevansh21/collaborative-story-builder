# Collaborative Story Builder

This is a Next.js 14 App Router application designed to help aspiring writers collaboratively build story plots and characters. It provides a visual, interactive canvas and dedicated editors for characters and plot points, all saved locally in your browser.

## Problem Solved

Aspiring writers often face writer's block or desire a simple tool to collaboratively build story plots and characters without needing complex shared documents or external services. They need a quick way to outline and connect ideas in a structured yet flexible manner.

## Solution

The website provides a canvas where users can create interconnected story elements like characters, settings, and plot points. It uses local storage to save your progress, ensuring your work is persistent across sessions without needing a server or database. The intuitive drag-and-drop interface facilitates brainstorming and organizing narrative structures through a visual approach, helping you build a full story outline from concept to completion.

## Features

*   **Story Canvas**: A freeform canvas to drag and drop interconnected story elements (plot points, characters, settings, items).
*   **Character Editor**: Dedicated page to create, edit, and manage detailed character profiles.
*   **Plotline Overview**: A structured list to outline and reorder key plot points in your narrative.
*   **Local Storage**: All your progress is automatically saved to your browser's local storage, no accounts or internet connection required after initial load.
*   **Stunning Design**: A dark theme with vibrant gradient accents and glassmorphic UI elements, offering a modern and engaging user experience.
*   **Responsive**: Optimized for various screen sizes, from desktop to mobile.

## Getting Started

Follow these steps to get your local copy up and running.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://YOUR_REPOSITORY_URL_HERE
    cd collaborative-story-builder
    ```
    (Note: Replace `YOUR_REPOSITORY_URL_HERE` if this were a real repo, but for this JSON output, it's illustrative.)

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

1.  **Build the application:**
    ```bash
    npm run build
    # or
    yarn build
    ```

2.  **Start the production server:**
    ```bash
    npm run start
    # or
    yarn start
    ```

The application will be optimized for production and served.

## Technologies Used

*   **Next.js 14**: React framework for production.
*   **React 18**: UI library.
*   **Local Storage API**: For client-side data persistence.
*   **CSS**: Pure CSS for styling, adhering to a glassmorphic design system.

## Project Structure

```
.
├── app/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js               # Home page
│   ├── story-canvas/
│   │   └── page.js           # Story Canvas page
│   ├── character-editor/
│   │   └── page.js           # Character Editor page
│   └── plotline-overview/
│       └── page.js           # Plotline Overview page
├── public/                   # Static assets
├── next.config.js
├── package.json
├── README.md
└── .gitignore
```
