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
  uri: "http://localhost:3001/graphql",
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

const requireAuth = (nextState, replace) => {
  if (Auth.loggedIn())
    // pseudocode - SYNCHRONOUS function (cannot be async without extra callback parameter to this function)
    replace("/login");
};

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
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} onEnter={requireAuth} />
            <Route path="/" element={<Login />} />
            <Route path="/jobs" element={<JobList />} onEnter={requireAuth} />
            <Route
              path="/stock"
              element={<StockList />}
              onEnter={requireAuth}
            />
            <Route
              path="/jobs/:_id"
              element={<SingleJob />}
              onEnter={requireAuth}
            />
            <Route
              path="/stocks/:_id"
              element={<SingleStock />}
              onEnter={requireAuth}
            />
          </Routes>
        </div>
        <HandleNav />
      </Router>
    </ApolloProvider>
  );
}

export default App;
