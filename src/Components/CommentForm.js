import React, { Component } from 'react';
import { useFirestore, useFirestoreCollectionData, SuspenseWithPerf } from 'reactfire';

function PostCommentForm(props) {
    const songId = props.artist.replace(/ /g, '') + "-" + props.title.replace(/ /g, '');

    const commentDoc = {
        "content": props.comment,
        "username": props.username,
        "date": new Date()
    }

    const collectionReference = useFirestore().collection('songs').doc(songId).collection("comments").add(commentDoc).then(() => {
        props.finishSubmit();
    })
        .catch(err => {
            console.log(err);
        });

    return (<p>posted</p>)
}

export class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            comment: '',
            artist: props.artist,
            title: props.title,
            isButtonClicked: false
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
        this.finishSubmit = this.finishSubmit.bind(this);
    }

    handleCommentChange(event) {
        this.setState({ comment: event.target.value });
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handleSumbit(event) {
        event.preventDefault();
        this.setState({ isButtonClicked: true });
    }

    finishSubmit() {
        this.setState({ comment: '', username: '', isButtonClicked: false });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSumbit}>
                    <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                    <textarea value={this.state.comment} onChange={this.handleCommentChange} />
                    <input type="submit" value="Submit" />
                </form>
                {this.state.isButtonClicked &&
                    <PostCommentForm
                        comment={this.state.comment}
                        username={this.state.username}
                        title={this.state.title}
                        artist={this.state.artist}
                        finishSubmit={this.finishSubmit}
                    />
                }
            </div>
        )
    }
}

export default CommentForm;