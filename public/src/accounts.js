function findAccountById(accounts, id) {
  let found = accounts.find((account) => account.id === id);
  return found;
};

function sortAccountsByLastName(accounts) {
  let sorted = accounts.sort((account1, account2) => account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1);
  return sorted;
};

function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;
  for (let book of books) {
    let arrayOfID = book.borrows.map((borrow) => borrow.id);
    for (i = 0; i < arrayOfID.length; i++) {
      if (arrayOfID[i] === account.id) totalBorrows++;
    };
  };
  return totalBorrows;
};

function isBookReturned(book) {
  return book.borrows.returned;
};



function getBooksPossessedByAccount(account, books, authors) {
  // checks books that are checked out by account.ID
  // attach author key to book in an object 
  // return object
    
  //   return bookArray + book;
  let bookCheckouts = books.filter(book => book.borrows[0].id === account.id);
  for (let i=0; i < bookCheckouts.length; i++) {
    bookCheckouts[i].author = authors.find(author => bookCheckouts[i].authorId === author.id);
  }
  return bookCheckouts;

}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
