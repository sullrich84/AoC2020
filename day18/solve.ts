// @deno-types="npm:@types/lodash"
import _, { some } from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string[][]

const [task, sample] = read("day18")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((line) => line.split(" ")))
  .map((file) => file.map((line) => line.map((l) => l.split("")).flat()))

console.clear()
console.log("🎄 Day 18: Operation Order")

const runPart1 = true
const runPart2 = false
const runBoth = false

/// Part 1

const solve1 = (data: Puzzle) => {
  function solve(expression: string[]): number {
    let subResult = parseInt(expression.shift()!)

    while (expression.length > 0) {
      const [nOp, n] = [expression.shift()!, expression.shift()!]
      nOp == "+" ? subResult += parseInt(n) : subResult *= parseInt(n)
    }

    return subResult
  }

  function calc(expression: string[]): number {
    console.log("CALC:", expression)

    if (expression.indexOf("(") == -1) {
      const done = solve(expression.split(""))
      console.log("DONE:", expression, done)
      return done
    }

    const startIdx = expression.indexOf("(")
    let [cur, open, endIdx] = [1, 1, 1]

    // Find closing bracket
    for (let i = startIdx + 1; i < expression.length; i++) {
      ;[cur, endIdx] = [expression[i], i]
      if (cur == "(") open += 1
      if (cur == ")") open -= 1
      if (open == 0) break
    }

    const pre = expression.substring(0, startIdx)
    const rep = expression.substring(startIdx + 1, endIdx)
    const post = expression.substring(endIdx + 1)

    return calc(pre + calc(rep) + post)
  }

  console.log(calc("1+(2*2)+1+(2*2)*2"))
  // return data
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
