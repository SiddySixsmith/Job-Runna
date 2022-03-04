import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./styles/App.css";
import Home from "./pages/home";
import Auth from "./utils/auth";
import Login from "./pages/login";
import Signup from "./pages/signup";
import StockList from "./components/stockList";
import Footer from "./components/footer";
import JobList from "./components/jobList";
import SingleJob from "./components/singleJob";
import SingleStock from "./components/singleStock";

const httpLink = createHttpLink({
  // production connection
  uri: "https://job-runna.herokuapp.com/graphql",
  // Development connection
  // uri: "http://localhost:3007/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const HandleNav = () => {
  if (Auth.loggedIn()) {
    return <Footer />;
  }
  return null;
};

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  if (!Auth.loggedIn) {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </ApolloProvider>
    );
  }
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/stock" element={<StockList />} />
            <Route path="/jobs/:_id" element={<SingleJob />} />
            <Route path="/stocks/:_id" element={<SingleStock />} />
          </Routes>
        </div>
        <HandleNav />
      </Router>
    </ApolloProvider>
  );
}

export default App;
