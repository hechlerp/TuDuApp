import React from 'react';

import ListStore from '../stores/list_store';
import ListUtil from '../utils/list_util';

import ListView from './list_view';
import ListForm from './list_form';

const ListIndex = React.createClass({

  getInitialState () {
    return {
      lists: ListStore.all()
    };
  },

  componentDidMount () {
    ListUtil.fetchUserLists();
    this.listStoreToken = ListStore.addListener(this._updateLists);
  },

  _updateLists () {
    this.setState({ lists: ListStore.all() });
  },

  componentWillUnmount () {
    this.listStoreToken.remove();
  },

  render () {
    let blankList = { name: '' };

    let ourLists = () => {
      return (
        this.state.lists.map (list =>
          <ListView key={list.id} list={list} />
        )
      );
    };

    return (
      <div className='bg-app'>
        <div className='list-index'>
          <div className='nav-arrow nav-left'>
            <img src='images/arrow.svg'></img>
          </div>
          <div className='nav-arrow nav-right'>
            <img src='images/arrow.svg'></img>
          </div>

          <div className='lists-container'>
            { ourLists() }
            <ListForm list={blankList} />
          </div>
        </div>
      </div>
    );
  }
});

export default ListIndex;
