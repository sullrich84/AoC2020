// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string[][]
const [task, sample] = read("day5")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((line) => [line.substring(0, 7), line.substring(7)]))

console.clear()
console.log("🎄 Day 5: Binary Boarding")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

function getSeatIds(data: Puzzle) {
  const seatIds = []
  for (const [left, right] of data) {
    let rowRange = _.range(0, 128)
    for (const row of left.split("")) {
      const chunks = _.chunk(rowRange, Math.ceil(rowRange.length / 2))
      if (row == "F") rowRange = _.first(chunks)!
      else rowRange = _.last(chunks)!
    }

    let colRange = _.range(0, 8)
    for (const col of right.split("")) {
      const chunks = _.chunk(colRange, Math.ceil(colRange.length / 2))
      if (col == "L") colRange = _.first(chunks)!
      else colRange = _.last(chunks)!
    }

    const row = _.first(rowRange)!
    const col = _.first(colRange)!
    seatIds.push(row * 8 + col)
  }
  return seatIds
}

const solve1 = (data: Puzzle) => {
  return _.max(getSeatIds(data))
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  const seatIds = getSeatIds(data)
  const range = _.range(_.min(seatIds)!, _.max(seatIds)! + 1)
  return _.first(_.xor(seatIds, range))
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
