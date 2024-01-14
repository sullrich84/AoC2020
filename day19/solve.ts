// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Rule = {
  name: string
  main: string | null
  right: number[]
  left: number[]
}

type Puzzle = [Rule[], string[]]

const [task, sample] = read("day19")
  .map((file) => file.split("\n\n"))
  .map(([r, m]) => {
    const rules = r.split("\n").map((e) => {
      const [name, sub] = e.split(": ")
      let right: number[] = sub.split(" ").map((v) => parseInt(v) || v)
      let left: number[] = []

      const idx = right.findIndex((e) => e == "|")
      if (idx != -1) {
        left = right.slice(idx + 1)
        right = right.slice(0, idx)
      }

      let main = null
      if (right[0] == '"a"') main = "a"
      if (right[0] == '"b"') main = "b"
      if (main != null) right = []

      return { name, main, right, left }
    })
    const messages = m.split("\n").slice(0, -1)
    return [rules, messages]
  })

console.clear()
console.log("🎄 Day 19: Monster Messages")

const runPart1 = true
const runPart2 = false
const runBoth = false

/// Part 1

const solve1 = ([rules, messages]: Puzzle) => {
  for (const message of messages) {
    console.log(message);
  }
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
