import path from "path";
import express from "express";
import { shortenUrl } from "./router/shortener.routes.js";

const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

// app.get("/student", (req, res) => {
//   const users = [
//     {
//       id: 1,
//       name: "Alice Johnson",
//       email: "alice@example.com",
//       age: 25,
//       city: "New York",
//     },
//     {
//       id: 2,
//       name: "Bob Smith",
//       email: "bob@example.com",
//       age: 30,
//       city: "Los Angeles",
//     },
//     {
//       id: 3,
//       name: "Charlie Brown",
//       email: "charlie@example.com",
//       age: 28,
//       city: "Chicago",
//     },
//     {
//       id: 4,
//       name: "David Wilson",
//       email: "david@example.com",
//       age: 35,
//       city: "Houston",
//     },
//     {
//       id: 5,
//       name: "Emma Davis",
//       email: "emma@example.com",
//       age: 22,
//       city: "Seattle",
//     },
//   ];
//   res.render("report", { users });
// });

// router
app.use(shortenUrl);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
