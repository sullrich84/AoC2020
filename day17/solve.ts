// @deno-types="npm:@types/lodash"
import _, { split } from "npm:lodash"
import { read } from "../utils/Reader.ts"
import { wait } from "../utils/utils.ts"

type Puzzle = string[][]

const [task, sample] = read("day17")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((l) => l.split("")))

console.clear()
console.log("🎄 Day 17: Conway Cubes")

const runPart1 = true
const runPart2 = false
const runBoth = true

/// Part 1

type Grid = { z: number; y: number; x: number; cube: string }[]
type Cube = { z: number; y: number; x: number }

// function drawGrid(grid: Grid) {
//   const ys = grid.map(({ y }) => y)
//   const xs = grid.map(({ x }) => x)
//   const [yMin, yMax] = [_.min(ys), _.max(ys)]
//   const [xMin, xMax] = [_.min(xs), _.max(xs)]
//
//   for (const y of _.range(yMin, yMax + 1)) {
//     let line = ""
//     for (const x of _.range(xMin, xMax + 1)) {
//       const cube = grid.findIndex((cube) => cube.y === y && cube.x === x)
//       line += cube === -1 ? "." : "#"
//     }
//     console.log(line)
//   }
//
//   wait()
// }

const solve1 = (data: Puzzle, rounds = 6) => {
  const grid = data
    .map((row, y) => row.map((cube, x) => ({ z: 0, y, x, cube }))).flat()
    .filter(({ cube }) => cube == "#")
    .map(({ y, x, z }) => ({ z, y, x }))

  function neighbors(cube: Cube) {
    const arr = []
    const win = [-1, 0, 1]

    for (const dz of win) {
      for (const dy of win) {
        for (const dx of win) {
          const nCube = { z: cube.z + dz, y: cube.y + dy, x: cube.x + dx }
          if (_.isEqual(cube, nCube)) continue
          arr.push(nCube)
        }
      }
    }

    return arr
  }

  // console.log(grid)
  // console.log(_.intersectionWith(grid, [{ z: 0, y: 0, x: 1 }], _.isEqual))

  let state = _.cloneDeep(grid)
  for (let r = 0; r < rounds; r++) {
    const nState = []

    const zs = state.map(({ z }) => z)
    const ys = state.map(({ y }) => y)
    const xs = state.map(({ x }) => x)

    const [zMin, zMax] = [_.min(zs)! - 1, _.max(zs)! + 1]
    const [yMin, yMax] = [_.min(ys)! - 1, _.max(ys)! + 1]
    const [xMin, xMax] = [_.min(xs)! - 1, _.max(xs)! + 1]

    for (const z of _.range(zMin, zMax + 1)) {
      for (const y of _.range(yMin, yMax + 1)) {
        for (const x of _.range(xMin, xMax + 1)) {
          const cube = { z, y, x }
          const active = _.some(state, cube)
          const neighbor = neighbors(cube)
          const nActive = _.intersectionWith(state, neighbor, _.isEqual).length

          if (active && (nActive == 2 || nActive == 3)) nState.push(cube)
          if (!active && nActive == 3) nState.push(cube)
        }
      }
    }

    state = _.cloneDeep(nState)
  }

  return state.length
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
