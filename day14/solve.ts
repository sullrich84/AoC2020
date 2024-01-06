// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string[]

const [task, sample] = read("day14")
  .map((file) => file.split("\n").slice(0, -1))

console.clear()
console.log("🎄 Day 14: Docking Data")

const runPart1 = true
const runPart2 = false
const runBoth = true

/// Part 1

const solve1 = (data: Puzzle) => {
  const mem: Record<string, number> = {}
  let mask: Array<string> = []

  for (const line of data) {
    if (line.startsWith("mask")) {
      mask = line.substring(7).split("")
      continue
    }

    const [address, decimalValue] = line
      .replace("mem[", "")
      .split("] = ")
      .map((v) => parseInt(v))

    const bin = decimalValue
      .toString("2")
      .padStart(36, "0")
      .split("")

    for (let i = 0; i < mask.length; i++) {
      if (mask[i] == "X") continue
      bin[i] = mask[i]
    }

    mem[address] = parseInt(bin.join(""), 2)
  }

  return _.sum(_.values(mem))
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
