// @deno-types="npm:@types/lodash"
import _, { lowerCase, map } from "npm:lodash"
import { read } from "../utils/Reader.ts"
import { wait } from "../utils/utils.ts"

type Puzzle = {
  fields: { name: string; range: number[] }[]
  ticket: number[]
  nearbys: number[][]
}

const [task, sample] = read("day16").map((file) => file.split("\n\n"))
  .map(([fields, ticket, nearbys]) => ({
    fields: fields.split("\n")
      .map((l) => _.tail(l.match(/(.+): (\d+)-(\d+) or (\d+)-(\d+)/)))
      .map(([name, ...nums]) => ({
        name,
        range: nums.map((n) => parseInt(n)),
      })),

    ticket: ticket.split("\n")[1]
      .split(",")
      .map((t) => parseInt(t)),

    nearbys: nearbys.split("\n").slice(1, -1)
      .map((l) => l.split(",").map((n) => parseInt(n))),
  }))

console.clear()
console.log("🎄 Day 16: Ticket Translation")

const runPart1 = false
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = ({ fields, nearbys }: Puzzle) => {
  const validField = (val: number) => {
    for (const { range } of fields) {
      const inFirstRange = _.inRange(val, range[0], range[1] + 1)
      const inSecondRange = _.inRange(val, range[2], range[3] + 1)
      if (inFirstRange || inSecondRange) return true
    }

    return false
  }

  return _.sum(_.flatMap(nearbys).filter((n) => !validField(n)))
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = ({ fields, ticket, nearbys }: Puzzle) => {
  const fieldNames = fields.map((f) => f.name)
  const vMap = new Array(ticket.length).fill(fieldNames)
  
  for (let pos = 0; pos < ticket.length; pos++) {
    for (let n = 0; n < nearbys.length; n++) {
      const number = nearbys[n][pos]
      const mapping = fields
        .filter((f) =>
          _.inRange(number, f.range[0], f.range[1] + 1) ||
          _.inRange(number, f.range[2], f.range[3] + 1)
        )
        .map((f) => f.name)
      vMap[pos] = _.intersection(vMap[pos], mapping)
    }
  }

  return vMap
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
