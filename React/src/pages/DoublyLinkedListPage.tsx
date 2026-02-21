import { useEffect, useRef, useState } from "react";
import { DoublyLinkedList } from "../data-structures/DoublyLinkedList";

function DoublyLinkedListPage() {
  const historyRef = useRef(new DoublyLinkedList<string>());
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  useEffect(() => {
    historyRef.current.visit("google.com");
    historyRef.current.visit("youtube.com");
    historyRef.current.visit("github.com");

    setCurrentPage(historyRef.current.getCurrent());
  }, []);

  const handleBack = () => {
    const page = historyRef.current.back();
    if (page) setCurrentPage(page);
  };

  const handleForward = () => {
    const page = historyRef.current.forward();
    if (page) setCurrentPage(page);
  };

  return (
    <div>
      <h2>Doubly Linked List - Browser History</h2>
      <h3>Current Page: {currentPage}</h3>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleForward}>Forward</button>
    </div>
  );
}

export default DoublyLinkedListPage;