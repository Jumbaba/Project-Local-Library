function findAuthorById(authors, id) {
  let found = authors.find((author) => author.id === id);
  return found;
}

function findBookById(books, id) {
  let found = books.find((book) => book.id === id);
  return found;
}

function partitionBooksByBorrowedStatus(books) {
  let array1 = books.filter(book => book.borrows[0].returned === false); 
  let array2 = books.filter(book => book.borrows[0].returned === true); 
  return [array1, array2]; 
}

function getBorrowersForBook(book, accounts) {
  let finalArray =[];
  let bookBorrow = book.borrows;
  for (let i=0; i < bookBorrow.length; i++){
    let user = accounts.find(user => user.id === bookBorrow[i].id);
    let borrowObject = {...bookBorrow[i],...user};
    finalArray.push(borrowObject);
  }
  //console.log(finalArray);
  return finalArray.slice(0,10);
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
