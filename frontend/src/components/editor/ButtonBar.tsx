import * as React from "react";
import { Link } from "react-router-dom";

const ButtonBar = (): JSX.Element => (
  <div className="buttonBar">
    <Link to="/">Back</Link>
    <button>🗝 Save</button>
  </div>
);

export default ButtonBar;
