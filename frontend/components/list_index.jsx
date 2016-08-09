import React from 'react';
import SessionStore from '../stores/session_store';
import ListStore from '../stores/list_store';

import ListView from './components/list_view';

const ListIndex = React.createClass({

	getInitialState () {
		return {
			currentUser: SessionStore.currentUser(),
			lists: ListStore.all()
		};
	},

	componentDidMount () {
		this.sessionStoreToken = SessionStore.addListener(this._onChange);
		this.listStoreToken = ListStore.addListener(this.updateList);
	},

	_onChange () {
		this.setState({ currentUser: SessionStore.currentUser() });
	},

	updateList () {
		this.setState({ lists: ListStore.all() });
	},

	componentWillUnmount () {
		this.sessionStoreToken.remove();
		this.listStoreToken.remove();
	},

  render () {
		let lists = () => {
			this.state.lists.map (list =>
				<ListView list={list} />
			);
		};

    return (
      <div className="list-index">
				{ lists() }
      </div>
    );
  }
});

export default ListIndex;