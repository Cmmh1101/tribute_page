import React, { Component } from "react";
import CommentList from "./components/CommentListComponent";
import CommentForm from "./components/FormComponent";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: false,
    };
    this.addComment = this.addComment.bind(this);
  }

  addComment(comment) {
    this.setState({
      loading: false,
      comment: [comment, ...this.state.comment],
    });
  }

  componentDidMount() {
    // loading
    this.setState({ loading: true });

    // get all the comments
    fetch("http://localhost:3011")
      .then(res => res.json())
      .then(res => {
        this.setState({
          comments: res,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
}

  render() {
    const loadingSpin = this.state.loading ? "App-logo Spin" : "App-logo";
    return (
      <div className="App container bg-light shadow">
        <header className="App-header">
          
          <h1 className="App-title">
            React Comments
            
          </h1>
        </header>

        <div className="row">
          <div className="col-4  pt-3 border-right">
            <h6>Say something about React</h6>
            <CommentForm addComment={this.addComment} />
          </div>
          <div className="col-8  pt-3 bg-white">
            <CommentList
              loading={this.state.loading}
              comments={this.state.comments}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
