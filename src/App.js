import React from "react";
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";

import NavigationPrompt from 'react-router-navigation-prompt';

const PreventingTransitionsExample = () => (
  <Router>
    <div className="container">
      <ul>
        <li>
          <Link to="/">Form</Link>
        </li>
        <li>
          <Link to="/one">One</Link>
        </li>
        <li>
          <Link to="/two">Two</Link>
        </li>
      </ul>
      <Route path="/" exact component={Form} />
      <Route path="/one" render={() => <h3>One</h3>} />
      <Route path="/two" render={() => <h3>Two</h3>} />
    </div>
  </Router>
);

class Form extends React.Component {
  state = {
    isBlocking: false
  };

  render() {
    const { isBlocking } = this.state;

    return (
      <div>
      <form
        onSubmit={event => {
          event.preventDefault();
          event.target.reset();
          this.setState({
            isBlocking: false
          });
        }}
      >

        <p>
          Blocking?{" "}
          {isBlocking ? "Yes, click a link or the back button" : "Nope"}
        </p>

        <p>
          <input
            size="50"
            placeholder="type something to block transitions"
            onChange={event => {
              this.setState({
                isBlocking: event.target.value.length > 0
              });
            }}
          />
        </p>

        <p>
          <button>Submit to stop blocking</button>
        </p>
      </form>
      <NavigationPrompt
            // Children will be rendered even if props.when is falsey and isActive is false:
            renderIfNotActive={true}
            // Confirm navigation if going to a path that does not start with current path:
            when={isBlocking}
          >
            {({isActive, onCancel, onConfirm}) => {
              if (isActive) {
                console.log(isActive);
                const style = {
                  display: 'block'
                }
                return (
                  <div className="modal" style={style}>
                    <div className="modal-dialog" role="document" >
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Modal title</h5>
                          <button type="button" className="close">
                            <span>&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={onConfirm}>Confirm</button>
                          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div>This is probably an anti-pattern but ya know...</div>
              );
            }}
        </NavigationPrompt>
      </div>
    );
  }
}

export default PreventingTransitionsExample;
