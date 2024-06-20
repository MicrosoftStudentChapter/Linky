# Linky

Linky is an open-source project designed to provide redirect solutions with custom-named links using any pre-existing domain name. This solution is perfect for creating short, memorable links that can redirect users to any URL, simplifying the sharing and management of links.

## Example

Create a custom-named link: `https://abcd.xyz/my-form => Redirects to a Google Form`

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Deployment](#deployment)
- [Contribution](#contribution)

## Features

- [x]  **Custom Named Links**: Easily create short, custom-named links for better readability and ease of sharing.
- [ ]  **Enhanced Error Handling**: Comprehensive error handling with clear and consistent error messages.
- [ ]  **No Expiry Option**: Option to generate links that never expire, ensuring permanent access.
- [ ]  **QR Code Generation**: Automatic generation of QR codes for each shortened links.
- [ ]  **User-Friendly Interface**: Simple and intuitive web interface for managing redirects.
- [ ]  **Secure Redirects**: Ensure safe redirects with validation and monitoring.

## Getting Started
Follow these steps to set up the project on your local machine and start creating custom-named redirects.


### Prerequisites

Before you begin, ensure you have the following:

| Frontend Development                           | Backend Development                            |
|------------------------------------------------|------------------------------------------------|
| 1. **JavaScript** and **ReactJS**              | 1. **Golang** for creating backend services    |
| 2. **CSS** and **MUI** for styling             | 2. **Redis** as the database                   |
| 3. **API Integration**                         | 3. **Optimization Techniques** for performance |
| 4. Familiarity with tools like **Git**, **GitHub**, **IDE**, **Figma**, **Illustrator** | 4. Familiarity with tools like **Git**, **GitHub**, **IDE** |

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/linky.git
   cd linky
2. **Running the Server**
- Navigate to the backend directory and run the server and download all the necessary dependencies :
    ```bash
    cd backend
    go run main.go
- You'll need to install Redis manually or use Docker for installation. Ensure your server is running before starting the frontend.
3. **Running the Frontend**
- Navigate to the frontend directory, install dependencies, and start the development at your local server:
  ```bash
  cd frontend
  npm install
  npm run dev


# Deployment

To deploy Linky in a production environment, use Docker:
1. **Run Docker Compose**
- Execute the following command in the root directory of the project (before starting the frontend, ensure Docker is running to manage dependencies effectively): 
  ```bash
  cd backend
  docker compose up -d
2. **Deploy Frontend**
- You can deploy the frontend anywhere and configure it to point to the backend URL for link management.
- **Note** - Always run the docker first instead of frontend

# Contribution

Contributions are always welcome!To contribute -
- **Fork** the repository on GitHub.
- **Create** a new branch from the `main` branch for your feature or bug fix:
   ```bash
   git checkout -b your-branch-name/your-name
- Discuss your ideas or the issue you plan to address. You can find open issues in the [Issues](https://github.com/MicrosoftStudentChapter/Linky/issues) section. Comment on the issue to get it assigned to you.
- Implement your changes or fixes then commit your changes.
  ```bash
  git commit -m "feature XYZ implemented"
- **Push** your changes to your fork.
    ```bash
    git push origin feature/your-feature-name
- Open a **pull request** with a detailed description of your changes.
