const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/books.json')).books;
fs.mkdirSync('src/data/books', {recursive: true});
data.forEach(book => {
  fs.writeFileSync('src/data/books/' + book.id + '.json', JSON.stringify(book, null, 2));
});
fs.unlinkSync('src/data/books.json');
console.log('Successfully split books.json into ' + data.length + ' files');
