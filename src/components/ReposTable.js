import {default as React, PropTypes} from "react";
import {Table, Column} from "fixed-data-table";
import {default as Icon} from "react-fa";
import {default as Timestamp} from "react-time";

require("fixed-data-table/dist/fixed-data-table.css");

/*eslint-disable no-unused-vars, no-undef*/
function immutableCellDataGetter (
  cellDataKey: string,
  rowData: object
): any {
  return rowData.get(cellDataKey);
}
/*eslint-enable no-unused-vars, no-undef*/

class ReposTable extends React.Component {

  constructor(...args) {
    super(...args);
    this.renderRemoveCell = this.renderRemoveCell.bind(this);
  }

  static get propTypes () {
    return {
      windowWidth: PropTypes.number.isRequired,
      repos: PropTypes.array.isRequired,
      onRepoRemove: PropTypes.func.isRequired,
    };
  }

  /*eslint-disable no-unused-vars, no-undef*/
  renderRemoveCell (
    cellData: any,
    cellDataKey: string,
    rowData: object,
    rowIndex: number,
    columnData: any,
    width: number
  ): ?$jsx {
    return (
      <Icon
        name="times"
        onClick={this.props.onRepoRemove.bind(null, cellData)}
      />
    );
  }

  renderDateCell (
    cellData: any,
    cellDataKey: string,
    rowData: object,
    rowIndex: number,
    columnData: any,
    width: number
  ): ?$jsx {
    return (
      <Timestamp value={cellData} format="YYYY/MM/DD" />
    );
  }
  /*eslint-enable no-unused-vars, no-undef*/

  render () {
    const {props, state} = this;
    const {repos} = props;
    const rowGetter = (rowIndex) => repos.get(rowIndex);

    return (
      <Table
        rowHeight={50}
        rowGetter={rowGetter}
        rowsCount={repos.size}
        width={props.windowWidth}
        height={600}
        headerHeight={50}>
        <Column
          label=""
          width={30}
          dataKey="id"
          cellDataGetter={immutableCellDataGetter}
          cellRenderer={this.renderRemoveCell}
        />
        <Column
          label="Name"
          width={150}
          dataKey="name"
          cellDataGetter={immutableCellDataGetter}
        />
        <Column
          label="Stars"
          width={60}
          dataKey="stargazers_count"
          cellDataGetter={immutableCellDataGetter}
        />
        <Column
          label="Open Issues"
          width={60}
          dataKey="openIssuesCount"
          cellDataGetter={immutableCellDataGetter}
        />
        <Column
          label="Closed Issues"
          width={60}
          dataKey="closedIssuesCount"
          cellDataGetter={immutableCellDataGetter}
        />
        <Column
          label="Forks"
          width={60}
          dataKey="forks_count"
          cellDataGetter={immutableCellDataGetter}
        />
        <Column
          label="Open PRs"
          width={60}
          dataKey="openPRsCount"
          cellDataGetter={immutableCellDataGetter}
        />
        <Column
          label="Closed PRs"
          width={60}
          dataKey="closedPRsCount"
          cellDataGetter={immutableCellDataGetter}
        />
        <Column
          label="Repo Init Date"
          width={100}
          dataKey="created_at"
          cellDataGetter={immutableCellDataGetter}
          cellRenderer={this.renderDateCell}
        />
        <Column
          label="Last Push Date"
          width={100}
          dataKey="pushed_at"
          cellDataGetter={immutableCellDataGetter}
          cellRenderer={this.renderDateCell}
        />
        <Column
          label="Last Year Commits Count"
          width={140}
          dataKey="lastYearCommitsCount"
          cellDataGetter={immutableCellDataGetter}
        />
        <Column
          label="Days Since Last Commit"
          width={120}
          dataKey="daysSinceLastCommit"
          cellDataGetter={immutableCellDataGetter}
        />
      </Table>
    );
  }
}

export default ReposTable;
