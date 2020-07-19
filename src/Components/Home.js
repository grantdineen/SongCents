import React, { Component } from 'react';
import { useFirestore, useFirestoreCollectionData, SuspenseWithPerf } from 'reactfire';

function Songs(props) {
    const collectionReference = useFirestore().collection('songs');

    const queryRef = collectionReference.orderBy('date', 'desc').limit(10);

    const songs = useFirestoreCollectionData(queryRef);

    return (
        <div>
            {
                songs.map((data, index) => <p key={index}><a href={`/Song/${data.artist}/${data.title}`} > {data.title}</a></p>)
            }
        </div >
    )

}

export class Home extends Component {
    render() {
        return (
            <div className="col-center text-center">
                <br />
                <h3>Latest Tracks</h3>
                <hr />
                <SuspenseWithPerf fallback={<p>loading songs...</p>}>
                    <Songs />
                </SuspenseWithPerf>
            </div>
        )
    }
}

export default Home;