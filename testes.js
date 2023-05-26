const oscar = require("./new_oscar.json");
const db = require("./db");

const nominees = oscar.flatMap((category) => {
  return category.nominees.map((nominee) => {
    return nominee.title;
  });
});

const uniqueNominees = [...new Set(nominees)];

console.log(uniqueNominees);
console.log(uniqueNominees.length);
const insertingNominees = () =>
  uniqueNominees.forEach((nominee) => {
    return db.query(
      `INSERT INTO nominees (nominee) 
       VALUES("${nominee}")`
    );
  });

insertingNominees();
// console.log(db.query("SELECT * FROM nominees"));
