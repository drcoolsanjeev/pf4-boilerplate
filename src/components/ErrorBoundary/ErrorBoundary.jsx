import React from "react";
import { NotFound } from "components";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.updateState=this.updateState.bind(this);
  }

  updateState(hasError){
      this.setState({hasError});
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <NotFound updateState={this.updateState}/>;
    }

    return this.props.children;
  }
}
