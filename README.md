# 🗨️ NestJS Chatbot (Socket.IO + Sequelize + PostgreSQL)
A real-time chatbot API built with NestJS, powered by Socket.IO for bi-directional communication, Sequelize ORM for database management, and PostgreSQL as the database engine.
Designed for private user connections, automated bot responses, and persistent chat history storage.

# 🚀 Features
⚡ Real-time messaging using WebSockets (Socket.IO)

🔒 Private connections for each connected client

🤖 Automatic bot replies for incoming user messages

🗄 Sequelize ORM with PostgreSQL for data persistence

🛡 Built-in DTO validation using class-validator & class-transformer

📂 Modular NestJS architecture for scalability

# 🏗 Tech Stack
Backend Framework: NestJS

WebSocket Engine: Socket.IO

ORM: Sequelize

Database: PostgreSQL

Validation: class-validator & class-transformer

Language: TypeScript

# 📌 Example Flow
Client connects via Socket.IO

User sends a message with their details (fullName, email, phone, message)

Server saves the message to PostgreSQL via Sequelize

Bot processes the message and sends an automated reply to that specific user

# 🛠 Installation

#!/bin/bash

# Clone repository
git clone https://github.com/your-username/nestjs-chatbot.git
cd nestjs-chatbot || exit

# Install dependencies
yarn install

# Create .env file
cat <<EOL > .env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=chatbot_db
EOL

# Run database migrations
yarn sequelize db:migrate

# Start development server
yarn start:dev

# 📡 Testing via Postman / Socket.IO Client
You can test WebSocket events using:

Postman (Socket.IO mode)

Socket.IO Client in the browser

WebSocket testing tools like wscat

Example event:

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": 971501234567,
  "message": "Hello bot!"
}
