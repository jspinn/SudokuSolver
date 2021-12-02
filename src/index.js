import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board.js';
import SolutionGenerator from './solutiongenerator.js';
import './index.css';

class SudokuSolver extends React.Component {
  constructor(props) {
    super(props);
    const n = 9
    this.invalidColor = "#ff7fe5";

    this.state = {
      grid: Array(n).fill(null).map(() => new Array(n).fill(null)),
      solutionGrid: Array(n).fill(null).map(() => new Array(n).fill(null)),
      bgColors: Array(n).fill("").map(() => new Array(n).fill("")),
      invalidRows: Array(n).fill(false),
      invalidCols: Array(n).fill(false),
      invalidSubgrids: Array(n / 3).fill(false).map(() => new Array(false).fill(null)),
      valid: true
    };
  }

  handleClick(r,c) {
    const grid = this.state.grid
    
    // Set to 1 if square blank
    if (grid[r][c] == null) {
      grid[r][c] = 1
    // Set back to blank if square already 9
    } else if (grid[r][c] === 9) {
      grid[r][c] = null
    // Increment digit otherwise
    } else {
      grid[r][c] = grid[r][c] + 1
    }

    this.setState({
      grid: grid,
    });

    this.checkEntryValidity(r,c);
  }

  handleRightClick(r,c) {
    const grid = this.state.grid
    
    // Set to 1 if square blank
    if (grid[r][c] == null) {
      grid[r][c] = 9
    // Set back to blank if square already 9
    } else if (grid[r][c] === 1) {
      grid[r][c] = null
    // Increment digit otherwise
    } else {
      grid[r][c] = grid[r][c] - 1
    }

    this.setState({
      grid: grid,
    });

    this.checkEntryValidity(r,c);
  }

  checkEntryValidity(r,c) {
    // Check if valid along row
    const invalidRows = this.state.invalidRows;
    if (this.checkRowValid(r)) {
      invalidRows[r] = false
    } else {
      console.log("Invalid row: " + r);
      invalidRows[r] = true
    }

    // Check if valid along column
    const invalidCols = this.state.invalidCols;
    if (this.checkColValid(c)) {
      invalidCols[c] = false
    } else {
      console.log("Invalid col: " + c);
      invalidCols[c] = true
    }

    // Check if valid within subgrid
    const subgridRow = Math.floor(r / 3);
    const subgridCol = Math.floor(c / 3);
    const invalidSubgrids = this.state.invalidSubgrids;
    if (this.checkSubgridValid(subgridRow, subgridCol)) {
      invalidSubgrids[subgridRow][subgridCol] = false
    } else {
      console.log("Invalid subgrid: " + subgridRow + "," + subgridCol)
      invalidSubgrids[subgridRow][subgridCol] = true
    }

    this.setState({
      invalidRows: invalidRows,
      invalidCols: invalidCols,
      invalidSubgrids: invalidSubgrids,
    });

    this.updateValidity();
  }

  updateValidity() {
    const bgColors = Array(9).fill("").map(() => new Array(9).fill(""));
    const invalidRows = this.state.invalidRows;
    const invalidCols = this.state.invalidCols;
    const invalidSubgrids = this.state.invalidSubgrids;
    var valid = true

    // Set invalid rows and columns
    for (let i = 0; i < bgColors.length; i++) {
        if (invalidRows[i] === true) {
          this.setRowColor(bgColors, i, this.invalidColor);
          valid = false
        }
        if (invalidCols[i] === true) {
          this.setColColor(bgColors, i, this.invalidColor);
          valid = false
        }
    } 
    
    // Set invalid subgrids
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (invalidSubgrids[r][c] === true) {
          this.setSubgridColor(bgColors, r, c, this.invalidColor);
          valid = false
        }
      }
    }

    this.setState({
      bgColors: bgColors,
      valid: valid
    });
  }
  
  checkRowValid(r) {
    const used = new Set();
    const grid = this.state.grid;
    
    for (let c = 0; c < grid.length; c++) {
      if (grid[r][c] != null) {
        if (used.has(grid[r][c])) {
          return false;
        }
        used.add(grid[r][c]);
      }
    }
    return true;
  }
  
  checkColValid(c) {
    const used = new Set();
    const grid = this.state.grid;
    
    for (let r = 0; r < grid.length; r++) {
      if (grid[r][c] != null) {
        if (used.has(grid[r][c])) {
          return false;
        }
        used.add(grid[r][c])
      }
    }
    return true;
  }
  
  checkSubgridValid(r,c) {
    // To get the top left corner of subgrid
    r *= 3;
    c *= 3;
    const used = new Set();
    const grid = this.state.grid;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[r + i][c + j] != null) {
          if (used.has(grid[r + i][c + j])) {
            return false;
          }
          used.add(grid[r + i][c + j])
        }
      }
    }
    return true;
  }

  setRowColor(bgColors, r, color) {
    for (let c = 0; c < bgColors.length; c++) {
      bgColors[r][c] = color;
    }
  }

  setColColor(bgColors, c, color) {
    for (let r = 0; r < bgColors.length; r++) {
      bgColors[r][c] = color;
    }
  }

  setSubgridColor(bgColors, r, c, color) {
    r *= 3;
    c *= 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        bgColors[r + i][c + j] = color;
      }
    }
  }

  reset() {
    const n = 9
    this.setState({
      grid: Array(n).fill(null).map(() => new Array(n).fill(null)),
      solutionGrid: Array(n).fill(null).map(() => new Array(n).fill(null)),
      bgColors: Array(n).fill("").map(() => new Array(n).fill("")),
      invalidRows: Array(n).fill(false),
      invalidCols: Array(n).fill(false),
      invalidSubgrids: Array(n / 3).fill(false).map(() => new Array(false).fill(null)),
      valid: true
    })
  }

  solve() {
    if (this.state.valid === true) {
      const solutionGenerator = new SolutionGenerator(this.state.grid);
      const solution = solutionGenerator.generateSolution();
      this.setState({
        solutionGrid: solution,
      });
    } else {
      console.log("Unable to solve. Invalid puzzle.");
    }
  }

  render() {
    const solutionBgColors = new Array(9).fill("").map(() => new Array(9).fill(""));
    return (
      <div className="solver">
        <div className="game">
          <h1>Sudoku Solver</h1>
          <div className="game-board">
            <div className="puzzle" onContextMenu={(e) => e.preventDefault()}>
              <h2>Puzzle</h2>
              <Board
                grid={this.state.grid}
                bgColors={this.state.bgColors}
                onClick={(r,c) => this.handleClick(r,c)}
                onContextMenu={(r,c) => this.handleRightClick(r,c)}
              />
            </div>
            <div className="solution">
              <h2>Solution</h2>
              <Board
                grid={this.state.solutionGrid}
                bgColors={solutionBgColors}
                onClick={() => {}}
              />
            </div>
          </div>
          <button className="button" onClick={() => this.solve()} disabled={!this.state.valid}>Solve</button>
          <button className="button" onClick={() => this.reset()}>Reset</button>
        </div>

      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <SudokuSolver />,
  document.getElementById('root')
);
