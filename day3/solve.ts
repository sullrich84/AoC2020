// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { data, Puzzle, sample } from "./data.ts"

console.clear()
console.log("🎄 Day 3: YYY")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = (data: Puzzle) => {
  const pos = { x: 0, y: 0 }
  const my = data.length
  const mx = data[0].length
  let trs = 0

  while (pos.x < mx && pos.y < my) {
    if (data[pos.y][pos.x] == "#") trs += 1
    pos.x = (pos.x + 3) % mx
    pos.y = pos.y + 1
  }

  return trs
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Data = runPart1 && runBoth ? solve1(data) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Data)

/// Part 2

const solve2 = (data: Puzzle) => {
  const my = data.length
  const mx = data[0].length
  const trs = [] as number[]

  const inst = [
    { sx: 1, sy: 1 },
    { sx: 3, sy: 1 },
    { sx: 5, sy: 1 },
    { sx: 7, sy: 1 },
    { sx: 1, sy: 2 },
  ]

  inst.forEach(({ sx, sy }) => {
    const pos = { x: 0, y: 0 }
    let t = 0
    while (pos.x < mx && pos.y < my) {
      if (data[pos.y][pos.x] == "#") t += 1
      pos.x = (pos.x + sx) % mx
      pos.y = pos.y + sy
    }
    trs.push(t)
  })

  return trs.reduce((c, p) => c * p, 1)
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Data = runPart2 && runBoth ? solve2(data) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Data)
console.log()
