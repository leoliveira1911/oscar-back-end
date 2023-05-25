const oscar = require("./new_oscar.json");
const db = require("./db")

const categories = oscar.map(category => {
    return category.name
})

const insertingCategories = () => categories.forEach(category => {
    return db.query(`INSERT INTO category (category) VALUES ('${category}')`)
})


insertingCategories()

