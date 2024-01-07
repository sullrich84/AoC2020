// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string[]

const [task, sample] = read("day14")
  .map((file) => file.split("\n").slice(0, -1))

console.clear()
console.log("🎄 Day 14: Docking Data")

const runPart1 = false
const runPart2 = true
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
  const mem = {}
  let mask: Array<string> = []

  function calc(str: string, prefix: string = ""): string[] {
    const cur = str.substring(0, 1)
    if (str.length == 1) {
      return cur == "X" ? [prefix + "1", prefix + "0"] : [prefix + cur]
    }

    if (cur == "X") {
      const ones = calc(str.substring(1), prefix + "1")
      const zeros = calc(str.substring(1), prefix + "0")
      return _.flatMap([ones, zeros])
    }

    return calc(str.substring(1), prefix + cur)
  }

  // const bins = calc("00000000000000000000000000000001X0XX").map(v => parseInt(v, 2))
  // console.log(bins, bins.length)

  for (const line of data) {
    if (line.startsWith("mask")) {
      mask = line.substring(7).split("")
      continue
    }

    const [address, value] = line
      .replace("mem[", "")
      .split("] = ")
      .map((v) => parseInt(v))

    const bin = address
      .toString("2")
      .padStart(36, "0")
      .split("")

    for (let i = 0; i < mask.length; i++) {
      if (mask[i] == "0") continue
      bin[i] = mask[i]
    }

    bin.reverse()

    const steady = bin
      .map((v, i) => v == "1" ? i : null)
      .filter((v) => v != null)
      .reduce((p, c) => p += Math.pow(2, c), 0)

    const floaty = bin
      .map((v, i) => v == "X" ? i : null)
      .filter((v) => v != null)
      .map((v) => Math.pow(2, v))

    mem[steady] = value
    mem[steady + _.sum(floaty)] = value

    for (let i = 0; i < floaty.length; i++) {
      mem[steady + floaty[i]] = value
      for (let ii = 0; ii < floaty.length; ii++) {
        if (i == ii) continue
        mem[steady + floaty[i] + floaty[ii]] = value
      }
    }
  }

  // > 614703016144
  return _.sum(_.values(mem))
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
