import { useEffect, useRef, useState } from "react";
import { LinkedList } from "../data-structures/LinkedList";

function LinkedListPage() {
  const listRef = useRef(new LinkedList<string>());
  const [currentSong, setCurrentSong] = useState<string | null>(null);

  useEffect(() => {
    listRef.current.add("Song 1 - Imagine");
    listRef.current.add("Song 2 - Bohemian Rhapsody");
    listRef.current.add("Song 3 - Billie Jean");

    listRef.current.reset();
    setCurrentSong(listRef.current.getCurrent());
  }, []);

  const handleNext = () => {
    const nextSong = listRef.current.next();
    if (nextSong) setCurrentSong(nextSong);
  };

  return (
    <div>
      <h2>Linked List - Music Player</h2>
      <h3>Now Playing: {currentSong}</h3>
      <button onClick={handleNext}>Next Song</button>
    </div>
  );
}

export default LinkedListPage;