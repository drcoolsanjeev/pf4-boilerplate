import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./App.css";
import AppLayout from "AppLayout";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppLayout />
    </ErrorBoundary>
  );
};

export default App;
