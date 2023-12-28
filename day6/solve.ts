// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string[][]

const [task, sample] = read("day6")
  .map((file) => file.split("\n\n"))
  .map((file) => file.map((line) => line.split("\n").filter((e) => e != "")))

console.clear()
console.log("🎄 Day 6: Custom Customs")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = (data: Puzzle) => {
  const yes = []

  for (const group of data) {
    const answers = {}

    for (const answer of group) {
      for (const question of answer.split("")) {
        answers[question] = 1
      }
    }

    yes.push(_.sum(_.values(answers)))
  }

  return _.sum(yes)
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  const yes = []

  for (const group of data) {
    const answers = {}
    const people = group.length

    for (const answer of group) {
      for (const question of answer.split("")) {
        answers[question] = answers[question] || 0
        answers[question] += 1
      }
    }

    let allAnswered = 0
    for (const answer of _.values(answers)) {
      if (answer == people) allAnswered++
    }

    yes.push(allAnswered)
  }

  return _.sum(yes)
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
