require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    fName TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    isMember BOOLEAN DEFAULT FALSE

);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT,
    body TEXT,
    posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    color TEXT NOT NULL
);

INSERT INTO users (fName, username, email, hash, salt, isMember)
VALUES
    ('Mena', 'carrot', 'odin@project.com', 'abc-123-hash', '123', TRUE),
    ('L''oreal', 'redditlover', 'odin1@project.com', 'abc-123-hash', '123', TRUE),
    ('Adonis', 'adonnie', 'odin2@project.com', 'abc-123-hash', '123', TRUE),
    ('Armani', 'a-man', 'odin3@project.com', 'abc-123-hash', '123', TRUE),
    ('Paris', 'baguette', 'odin4@project.com', 'abc-123-hash', '123', TRUE),
    ('Dakota', 'browniesRgood', 'odin5@project.com', 'abc-123-hash', '123', TRUE);

INSERT INTO messages (user_id, title, body, color)
VALUES
    (1, 'remember...', 'fake news fake news', '#bcceffff'),
    (2, 'that..', 'fake news fake news', '#ffe7bcff'),
    (3, 'u..', 'fake news fake news', '#bdfdfeff'),
    (4, 'r..', 'fake news fake news', '#ffd4dbff'),
    (5, 'v..', 'fake news fake news', '#e3bdfeff'),
    (6, 'cool', 'fake news fake news', '#87f0bfff');
`;

async function run() {
  console.log("seeding");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done!");
}

run();
