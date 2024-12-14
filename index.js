import express from "express";
import bodyParser from "body-parser";
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Array to store blogs
let blogs = [];

// **1. Display all blogs on the homepage**
app.get('/', (req, res) => {
  res.render('display', { blogs });
});

// **2. Add a new blog**
app.post('/add', (req, res) => {
  const newBlog = req.body.newBlog; // Blog content from the form
  blogs.push(newBlog); // Add new blog to the array
  res.redirect('/'); // Redirect back to the homepage
});

// **3. Render the edit page for a specific blog**
app.get('/edit/:id', (req, res) => {
  const id = req.params.id; // Extract blog index from URL
  const blog = blogs[id]; // Get the specific blog from the array
  res.render('edit', { blog, id }); // Render edit.ejs with blog data
});

// **4. Update the blog**
app.post('/update/:id', (req, res) => {
  const id = req.params.id; // Extract blog index from URL
  blogs[id] = req.body.updatedBlog; // Update the blog content in the array
  res.redirect('/'); // Redirect back to the homepage
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
