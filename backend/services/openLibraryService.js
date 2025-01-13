const axios = require("axios");

const BASE_URL = "https://openlibrary.org/api";

async function searchBookByISBN(isbn) {
  const url = `${BASE_URL}/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
  const response = await axios.get(url);

  const bookKey = `ISBN:${isbn}`;
  if (response.data && response.data[bookKey]) {
    const { title, authors } = response.data[bookKey];
    return {
      title,
      author: authors.map((author) => author.name).join(", "),
      isbn,
    };
  }
  return null;
}

module.exports = {
  searchBookByISBN,
};
