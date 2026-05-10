const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

let db;
let dbPath;

const initializeDatabase = async () => {
  const SQL = await initSqlJs();

  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  dbPath = path.join(dataDir, 'grade_calculator.db');

  let dbData;
  if (fs.existsSync(dbPath)) {
    dbData = fs.readFileSync(dbPath);
    db = new SQL.Database(dbData);
  } else {
    db = new SQL.Database();
    await saveDatabase();
  }

  createTables();
};

const createTables = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS grade_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      semester TEXT NOT NULL,
      year INTEGER NOT NULL,
      courses TEXT NOT NULL,
      gpa REAL NOT NULL,
      total_credits INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
};

const saveDatabase = () => {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
};

const runQuery = (query, params = []) => {
  const results = db.exec(query, params);
  saveDatabase();
  return results;
};

const getQuery = (query, params = []) => {
  const results = db.exec(query, params);
  if (results.length === 0) return [];

  const columns = results[0].columns;
  const values = results[0].values;

  return values.map(row => {
    const obj = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  });
};

const getOne = (query, params = []) => {
  const results = getQuery(query, params);
  return results.length > 0 ? results[0] : null;
};

const insert = (query, params = []) => {
  db.run(query, params);
  saveDatabase();
  return db.exec('SELECT last_insert_rowid() as id')[0].values[0][0];
};

module.exports = {
  initializeDatabase,
  runQuery,
  getQuery,
  getOne,
  insert,
  db: () => db
};
