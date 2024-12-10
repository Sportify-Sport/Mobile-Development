import React from "react";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableWidth: "100%", 
    };
  }

  handleTableClick = () => {
    console.log("Table clicked!");
    this.setState({ tableWidth: "50%" }); 
  };
  handleTableDoubleClick=()=>{
    this.setState({tableWidth:"100%"});
  };

  render() {
    return (
      <table
        style={{ width: this.state.tableWidth, border: "1px solid black", height:"auto" }}
        onClick={this.handleTableClick}
        onDoubleClick={this.handleTableDoubleClick}
      >
        <tbody>
          <tr>
            <td>col-1</td>
            <td>col-2</td>
            <td>col-3</td>
          </tr>
          <tr>
            <td>col-4</td>
            <td>col-5</td>
            <td>col-6</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Table;

