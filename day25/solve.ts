// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = number[]

const [task, sample] = read("day25")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((l) => parseInt(l)))

console.clear()
console.log("🎄 Day 25: Combo Breaker")

const runPart1 = true
const runBoth = true

/// Part 1

const solve = ([cardPk, doorPk]: Puzzle) => {
  const mod = 20201227

  function transform(sn: number, ls: number): number {
    if (ls == 0) return 1
    if (ls % 2 == 0) return transform((sn * sn) % mod, ls / 2)
    return sn * transform(sn, ls - 1) % mod
  }

  let cardLs = 0
  while (transform(7, cardLs) != cardPk) cardLs += 1

  let doorLs = 0
  while (transform(7, doorLs) != doorPk) doorLs += 1

  return transform(doorPk, cardLs)
}

const solveSample = runPart1 ? solve(sample) : "skipped"
const solveTask = runPart1 && runBoth ? solve(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solveSample)
console.log("Task:\t", solveTask)
