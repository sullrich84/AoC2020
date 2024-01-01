// @deno-types="npm:@types/lodash"
import _, { add, flatMap, round } from "npm:lodash"
import { read } from "../utils/Reader.ts"
import { wait } from "../utils/utils.ts"

type Puzzle = string[][]

const [task, sample] = read("day11")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((l) => l.split("")))

console.clear()
console.log("🎄 Day 11: Seating System")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const window = [
  [-1, -1],
  [-1, 0],
  [-1, +1],
  [0, -1],
  [0, +1],
  [+1, -1],
  [+1, 0],
  [+1, +1],
]

function checkAdj(grid: Puzzle, y: number, x: number) {
  const adj = window.map(([dy, dx]) => (grid[y + dy] || [])[x + dx] || null)
  return _.countBy(adj, (t) => t)["#"] || 0
}

function checkDir(grid: Puzzle, y: number, x: number) {
  let adj = 0
  const [yLen, xLen] = [grid.length, grid[0].length]

  for (const [dy, dx] of window) {
    let [ny, nx] = [y, x]
    while (ny >= 0 && ny < yLen && nx >= 0 && nx < xLen) {
      ;[ny += dy, nx += dx]
      if (!_.inRange(ny, 0, yLen) || !_.inRange(nx, 0, xLen)) continue
      if (grid[ny][nx] == ".") continue
      if (grid[ny][nx] == "#") adj += 1
      break
    }
  }

  return adj
}

const solve = (
  grid: Puzzle,
  checkFn: (grid: Puzzle, y: number, x: number) => number,
  maxAdj: number,
) => {
  const seen = new Set()

  while (true) {
    const nGrid = _.cloneDeep(grid)
    for (const [y, row] of grid.entries()) {
      for (const [x, tile] of row.entries()) {
        if (tile == ".") continue
        const adjOcc = checkFn(grid, y, x)
        if (tile == "L" && adjOcc == 0) nGrid[y][x] = "#"
        else if (tile == "#" && adjOcc >= maxAdj) nGrid[y][x] = "L"
      }
    }

    const flatGrid = _.flatMap(nGrid)
    const cacheKey = flatGrid.join("")

    if (seen.has(cacheKey)) {
      return _.flatMap(nGrid).filter((t) => t == "#").length
    }

    seen.add(cacheKey)
    grid = nGrid
  }
}

const solve1Sample = runPart1 ? solve(sample, checkAdj, 4) : "skipped"
const solve1Task = runPart1 && runBoth ? solve(task, checkAdj, 4) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2Sample = runPart2 ? solve(sample, checkDir, 5) : "skipped"
const solve2Task = runPart2 && runBoth ? solve(task, checkDir, 5) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
