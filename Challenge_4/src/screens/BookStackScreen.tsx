import { useState } from "react";
import { Stack } from "../structures/Stack";
import type { Book } from "../data/bookData";
import { MOCK_BOOKS } from "../data/bookData";

const bookStack = new Stack<Book>();
MOCK_BOOKS.forEach((book) => bookStack.push(book));

export default function BookStackScreen() {
    const [books, setBooks] = useState<Book[]>([...bookStack.print()]);
    const [name, setName] = useState("");
    const [isbn, setIsbn] = useState("");
    const [author, setAuthor] = useState("");
    const [editorial, setEditorial] = useState("");

    const handleAdd = () => {
        if (!name || !isbn || !author || !editorial) {
            alert("Please fill all fields");
            return;
        }

        const newBook: Book = { name, isbn, author, editorial };
        bookStack.push(newBook);
        setBooks([...bookStack.print()]);
        setName("");
        setIsbn("");
        setAuthor("");
        setEditorial("");
};

    const handlePop = () => {
        bookStack.pop();
        setBooks([...bookStack.print()]);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Challenge 04 - Book Stack</h1>
            <p>Total books: {bookStack.size()} | Empty: {bookStack.isEmpty() ? "Yes" : "No"}</p>

            <div style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "20px", borderRadius: "8px" }}>
                <h2>Add a new book</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input
                        placeholder="Book name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        placeholder="ISBN"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        style={inputStyle}
                    />
                    <input
                        placeholder="Editorial"
                        value={editorial}
                        onChange={(e) => setEditorial(e.target.value)}
                        style={inputStyle}
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={handleAdd} style={btnStyle}>Push to Stack</button>
                        <button onClick={handlePop} style={{ ...btnStyle, backgroundColor: "#e74c3c" }}>
                        Pop from Stack
                        </button>
                    </div>
                </div>
            </div>

        <h2>Books Stack (TOP → BOTTOM)</h2>
        {books.length === 0 ? (
            <p>The stack is empty</p>
        ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f0f0f0" }}>
                    <th style={thStyle}>#</th>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>ISBN</th>
                    <th style={thStyle}>Author</th>
                    <th style={thStyle}>Editorial</th>
                </tr>
            </thead>
            <tbody>
                {[...books].reverse().map((book, index) => (
                    <tr key={index} style={{ backgroundColor: index === 0 ? "#d4edda" : "white" }}>
                        <td style={tdStyle}>{index === 0 ? "TOP" : index + 1}</td>
                        <td style={tdStyle}>{book.name}</td>
                        <td style={tdStyle}>{book.isbn}</td>
                        <td style={tdStyle}>{book.author}</td>
                        <td style={tdStyle}>{book.editorial}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )}
    </div>
    );
}

const inputStyle: React.CSSProperties = {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
};

const btnStyle: React.CSSProperties = {
    padding: "8px 16px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
};

const thStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "left",
};

const tdStyle: React.CSSProperties = {
    border: "1px solid #ccc",
    padding: "8px",
};