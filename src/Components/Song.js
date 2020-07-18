import React, { Component } from 'react';
import { useFirestore, useFirestoreCollectionData, SuspenseWithPerf } from 'reactfire';
import CommentForm from './CommentForm';

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
    const collectionReference = useFirestore().collection('songs').doc(songId).collection('comments').orderBy('date', 'desc');

    const queryRef = collectionReference;

    const comments = useFirestoreCollectionData(queryRef);

    return (
        <div>
            {
                comments.map((data, index) => <pre key={index}><b>{data?.username}</b>:{data?.content}</pre>)
            }
        </div >
    )
}

export class Song extends Component {
    render() {
        return (
            <div>
                {this.props.match.params.title}
                <SuspenseWithPerf fallback={<p>loading songs...</p>}>
                    <SongItem artist={this.props.match.params.artist} title={this.props.match.params.title} />
                </SuspenseWithPerf>
                <br />
                <br />
                <SuspenseWithPerf fallback={<p>loading comments...</p>}>
                    <CommentItem artist={this.props.match.params.artist} title={this.props.match.params.title} />
                </SuspenseWithPerf>
                <br />
                <br />
                <CommentForm artist={this.props.match.params.artist} title={this.props.match.params.title} ></CommentForm>
            </div >
        )
    }
}

export default Song;