// @deno-types="npm:@types/lodash"
import _, { times } from "npm:lodash"
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
const runPart2 = true
const runBoth = true

type Edges = [string, string, string, string]
type Tile = { id: number; tile: string[]; edges: Edges }

function top(tile: string[]) {
  return _.first(tile)!
}

function bottom(tile: string[]) {
  return _.last(tile)!
}

function right(tile: string[]) {
  return tile.map((c) => _.last(c)).join("")
}

function left(tile: string[]) {
  return tile.map((c) => _.first(c)).join("")
}

function edges(tile: string[]) {
  return [top(tile), right(tile), bottom(tile), left(tile)]
}

function flip(tile: string[]) {
  return tile.map((r) => r.split("").toReversed().join(""))
}

function rotate(tile: string[]) {
  const splitted = tile.toReversed().map((r) => r.split(""))
  return _.zip(...splitted).map((r) => r.join(""))
}

function allCombinations(tile: string[]) {
  return [tile, flip(tile)]
    .map((t) => [t, rotate(t), rotate(rotate(t)), rotate(rotate(rotate(t)))])
    .flat()
}

function lineUp(a: string[], b: string[]) {
  return _.intersection(a, b).length > 0
}

function adjacents(tile: Tile, tiles: Tile[]) {
  return tiles
    .filter((t) => t.id != tile.id)
    .filter((t) => lineUp(t.edges, tile.edges))
    .length
}

/// Part 1

const solve1 = (data: Puzzle) => {
  const tiles = data.map(([id, tile]) => {
    const all = allCombinations(tile).map((c) => edges(c)).flat()
    return { id, tile, edges: all }
  })

  const corners = tiles.filter((t) => adjacents(t, tiles) == 2).map((t) => t.id)
  return [corners, corners.reduce((p, c) => p * c, 1)]
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle, topLeftId: number) => {
  const len = Math.sqrt(data.length)
  const photo = _.times(len, () => _.times(len, () => [""]))

  const tiles = data.map(([id, tile]) =>
    allCombinations(tile)
      .map((tile) => ({ id, tile, edges: edges(tile) }))
      .flat()
  ).flat()

  // console.log(allCombinations(flip(x)).map((r) => r.join("\n")).join("\n\n"))
  // console.log()
  // console.log()

  for (let y = 0; y < len; y++) {
    for (let x = 0; x < len; x++) {
    }
  }

  return tiles
}

const solve2Sample = runPart2 ? solve2(sample, 1951) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task, 2801) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
