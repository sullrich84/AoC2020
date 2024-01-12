// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string[][]

const [task, sample] = read("day17")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((l) => l.split("")))

console.clear()
console.log("🎄 Day 17: Conway Cubes")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

type HyperCube = { w: number; z: number; y: number; x: number }

const solve = (data: Puzzle, extraDim = false) => {
  const grid: Map<string, HyperCube> = new Map()

  function key({ w, z, y, x }: HyperCube) {
    return [w, z, y, x].join(":")
  }

  data
    .map((row, y) => row.map((cube, x) => ({ w: 0, z: 0, y, x, cube }))).flat()
    .filter(({ cube }) => cube == "#")
    .map(({ w, y, x, z }) => ({ w, z, y, x }))
    .forEach((cube) => grid.set(key(cube), cube))

  function neighbors(cube: HyperCube) {
    const arr = []
    const win = [-1, 0, 1]

    for (const dw of extraDim ? win : [0]) {
      for (const dz of win) {
        for (const dy of win) {
          for (const dx of win) {
            const nCube = {
              w: cube.w + dw,
              z: cube.z + dz,
              y: cube.y + dy,
              x: cube.x + dx,
            }
            if (_.isEqual(cube, nCube)) continue
            arr.push(nCube)
          }
        }
      }
    }

    return arr
  }

  let state = _.clone(grid)
  for (let r = 0; r < 6; r++) {
    const nState: Map<string, HyperCube> = new Map()
    const stateValues = [...state.values()]

    const ws = stateValues.map(({ w }) => w)
    const zs = stateValues.map(({ z }) => z)
    const ys = stateValues.map(({ y }) => y)
    const xs = stateValues.map(({ x }) => x)

    const [wMin, wMax] = [_.min(ws)! - 1, _.max(ws)! + 1]
    const [zMin, zMax] = [_.min(zs)! - 1, _.max(zs)! + 1]
    const [yMin, yMax] = [_.min(ys)! - 1, _.max(ys)! + 1]
    const [xMin, xMax] = [_.min(xs)! - 1, _.max(xs)! + 1]

    for (const w of _.range(wMin, wMax + 1)) {
      for (const z of _.range(zMin, zMax + 1)) {
        for (const y of _.range(yMin, yMax + 1)) {
          for (const x of _.range(xMin, xMax + 1)) {
            const cube = { w, z, y, x }
            const cubeKey = key(cube)

            const active = state.has(cubeKey)
            const neighborKeys = neighbors(cube).map((n) => key(n))
            const nActive = neighborKeys.filter((nk) => state.has(nk)).length

            const rule1 = active && (nActive == 2 || nActive == 3)
            const rule2 = !active && nActive == 3
            if (rule1 || rule2) nState.set(cubeKey, cube)
          }
        }
      }
    }

    state = _.cloneDeep(nState)
  }

  return state.size
}

const solve1Sample = runPart1 ? solve(sample, false) : "skipped"
const solve1Task = runPart1 && runBoth ? solve(task, false) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2Sample = runPart2 ? solve(sample, true) : "skipped"
const solve2Task = runPart2 && runBoth ? solve(task, true) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
