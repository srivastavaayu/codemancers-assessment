import React from "react";
import "../styles/AddPost.css";

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createPostOpened: false,
      addGifOpened: false,
      postText: "",
      giphySearchText: "",
      giphyReturnData: [],
      giphyImage: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.getGiphyData = this.getGiphyData.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  handleChange(event) {
    this.setState(() => ({
      ...this.state,
      [event.target.name]: event.target.value,
    }));
  }

  getGiphyData(event) {
    this.setState(
      {
        ...this.state,
        [event.target.name]: event.target.value,
      },
      async () => {
        await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${this.state.giphySearchText}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.meta.status === 200) {
              this.setState({ ...this.state, giphyReturnData: data });
            } else {
              console.log(data);
            }
          });
      }
    );
  }

  createPost() {
    this.props.addPost({
      postText: this.state.postText,
      postImageURL: this.state.giphyImage,
      postTimestamp: new Date().toString().split("GMT")[0],
    });
    this.setState(() => ({
      ...this.state,
      postText: "",
      giphySearchText: "",
      giphyImage: "",
      giphyReturnData: [],
      addGifOpened: false,
      createPostOpened: false,
    }));
  }

  render() {
    return (
      <>
        <div className="addPostContainer">
          {!this.state.createPostOpened && (
            <button
              type="button"
              onClick={() => {
                this.setState(() => ({ createPostOpened: true }));
              }}
              className="createPostButton"
            >
              Create Post
            </button>
          )}
          {this.state.createPostOpened && (
            <>
              <textarea
                type="text"
                name="postText"
                placeholder="What's on your mind?"
                value={this.state.postText}
                onChange={(event) => {
                  this.handleChange(event);
                }}
                rows="4"
                className="addPostInput"
              />
              {this.state.addGifOpened ? (
                <>
                  <input
                    type="text"
                    name="giphySearchText"
                    placeholder="Search for a GIF here..."
                    value={this.state.giphySearchText}
                    onChange={(event) => {
                      this.getGiphyData(event);
                    }}
                    className="giphySearchInput"
                  />
                </>
              ) : (
                this.state.giphyImage && (
                  <img
                    className="giphySelectedImage"
                    src={this.state.giphyImage}
                  />
                )
              )}
              {this.state.giphyReturnData.hasOwnProperty("data") && (
                <div className="giphyImages">
                  {this.state.giphyReturnData.data.map((node, index) => {
                    return (
                      <img
                        src={node.images.fixed_height.url}
                        key={index}
                        onClick={() => {
                          this.setState(() => ({
                            ...this.state,
                            giphyImage: node.images.original.url,
                            addGifOpened: false,
                            giphySearchText: "",
                            giphyReturnData: [],
                          }));
                        }}
                        className="giphyImage"
                      />
                    );
                  })}
                </div>
              )}
              <div className="addPostBottomButtons">
                <button
                  type="button"
                  onClick={() => {
                    this.setState(() => ({
                      postText: "",
                      giphySearchText: "",
                      giphyImage: "",
                      giphyReturnData: [],
                      addGifOpened: false,
                      createPostOpened: false,
                    }));
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.setState(() => ({
                      addGifOpened: !this.state.addGifOpened,
                    }));
                  }}
                >
                  Add GIF from Giphy!
                </button>
                <button type="button" onClick={this.createPost}>
                  Create Post!
                </button>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default AddPost;
