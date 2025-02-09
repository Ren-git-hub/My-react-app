import { useState } from "react";
import Navbar from "./assets/components/Navbar";
import SearchBar from "./assets/components/SearchBar";
import JobList from "./assets/components/JobList";
import JobCard from "./assets/components/JobCard";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar title="Ren app" />
      <SearchBar />
      <JobList />
    </>
  );
}

export default App;
