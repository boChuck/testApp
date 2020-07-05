import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class MoviesTable extends Component {
  columns = [
    {
      path: "name",
      label: "name",
      content: movie => <Link to={`/movies/${movie.productId}`}>{movie.name}</Link>
    },
    { path: "description", label: "description" },
    { path: "price", label: "price" }
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;
    console.log("movies");
    console.log(this.props);
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
