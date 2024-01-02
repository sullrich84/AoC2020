// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = [number, number[]]

const [task, sample] = read("day13")
  .map((f) => f.split("\n").slice(0, -1))
  .map((f) => [parseInt(f[0]), f[1].split(",").map((n) => parseInt(n) || null)])

console.clear()
console.log("🎄 Day 13: Shuttle Search")

const runPart1 = true
const runPart2 = true
const runBoth = false

/// Part 1

const solve1 = ([arrival, plan]: Puzzle) => {
  const waitingTimes: { id: number; depature: number; wait: number }[] = []

  for (const id of plan) {
    if (!id) continue
    let depature = id
    while (depature < arrival) depature += id
    waitingTimes.push({ id, depature, wait: depature - arrival })
  }

  const best = _.minBy(waitingTimes, (b) => b.wait)!
  return best.wait * best.id
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = ([_arrival, plan]: Puzzle) => {
  for (const id of plan) {
    console.log(id)
  }

  return 0
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
