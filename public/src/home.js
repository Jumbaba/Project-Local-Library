function getTotalBooksCount(books) {
  return books.length;
};

function getTotalAccountsCount(accounts) {
  return accounts.length;
};

function getBooksBorrowedCount(books) {
  let currentlyBorrowed = 0;
  for (let book in books) {
    if (!books[book].borrows[0].returned) currentlyBorrowed++;
  };
  return currentlyBorrowed;
  
  //let array = books.filter(book => book.borrows[0].returned === false);
  //return array.length;
};

function _sortObjectByValues(obj){
  const keys = Object.keys(obj);
  //console.log(keys);
  return keys.sort((keyA, keyB) => {
    //console.log(obj[keyA],obj[keyB]);
    if (obj[keyA] > obj[keyB]){
      return -1;
    } else if (obj[keyB] > obj [keyA]){
      return 1;
    }
    return 0;
  })
};

function getMostCommonGenres(books) {
  let countObj = books.reduce((acc, {genre}) => {
    if (acc[genre]) {
      acc[genre]+=1;
    }
    else {
      acc[genre]=1;
    };
    return acc;
  },{});
  let sortedKeys = _sortObjectByValues(countObj);
  //console.log(sortedKeys);
  let sorted = sortedKeys.map((key)=> ({ name:key, count:countObj[key]})).slice(0,5);
  //console.log(sorted);
  return sorted;
};

function getMostPopularBooks(books) {
  let countObj = {};
  for (let book of books) {
    if (!countObj[book.title]) {
      countObj[book.title]=book.borrows.length;
    }
  }
  //console.log(countObj);
  let sortedKeys = _sortObjectByValues(countObj);
  //console.log(sortedKeys);
  let sorted = sortedKeys.map((key) => ({name:key, count:countObj[key]})).slice(0,5);
  //console.log(sorted);
  return sorted;
}

function getMostPopularAuthors(books, authors) {
  let count = books.reduce((acc, {authorId, borrows}) =>{
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length];
    }
    return acc;
  },{})
  console.log(count);
  for (let id in count) {
    const sum = count[id].reduce((a, b) => a + b);
    count[id] = sum;
  }
  const sorted = _sortObjectByValues(count);
  //console.log(sorted);
  return sorted.map((authorId) => {
    const {
      name:{first, last},
    } = authors.find(({id}) => id === Number(authorId))
    //console.log(count[authorId])
    const name = `${first} ${last}`;
    return {name, count: count[authorId]};
  }).slice(0, 5);

  // let countObj = {};
  // for (let book of books) {
  //   if (!countObj[book.authorId]) {
  //     countObj[book.authorId] = book.borrows.length;
  //   } else {
  //     countObj[book.authorId] += book.borrows.length;
  //   }
  // }
  // console.log(countObj);
  
  // let authorCountObj = [];
  // let authorObj = {};
  // for (let author in countObj) {
  //   authors.filter((author) => author.name)
  //   let name = `${authors.name.first} ${authors.name.last}`;

  //   console.log(name);
  //   authorObj['name'] = name;
  //   authorCountObj.push(authorObj);
  // }
  // console.log(authorCountObj);
  
  // {
  //   name: `${author.name.first} ${author.name.last}`,
  //   count: countObj[book.authorId],
  // }
  
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
