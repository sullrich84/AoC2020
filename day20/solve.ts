// @deno-types="npm:@types/lodash"
import _, { groupBy, times } from "npm:lodash"
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
const runBoth = false

type Tile = { id: number; tile: string[]; edges: string[] }

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

const TOP = 0
const RIGHT = 1
const BOTTOM = 2
const LEFT = 3

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

function tilesWithAllEdges(data: Puzzle) {
  return data.map(([id, tile]) => {
    const all = allCombinations(tile).map((c) => edges(c)).flat()
    return { id, tile, edges: all }
  })
}

function allTilesWithEdges(data: Puzzle) {
  return data.map(([id, tile]) => {
    const allTiles = allCombinations(tile)
    return allTiles.map((t) => ({ id, t, edges: edges(t) }))
  }).flat()
}

/// Part 1

const solve1 = (data: Puzzle) => {
  const tiles = tilesWithAllEdges(data)
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
  const twae = tilesWithAllEdges(data)
  const cornerIds = twae.filter((t) => adjacents(t, twae) == 2).map((t) => t.id)
  const outerIds = twae.filter((t) => adjacents(t, twae) == 3).map((t) => t.id)
  const innerIds = twae.filter((t) => adjacents(t, twae) == 4).map((t) => t.id)

  const len = Math.sqrt(data.length)
  const photo = _.times(len, () => _.times(len, () => [""]))
  const tiles = allTilesWithEdges(data)

  // console.log(allCombinations(flip(x)).map((r) => r.join("\n")).join("\n\n"))
  // console.log()
  // console.log()

  const taken = new Set()
  for (let y = 0; y < len; y++) {
    for (let x = 0; x < len; x++) {
      if (y == 0 && x == 0) {
        // Since we can rotate and flip all tiles
        // we can just pick the first corner tile
        // and make it out top left starting corner
        const topLeftId = _.first(cornerIds)!
        const topLeft = tiles.find((t) => t.id == topLeftId)

        photo[y][x] = topLeft
        taken.add(topLeft.id)

        console.log(`${topLeft.id} will be our starting tile`)
        continue
      }

      let rest = tiles.filter((t) => !taken.has(t.id))
      if ((y == 0 || y == len - 1) && (x == 0 || x == len - 1)) {
        // Corner case -> next tile should be a corner tile
        rest = cornerIds.filter((t) => !taken.has(t.id))
      }

      if (y == 0) {
        // Tile should only match with left adjacent
        const left = photo[y][x - 1]
        const nextTile = rest.filter((t) => left.edges[RIGHT] == t.edges[LEFT])

        if (nextTile.length != 1) console.log("Invalid nexts", y, x)
        photo[y][x] = _.first(nextTile)!
        taken.add(nextTile.id)
        continue
      }

      if (x == 0) {
        // Tile should only match with top adjacent
        const top = photo[y - 1][x]
        const nextTile = rest.filter((t) => top.edges[BOTTOM] == t.edges[TOP])

        if (nextTile.length != 1) console.log("Invalid nexts", y, x)
        photo[y][x] = _.first(nextTile)!
        taken.add(nextTile.id)
        continue
      }
    }
  }

  console.log("-------------------------")

  const image = [
    ".####...#####..#...###..",
    "#####..#..#.#.####..#.#.",
    ".#.#...#.###...#.##.##..",
    "#.#.##.###.#.##.##.#####",
    "..##.###.####..#.####.##",
    "...#.#..##.##...#..#..##",
    "#.##.#..#.#..#..##.#.#..",
    ".###.##.....#...###.#...",
    "#.####.#.#....##.#..#.#.",
    "##...#..#....#..#...####",
    "..#.##...###..#.#####..#",
    "....#.##.#.#####....#...",
    "..##.##.###.....#.##..#.",
    "#...#...###..####....##.",
    ".#.##...#.##.#.#.###...#",
    "#.###.#..####...##..#...",
    "#.###...#.##...#.######.",
    ".###.###.#######..#####.",
    "..##.#..#..#.#######.###",
    "#.#..##.########..#..##.",
    "#.#####..#.#...##..#....",
    "#....##..#.#########..##",
    "#...#.....#..##...###.##",
    "#..###....##.#...##.##.#",
  ]

  const monster = [
    [0, 18],
    [1, 0],
    [1, 5],
    [1, 6],
    [1, 11],
    [1, 12],
    [1, 17],
    [1, 18],
    [1, 19],
    [2, 1],
    [2, 4],
    [2, 7],
    [2, 10],
    [2, 13],
    [2, 16],
  ]

  let roughness = image
    .map((r) => r.split(""))
    .flat()
    .filter((r) => r == "#")
    .length

  for (let y = 0; y < image.length; y++) {
    for (let x = 0; x < image[y].length; x++) {
      let matches = 0
      for (const [dy, dx] of monster) {
        if ((image[y + dy] || "")[x + dx] == "#") {
          matches += 1
        }
      }
      if (matches == monster.length) {
        roughness -= monster.length
      }
    }
  }

  return roughness
}

const solve2Sample = runPart2 ? solve2(sample, 1951) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task, 2801) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
