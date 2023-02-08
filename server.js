const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();

const PORT = 3002;
app.use(express.json());

const answer = { "Melhor Ator": 'Leonardo di Caprio', "Melhor Filme": 'Titanic', "Melhor Canção Original": 'Música4', "Melhor Efeitos Visuais": 'Música4', "Melhor Direção": 'Titanic' }


//teste vercel
app.get('/', (req, res) => {
  res.send('Funcionando OK')
})

//Fixing CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader('Access-Control-Allow-Credentials', true);
  app.use(cors());
  next();
});

// Route to get all votes OF ONE USER!
app.get("/api/getVotes", (req, res) => {
  console.log('função getVotes')
  console.log('user: ')
  const user = req.query.user
  console.log(user)
  db.query(`SELECT * FROM votes where user = '${user}'`, (err, result) => {
    if (err) {
      res.send(err);
    }
    console.log('Função getVotes result:')
    console.log(result);
    res.send(result);
  });
});

// Route for creating the vote
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
//RANKING:

//get all the  votes:
async function getAllTheVotes() {
  return new Promise(resolve => {

    db.query(`SELECT * FROM votes`, (err, result) => {
      if (err) {
        return err;
      }
      resolve(result);
    })
  })

}

function countCorrectVotes(votes, answer) {
  return Object.values(votes.reduce((acc, vote) => {
    const user = vote.user
    const category = vote.category
    const nominee = vote.nominee

    if (acc[user]) {
      const correct = answer[category] === nominee ? acc[user].correct + 1 : acc[user].correct
      acc[user] = { user: user, correct }
      return acc
    } else {
      const correct = answer[category] === nominee ? 1 : 0
      acc[user] = { user: user, correct }
      console.log(acc)
      return acc
    }
  }, {}))
}

function orderVotes(votes) {

  const desc = (o1, o2) => o2.correct - o1.correct
  return votes.sort(desc)
}




app.get("/api/getRanking", (req, res) => {
  getAllTheVotes()
    .then(votes => countCorrectVotes(votes, answer))
    .then(countedVotes => orderVotes(countedVotes))
    .then(orderVotes => res.send(orderVotes))

});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
