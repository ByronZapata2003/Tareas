export interface Book {
    name: string;
    isbn: string;
    author: string;
    editorial: string;
}

export const MOCK_BOOKS: Book[] = [
    { name: "Clean Code", isbn: "978-0132350884", author: "Robert C. Martin", editorial: "Prentice Hall" },
    { name: "The Pragmatic Programmer", isbn: "978-0135957059", author: "David Thomas", editorial: "Addison-Wesley" },
    { name: "Design Patterns", isbn: "978-0201633610", author: "Gang of Four", editorial: "Addison-Wesley" },
];