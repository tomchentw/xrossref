const debug = require("debug")("ReposTable");
import {default as React, PropTypes} from "react";
import {Table, Column} from "fixed-data-table";
import {default as Icon} from "react-fa";
import {default as Timestamp} from "react-time";

require("fixed-data-table/dist/fixed-data-table.css");



class ReposTable extends React.Component {

  constructor(...args) {
    super(...args);
    this.renderRemoveCell = this.renderRemoveCell.bind(this);
  }

  static get propTypes () {
    return {
      repos: PropTypes.array.isRequired,
      onRepoRemove: PropTypes.func.isRequired,
    };
  }

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

  render () {
    const {props, state} = this;
    const {repos} = props;
    const rowGetter = (rowIndex) => repos[rowIndex];

    return (
      <Table
        rowHeight={50}
        rowGetter={rowGetter}
        rowsCount={repos.length}
        width={1000}
        height={600}
        headerHeight={50}>
        <Column
          label=""
          width={30}
          dataKey="id"
          cellRenderer={this.renderRemoveCell}
        />
        <Column
          label="Name"
          width={100}
          dataKey="name"
        />
        <Column
          label="Stars"
          width={60}
          dataKey="stargazers_count"
        />
        <Column
          label="Open Issues"
          width={60}
          dataKey="openIssuesCount"
        />
        <Column
          label="Closed Issues"
          width={60}
          dataKey="closedIssuesCount"
        />
        <Column
          label="Forks"
          width={60}
          dataKey="forks_count"
        />
        <Column
          label="Open PRs"
          width={60}
          dataKey="openPRsCount"
        />
        <Column
          label="Closed PRs"
          width={60}
          dataKey="closedPRsCount"
        />
        <Column
          label="Repo Init Date"
          width={100}
          dataKey="created_at"
          cellRenderer={this.renderDateCell}
        />
        <Column
          label="Last Push Date"
          width={100}
          dataKey="pushed_at"
          cellRenderer={this.renderDateCell}
        />
      </Table>
    );
  }
}

export default ReposTable;
