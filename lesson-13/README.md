# Lesson 13

## Getting Started: Syncing and Environment Setup

1. **Sync your fork with the upstream repository:**
   - Open a terminal in your Codespace or local IDE.
   - Run:
     ```sh
     git pull upstream main
     ```
   - Resolve any merge conflicts if prompted.

2. **Create `.env` files for the apps:**
   - For the client app:
     - Go to `lesson-13/app/client/` and create a file named `.env` with:
       ```env
       REACT_APP_API_BASE_URL=http://localhost:3001
       ```
   - For the server app:
     - Go to `lesson-13/app/server/` and create a file named `.env` with:
       ```env
       # Environment configuration for the Express server
       # update this file by providing your own database connection details (password and db_name).
       DB_HOST=127.0.0.1
       DB_USER=root
       DB_PASSWORD=password
       DB_NAME=ecommerce
       PORT=3001
       ```

---

## IDE Steps for Lesson 13: Adding Search Functionality

1. **Implement searchTerm state in App.js:**
   - Import `useState` from React.
   - Add:
     ```js
     const [searchTerm, setSearchTerm] = useState("");
     ```
   - Pass `searchTerm` and `setSearchTerm` as props to `NavBar` and `Shopping` components.

2. **Pass searchTerm and setSearchTerm as props:**
   - In your App.js:
     ```js
     <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
     <Route path="/shopping" element={<Shopping searchTerm={searchTerm} />} />
     ```

3. **Filter products in Shopping.js:**
   - Add `searchTerm` to Shopping's props.
   - Create a `filteredProducts` state and update it with a `useEffect`:
     ```js
     useEffect(() => {
       setFilteredProducts(
         products.filter((product) =>
           product.name.toLowerCase().includes(searchTerm.toLowerCase()),
         ),
       );
     }, [products, searchTerm]);
     ```
   - Render `filteredProducts` instead of `products` in your product list.

4. **Update the server endpoint for search:**
   - In `server/index.js`, update the `/api/ecommerce/products` endpoint:
     ```js
     app.get("/api/ecommerce/products", (req, res) => {
       const searchTerm = req.query.search || "";
       const sql = `SELECT * FROM products WHERE name LIKE ?`;
       const values = [`%${searchTerm}%`];
       db.query(sql, values, (err, result) => {
         res.setHeader("Content-Type", "application/json");
         res.json(result);
       });
     });
     ```

5. **Test your search bar:**
   - Start both the client and server apps.
   - Try searching for products using the search bar and verify the results update as expected.
