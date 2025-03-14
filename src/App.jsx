import { useState } from "react";
import Navbar from "./assets/components/Navbar";
import SearchBar from "./assets/components/SearchBar";
import JobList from "./assets/components/JobList";
import JobCard from "./assets/components/JobCard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JobPostCreateForm from "./assets/components/JobPostCreateForm";
import AboutUS from "./assets/components/AboutUS";
import UserProfile from "./assets/components/UserProfile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navbar title="Ren app" />
        <SearchBar />
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <JobList />
            </Route>
            <Route exact path="/create">
              <JobPostCreateForm />
            </Route>
            <Route exact path="/about">
              <AboutUS />
            </Route>
            <Route exact path="/profile">
              <UserProfile />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
