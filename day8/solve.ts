// @deno-types="npm:@types/lodash"
import _, { result } from "npm:lodash"
import { read } from "../utils/Reader.ts"
import { wait } from "../utils/utils.ts"

type Command = "nop" | "acc" | "jmp"
type Puzzle = [Command, number][]

const [task, sample] = read("day8")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file.map((l) => l.split(" ")))
  .map((file) => file.map(([l, r]) => [l, parseInt(r)]))

console.clear()
console.log("🎄 Day 8: Handheld Halting")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = (data: Puzzle, nanOnLoop = false) => {
  let acc = 0
  const seen = new Set()

  for (let line = 0; line < data.length; line++) {
    if (seen.has(line)) return nanOnLoop ? NaN : acc
    seen.add(line)

    const [cmd, val] = data[line]
    if (cmd == "acc") acc += val
    if (cmd == "jmp") line += val - 1
  }

  return acc
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  // Bruteforece: Flip every nop and jmp
  for (let i = 0; i < data.length; i++) {
    const [cmd] = data[i]
    if (cmd == "acc") continue

    const nData = _.cloneDeep(data)
    nData[i][0] = cmd == "jmp" ? "nop" : "jmp"

    const res = solve1(nData, true)
    if (!_.isNaN(res)) return res
  }
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
