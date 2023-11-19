import "./App.scss";
import { ImportWizard } from "./import-wizard/ImportWizard";
import { RecoilRoot } from "recoil";

function App() {
    return (
        <RecoilRoot>
            <div className="App">
                <h1>hello, let's sort some cost!</h1>
                <ImportWizard />
            </div>
        </RecoilRoot>
    );
}

export default App;
