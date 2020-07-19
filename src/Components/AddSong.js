import React, { Component } from 'react';
import { useFirestore, SuspenseWithPerf } from 'reactfire';
import { Redirect } from 'react-router-dom';

function AddSongForm(props) {
    const songId = props.artist.replace(/ /g, '') + "-" + props.title.replace(/ /g, '');

    const beginsWithChar = getBeginsWithChar(props.artist);

    const songDoc = {
        "title": props.title,
        "artist": props.artist,
        "lyrics": props.lyrics,
        "album": props.album,
        "beginsWith": beginsWithChar,
        "date": new Date()
    }

    const collectionReference = useFirestore().collection('songs').doc(songId).set(songDoc).then(() => {
        props.finishSubmit();
    })
        .catch(err => {
            console.log(err);
        });

    return (<p>Song Submitted!</p>)
}

//many band names start with "The ____"
//if so, use the next char after that
function getBeginsWithChar(artist) {
    if (artist.length > 4) {
        let first4Char = artist.substring(0, 4).toLowerCase();
        if (first4Char === "the ")
            return artist[4].toLowerCase();
    }

    return artist[0].toLowerCase();
}

export class AddSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lyrics: '',
            album: '',
            artist: '',
            title: '',
            titleError: '',
            artistError: '',
            albumError: '',
            lyricsError: '',
            isButtonClicked: false,
            isSongAdded: false,
            newSongLink: ''
        };

        this.handleArtistChange = this.handleArtistChange.bind(this);
        this.handleAlbumChange = this.handleAlbumChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleLyricsChange = this.handleLyricsChange.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
        this.finishSubmit = this.finishSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleArtistChange(event) {
        this.setState({ artist: event.target.value });
    }

    handleAlbumChange(event) {
        this.setState({ album: event.target.value });
    }

    handleLyricsChange(event) {
        this.setState({ lyrics: event.target.value });
    }

    handleSumbit(event) {
        event.preventDefault();
        let isValid = this.validate();
        if (isValid)
            this.setState({ isButtonClicked: true });
    }

    finishSubmit() {
        this.setState({
            newSongLink: '/Song/' + this.state.artist + '/' + this.state.title,
            title: '',
            artist: '',
            lyrics: '',
            album: '',
            isButtonClicked: false,
            isSongAdded: true
        });
    }

    validate() {
        let isValid = true;

        if (this.state.title.length < 1) {
            this.setState({ titleError: "Please enter a Title" });
            isValid = false;
        }
        else
            this.setState({ titleError: "" });

        if (this.state.artist.length < 1) {
            this.setState({ artistError: "Please enter an Artist" });
            isValid = false;
        }
        else
            this.setState({ artistError: "" });

        if (this.state.album.length < 1) {
            this.setState({ albumError: "Please enter an Album" });
            isValid = false;
        }
        else
            this.setState({ albumError: "" });

        if (this.state.lyrics.length < 1) {
            this.setState({ lyricsError: "Please enter Lyrics" });
            isValid = false;
        }
        else
            this.setState({ lyricsError: "" });

        return isValid;
    }

    render() {
        return (
            <div className="col-center comp-25-mobile-90">
                <br />
                <form onSubmit={this.handleSumbit}>
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input id="title" className="form-control" type="text" value={this.state.title} onChange={this.handleTitleChange} />
                        <div style={{ color: "red" }}>{this.state.titleError}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="artist">Artist: </label>
                        <input id="artist" className="form-control" type="text" value={this.state.artist} onChange={this.handleArtistChange} />
                        <div style={{ color: "red" }}>{this.state.artistError}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="album">Album: </label>
                        <input id="album" className="form-control" type="text" value={this.state.album} onChange={this.handleAlbumChange} />
                        <div style={{ color: "red" }}>{this.state.albumError}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lyrics">Lyrics: </label>
                        <textarea id="lyrics" className="form-control lyrics-textarea" value={this.state.lyrics} onChange={this.handleLyricsChange} />
                        <div style={{ color: "red" }}>{this.state.lyricsError}</div>
                    </div>
                    <div className="text-right">
                        <input className="btn btn-primary align-right" type="submit" value="Add Song" />
                    </div>
                </form>
                {this.state.isButtonClicked &&
                    <SuspenseWithPerf fallback={<p>loading songs...</p>}>
                        <AddSongForm
                            artist={this.state.artist}
                            title={this.state.title}
                            lyrics={this.state.lyrics}
                            title={this.state.title}
                            artist={this.state.artist}
                            album={this.state.album}
                            finishSubmit={this.finishSubmit}
                        />
                    </SuspenseWithPerf>
                }
                {this.state.isSongAdded && <Redirect to={this.state.newSongLink} />}
            </div>
        )
    }
}

export default AddSong;