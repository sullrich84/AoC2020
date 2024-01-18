// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = [number, string[]][]
type Tile = { id: number; edges: Set<string> }

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

/// Part 1

const solve1 = (data: Puzzle) => {
  const tiles: Tile[] = []
  for (const [id, grid] of data) {
    const edges = [
      grid[0],
      grid[9],
      grid.map((c) => c[0]).join(""),
      grid.map((c) => c[9]).join(""),
    ]

    tiles.push({
      id,
      edges: new Set([
        ...edges,
        ...edges.map((e) => e.split("").reverse().join("")),
      ]),
    })
  }

  const corners = tiles
    .filter(({ id, edges: [n, e, s, w] }) =>
      2 == tiles
        .filter((t) => t.id != id)
        .filter(({ edges: x }) => x.has(n) || x.has(e) || x.has(s) || x.has(w))
        .length
    )
    .map(({ id }) => id)

  return [corners, corners.reduce((p, c) => p * c, 1)]
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  const tiles = []

  const rotate = (arr: string[]) =>
    _.zip(...arr.reverse().map((r) => r.split(""))).map((r) => r.join(""))

  for (const [id, g] of data) {
    let grid = g
    for (let rot = 0; rot < 4; rot++) {
      const top = grid[0]
      const bottom = grid[9]
      const left = grid.map((r) => r[0]).join("")
      const right = grid.map((r) => r[9]).join("")
      tiles.push({ id, rot, flip: 0, grid, left, right, top, bottom })
      grid = rotate(grid)
    }

    let revGrid = g.map((r) => r.split("").reverse().join(""))
    for (let rot = 0; rot < 4; rot++) {
      const top = grid[0]
      const bottom = grid[9]
      const left = grid.map((r) => r[0]).join("")
      const right = grid.map((r) => r[9]).join("")
      tiles.push({ id, rot, flip: 1, grid: revGrid, left, right, top, bottom })
      revGrid = rotate(revGrid)
    }
  }

  const len = Math.sqrt(data.length)
  const grid = _.times(len, () => _.times(len, () => null))

  const rows = []
  for (const tile of tiles) {
    const row = [tile]

    for (const nextTile of tiles) {
      if (tile.id == nextTile.id) continue
      const prev = _.last(row)!
      if (prev.right == nextTile.left) row.push(nextTile)
    }
  }

  return tiles.length
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
