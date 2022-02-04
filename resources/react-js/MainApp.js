import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Index from "./Pages/Index";
import TestPage from "./Pages/TestPage";
import TestPage2 from "./Pages/TestPage2";
import Blueming from "./Pages/Blueming";
import Friend from "./Pages/Friend";
function MainApp() {
    console.log("aa");
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Index />} />
                <Route path="test1" element={<TestPage />} />
                <Route path="test2" element={<TestPage2 />} />
                <Route path="blueming" element={<Blueming />} />
                <Route path="friend" element={<Friend />} />
            </Routes>
        </BrowserRouter>
    );
}

if (document.getElementById("app-root")) {
    ReactDOM.render(<MainApp />, document.getElementById("app-root"));
}
