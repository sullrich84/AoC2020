// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = number[]

const [task, sample] = read("day1")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((l) => parseInt(l)))

console.clear()
console.log("🎄 Day 1: Report Repair")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = (data: Puzzle) => {
  for (let i = 0; i < data.length; i++) {
    const a = data[i]
    for (let ii = 0; ii < data.length; ii++) {
      const b = data[ii]
      if (a + b == 2020) return a * b
    }
  }
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  for (let i = 0; i < data.length; i++) {
    const a = data[i]
    for (let ii = 0; ii < data.length; ii++) {
      const b = data[ii]
      for (let iii = 0; iii < data.length; iii++) {
        const c = data[iii]
        if (a + b + c == 2020) return a * b * c
      }
    }
  }
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
