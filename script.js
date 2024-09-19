// Defining gameBoard.
const routes = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [-2, 1],
    [2, -1],
    [-2, -1],
  ];
  
  class Node {
    constructor(column, row) {
      this.column = column;
      this.row = row;
    }
  }
  
  class matrix {
    constructor(size) {
      this.matrix = Array.from({ length: size }, () => Array(size).fill(null));
      this.size = size;
      console.log(this.matrix);
    }
  
    setNodeValue(row, column, value) {
      this.matrix[row][column] = new Node(value[0], value[1]);
      console.log(this.matrix);
    }
  
  
    isInBounds(row, column) {
      return row >= 0 && row < this.size && column >= 0 && column < this.size;
    }
  
    reconstructPath(parent, end) {
      let path = [];
      let current = end;
      while (current) {
        path.unshift(current);
        current = parent.get(`${current.row},${current.column}`);
      }
      return path;
    }
  
    BFS(start, end) {
      const queue = [start];
      const visited = new Set();
      const parent = new Map();
      const distance = new Map();
  
      visited.add(`${start.row},${start.column}`);
      distance.set(`${start.row},${start.column}`, 0);
  
      while (queue.length > 0) {
        const current = queue.shift();
  
        if (current.row === end.row && current.column === end.column) {
          console.log("Reached the end!")
          const path = this.reconstructPath(parent, end);
          console.log("Shortest path:", path);
          console.log("Distance:", distance.get(`${end.row},${end.column}`));
        }
  
        for (const [dx, dy] of routes) {
          const newRow = current.row + dx;
          const newColumn = current.column + dy;
          const newNode = new Node(newColumn, newRow);
          
          if(this.isInBounds(newRow, newColumn) && !visited.has(`${newRow},${newColumn}`)) {
            visited.add(`${newRow},${newColumn}`);
            queue.push(newNode);
            parent.set(`${newRow},${newColumn}`, current);
            distance.set(`${newRow},${newColumn}`, distance.get(`${current.row},${current.column}`) + 1);
          }
      
        }
      }
      console.log("No path found.");
    }
  }
  
  const knightMatrix = new matrix(8);
  const start = new Node(0, 0);
  const end = new Node(6, 7);
  
  knightMatrix.BFS(start, end);
  
  