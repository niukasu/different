import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchLeases } from '../actions'
import '../style/front_page.css'

class LeaseList extends React.Component {
  componentDidMount() {
    this.props.fetchLeases();
  }

  renderList() {
    return this.props.leases.map(lease => {
      let encodeId = encodeURIComponent(lease.id);
      let path = `/lease?leaseId=${encodeId}`;
      return (
        <div className="rentEntry" key={encodeId}>
          <Link to={path}>
            <h2>
              {lease.tenant}
            </h2>
          </Link>
        </div>
      );
    })
  }

  render() {
    return <div id="container">{this.renderList()}</div>;
  }
}

const mapStateToProps = state => {
  return { leases : state.leases };
}

export default connect(mapStateToProps, { fetchLeases })(LeaseList);