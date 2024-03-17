---

# Nest URL Shortener with MongoDB

This is a URL shortener application built with Nest.js and MongoDB. It allows users to shorten long URLs into shorter, more manageable ones and provide analytics analytics of the created url to the user

## Prerequisites

Before running this application, ensure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)
- MongoDB

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Nurexcoder/nest-url-shortner.git
   ```

2. Navigate into the project directory:

   ```bash
   cd nest-url-shortner
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project:

   ```plaintext
   HOST_URL=localhost:3000
   ACCESS_TOKEN_SECRET= JWT_SEC
   MONGO_CONNECTION_STRING=url mongo string
   REDIS_PASSWORD=your redis passsword
   ```

   Adjust the MongoDB URI and port as necessary.

## Running the Application

To start the server, run the following command:

```bash
npm run start
```

The server will start listening for requests on the specified port (default is 3000).

## API Endpoints

- **POST /urlShortner/create**: Shorten a URL. Requires authentication.
- **GET /urlShortner/all**: Retrieve all shortened URLs. Requires authentication.
- **GET /urlShortner/analytics/all**: Retrieve analytics for all shortened URLs. Requires authentication.
- **GET /urlShortner/analytics/:id**: Retrieve analytics for a specific shortened URL. Requires authentication.
- **GET /:shortUrl**: Redirect to the original URL associated with the given short URL.

## Authentication

This application uses JWT (JSON Web Tokens) for authentication. To access protected endpoints, include a valid JWT token in the request headers.

## Testing

To run tests, use the following command:

```bash
npm run test
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements or bug fixes.


