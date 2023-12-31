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

const runPart1 = false
const runPart2 = true
const runBoth = false

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
  const stack: [number, number[]][] = [[0, sorted]]
  const seen = new Set()

  while (stack.length > 0) {
    const [cur, nums] = stack.pop()!
    const key = nums.join()
    seen.add(key)

    const idx = _.indexOf(nums, cur)
    const next = nums.filter((r) => r >= cur + 1 && r <= cur + 3)

    if (next.length == 1) {
      stack.push([nums[idx + 1], nums])
    } else if (next.length == 2) {
      stack.push([next[0], [...nums.slice(0, idx + 1), ...nums.slice(idx + 1)]])
      stack.push([next[1], [...nums.slice(0, idx + 1), ...nums.slice(idx + 2)]])
    } else if (next.length == 3) {
      stack.push([next[0], [...nums.slice(0, idx + 1), ...nums.slice(idx + 1)]])
      stack.push([next[1], [...nums.slice(0, idx + 1), ...nums.slice(idx + 2)]])
      stack.push([next[2], [...nums.slice(0, idx + 1), ...nums.slice(idx + 3)]])
    }
  }

  const pathsToEnd: (cur: number) => number = _.memoize((cur: number) => {
    const nextPoints = sorted.filter((s) => s >= cur + 1 && s <= cur + 3)
    if (nextPoints.length == 0) return 1
    return _.sum(nextPoints.map((np) => pathsToEnd(np)))
  })

  return pathsToEnd(_.first(sorted)!)
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
