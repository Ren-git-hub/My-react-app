import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import SearchBar from "./assets/components/SearchBar";
import JobList from "./assets/components/JobList";
import JobPostCreateForm from "./assets/components/JobPostCreateForm";
import AboutUS from "./assets/components/AboutUS";
import UserProfile from "./assets/components/UserProfile";
import JobPostEditForm from "./assets/components/JobPostEditForm";

function App() {
  return (
    <Router>
      <Navbar title="Husband 4 Hire" />
      <div className="container">
        <SearchBar />
        <Switch>
          <Route exact path="/" component={JobList} />
          <Route exact path="/create" component={JobPostCreateForm} />
          <Route exact path="/about" component={AboutUS} />
          <Route exact path="/profile" component={UserProfile} />
          <Route exact path="/edit/:id" component={JobPostEditForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
