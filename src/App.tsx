import { useState } from "react";
import "./App.css";
import { Demos } from "./types";
import { Select } from "antd";
import { AsyncTransition } from "./components/AsyncTransition";
import { map } from "lodash-es";
import ReactUse from "./components/ReactUse";
import ActionState from "./components/ActionState";
import Optimistic from "./components/Optimistic";
import Optimistic2 from "./components/Optimistic2";

function App() {
  const [demoKey, setDemoKey] = useState(Demos.ASYNC_TRANSITION);

  const options = map(Demos, (val) => ({ label: val, value: val }));

  const renderContent = () => {
    switch (demoKey) {
      case Demos.ASYNC_TRANSITION:
        return <AsyncTransition />;
      case Demos.USE:
        return <ReactUse />;
      case Demos.ACTION_STATE:
        return <ActionState />;
      case Demos.OPTIMISTIC:
        return <Optimistic />;
      case Demos.OPTIMISTIC_2:
        return <Optimistic2 />;
      default:
        break;
    }
  };

  return (
    <>
      <header className="demo-header">
        <span>Demos:</span>
        <Select
          value={demoKey}
          popupMatchSelectWidth={false}
          options={options}
          onChange={setDemoKey}
        />
      </header>
      <main className="demo-content">{renderContent()}</main>
    </>
  );
}

export default App;
