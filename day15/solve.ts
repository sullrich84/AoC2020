// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = number[]

const [task, sample] = read("day15")
  .map((file) => file.split(","))
  .map((file) => file.map((v) => parseInt(v)))

console.clear()
console.log("🎄 Day 15: Rambunctious Recitation")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = (data: Puzzle, nth: number) => {
  const spoken: Record<number, number[]> = {}

  let lastSpoken = data[0]
  for (let i = 0; i < nth; i++) {
    if (data[i] != undefined) {
      spoken[data[i]] = [i]
      lastSpoken = data[i]
      continue
    }

    const history = spoken[lastSpoken]
    const next = history.length > 1
      ? history.slice(-2).reduce((p, c) => c - p, 0)
      : 0

    spoken[next] != undefined
      ? spoken[next] = [_.last(spoken[next]), i]
      : spoken[next] = [i]
    lastSpoken = next
  }

  return lastSpoken
}

const solve1Sample = runPart1 ? solve1(sample, 2020) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task, 2020) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2Sample = runPart2 ? solve1(sample, 30_000_000) : "skipped"
const solve2Task = runPart2 && runBoth ? solve1(task, 30_000_000) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
