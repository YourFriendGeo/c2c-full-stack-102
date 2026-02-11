# Full-Stack Lesson 9 Starter Guide

Welcome to the template repository for Lesson 9. This guide replaces the default Create React App boilerplate and highlights exactly where to work when continuing the lesson.

## Folder Layout
- **`client/`** – React frontend that renders the contact form and interacts with the API.
- **`server/`** – Node/Express backend that exposes routes such as `POST /submit-form` and communicates with the database.
- **`docs/CRA_REFERENCE.md`** – Archived Create React App reference documentation from the original scaffold.

> If you are missing the `server/` folder locally, create it with the lesson starter code or pull the latest changes from your instructor's branch.

---

## Getting Started in VS Code

1. Open **VS Code**.
2. Press **Ctrl + Shift + P** (or **Cmd + Shift + P** on Mac).
3. Choose **Git: Clone**.
4. Paste your repository URL and choose a local folder.
5. Once the project opens, click **“Open in new window”** if prompted.

---

## Prerequisites

Make sure you have these installed before starting:
- **Node.js 18 LTS or newer** (includes `npm`)
- **MySQL Server** (for your local database)
- **MySQL Workbench** *(optional)* – to manage your schema and tables visually

---

## Install & Run

### Step 1: Start the Client
```bash
cd client
npm install
npm start
```
This launches the React app on **http://localhost:3000**.

### Step 2: Start the Server
```bash
cd server
npm install
# Ensure mysql2 is installed (Lesson 9 uses mysql2)
npm install mysql2
npm run dev
```
This runs the Express server with `nodemon` on **http://localhost:3001**.

---

## Environment Variables

This project already uses `.env` files directly — no `.env.example` required.

### In `server/.env`
Update this file to match your local MySQL setup:
```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce
PORT=3001
```

### In `client/.env`
Make sure your frontend knows where to find your backend:
```env
REACT_APP_API_BASE_URL=http://localhost:3001
```

---

## Lesson 9 TODOs

You’ll complete these steps throughout the lesson. They mirror the sections outlined in your curriculum.

| Lesson Section | Goal |
|-----------------|------|
| **1.1 / 1.2** | Confirm folder structure and get both the client and server running. |
| **2.2** | Create a MySQL database and a `contact` table (either through the UI or using SQL). |
| **2.3** | Connect the backend to the database and add your `/submit-form` POST route. |
| **2.4** | Update the React contact form to send form data and show success/error messages. |

---

## Section 2.2 – Create the Database and Table

You may have already created this during setup. If not, here’s how:

### Option 1 – MySQL Workbench (UI)
1. Open MySQL Workbench.
2. Create a new schema named **`ecommerce`**.
3. In that schema, create a table named **`contact`** with the following columns:
   - id (INT, AUTO_INCREMENT, PRIMARY KEY)
   - First_Name (VARCHAR(100))
   - Last_Name (VARCHAR(100))
   - Email (VARCHAR(255))
   - Message (TEXT)

### Option 2 – Run SQL Commands
If you prefer, use this SQL to create everything manually:
```sql
CREATE DATABASE IF NOT EXISTS ecommerce;

USE ecommerce;

CREATE TABLE IF NOT EXISTS contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  First_Name VARCHAR(100) NOT NULL,
  Last_Name VARCHAR(100) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Section 2.3 – Connect to the Database and Add the POST Route

Open **`server/index.js`** and confirm it looks like this:

```js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2'); // ✅ use mysql2

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Connect to your MySQL database
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ✅ Handle POST request to save form data
app.post('/submit-form', (req, res) => {
  const { firstname, lastname, email, subject } = req.body;

  if (!firstname || !lastname || !email || !subject) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const sql = `
    INSERT INTO contact (First_Name, Last_Name, Email, Message)
    VALUES (?, ?, ?, ?)
  `;

  db.execute(sql, [firstname, lastname, email, subject], (err, results) => {
    if (err) {
      console.error('DB insert error:', err);
      return res.status(500).json({ message: 'Database error.' });
    }
    return res.status(201).json({ message: 'Form data inserted!', id: results.insertId });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
```

---

## Section 2.4 – Connect the React Contact Form

Open **`client/src/components/contactForm.jsx`**.  
This component already collects the form data in state and sends it to the server using Axios.

You can enhance it by adding simple feedback messages for users:

```jsx
const [status, setStatus] = useState({ type: null, message: '' });

const handleSubmit = (event) => {
  event.preventDefault();
  setStatus({ type: 'loading', message: 'Submitting…' });

  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/submit-form`, formData)
    .then(() => {
      setStatus({ type: 'success', message: 'Thanks! We received your message.' });
      setFormData({ firstname: '', lastname: '', email: '', subject: '' });
    })
    .catch(() => {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    });
};

{/* Show messages under the form */}
{status.type === 'loading' && <p>Submitting…</p>}
{status.type === 'success' && <p style={{ color: 'green' }}>{status.message}</p>}
{status.type === 'error' && <p style={{ color: 'red' }}>{status.message}</p>}
```

Then:
1. Start both apps (`npm start` in `client`, `npm run dev` in `server`).
2. Visit your contact page and submit the form.
3. Check MySQL → `ecommerce.contact` to confirm the data inserted.

---

## Lesson 9 Alignment

| Lesson Section | Description |
|----------------|--------------|
| **Lesson 9: Ecommerce Project Intro / Do Now** | Locate your FS1 project or use this template. |
| **Section 1.1: File Setup** | Set up `client` and `server` folders. |
| **Section 1.2: Moving Files** | Verify both run correctly. |
| **Section 2.1: Features that Need a Database** | Discuss which parts of the site will need a DB. |
| **Section 2.2: Contact Form** | Create `contact` table for form submissions. |
| **Section 2.3: Connect the Database** | Implement the backend logic with `mysql2`. |
| **Section 2.4: Submitting Data** | Send data from React form to server and confirm insertion. |

---

## Verification Steps

✅ `npm start` in `client` → loads on port 3000  
✅ `npm run dev` in `server` → runs on port 3001  
✅ Submitting form → row appears in MySQL Workbench  
✅ Console logs show successful insert message  

---

## Additional Resources
- [`docs/CRA_REFERENCE.md`](docs/CRA_REFERENCE.md) – Original Create React App documentation
- Check your LMS or instructor notes for any lesson-specific MySQL credentials or example screenshots.
