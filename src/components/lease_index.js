import React from 'react';
import { connect } from 'react-redux';
import { fetchLeaseId } from '../actions'
import { processContent } from '../helper/day_calculation'

import '../style/table.css'

class LeaseIndex extends React.Component {

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    this.props.fetchLeaseId(params.get('leaseId'));
  }

  renderRow(payment_data) {
    return payment_data.map(row => {
      let start_date = row['period_start_date'].toDateString();
      let end_date = row['period_end_date'].toDateString();
      return (
        <tr key={start_date}>
          <td key='period_start_date'>{start_date}</td>
          <td key='period_end_date'>{end_date}</td>
          <td key='number_of_days'>{row['number_of_days']}</td>
          <td key='rent'>{row['rent']}</td>
        </tr>
      )
    })
  }
  render() {
    if (!this.props.leaseIdContent.start_date) {
      return <div>Loading</div>;
    }
    let { leaseIdContent } = this.props;
    let payment_data = processContent(leaseIdContent);
    return (
      <div id="rent_table">
        <table>
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Number Of Days</th>
              <th>Rent</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRow(payment_data)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { leaseIdContent : state.leaseIdContent };
}

export default connect(mapStateToProps, { fetchLeaseId })(LeaseIndex);