import { useState } from "react";
import "./App.scss";
import { ImportWizard } from "./ImportWizard";

function App() {
    return (
        <div className="App">
            <h1>hello, let's sort some cost!</h1>
            <ImportWizard />
        </div>
    );
}

export default App;
