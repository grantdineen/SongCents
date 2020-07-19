import React, { Component } from 'react';
import { useFirestore, useFirestoreCollectionData, SuspenseWithPerf } from 'reactfire';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

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

function Comment(props) {

    const songId = props.artist.replace(/ /g, '') + "-" + props.title.replace(/ /g, '');
    const collectionReference = useFirestore().collection('songs').doc(songId).collection('comments').orderBy('date', 'desc');

    const queryRef = collectionReference;

    const comments = useFirestoreCollectionData(queryRef);

    return (
        <div className="panel-group">
            {
                comments.map((data, index) => <CommentItem key={index} comment={data} />)
            }
        </div >
    )
}

export class Song extends Component {
    render() {
        return (
            <div>
                <br />
                <div className="col-center comp-75-mobile-90 text-center">
                    <h3>{this.props.match.params.title}</h3>
                    <h6><a href={'/Artist/' + this.props.match.params.artist}>{this.props.match.params.artist}</a></h6>
                    <hr />
                    <SuspenseWithPerf fallback={<p>loading song...</p>}>
                        <SongItem artist={this.props.match.params.artist} title={this.props.match.params.title} />
                    </SuspenseWithPerf>
                </div>
                <br />
                <br />
                <CommentForm artist={this.props.match.params.artist} title={this.props.match.params.title} ></CommentForm>
                <br />
                <br />
                <SuspenseWithPerf fallback={<p>loading comments...</p>}>
                    <Comment artist={this.props.match.params.artist} title={this.props.match.params.title} forceUpdate={this.forceUpdate} />
                </SuspenseWithPerf>
            </div >
        )
    }
}

export default Song;