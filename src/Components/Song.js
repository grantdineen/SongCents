import React, { Component } from 'react';
import { useFirestore, useFirestoreCollectionData, SuspenseWithPerf } from 'reactfire';

function SongItem(props) {
    const collectionReference = useFirestore().collection('songs');

    const queryRef = collectionReference
        .where('artist', '==', props.artist)
        .where('title', '==', props.title);

    const song = useFirestoreCollectionData(queryRef);

    return (
        <div>
            {
                <pre>{song[0]?.lyrics}</pre>
            }
        </div >
    )
}

function CommentItem(props) {

    const songId = props.artist.replace(/ /g, '') + "-" + props.title.replace(/ /g, '');
    const collectionReference = useFirestore().collection('songs').doc(songId).collection('comments');

    const queryRef = collectionReference;

    const comments = useFirestoreCollectionData(queryRef);

    return (
        <div>
            {
                <pre>{comments[0]?.content}</pre>
            }
        </div >
    )
}

export class Song extends Component {
    render() {
        return (
            <div>
                {this.props.match.params.title}
                <SuspenseWithPerf fallback={<p>loading artists...</p>} traceId={'load-burrito-status'}>
                    <SongItem artist={this.props.match.params.artist} title={this.props.match.params.title} />
                    <CommentItem artist={this.props.match.params.artist} title={this.props.match.params.title} />
                </SuspenseWithPerf>
            </div>
        )
    }
}

export default Song;