# Secret Society Authenticated Message Wall

## Functionality

- Become a member to view messages within the secret society

## Built with

- Node.js
- Express
- EJS
- Passport
- PostgreSQL
- Raw SQL

## Building this

- I implemented passport middleware to reinforce authentication methods. Although passport authenticates users in the middle layer with express and SID cookies, it is up to you as the dev with database queries to enforce whether a user is authorized or not to view certain pages or invoke functionalities and we can do this with user roles in the database as well as with specific SQL queries.
- In this project only users who have 'isMember' === true in the database are authorized to view the messages.
