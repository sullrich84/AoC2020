// @deno-types="npm:@types/lodash"
import _, { flatMap, round } from "npm:lodash"
import { read } from "../utils/Reader.ts"
import { data } from "../day4/data.ts"

type Puzzle = string[][]

const [task, sample] = read("day11")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((l) => l.split("")))

console.clear()
console.log("🎄 Day 11: Seating System")

const runPart1 = true
const runPart2 = false
const runBoth = true

/// Part 1

const window = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

const solve1 = (grid: Puzzle) => {
  const seen = new Set()

  while (true) {
    const nGrid = _.cloneDeep(grid)
    for (const [y, row] of grid.entries()) {
      for (const [x, tile] of row.entries()) {
        if (tile == ".") continue
        const adj = window.map(([dy, dx]) =>
          (grid[y + dy] || [])[x + dx] || null
        )
        const adjOcc = adj.filter((t) => t == "#").length
        if (tile == "L" && adjOcc == 0) nGrid[y][x] = "#"
        else if (tile == "#" && adjOcc >= 4) nGrid[y][x] = "L"
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

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
