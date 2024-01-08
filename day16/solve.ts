// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = [[number, number, number, number][], number[], number[]][]

const [task, sample] = read("day16")
  .map((file) => file.split("\n\n"))
  .map((file) => file.map((l) => l.split("\n")))
  .map(([fields, ticket, nearbys]) => {
    fields = fields
      .map((l) => _.tail(l.match(/.+: (\d+)-(\d+) or (\d+)-(\d+)/)))
      .map((l) => l.map((c) => parseInt(c) || c))

    ticket = ticket[1]
      .split(",")
      .map((t) => parseInt(t))

    nearbys = _.tail(nearbys)
      .join(",")
      .split(",")
      .filter((n) => n != "")
      .map((n) => parseInt(n))

    return [fields, ticket, nearbys]
  })

console.clear()
console.log("🎄 Day 16: Ticket Translation")

const runPart1 = true
const runPart2 = false
const runBoth = true

/// Part 1

const solve1 = ([fields, tickets, nearbys]: Puzzle) => {
  const validField = (val: number) => {
    for (const [s1, e1, s2, e2] of fields) {
      if (_.inRange(val, s1, e1 + 1) || _.inRange(val, s2, e2 + 1)) {
        return true
      }
    }
    return false
  }

  return _.sum(nearbys.filter((n) => !validField(n)))
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
