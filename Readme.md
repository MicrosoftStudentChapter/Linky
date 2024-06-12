## Linky

An open source project to provide redirect solutions with custom-named links using any pre-existing domain name.

*Example * `https://abcd.xyz/my-form => Link to the google form`

## Installation

- Clone the repo
- To run the server:
  - `cd backend`
  - `go run main.go` will install all the dependancies and start the server
- To run the frontend
  - `cd frontend`
  - `npm run install`
  - `npm run dev`

 ## Prod

 To use this in production, run the `docker-compose.yml` file in your server, and point this url in the frontend.
 You can deploy the frontend anywhere and use that admin panel to create links.
