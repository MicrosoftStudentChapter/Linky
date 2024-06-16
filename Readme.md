# Linky

Linky is an open-source project designed to provide redirect solutions with custom-named links using any pre-existing domain name. This solution is perfect for creating short, memorable links that can redirect users to any URL, simplifying the sharing and management of links.

## Example

Create a custom-named link: `https://abcd.xyz/my-form => Redirects to a Google Form`

## Table of Contents

- [Features](##features)
- [Getting Started](##getting-started)
  - [Prerequisites](###prerequisites)
  - [Installation](###installation)
- [Production Deployment](#production-deployment)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- **Custom Named Links**: Easily create short, custom-named links.
- **Domain Flexibility**: Use any pre-existing domain name for your redirects.
- **User-Friendly Interface**: Manage redirects through a simple web interface.
- **Secure**: Ensure safe redirects with validation and monitoring.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following:

- A domain name that you own or have access to.
- A web server or hosting service to deploy the application.
- Basic knowledge of web development and server management.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/linky.git
   cd linky
2. **Running the Server**
- Navigate to the backend directory and run the server and download all the necessary dependencies:
    ```bash
    cd backend
    go run main.go
3. **Running the Frontend**
- Navigate to the frontend directory, install dependencies, and start the development at your local server:
  ```bash
  cd frontend
  npm install
  npm run dev

# Deployment

To deploy Linky in a production environment, use Docker:
### 1. Run Docker Compose
- Execute the following command in the root directory of the project:
  ```bash
  docker-compose up -d
### 2. Deploy Frontend
- You can deploy the frontend anywhere and configure it to point to the backend URL for link management.

# Contribution
We welcome contributions from the community! To contribute:
-  Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes and push the branch.
- Open a pull request with a detailed description of your changes.
