import React from "react";
import "./App.css";
import AddPost from "./components/AddPost";
import Posts from "./components/Posts";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.addPost = this.addPost.bind(this);
  }

  addPost({ postText, postImageURL, postTimestamp }) {
    this.setState(() => ({
      ...this.state,
      posts: [
        {
          text: postText,
          gif: postImageURL,
          timestamp: postTimestamp,
        },
        ...this.state.posts,
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        {console.log("all Posts", this.state.posts)}
        <AddPost addPost={this.addPost} />
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
