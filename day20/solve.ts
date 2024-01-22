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
const runBoth = true

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
    return allTiles.map((tile) => ({ id, tile, edges: edges(tile) }))
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

  const tiles = allTilesWithEdges(data)
  const corners = tiles.filter((t) => _.includes(cornerIds, t.id))
  const outers = tiles.filter((t) => _.includes(outerIds, t.id))
  const inners = tiles.filter((t) => _.includes(innerIds, t.id))

  const len = Math.sqrt(data.length)

  const blank = { id: 0, tile: [""], edges: [""] }
  let photo = _.times(len, () => _.times(len, () => blank))

  start: for (let cId = 0; cId < cornerIds.length; cId++) {
    const taken = new Set()
    photo = _.times(len, () => _.times(len, () => blank))

    for (let y = 0; y < len; y++) {
      for (let x = 0; x < len; x++) {
        if (y == 0 && x == 0) {
          const topLeft = corners[cId]

          photo[y][x] = topLeft
          taken.add(topLeft.id)

          continue
        }

        let rest = []
        if ((y == 0 || y == len - 1) && (x == 0 || x == len - 1)) {
          // Corner case -> next tile should be a corner tile
          rest = corners.filter((t) => !taken.has(t.id))
        } else if ((y == 0 || y == len - 1) || (x == 0 || x == len - 1)) {
          // Edge case - next tile should be outer tile
          rest = outers.filter((t) => !taken.has(t.id))
        } else {
          rest = inners.filter((t) => !taken.has(t.id))
        }

        const top = (photo[y - 1] || [])[x]
        const left = (photo[y] || [])[x - 1]
        let nextTiles = []

        if (y == 0) {
          // Tile should only match with left adjacent
          nextTiles = rest
            .filter((t) => left.edges[RIGHT] == t.edges[LEFT])
        } else if (x == 0) {
          // Tile should only match with top adjacent
          nextTiles = rest
            .filter((t) => top.edges[BOTTOM] == t.edges[TOP])
        } else {
          // Tile should match top and left adjacents
          nextTiles = rest
            .filter((t) => top.edges[BOTTOM] == t.edges[TOP])
            .filter((t) => left.edges[RIGHT] == t.edges[LEFT])
        }

        if (nextTiles.length == 0) continue start

        const nextTile = _.first(nextTiles)!
        photo[y][x] = nextTile
        taken.add(nextTile.id)
      }
    }
    break
  }

  let image = []

  for (let y = 0; y < len; y++) {
    for (let l = 1; l < 9; l++) {
      let line = ""
      for (let x = 0; x < len; x++) {
        line += photo[y][x].tile[l].substring(1, 9)
      }
      image.push(line)
    }
  }

  _.times(0, () => image = rotate(image))
  console.log(image.join("\n"))

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

  let monsters = 0
  const roughness = image
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
        monsters += 1
      }
    }
  }

  return [roughness, monsters, roughness - monsters * monster.length]
}

const solve2Sample = runPart2 ? solve2(sample, 1951) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task, 2801) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
