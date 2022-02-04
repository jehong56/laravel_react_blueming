import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

function TestPage2() {
    console.log("aa");
    return (
        <div>
            <div>
                TestPage2
                <Link to="/test1"> Go test1</Link>
                <br />
                <Link to="/test2"> Go test2</Link>
                <br />
                <Link to="/"> Go Index</Link>
                <br />
            </div>
        </div>
    );
}
export default TestPage2;
