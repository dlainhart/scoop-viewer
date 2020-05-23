import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class ToggleInstalledButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            all: true
        };
        this.handleToggle = this.props.handleToggle;
    }

    toggle() {
        this.handleToggle(!this.state.all);
        this.setState({ all: !this.state.all });
    }

    render() {
        return (
            <div className="btn-group show dropup" role="group">
                <button id="btnGroupDrop1" type="button" className="btn btn-sm btn-bottom-panel dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    { this.state.all ? 'All' : 'Installed' }
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1">
                    <a className="dropdown-item" href="#" onClick={ () => this.toggle() }>{ !this.state.all ? 'All' : 'Installed' }</a>
                </div>
            </div>
        );
    }
}

class ScoopUpdateButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version: ''
        }
        this.handleUpdating = this.props.handleUpdating;
        this.read_version = this.read_version.bind(this);
        this.read_version();
    }

    update() {
        this.handleUpdating(true, "Updating scoop");
        axios.post(`/scoop/update`, {
            headers: { Pragma: 'no-cache'}
        }).then(() => {
            this.handleUpdating(false);
            location.reload();
        });
    }

    read_version() {
        axios.get(`/scoop/version?${Date.now()}`, {
            headers: { Pragma: 'no-cache'}
        }).then(res => {
            console.log(res.data.version);
            this.setState({version: res.data.version})
        });
    }

    clear_cache() {
        this.handleUpdating(true, "Clearing the cache");
        axios.delete(`/scoop/cache`, {
            headers: { Pragma: 'no-cache'}
        }).then(() => {
            this.handleUpdating(false);
        });
    }

    render() {
        const version = this.state.version ? `(version ${this.state.version})` : "";
        return (
            <div className="btn-group show dropup" role="group">
                <button id="btnGroupDrop1" type="button" className="btn btn-sm btn-bottom-panel dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-code" aria-hidden="true"></i> scoop {version}
                </button>
                <div className="dropdown-menu dropdown-menu-left" aria-labelledby="btnGroupDrop1">
                    <a className="dropdown-item" href="#" onClick={ () => this.update() }><i class="fa fa-chevron-right"></i> scoop update</a>
                    <a className="dropdown-item" href="#" onClick={ () => this.clear_cache() }><i class="fa fa-chevron-right"></i> scoop cache rm *</a>
                </div>
            </div>
        );
    }
};

const BottomPanel = (props) => {
    return (
        <div className="fixed-bottom bottom-panel">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 text-left">
                        <ScoopUpdateButton handleUpdating={props.handleUpdating}/>
                    </div>
                    <div className="col-md-4 text-right">
                        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                            <button type="button" className="btn btn-sm btn-bottom-panel">
                                Packages <span className="badge badge-light">{ props.apps }</span>
                            </button>
                            <ToggleInstalledButton handleToggle={props.handleToggle}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ToggleInstalledButton.propTypes = {
    handleToggle: PropTypes.func
};

BottomPanel.propTypes = {
    apps: PropTypes.int,
    handleToggle: PropTypes.func
};

export default BottomPanel;
