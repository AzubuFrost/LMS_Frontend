import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { range } from 'lodash/util';
import classnames from 'classnames';
import { getAllStudentsOrderly } from '../../../Reducers/student.reducer';
import { StudentListItem } from '../../../Components';
import { PageLoader, Search } from '../../../Framework/ui';
import './StudentListView.css';

class StudentListViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 20,
      currentNumber: 1,
      isOrderAsc: true,
      sortString: 'Id',
      currentTab: 'Id',
      searchValue: '',
    };
  }
  componentDidMount() {
    const { currentNumber, pageSize, sortString, isOrderAsc, searchValue } = this.state;
    this.props.dispatch(getAllStudentsOrderly(pageSize, currentNumber,
      sortString, isOrderAsc, searchValue));
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentNumber, pageSize, sortString, isOrderAsc, searchValue } = this.state;
    if (currentNumber !== prevState.currentNumber ||
      sortString !== prevState.sortString ||
      isOrderAsc !== prevState.isOrderAsc) {
      this.props.dispatch(getAllStudentsOrderly(pageSize, currentNumber,
        sortString, isOrderAsc, searchValue));
    }
  }

  handlePageChangeOnClick(pageNumber) {
    this.setState({ currentNumber: pageNumber });
  }

  handlePageSortOnClick(sortString) {
    this.setState(prevState =>
      ({ sortString, isOrderAsc: !prevState.isOrderAsc, currentTab: sortString }));
  }


  offSetPage(direction) {
    const { currentNumber } = this.state;
    if (currentNumber >= 1 && currentNumber <= this.props.totalPage) {
      if (direction === 'left') {
        this.setState({ currentNumber: currentNumber - 1 });
      } else {
        this.setState({ currentNumber: currentNumber + 1 });
      }
    }
  }
  handSearchSubmit(content) {
    const { currentNumber, pageSize, sortString, isOrderAsc } = this.state;
    this.props.dispatch(getAllStudentsOrderly(pageSize, currentNumber,
      sortString, isOrderAsc, content));
    this.setState({ searchValue: content });
  }

  renderHeader() {
    const { isOrderAsc, currentTab } = this.state;
    return (
      <thead>
        <tr>
          <th className={classnames('sorted', { ascending: currentTab === 'Id' && isOrderAsc, descending: currentTab === 'Id' && !isOrderAsc })} onClick={this.handlePageSortOnClick.bind(this, 'Id', isOrderAsc)}>ID</th>
          <th className={classnames('sorted', { ascending: currentTab === 'Name' && isOrderAsc, descending: currentTab === 'Name' && !isOrderAsc })} onClick={this.handlePageSortOnClick.bind(this, 'Name', isOrderAsc)}>Name</th>
          <th className={classnames('sorted', { ascending: currentTab === 'Email' && isOrderAsc, descending: currentTab === 'Email' && !isOrderAsc })} onClick={this.handlePageSortOnClick.bind(this, 'Email', isOrderAsc)}>Email</th>
          <th className={classnames('sorted', { ascending: currentTab === 'Gender' && isOrderAsc, descending: currentTab === 'Gender' && !isOrderAsc })} onClick={this.handlePageSortOnClick.bind(this, 'Gender', isOrderAsc)}>Gender</th>
          <th className={classnames('sorted', { ascending: currentTab === 'DateOfBirth' && isOrderAsc, descending: currentTab === 'DateOfBirth' && !isOrderAsc })} onClick={this.handlePageSortOnClick.bind(this, 'DateOfBirth', isOrderAsc)}>Date Of Birth</th>
          <th className={classnames('sorted', { ascending: currentTab === 'Credit' && isOrderAsc, descending: currentTab === 'Credit' && !isOrderAsc })} onClick={this.handlePageSortOnClick.bind(this, 'Credit', isOrderAsc)}>Credit</th>
          <th className="sorted" />
        </tr>
      </thead>
    );
  }

  renderFooter() {
    const { currentNumber } = this.state;
    const { totalPage } = this.props;
    const hasPrevPage = currentNumber > 1;
    const hasNextPage = currentNumber < totalPage;

    return (
      <tfoot>
        <tr><th colSpan="7">
          <div className="ui centered pagination menu">
            <a className={classnames('icon item', { disabled: !hasPrevPage })} onClick={hasPrevPage ? this.offSetPage.bind(this, 'left') : undefined}>
              <i className="left chevron icon" />
            </a>
            {range(1, totalPage + 1).map((pageNumber) => {
              return <a className={classnames('item', { active: this.state.currentNumber === pageNumber })} key={pageNumber} onClick={this.handlePageChangeOnClick.bind(this, pageNumber)}>{pageNumber}</a>;
            })}
            <a className={classnames('icon item', { disabled: !hasNextPage })} onClick={hasNextPage ? this.offSetPage.bind(this, 'right') : undefined}>
              <i className="right chevron icon" />
            </a>
          </div>
        </th>
        </tr></tfoot>);
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isAvailable = user ? user.accountType === 'lecturer' : false;
    return (
      <div>
        {this.props.isLoading && <PageLoader />}
        {!this.props.isLoading && (
          <div>
            <h1 className="ui header">Students</h1>
            <Search Submit={this.handSearchSubmit.bind(this)} />
            {isAvailable && <Link to="/students/create" className="ui blue button">Add Students</Link>}
            <table className="ui sortable celled table">
              {this.renderHeader()}
              <tbody>
                {this.props.students.map(student =>
                  <StudentListItem student={student} key={student.id} />)}
              </tbody>
              {this.renderFooter()}
            </table>
          </div>
        )}
      </div>
    );
  }
}

StudentListViewContainer.defaultProps = {
  students: [],
};
const mapStateToProps = (state) => {
  return {
    students: state.StudentReducer.students,
    isLoading: state.StudentReducer.isLoading,
    totalPage: state.StudentReducer.totalPage,
  };
};

export default connect(mapStateToProps)(StudentListViewContainer);
