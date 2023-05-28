// const oscar = require("./new_oscar.json");
// const db = require("./db");

// const nominees = oscar.flatMap((category) => {
//   return category.nominees.map((nominee) => {
//     const nom = nominee.title;
//     const img = nominee.imageUrl;
//     return { nom, img };
//   });
// });
// console.log(nominees);
// const uniqueNominees = nominees.filter(function (a) {
//   return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
// }, Object.create(null));
// console.log(nominees.length, uniqueNominees.length);

// console.log(uniqueNominees.length);
// const insertingNominees = () =>
//   uniqueNominees.forEach((nominee) => {
//     return db.query(
//       `INSERT INTO nominees (nominee, img)
//        VALUES("${nominee.nom}" , "${nominee.img}")`
//     );
//   });

// insertingNominees();
// console.log("Acabou");
// console.log(db.query("SELECT * FROM nominees"));
const votes = [
  {
    nominee: "Austin Butler",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Austin_Butler_2019_by_Glenn_Francis.jpg/220px-Austin_Butler_2019_by_Glenn_Francis.jpg",
    category: "Actor in a Leading Role",
    dataHora: "1685214295430",
  },
  {
    nominee: "Colin Farrell",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/BansheesBFI131022_%2821_of_22%29_%2852447275762%29_%28cropped%29.jpg/220px-BansheesBFI131022_%2821_of_22%29_%2852447275762%29_%28cropped%29.jpg",
    category: "Actor in a Leading Role",
    dataHora: "1685214296054",
  },
  {
    nominee: "Brendan Fraser",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Brendan_Fraser_October_2022.jpg/220px-Brendan_Fraser_October_2022.jpg",
    category: "Actor in a Leading Role",
    dataHora: "1685214296595",
  },
  {
    nominee: "Paul Mescal",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Paul_Mescal_44.MVFF.jpg/220px-Paul_Mescal_44.MVFF.jpg",
    category: "Actor in a Leading Role",
    dataHora: "1685214297414",
  },
  {
    nominee: "Bill Nighy",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Bill_Nighy-3007.jpg/220px-Bill_Nighy-3007.jpg",
    category: "Actor in a Leading Role",
    dataHora: "1685214298081",
  },
  {
    nominee: "Brendan Gleeson",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Brendan_Gleeson_at_the_Moet_BIFA_2014.jpg/220px-Brendan_Gleeson_at_the_Moet_BIFA_2014.jpg",
    category: "Actor in a Supporting Role",
    dataHora: "1685214299941",
  },
  {
    nominee: "Brian Tyree Henry",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Brian_Tyree_Henry_by_Gage_Skidmore.jpg/220px-Brian_Tyree_Henry_by_Gage_Skidmore.jpg",
    category: "Actor in a Supporting Role",
    dataHora: "1685214300371",
  },
  {
    nominee: "Barry Keoghan",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Barry_Keoghan_at_Dunkirk_World_Premiere.jpg/220px-Barry_Keoghan_at_Dunkirk_World_Premiere.jpg",
    category: "Actor in a Supporting Role",
    dataHora: "1685214303473",
  },
  {
    nominee: "Ke Huy Quan",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ke_Huy_Quan_%2843865682592%29.jpg/220px-Ke_Huy_Quan_%2843865682592%29.jpg",
    category: "Actor in a Supporting Role",
    dataHora: "1685214305429",
  },
];
//how to get the latest vote for each category and return the nominee and img for each category
function getMostRecentObjects(votes) {
  const categories = {};

  for (const vote of votes) {
    const category = vote.category;

    if (
      !categories[category] ||
      categories[category].dataHora < vote.dataHora
    ) {
      categories[category] = vote;
    }
  }

  return Object.values(categories);
}

const mostRecentObjects = getMostRecentObjects(votes);
console.log(mostRecentObjects);
// function latestVoteForEachCategory(votes) {
//   const votesPerCategory = votes.reduce(
//     (acc, vote) => ({
//       ...acc,
//       [vote.category]: vote.nominee,
//     }),
//     {}
//   );
//   return votesPerCategory;
// }

// function latestVote(votes) {
//   const validVotes = [];
//   votes.forEach((vote, i) => {
//     console.log("antes do 1º if");
//     if (validVotes.length === 0) {
//       return validVotes.push(vote);
//     } else {
//       validVotes.forEach((validVote, j) => {
//         let check = false;
//         if (validVote.category === vote.category) {
//           console.log("dentro do 1º if");
//           check = true;
//           return (validVotes[j] = votes[i]), check;
//         }
//         console.log(check);
//         if (check === false) {
//           console.log("tou no check");
//           return validVotes.push(vote);
//         }
//       });
//     }
//   });
//   return new Set(validVotes);
// }
// console.log(latestVote(votes));
