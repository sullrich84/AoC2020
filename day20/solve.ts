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
  return tile.map((r) => r.split("").reverse().join(""))
}

function rotate(tile: string[]) {
  const splitted = tile.reverse().map((r) => r.split(""))
  return _.zip(...splitted).map((r) => r.join(""))
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
    const allEdges = [...edges(tile), ...flip(edges(tile))]
    return { id, tile, edges: allEdges }
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
  const tiles = []

  for (const [id, rawTile] of data) {
    let tile = rawTile
    for (let rot = 0; rot < 4; rot++) {
      tiles.push({ id, tile })
      tile = rotate(tile)
    }

    let revTile = rawTile.map((r) => r.split("").reverse().join(""))
    for (let rot = 0; rot < 4; rot++) {
      tiles.push({ id, tile: revTile })
      revTile = rotate(revTile)
    }
  }

  const corners = tiles
    .filter((corner) =>
      tiles
        .filter(({ id }) => id != corner.id)
        .filter(({ edges }) => lineUp(edges, corner.edges)).length == 2
    )
    .map(({ id }) => id)

  const len = Math.sqrt(data.length)
  const start = tiles.filter(({ id }) => id == topLeftId)

  const photo = _.times(len, () => _.times(len, () => [""]))
  const placed = new Set()

  // console.log(start)

  for (let y = 0; y < len; y++) {
    for (let x = 0; x < len; x++) {
      // Set corner tile as starting tile
      if (y == 0 && x == 0) {
        photo[y][x] = start.tile
        placed.add(start.id)
        continue
      }

      const prevRight = (_.get(photo, [y, x - 1]) || [])
        .map((c) => c[9]).join("")

      const notPlaced = tiles.filter(({ id }) => !placed.has(id))
    }
  }

  return 0
}

const solve2Sample = runPart2 ? solve2(sample, 1951) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task, 2801) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
