const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();

const PORT = 3002;
app.use(cors());
app.use(express.json());

const oscar = require('./new_oscar.json')

const answer = {
  "Actor in a Leading Role": 'Brendan Fraser', "Actor in a Supporting Role": 'Ke Huy Quan', "Actress in a Leading Role": 'Michelle Yeoh', "Actress in a Supporting Role": 'Jamie Lee Curtis', "Animated Feature Film": "Guillermo del Toro's Pinocchio", "Cinematography": 'All Quiet on the Western Front', "Costume Design": 'Black Panther: Wakanda Forever', "Directing": 'Everything Everywhere All at Once', "Documentary Feature Film": 'Navalny', "Documentary Short Film": 'The Elephant Whisperers', "Film Editing": 'Everything Everywhere All at Once', "International Feature Film": 'All Quiet on the Western Front', "Makeup and Hairstyling": 'The Whale', "Music (Original Score)": 'All Quiet on the Western Front', "Music (Original Song)": 'Naatu Naatu', "Best Picture": 'Everything Everywhere All at Once', "Production Design": 'All Quiet on the Western Front', "Short Film (Animated)": 'The Boy, the Mole, the Fox and the Horse', "Short Film (Live Action)": 'An Irish Goodbye', "Sound": 'Top Gun: Maverick', "Visual Effects": 'Avatar: The Way of Water', "Writing (Adapted Screenplay)": 'Women Talking', "Writing (Original Screenplay)": 'Everything Everywhere All at Once'
}


//teste 
app.get('/', (req, res) => {
  res.send('Funcionando OK')
})

//Fixing CORS
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   next();
// });

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
// app.post("/api/create", (req, res) => {
//   const user = req.body.user;
//   const category = req.body.category;
//   const nominee = req.body.nominee;
//   const img = req.body.imgUrl
//   const userName = req.body.userName



//   console.log('função save: req.body:')
//   console.log(req.body)
//   console.log('função save: user, category, nominee: ')
//   console.log(user, category, nominee, img, userName);

//   //check if it is a valid vote
//   let validation = false

//   oscar.map(cat => {
//     if (cat.name === category) {
//       cat.nominees.map(nom => {
//         if (nom.title === nominee) {
//           validation = true
//         }
//       })
//     }
//   })

//   //if validation = true > make the vote.
//   if (validation === true) {

//     db.query(`SELECT * FROM votes where user = '${user}'`, (err, result) => {
//       let test = false
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Map query results')
//         result.map(el => {
//           if (el.category === category) {
//             test = true
//             db.query(
//               `UPDATE votes
//       set user = ?,category = ?, nominee = ?, img = ?, userName = ? WHERE id = ?`,
//               [user, category, nominee, img, userName, el.id],
//               (err, result) => {
//                 if (err) {
//                   console.log(err);
//                 }
//                 console.log(result);

//               }
//             );
//           }
//         })
//       } if (test === false) {
//         db.query(
//           `INSERT INTO votes (user, category, nominee, img, userName) VALUES (?,?,?,?,?)`,
//           [user, category, nominee, img, userName],
//           (err, result) => {
//             if (err) {
//               console.log(err);
//             }

//             console.log('Função Save result:')
//             console.log(result);
//           }
//         );

//       }
//       res.status(200).send("OK");
//       //console.log('Função getVotes result:')
//       //console.log(result);
//       // res.send(result);
//     });
//   } else {
//     res.status(404).send('VOTO INVÁLIDO')
//   }



// });
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
    const user = vote.userName
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
