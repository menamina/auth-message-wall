require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    fName TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    hashed_pass TEXT NOT NULL,
    isMember BOOLEAN DEFAULT FALSE

);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED AS IDENTITY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT,
    body TEXT,
    posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (fName, username, email, hashed_pass, isMember)
VALUES
    ('Mena', 'carrot', 'odin@project.com', 'abc-123-hash', TRUE),
    ('L''oreal', 'redditlover', 'odin1@project.com', 'abc-123-hash', TRUE),
    ('Adonis', 'adonnie', 'odin2@project.com', 'abc-123-hash', TRUE),
    ('Armani', 'a-man', 'odin3@project.com', 'abc-123-hash', TRUE),
    ('Paris', 'baguette', 'odin4@project.com', 'abc-123-hash', TRUE),
    ('Dakota', 'browniesRgood', 'odin5@project.com', 'abc-123-hash', TRUE);

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
