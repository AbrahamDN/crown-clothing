import React, { Component } from 'react';
import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText,
} from './error-boundary.styles';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    // process the error
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div>
          <ErrorImageOverlay>
            <ErrorImageContainer imageUrl='/images/error.png' />
            <ErrorImageText>This Page is Broken</ErrorImageText>
          </ErrorImageOverlay>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
