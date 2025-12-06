// 1)

function paramsToBook(name, date, genre, author) {
  return {
    name: name,
    date: date,
    genre: genre,
    author: author,
  };
}

let book = paramsToBook("a", new Date("1996-06-07"), "Drama", {
  fn: "Dan",
  ln: "Hof",
  age: 13,
});
// console.log(book);

// 2)

function printBook(book) {
  console.log(`Name:${book["name"]}, \n
  Date: ${book["date"]}, \n
  Genre: ${book["genre"]}, \n
  Author Name: ${book["author"]["fn"]} ${book["author"]["ln"]}, \n
  Author Age: ${book["author"]["age"]}.`);
}

// printBook(book);

// 3)

function changeName(book, name) {
  book.name = name;
}

// 4)

function changeDate(book, date) {
  book.date = date;
  printBook(book);
}

// 5)

function changeGenre(book, genre) {
  book.genre = genre;
}

// 6)

function changeAuthor(book, author) {
  if (author.age >= 15 && author.age <= 80) {
    book.author = author;
  } else {
    console.log("Invalid input for the year of birth.");
  }
}

// 7)

const library = {};

// 8)

function addBookToLibrary(library ,book) {
  if (!library[book.name]) {
    library[book.name] = book;
  } else {
    console.log("book already exist");
  }
}



// 9)

function manageLibrary(lib) {
  const booksToAdd = [
    {
      name: "harry potter 1",
      date: "01-02-2008",
      genre: "action",
      author: {
        fn: "j.k",
        ln: "Rolling",
        age: "34",
      },
    },
    {
      name: "harry potter 2",
      date: "01-02-2011",
      genre: "action",
      author: {
        fn: "j.k",
        ln: "Rolling",
        age: "34",
      },
    },
    {
      name: "harry potter 3",
      date: "01-02-2013",
      genre: "action",
      author: {
        fn: "j.k",
        ln: "Rolling",
        age: "34",
      },
    },
    {
      name: "harry potter 4",
      date: "01-02-2017",
      genre: "action",
      author: {
        fn: "j.k",
        ln: "Rolling",
        age: "34",
      },
    },
  ];

  booksToAdd.forEach(book => {
    lib[book.name] = book;
  });

  console.log(Object.entries(lib));
}

manageLibrary(library)

