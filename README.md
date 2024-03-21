# Geo-Data App

Welcome to the Geo-Data App repository! Our application offers a comprehensive solution for managing and visualizing geospatial data through a user-friendly web interface. Built with cutting-edge technologies, including a Go backend and a React.js frontend, our app caters to users seeking an intuitive platform for working with GeoJSON and KML files.

## Features

- **User Authentication:** Secure signup and login processes to manage user accounts effectively.
- **GeoJSON and KML Management:** Upload, visualize, and manage GeoJSON or KML files seamlessly.
- **Map Visualization:** Utilize React Leaflet for rendering maps and displaying uploaded geospatial data.
- **Custom Shapes:** Draw, save, and edit custom shapes directly on the map for personalized geospatial data management.
- **Responsive Design:** A user-friendly interface that adapts to various devices, ensuring a seamless experience for all users.

## Project Preview
![Page Preview 1](/Preview/preview-1.png)
![Page Preview 2](/Preview/preview-2.png)
![Page Preview 3](/Preview/preview-3.png)
![Page Preview 4](/Preview/preview-4.png)
![Page Preview 5](/Preview/preview-5.png)

## Getting Started

To get the application running on your local machine, follow these steps:

### Prerequisites

- Node.js (latest stable version)
- Go (latest stable version)
- PostgreSQL or SQLite

### Installation

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/pratham1916/Geo-Data.git
    ```

2. Navigate to the project directory:
    ```bash
    cd geo-data
    ```

3. Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4. Install backend dependencies:
    ```bash
    cd ../backend
    go get .
    ```

5. Create a `.env` file in the backend directory and configure your database settings and other environment variables as needed.

6. Run the backend server:
    ```bash
    go run main.go
    ```

Your Geo-Data App should now be accessible at `http://localhost:3000`.

## Technologies

- **Frontend:** React.js
- **Backend:** Go
- **Database:** PostgreSQL
- **Map Rendering:** React Leaflet

Happy Mapping!
