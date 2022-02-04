import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

function Index() {
    return (
        <div className="container section-box">
            <div className="section-title">Index</div>
            <div>
                <Link to="/test1"> Go test1</Link>
                <br />
                <Link to="/test2"> Go test2</Link>
                <br />
                <Link to="/"> Go Index</Link>
                <br />
                <Link to="/blueming"> Go 블루밍</Link>
                <br />
            </div>
        </div>
    );
}
export default Index;
