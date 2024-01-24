// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = number[]

const [task, sample] = read("day23")
  .map((file) => file.split("").slice(0, -1))
  .map((file) => file.map((l) => parseInt(l)))

console.clear()
console.log("🎄 Day 23: Crab Cups")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const solve = (data: Puzzle, moves: number) => {
  let cups = _.clone(data)

  const min = _.min(cups)!
  const max = _.max(cups)!

  for (let move = 1; move <= moves; move++) {
    const cur = cups.shift()!
    const a = cups.shift()!
    const b = cups.shift()!
    const c = cups.shift()!
    const pickUp = [a, b, c]

    let destination = cur - 1
    while (pickUp.includes(destination) || destination < min) {
      destination = destination > min ? destination - 1 : max
    }

    const destIndex = cups.indexOf(destination)
    cups = [
      ...cups.slice(0, destIndex + 1),
      ...pickUp,
      ...cups.slice(destIndex + 1),
      cur,
    ]
  }

  const oneIdx = cups.indexOf(1)
  const dest = [...cups.slice(oneIdx + 1), ...cups.slice(0, oneIdx)]
  return parseInt(dest.join(""))
}

const solve1Sample = runPart1 ? solve(sample, 10) : "skipped"
const solve1Task = runPart1 && runBoth ? solve(task, 100) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle, moves: number) => {
  const cups = _.clone(data)
  const next = _.range(1, 1_000_000 + 2)

  next[0] = next[next.length - 1] = cups[0]
  for (let i = 0; i < cups.length - 1; i++) {
    next[cups[i]] = cups[i + 1]
  }

  next[cups[cups.length - 1]] = _.max(cups)! + 1
  let cur = 0

  for (let c = 0; c <= moves; c++) {
    cur = next[cur]
    let ins = cur !== 1 ? cur - 1 : 1_000_000
    const p1 = next[cur]
    const p2 = next[p1]
    const p3 = next[p2]

    while (ins === p1 || ins === p2 || ins === p3) ins -= 1
    if (ins < 1) ins += 1_000_000

    // Update all without helper variables
    ;[next[p3], next[ins], next[cur]] = [next[ins], next[cur], next[p3]]
  }

  return next[1] * next[next[1]]
}

const solve2Sample = runPart2 ? solve2(sample, 10_000_000) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task, 10_000_000) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
