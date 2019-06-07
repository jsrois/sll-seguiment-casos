import axios from "axios";
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { clearSession, getAuthHeaders, isSessionValid, setSession } from "../session";
import "../styles/App.css";
import MainPage from "./MainPage";
import Editor from "./editor/Editor";

export interface AppState {
  email: string;
  password: string;
  isRequesting: boolean;
  isLoggedIn: boolean;
  data: App.Item[];
  error: string;
}

class App extends React.Component<{}, AppState> {
  public state = {
    email: "",
    password: "",
    isRequesting: false,
    isLoggedIn: false,
    data: [],
    error: "",
  };

  public componentDidMount() {
    this.setState({ isLoggedIn: isSessionValid() });
  }

  public render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Ens Quedem!</h1>
          </header>
          <Route exact={true} path="/" component={MainPage} />
          <Route path="/editor" component={Editor} />
        </div>
      </Router>
    );
  }

  private handleLogin = async (): Promise<void> => {
    const { email, password } = this.state;
    try {
      this.setState({ error: "" });
      this.setState({ isRequesting: true });
      const response = await axios.post<{ token: string; expiry: string }>("/api/users/login", { email, password });
      const { token, expiry } = response.data;
      setSession(token, expiry);
      this.setState({ isLoggedIn: true });
    } catch (error) {
      this.setState({ error: "Something went wrong" });
    } finally {
      this.setState({ isRequesting: false });
    }
  };

  private logout = (): void => {
    clearSession();
    this.setState({ isLoggedIn: false });
  };

  private getTestData = async (): Promise<void> => {
    try {
      this.setState({ error: "" });
      const response = await axios.get<App.Item[]>("/api/items", { headers: getAuthHeaders() });
      this.setState({ data: response.data });
    } catch (error) {
      this.setState({ error: "Something went wrong" });
    } finally {
      this.setState({ isRequesting: false });
    }
  };
}

export default App;
