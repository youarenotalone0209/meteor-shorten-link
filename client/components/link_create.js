import React, { Component } from 'react';
// remove bad package from meteor so client can't save to db
// using meteor remove insecure

class LinkCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { error: '' };
    }

    handleSubmit(event) {
        var refs = this.refs;
        event.preventDefault();
        Meteor.call('links.insert', refs.link.value, (error => {
            if (error) {
                this.setState({error: 'Enter a valid URL'});
            } else {
                this.setState({error: ''});
                refs.link.value = '';
            }
        }));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <label>Link to shorten</label>
                    <input ref="link" className="form-control" />
                </div>
                <div className="text-danger">{this.state.error}</div>
                <button className="btn btn-primary">Shorten!</button>
            </form>
        )
    }
}

export default LinkCreate;