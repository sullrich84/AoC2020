// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"
import { wait } from "../utils/utils.ts"

type Puzzle = number[]

const [task, sample] = read("day9")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((l) => parseInt(l)))

console.clear()
console.log("🎄 Day 9: Encoding Error")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = (data: Puzzle, len: number) => {
  for (let i = len; i < data.length; i++) {
    const num = data[i]
    const preamble = data.slice(i - len, i)
    const valid = _.flatMap(preamble.map((a) => preamble.map((b) => a + b)))

    if (_.includes(valid, num)) continue
    return num
  }
}

const solve1Sample = runPart1 ? solve1(sample, 5) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task, 25) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle, len: number) => {
  const num = solve1(data, len)!
  const range = []

  loop: for (let i = 0; i < data.length; i++) {
    let invalid = data[i]
    for (let j = i + 1; j < data.length; j++) {
      invalid += data[j]
      if (invalid > num) continue loop
      if (invalid == num) {
        range.push(...data.slice(i, j + 1))
        break loop
      }
    }
  }

  return _.min(range)! + _.max(range)!
}

const solve2Sample = runPart2 ? solve2(sample, 5) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task, 25) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
