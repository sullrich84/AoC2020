// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = [number, number, string, string][]

const [task, sample] = read("day2")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) =>
    file.map((l) => {
      const [left, password] = l.split(": ")
      const [min, max, char] = left.split(/[\s-]/)
      return [parseInt(min), parseInt(max), char, password]
    })
  )

console.clear()
console.log("🎄 Day 2: Password Philosophy")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = (data: Puzzle) => {
  return data
    .map(([mn, mx, c, pwd]) => _.inRange(_.countBy(pwd)[c] || 0, mn, mx + 1))
    .reduce((p, c) => p += c ? 1 : 0, 0)
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  return data
    .map(([mn, mx, c, pwd]) =>
      (pwd[mn - 1] == c && pwd[mx - 1] != c) ||
      (pwd[mn - 1] != c && pwd[mx - 1] == c)
    )
    .reduce((p, c) => p += c ? 1 : 0, 0)
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
