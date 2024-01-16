// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = [number, string[]][]

const [task, sample] = read("day20")
  .map((file) => file.split("\n\n"))
  .map((file) =>
    file.map((packet) => {
      const [tile, ...grid] = packet.split("\n")
      const id = parseInt(tile.substring(5, 9))
      return [id, grid.filter((r) => r != "")]
    })
  )

console.clear()
console.log("🎄 Day 20: Jurassic Jigsaw")

const runPart1 = true
const runPart2 = false
const runBoth = false

/// Part 1

const solve1 = (data: Puzzle) => {
  const len = Math.sqrt(data.length)
  const grids: Record<number, Record<string, string[][]>> = {}
  const reverse = (str: string) => str.split("").reverse().join("")
  const rotate = (arr: string[3]) => [arr[3], arr[0], arr[1], arr[2]]

  for (const [id, grid] of data) {
    const north = _.first(grid)
    const east = grid.map((c) => _.last(c)).join("")
    const south = reverse(_.last(grid))
    const west = reverse(grid.map((c) => _.first(c)).join(""))
    
    grids[id] = { 0: [], 90: [], 180: [], 270: []}
    grids[id][0] = [north, east, south, west]
    grids[id][90] = rotate(grids[id][0])
    grids[id][180] = rotate(grids[id][90])
    grids[id][270] = rotate(grids[id][180])
  }

  return grids[3079]
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
