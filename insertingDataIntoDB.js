const oscar = require("./new_oscar.json");
const db = require("./db");

const nominees = oscar.flatMap((category) => {
  return category.nominees.map((nominee) => {
    const nom = nominee.title;
    const img = nominee.imageUrl;
    return { nom, img };
  });
});
console.log(nominees);
const uniqueNominees = nominees.filter(function (a) {
  return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
}, Object.create(null));
console.log(nominees.length, uniqueNominees.length);

console.log(uniqueNominees.length);
const insertingNominees = () =>
  uniqueNominees.forEach((nominee) => {
    return db.query(
      `INSERT INTO nominees (nominee, img)
       VALUES("${nominee.nom}" , "${nominee.img}")`
    );
  });

//insertingNominees();

const categories = oscar.map((category) => {
  return category.name;
});

const insertingCategories = () =>
  categories.map((category) => {
    return db.query(
      `INSERT INTO category (category)
     VALUES("${category}")`
    );
  });
insertingCategories();
console.log(categories);
console.log("Acabou");
console.log(db.query("SELECT * FROM nominees"));
