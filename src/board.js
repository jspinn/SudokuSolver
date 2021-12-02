import React from 'react';

function Square(props) {
  const style = {
    backgroundColor: props.bgColor,
    borderBottomWidth: props.bottomBorder,
    borderRightWidth: props.rightBorder
  }
  return (
    <button className="square" onClick={() => props.onClick()} onContextMenu={() => props.onContextMenu()} style={style}>
      { props.value }
    </button>
  );
}

class Board extends React.Component {
  renderSquare(r, c, rightBorder, bottomBorder) {
    return (
    <Square
      value={this.props.grid[r][c]}
      bgColor={this.props.bgColors[r][c]}
      onClick={() => this.props.onClick(r, c)}
      onContextMenu={() => this.props.onContextMenu(r, c)}
      rightBorder={rightBorder}
      bottomBorder={bottomBorder}
      />
    );
  }

  renderRow(r) {
    const THICK_BORDER = 4
    const THIN_BORDER = 2
    var bottomBorder = THIN_BORDER
    if (r !== 8 && (r + 1) % 3 === 0) {
      bottomBorder = THICK_BORDER
    }

    return (
      <div className="board-row">
        {this.renderSquare(r, 0, THIN_BORDER, bottomBorder)}
        {this.renderSquare(r, 1, THIN_BORDER, bottomBorder)}
        {this.renderSquare(r, 2, THICK_BORDER, bottomBorder)}
        {this.renderSquare(r, 3, THIN_BORDER, bottomBorder)}
        {this.renderSquare(r, 4, THIN_BORDER, bottomBorder)}
        {this.renderSquare(r, 5, THICK_BORDER, bottomBorder)}
        {this.renderSquare(r, 6, THIN_BORDER, bottomBorder)}
        {this.renderSquare(r, 7, THIN_BORDER, bottomBorder)}
        {this.renderSquare(r, 8, THIN_BORDER, bottomBorder)}
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