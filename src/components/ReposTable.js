import {default as React, PropTypes} from "react";
import {Table, Column} from "fixed-data-table";

require("fixed-data-table/dist/fixed-data-table.css");

class ReposTable extends React.Component {

  constructor(...args) {
    super(...args);
  }

  static get propTypes () {
    return {
      repos: PropTypes.array.isRequired,
    };
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
          label="Forks"
          width={60}
          dataKey="forks_count"
        />
        <Column
          label="Open Issues"
          width={60}
          dataKey="open_issues"
        />
      </Table>
    );
  }
}

export default ReposTable;
