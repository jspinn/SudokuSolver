
export default class SolutionGenerator {
  constructor(puzzle) {
    this.puzzle = puzzle.map(function(arr) {
      return arr.slice();
    })
  }

  generateSolution() {
    console.log("Solving...");

    var startTime = performance.now();

    // solve
    this.backtrack(0, 0);

    var endTime = performance.now();
    console.log(`Algorithm execution: ${(endTime - startTime).toFixed(2)} ms`);
    
    return this.puzzle;
  }

  backtrack(r, c) {
    // All squares filled
    if (r >= this.puzzle.length) {
      return true;
    }

    // Already filled by user, skip to next square
    if (this.puzzle[r][c] != null) {
      let nextRow = r;
      let nextCol = c + 1;
      if (c >= this.puzzle.length) {
        nextRow += 1;
        nextCol = 0;
      }
      if (this.backtrack(nextRow, nextCol)) {
        return true;
      }
    } else {
      // Try all digit candidates
      for (let digit = 1; digit <= 9; digit++) {
        this.puzzle[r][c] = digit;
        if (this.isValid(r, c)) {
          let nextRow = r;
          let nextCol = c + 1;
          if (c >= this.puzzle.length) {
            nextRow += 1;
            nextCol = 0;
          }
          if (this.backtrack(nextRow, nextCol)) {
            return true;
          }
        }
      }
      this.puzzle[r][c] = null;
    }

  }

  isValid(r, c) {
    return this.checkRowValid(r) && this.checkColValid(c) && this.checkSubgridValid(r, c);
  }

  checkRowValid(r) {
    const used = new Set();
    const puzzle = this.puzzle;
    
    for (let c = 0; c < puzzle.length; c++) {
      if (puzzle[r][c] != null) {
        if (used.has(puzzle[r][c])) {
          return false;
        }
        used.add(puzzle[r][c]);
      }
    }
    return true;
  }

  checkColValid(c) {
    const used = new Set();
    const puzzle = this.puzzle;
    
    for (let r = 0; r < puzzle.length; r++) {
      if (puzzle[r][c] != null) {
        if (used.has(puzzle[r][c])) {
          return false;
        }
        used.add(puzzle[r][c])
      }
    }
    return true;
  }

  checkSubgridValid(r,c) {
    // To get the top left corner of subgrid
    r = Math.floor(r / 3) * 3;
    c = Math.floor(c / 3) * 3;
    const used = new Set();
    const puzzle = this.puzzle;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (puzzle[r + i][c + j] != null) {
          if (used.has(puzzle[r + i][c + j])) {
            return false;
          }
          used.add(puzzle[r + i][c + j])
        }
      }
    }
    return true;
  }
}