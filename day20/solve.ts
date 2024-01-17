// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = [number, string[]][]

const [task, sample] = read("day20")
  .map((file) => file.split("\n\n").slice(0, -1))
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
  const reverse = (str: string) => str.split("").reverse().join("")
  const rotate = (arr: string[]) => [arr[3], arr[0], arr[1], arr[2]]
  const toDirObject = (arr: string[]) => ({
    north: arr[0],
    east: arr[1],
    south: arr[2],
    west: arr[3],
  })

  const edges = []
  for (const [id, grid] of data) {
    const north = _.first(grid)!
    const south = _.last(grid)!
    const east = grid.map((c) => _.last(c)!).join("")
    const west = grid.map((c) => _.first(c)!).join("")

    const edge0 = [north, east, south, west]
    const edge90 = rotate(edge0)
    const edge180 = rotate(edge90)
    const edge270 = rotate(edge180)

    edges.push({ id, rot: 0, ...toDirObject(edge0) })
    edges.push({ id, rot: 1, ...toDirObject(edge90) })
    edges.push({ id, rot: 2, ...toDirObject(edge180) })
    edges.push({ id, rot: 3, ...toDirObject(edge270) })
  }

  const corners = new Set()

  // Find corner pieces which only have 2 matching adjecants
  // for (let i = 0; i < edges.length; i += 8) {
  //   const { id, north, east, south, west } = edges[i]
  //   if (corners.has(id)) continue
  //   const rest = edges.filter((e) => e.id != id)
  //
  //   const matches = rest.filter((e) =>
  //     e.north == south || e.east == west || e.south == north || e.west == east
  //   )
  //   console.log(id, south, matches.length)
  // }

  return edges.filter((e) => e.id == 2473)
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
