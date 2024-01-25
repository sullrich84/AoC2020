// @deno-types="npm:@types/lodash"
import _, { lowerCase } from "npm:lodash"
import { read } from "../utils/Reader.ts"
import { wait } from "../utils/utils.ts"

type Puzzle = ("nw" | "ne" | "w" | "e" | "sw" | "se")[][]

const [task, sample] = read("day24")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) =>
    file.map((line) => {
      const res = []
      const arr = line.split("")

      while (arr.length > 0) {
        const c = arr.shift()
        if (c == "e" || c == "w") res.push(c)
        else res.push(c + arr.shift()!)
      }
      return res
    })
  )

console.clear()
console.log("🎄 Day 24: Lobby Layout")

const runPart1 = true
const runPart2 = true
const runBoth = true

const delta = {
  "nw": [-1, -1],
  "ne": [-1, +1],
  "w": [+0, -2],
  "e": [+0, +2],
  "sw": [+1, -1],
  "se": [+1, +1],
}

function buildHexGrid(data: Puzzle): Set<string> {
  const hexGrid = new Set()

  for (const moves of data) {
    let [y, x] = [0, 0]
    for (const move of moves) {
      const [dy, dx] = delta[move]
      ;[y, x] = [y + dy, x + dx]
    }

    const key = [y, x].join(":")
    if (hexGrid.has(key)) hexGrid.delete(key)
    else hexGrid.add(key)
  }

  return hexGrid
}

/// Part 1

const solve1 = (data: Puzzle) => {
  return buildHexGrid(data).size
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

function getMinMax(hexGrid: Set<string>): number[] {
  const coords = [...hexGrid.keys()]
    .map((k) => k.split(":"))
    .map(([y, x]) => [parseInt(y), parseInt(x)])

  const ys = coords.map(([y, _x]) => y)
  const xs = coords.map(([_y, x]) => x)

  return [_.min(ys), _.max(ys), _.min(xs), _.max(xs)]
}

const solve2 = (data: Puzzle) => {
  const hexGrid = buildHexGrid(data)
  const dirs = _.values(delta)
  let currentHexGrid = _.clone(hexGrid)

  for (let d = 0; d < 100; d++) {
    let nextHexGrid = _.clone(currentHexGrid)
    let [minY, maxY, minX, maxX] = getMinMax(nextHexGrid)

    for (let y = minY - 1; y <= maxY + 1; y++) {
      for (let x = minX - 1; x <= maxX + 1; x++) {
        const adj = dirs
          .map(([dy, dx]) => [y + dy, x + dx])
          .map(([ny, nx]) => [ny, nx].join(":"))
          .map((nk) => currentHexGrid.has(nk))
          .filter((nv) => nv)
          .length

        const key = [y, x].join(":")
        const curBlack = currentHexGrid.has(key)
        if (curBlack && (adj == 0 || adj > 2)) nextHexGrid.delete(key)
        if (!curBlack && (adj == 2)) nextHexGrid.add(key)
      }
    }

    currentHexGrid = nextHexGrid
  }

  return currentHexGrid.size
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
