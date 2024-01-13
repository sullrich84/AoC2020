// @deno-types="npm:@types/lodash"
import _, { some } from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string[][]

const [task, sample] = read("day18")
  .map((file) => file.replaceAll(" ", "").split("\n").slice(0, -1))
  .map((file) => file.map((line) => line.split("")))

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

  function flat(expression: string[]): number {
    if (!_.some(expression, (e) => e == "(")) return solve(expression)

    const startIdx = expression.findIndex((v) => v == "(")
    let [cur, open, endIdx] = [1, 1, 1]

    for (let i = startIdx + 1; i < expression.length; i++) {
      ;[cur, endIdx] = [expression[i], i]
      if (cur == "(") open += 1
      if (cur == ")") open -= 1
      if (open == 0) break
    }

    console.log("clean:", ...expression.slice(startIdx + 1, endIdx))
    
    const clean = [
      ...expression.slice(0, startIdx),
      flat(expression.slice(startIdx + 1, endIdx)),
      ...expression.slice(endIdx + 1),
    ]

    return solve(clean)
  }

  console.log(flat("5+(((2*4)*2)+1)+9*2".split("")))
  return data.map((row) => solve(row))
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
