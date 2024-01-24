// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"
import { wait } from "../utils/utils.ts"

type Puzzle = string[][]

const [task, sample] = read("day23")
  .map((file) => file.split("").slice(0, -1))
  .map((file) => file.map((l) => parseInt(l)))

console.clear()
console.log("🎄 Day 23: Crab Cups")

const runPart1 = true
const runPart2 = false
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
      ...cups.slice(destIndex+1),
      cur
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

const solve2 = (data: Puzzle) => {
}

const solve2Sample = runPart2 ? solve(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve(task, 10_000_000) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
