// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"
import { wait } from "../utils/utils.ts"

type Puzzle = number[]

const [task, sample] = read("day10")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((l) => parseInt(l)))

console.clear()
console.log("🎄 Day 10: Adapter Array")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = (data: Puzzle) => {
  const nums = [...data].sort((a, b) => a - b)
  const count = _.countBy(nums.map((v, i) => v - nums[i - 1] || 0))
  return (count["1"] + 1) * (count["3"] + 1)
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  const sorted = [...data].sort((a, b) => a - b)
  const paths = { 0: 1 }

  for (const num of sorted) {
    paths[num] = _.sum([1, 2, 3].map((d) => paths[num - d] || 0))
  }

  return paths[_.last(sorted)]
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
