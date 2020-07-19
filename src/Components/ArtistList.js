import React, { Component } from 'react'
import { useFirestore, useFirestoreCollectionData, SuspenseWithPerf } from 'reactfire';

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function Artists(props) {
    const collectionReference = useFirestore().collection('songs');

    const queryRef = collectionReference.where('beginsWith', '==', props.letter);

    const songs = useFirestoreCollectionData(queryRef);

    let artists = [];
    songs.forEach(song => {
        if (!artists.includes(song.artist))
            artists.push(song.artist)
    });

    return (
        <div>
            {
                artists.map((data, index) => <p key={index}><a href={`/Artist/${data}`} > {data}</a></p>)
            }
        </div >
    )

}

export class ArtistList extends Component {
    render() {
        return (
            <div className="col-center text-center">
                <br />
                <h3>All Artists starting with: {this.props.match.params.letter.toUpperCase()}</h3>
                <hr />
                <SuspenseWithPerf fallback={<p>loading artists...</p>}>
                    <Artists letter={this.props.match.params.letter} />
                </SuspenseWithPerf>
            </div>
        )
    }
}

export default ArtistList
