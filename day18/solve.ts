// @deno-types="npm:@types/lodash"
import _, { lowerCase, some } from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string[][]

const [task, sample] = read("day18")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((line) => line.split(" ")))
  .map((file) => file.map((line) => line.map((l) => l.split("")).flat()))

console.clear()
console.log("🎄 Day 18: Operation Order")

const runPart1 = false
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = (data: Puzzle) => {
  function calc(expression: string[]): number {
    if (expression.findIndex((v) => v == "(") == -1) {
      let subResult = parseInt(expression.shift()!)
      while (expression.length > 0) {
        const [nOp, n] = [expression.shift()!, expression.shift()!]
        nOp == "+" ? subResult += parseInt(n) : subResult *= parseInt(n)
      }
      return subResult
    }

    const startIdx = expression.findIndex((v) => v == "(")
    let [cur, open, endIdx] = ["", 1, 1]
    for (let i = startIdx + 1; i < expression.length; i++) {
      ;[cur, endIdx] = [expression[i], i]
      if (cur == "(") open += 1
      if (cur == ")") open -= 1
      if (open == 0) break
    }

    const pre = expression.slice(0, startIdx)
    const rep = expression.slice(startIdx + 1, endIdx)
    const post = expression.slice(endIdx + 1)

    return calc([...pre, calc(rep).toString(), ...post])
  }

  return _.sum(data.map(calc))
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  function calc(expression: string[]): number {
    if (expression.findIndex((v) => v == "(") == -1) {
      let nExp = [...expression]
      let opIdx = nExp.findIndex((v) => v == "+")

      while (opIdx != -1) {
        const pre = nExp.slice(0, opIdx - 1)
        const add = nExp.slice(opIdx - 1, opIdx + 2)
        const post = nExp.slice(opIdx + 2)

        nExp = [...pre, eval(add.join("")).toString(), ...post]
        opIdx = nExp.findIndex((v) => v == "+")
      }

      return eval(nExp.join(""))
    }

    const startIdx = expression.findIndex((v) => v == "(")
    let [cur, open, endIdx] = ["", 1, 1]
    for (let i = startIdx + 1; i < expression.length; i++) {
      ;[cur, endIdx] = [expression[i], i]
      if (cur == "(") open += 1
      if (cur == ")") open -= 1
      if (open == 0) break
    }

    const pre = expression.slice(0, startIdx)
    const rep = expression.slice(startIdx + 1, endIdx)
    const post = expression.slice(endIdx + 1)

    return calc([...pre, calc(rep).toString(), ...post])
  }

  return _.sum(data.map(calc))
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
