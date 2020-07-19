import React, { Component } from 'react';
var moment = require('moment');
moment().format();

export class CommentItem extends Component {
    getDateString(unixSeconds) {
        let date = moment.unix(unixSeconds);
        return date.fromNow();
    }

    render() {
        return (
            <div className="panel panel-default comp-25-mobile-90 col-center">
                <div className="panel-heading">
                    <div className="d-flex justify-content-between">
                        <div><b>{this.props.comment.username}</b></div>
                        <div>{this.getDateString(this.props.comment.date.seconds)}</div>
                    </div>
                </div>
                <div className="panel-body">
                    <pre>{this.props.comment.content}</pre>
                </div>
            </div >
        )
    }
}

export default CommentItem;