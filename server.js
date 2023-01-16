const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json());

//teste vercel
app.get('/', (req, res) => {
  res.send('Funcionando OK')
})


// Route to get all tasks
app.get("/api/get", (req, res) => {
  console.log('função getVotes')
  console.log('user: ')
  const user = req.query.user
  console.log(user)
  db.query(`SELECT * FROM votes where user = '${user}'`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('Função getVotes result:')
    console.log(result);
    res.send(result);
  });
});

// Route for creating the task
app.post("/api/create", (req, res) => {
  const user = req.body.user;
  const category = req.body.category;
  const nominee = req.body.nominee;

  console.log('função save: req.body:')
  console.log(req.body)
  console.log('função save: user, category, nominee: ')
  console.log(user, category, nominee);

  db.query(`SELECT * FROM votes where user = '${user}'`, (err, result) => {
    let test = false
    if (err) {
      console.log(err);
    } else {
      console.log('Map query results')
      result.map(el => {
        if (el.category === category) {
          test = true
          db.query(
            `UPDATE votes
    set user = ?,category = ?, nominee = ? WHERE id = ?`,
            [user, category, nominee, el.id],
            (err, result) => {
              if (err) {
                console.log(err);
              }
              console.log(result);

            }
          );
        }
      })
    } if (test === false) {
      db.query(
        `INSERT INTO votes (user, category, nominee) VALUES (?,?,?)`,
        [user, category, nominee],
        (err, result) => {
          if (err) {
            console.log(err);
          }

          console.log('Função Save result:')
          console.log(result);
        }
      );

    }
    res.status(200).send("OK");
    //console.log('Função getVotes result:')
    //console.log(result);
    // res.send(result);
  });

});

// //Route to update a post
// app.post("/api/update", (req, res) => {
//   const id = req.body.id;
//   const name = req.body.name;
//   const description = req.body.description;
//   const deadline = req.body.deadline;
//   const concluded = req.body.concluded;

//   console.log(name, description, deadline, concluded);

//   db.query(
//     `UPDATE tasks
//     set name = ?,description = ?, deadline = ?, concluded=?
//     WHERE id = ?`,
//     [name, description, deadline, concluded, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log(result);
//       res.status(200).send("OK");
//     }
//   );
// });

// Route to delete a post

// app.delete("/api/delete/:id", (req, res) => {
//   const id = req.params.id;
//   console.log("O ID É:" + id);
//   db.query(`DELETE FROM tasks WHERE id=?`, id, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     res.status(200).send("OK");
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
