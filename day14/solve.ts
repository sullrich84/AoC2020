// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string[]

const [task, sample] = read("day14")
  .map((file) => file.split("\n").slice(0, -1))

console.clear()
console.log("🎄 Day 14: Docking Data")

const runPart1 = true
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
      .toString(2)
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
  const mem: Record<number, number> = {}
  let mask: Array<string> = []

  function addressesForMask(str: string, prefix = ""): string[] {
    const cur = str.substring(0, 1)
    if (str.length == 1) {
      return cur == "X" ? [prefix + "1", prefix + "0"] : [prefix + cur]
    }

    if (cur == "X") {
      const ones = addressesForMask(str.substring(1), prefix + "1")
      const zeros = addressesForMask(str.substring(1), prefix + "0")
      return [...ones, ...zeros]
    }

    return addressesForMask(str.substring(1), prefix + cur)
  }

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
      .toString(2)
      .padStart(36, "0")
      .split("")

    for (let i = 0; i < mask.length; i++) {
      if (mask[i] == "0") continue
      bin[i] = mask[i]
    }

    addressesForMask(bin.join(""))
      .map((v) => parseInt(v, 2))
      .forEach((addr) => mem[addr] = value)
  }

  return _.sum(_.values(mem))
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
