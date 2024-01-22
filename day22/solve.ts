// @deno-types="npm:@types/lodash"
import _, { reduce } from "npm:lodash"
import { read } from "../utils/Reader.ts"
import { wait } from "../utils/utils.ts"

type Puzzle = [number[], number[]]

const [task, sample] = read("day22")
  .map((file) => {
    const [p1, p2] = file.split("\n\n")
    return [
      p1.split("\n").slice(1).map((n) => parseInt(n)),
      p2.split("\n").slice(1, -1).map((n) => parseInt(n)),
    ]
  })

console.clear()
console.log("🎄 Day 22: Crab Combat")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = (data: Puzzle) => {
  const [p1, p2] = _.cloneDeep(data)

  while (p1.length > 0 && p2.length > 0) {
    const [pp1, pp2] = [p1.shift()!, p2.shift()!]
    const winner = pp1 > pp2 ? 0 : 1

    if (winner == 0) p1.push(pp1, pp2)
    else p2.push(pp2, pp1)
  }

  const wDeck = p1.length > 0 ? p1 : p2
  let wLength = wDeck.length

  return wDeck
    .map((v) => v * wLength--)
    .reduce((p, c) => p + c, 0)
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  const [p1, p2] = _.cloneDeep(data)
  
  function play(p1: number[], p2: number[], game = 0): [number[], string] {
    const seen = new Set()

    while (p1.length > 0 && p2.length > 0) {
      const [k1, k2] = [p1.join(), p2.join()]
      if (seen.has(k1) || seen.has(k2)) return [p1, "p1"]
      seen.add(k1)
      seen.add(k2)

      const [pp1, pp2] = [p1.shift()!, p2.shift()!]
      let winner = pp1 > pp2 ? 0 : 1

      if (p1.length > 0 && p2.length > 0) {
        if (pp1 <= p1.length && pp2 <= p2.length) {
          const subWinner = play(p1.slice(0, pp1), p2.slice(0, pp2), game + 1)
          winner = subWinner[1] == "p1" ? 0 : 1
        }
      }

      if (winner == 0) p1.push(pp1, pp2)
      else p2.push(pp2, pp1)
    }

    return [p1.length > 0 ? p1 : p2, p1.length > 0 ? "p1" : "p2"]
  }

  const wDeck = play(p1, p2)
  let wLength = wDeck[0].length

  return wDeck[0]
    .map((v) => v * wLength--)
    .reduce((p, c) => p + c, 0)
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
