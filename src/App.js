import React from "react";
import axios from 'axios';

import { Button } from 'react-bootstrap';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: "Maroon5",
      song: "This_love",
      lyrics: "search for a song!",
      words: "",
      lines: ""

    };

    this.handleChangeArtist = this.handleChangeArtist.bind(this);
    this.handleChangeSong = this.handleChangeSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeArtist(e) {
    this.setState({
      artist: e.target.value
    });
  }
  handleChangeSong(e) {
    this.setState({
      song: e.target.value
    });
  }
  handleSubmit = event => {
    event.preventDefault();
    let newLyrics = "";

    let request_body = 'https://api.lyrics.ovh/v1/';
    request_body += this.state.artist;
    request_body += '/';
    request_body += this.state.song;

    axios.get(request_body)
      .then(res => {
        console.log(res);
        console.log(res.data);

        this.setState({
          lyrics: res.data.lyrics
        });

        axios.get('http://localhost:4000/stats', {
          params: {
            lyrics: this.state.lyrics
          }
        })
          .then(res => {
            console.log(res);
            console.log(res.data);

            this.setState({
              words: res.data.words,
              lines: res.data.lines
            });
          });

      });

    console.log("ARRIVAL12");

  }

  render() {
    return (
      <div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <div className="row">
                <div className="col-md-5">
                  <div className="row">
                    <div className="col-xs-12">
                      <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Artist" onChange={this.handleChangeArtist} />
                        <input type="text" placeholder="Song" onChange={this.handleChangeSong} />
                        <input type="submit" className="btn btn-success" value="Search!" />
                      </form>
                    </div>
                  </div>

                </div>

                <div className="col-md-7">
                  <div className="row">
                    <div className="col-xs-12">
                      <div>
                        <h4 className="list-group-item-heading">Lyrics!</h4>
                        <textarea className="form-control" value={this.state.lyrics} />
                      </div>
                    </div>

                  </div>

                  <div className="row">
                    <div className="col-xs-12">
                      <div>
                        <h4 className="list-group-item-heading">Words</h4>
                        <textarea value={this.state.words} />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xs-12">
                      <div>
                        <h4 className="list-group-item-heading">Lines!</h4>
                        <textarea value={this.state.lines} />
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

    );
  }
}

export default App;