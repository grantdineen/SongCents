import React, { Component } from 'react';
import { useFirestore, useFirestoreCollectionData, SuspenseWithPerf } from 'reactfire';

function AddSongForm(props) {
    const songId = props.artist.replace(/ /g, '') + "-" + props.title.replace(/ /g, '');

    const songDoc = {
        "title": props.title,
        "artist": props.artist,
        "lyrics": props.lyrics,
        "album": props.album,
        "beginsWith": props.artist.toLowerCase()[0]
    }

    const collectionReference = useFirestore().collection('songs').doc(songId).set(songDoc).then(() => {
        props.finishSubmit();
    })
        .catch(err => {
            console.log(err);
        });

    return (<p>Song Submitted!</p>)
}

export class AddSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lyrics: '',
            album: '',
            artist: '',
            title: '',
            isButtonClicked: false
        };

        this.handleArtistChange = this.handleArtistChange.bind(this);
        this.handleAlbumChange = this.handleAlbumChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleLyricsChange = this.handleLyricsChange.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
        this.finishSubmit = this.finishSubmit.bind(this);
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
        this.setState({ isButtonClicked: true });
    }

    finishSubmit() {
        this.setState({ title: '', artist: '', lyrics: '', album: '', isButtonClicked: false });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSumbit}>
                    <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                    <input type="text" value={this.state.artist} onChange={this.handleArtistChange} />
                    <input type="text" value={this.state.album} onChange={this.handleAlbumChange} />
                    <textarea value={this.state.lyrics} onChange={this.handleLyricsChange} />
                    <input type="submit" value="Submit" />
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
            </div>
        )
    }
}

export default AddSong;