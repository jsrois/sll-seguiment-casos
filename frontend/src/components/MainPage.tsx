import * as React from "react";
import { Link } from "react-router-dom";

const MainPage = (): JSX.Element => (
  <div>
    <Link to="/editor">
      <button>New minutes</button>
    </Link>
    <Link to="/browser">
      <button>Browse...</button>
    </Link>
  </div>
);

export default MainPage;
