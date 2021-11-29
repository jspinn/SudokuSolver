import React from 'react';

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()} style={{backgroundColor: props.bgColor}}>
      { props.value }
    </button>
  );
}

class Board extends React.Component {
  renderSquare(r, c) {
    return (
    <Square
      value={this.props.grid[r][c]}
      bgColor={this.props.bgColors[r][c]}
      onClick={() => this.props.onClick(r, c)}
      />
    );
  }

  renderRow(r) {
    return (
      <div className="board-row">
        {this.renderSquare(r, 0)}
        {this.renderSquare(r, 1)}
        {this.renderSquare(r, 2)}
        {this.renderSquare(r, 3)}
        {this.renderSquare(r, 4)}
        {this.renderSquare(r, 5)}
        {this.renderSquare(r, 6)}
        {this.renderSquare(r, 7)}
        {this.renderSquare(r, 8)}
      </div>
    )
  }

  render() {
    return (
      <div className="board">
        {this.renderRow(0)}
        {this.renderRow(1)}
        {this.renderRow(2)}
        {this.renderRow(3)}
        {this.renderRow(4)}
        {this.renderRow(5)}
        {this.renderRow(6)}
        {this.renderRow(7)}
        {this.renderRow(8)}
      </div>
    );
  }
}

export { Board as default};