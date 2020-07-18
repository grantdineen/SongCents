import React, { Component } from 'react';
import { useFirestore, useFirestoreCollectionData, SuspenseWithPerf } from 'reactfire';

function Songs(props) {
    const collectionReference = useFirestore().collection('songs');

    const queryRef = collectionReference.where('artist', '==', props.name);

    const songs = useFirestoreCollectionData(queryRef);

    return (
        <div>
            {
                songs.map((data, index) => <p key={index}><a href={`/Song/${data.artist}/${data.title}`} > {data.title}</a></p>)
            }
        </div >
    )

}

export class Artist extends Component {
    render() {
        return (
            <div>
                All Songs by : {this.props.match.params.name}
                <SuspenseWithPerf fallback={<p>loading songs...</p>}>
                    <Songs name={this.props.match.params.name} />
                </SuspenseWithPerf>
            </div>
        )
    }
}

export default Artist;