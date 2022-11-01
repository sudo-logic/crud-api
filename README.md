# Example RESTFUL CRUD API

This is a simple example of a RESTFUL CRUD API using Node.js, Express, and Mongoose.

## Deployment

https://crud-api-srm.azurewebsites.net/


## Usage

1. Create a new user with `POST /`
2. Get a list of all users with `GET /` or `GET /:id`
3. Update a user with `PUT /:id`
4. Delete a user with `DELETE /:id`


## Installation

1. Clone the repo
2. Install dependencies with `npm install`
3. Create a `.env` file in the root directory and add the following:

```dosini
PORT=3000
MONGO_URI=<mongo_uri>
```

3. Start the server with `npm start`


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
