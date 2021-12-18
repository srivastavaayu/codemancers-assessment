import React from "react";
import "../styles/Posts.css";

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    this.setState(() => ({ ...this.state, posts: this.props.posts }));
  }

  componentDidUpdate() {
    if (this.state.posts != this.props.posts) {
      this.setState(() => ({ ...this.state, posts: this.props.posts }));
      return true;
    }
  }

  render() {
    return (
      <div className="postsContainer">
        {this.state.posts.length > 0 &&
          this.state.posts.map((node, index) => {
            return (
              <div className="postContainer" key={index}>
                {node.timestamp && (
                  <p className="postTimestamp">{node.timestamp}</p>
                )}
                {node.text && <p className="postText">{node.text}</p>}
                {node.gif && <img className="postGif" src={node.gif} />}
              </div>
            );
          })}
      </div>
    );
  }
}
