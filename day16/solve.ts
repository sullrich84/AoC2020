// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

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

const runPart1 = true
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
  const matchingFields = (n: number) =>
    fields.filter(({ range: [s1, e1, s2, e2] }) =>
      n >= s1 && n <= e1 || n >= s2 && n <= e2
    ).map((f) => f.name)

  const invalidField = (f: number) => _.isEmpty(matchingFields(f))
  const invalidTicket = (t: number[]) => t.some((n) => invalidField(n))

  const validNearbys = nearbys.filter((n) => !invalidTicket(n))
  const mapping = validNearbys.map((nb) => nb.map((n) => matchingFields(n)))
  const colIntersection = (c: number) => _.intersection(..._.map(mapping, (r) => r[c]))

  const lookup: Record<string, number> = {}
  while (_.keys(lookup).length != mapping[0].length) {
    for (let idx = 0; idx < mapping[0].length; idx++) {
      const res = _.without(colIntersection(idx).map((v) => v), ..._.keys(lookup))
      if (res.length == 1) lookup[res[0]] = idx
    }
  }

  return _.entries<number>(lookup)
    .filter(([name]) => name.startsWith("departure"))
    .map(([_n, idx]) => ticket[idx])
    .reduce((p, c) => p * c, 1)
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
