// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = [string, number][]

const [task, sample] = read("day12")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((l) => [l[0], parseInt(l.substring(1))]))

console.clear()
console.log("🎄 Day 12: Rain Risk")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const dir = [
  [-1, 0, "↑"], // North
  [0, +1, "→"], // East
  [+1, 0, "↓"], // South
  [0, -1, "←"], // West
]

const solve1 = (data: Puzzle) => {
  let [y, x] = [0, 0]
  let facing = 1

  for (const [cmd, val] of data) {
    switch (cmd) {
      case "F":
        y += val * dir[facing][0]
        x += val * dir[facing][1]
        break
      case "N":
        y -= val
        break
      case "S":
        y += val
        break
      case "E":
        x += val
        break
      case "W":
        x -= val
        break
      case "L":
        facing = (facing - (val / 90) + 4) % 4
        break
      case "R":
        facing = (facing + (val / 90) + 4) % 4
        break
    }
  }

  return Math.abs(y) + Math.abs(x)
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  let [y, x] = [0, 0]
  let [wy, wx] = [-1, 10]

  for (const [cmd, val] of data) {
    switch (cmd) {
      case "F":
        y += val * wy
        x += val * wx
        break
      case "N":
        wy -= val
        break
      case "S":
        wy += val
        break
      case "E":
        wx += val
        break
      case "W":
        wx -= val
        break
      case "L": {
        let ccRot = val
        while (ccRot > 0) {
          ;[wy, wx] = [-wx, wy]
          ccRot -= 90
        }
        break
      }
      case "R": {
        let cwRot = val
        while (cwRot > 0) {
          ;[wy, wx] = [wx, -wy]
          cwRot -= 90
        }
        break
      }
    }
  }

  return Math.abs(y) + Math.abs(x)
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
