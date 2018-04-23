import React from 'react';
import ReactDOM from 'react-dom';
import BucketsList from './components/buckets-list';
import BucketContainer from './components/bucket-container';
import Header from './components/header';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          currentBucket: 'Main-bucket',
          query: ''
        };
        this.apiRoot = this.props.apiRoot;
        this.handleBucketChange = this.handleBucketChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleBucketChange(bucket) {
        //console.log(bucket);
        this.setState({query:'', currentBucket: bucket});
    }

    handleSearch(newQuery) {
        this.setState({query: newQuery});
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <nav className="col-sm-3 hidden-xs-down bg-faded sidebar">
                            <BucketsList handleBucketChange={this.handleBucketChange} apiRoot={this.apiRoot}/>
                        </nav>
                        <main className="col-sm-9 offset-sm-3 pt-3">
                            <Header onSearch={this.handleSearch}/>
                            <BucketContainer name={this.state.currentBucket} query={this.state.query} apiRoot={this.apiRoot}/>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App {...(app.dataset)}/>, document.getElementById('app'));
