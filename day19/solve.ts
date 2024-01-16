// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Rule = {
  main: string | null
  right: string[]
  left: string[]
}

type Puzzle = [Record<string, Rule>, string[]]

const [task, sample] = read("day19")
  .map((file) => file.split("\n\n"))
  .map(([r, m]) => {
    const rules = r.split("\n")
      .map((e) => {
        const [name, sub] = e.split(": ")
        let right: string[] = sub.split(" ")
        let left: string[] = []

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
      .reduce((previous, { name, ...rest }) => {
        previous[name] = rest
        return previous
      }, {})

    const messages = m.split("\n").slice(0, -1)
    return [rules, messages]
  })

console.clear()
console.log("🎄 Day 19: Monster Messages")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = ([rules, messages]: Puzzle) => {
  const group = (arr: string[]): string => {
    if (_.isEmpty(arr)) return ""
    return "(" + arr.filter((e) => !_.isEmpty(e)).join("") + ")"
  }

  const orGroup = (arr: string[]): string => {
    if (_.isEmpty(arr)) return ""
    return "(" + arr.filter((e) => !_.isEmpty(e)).join("|") + ")"
  }

  const buildMatcher = (id: string): string => {
    const { main, right, left } = rules[id]
    if (main != null) return main

    const r = right.map((r) => buildMatcher(r))
    const l = left.map((l) => buildMatcher(l))
    return orGroup([group(r), group(l)])
  }

  const regex = RegExp("^" + buildMatcher("0") + "$")
  return messages.filter((msg) => msg.match(regex)).length
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = ([rules, messages]: Puzzle) => {
  const group = (arr: string[]): string => {
    if (_.isEmpty(arr)) return ""
    return "(" + arr.filter((e) => !_.isEmpty(e)).join("") + ")"
  }

  const orGroup = (arr: string[]): string => {
    if (_.isEmpty(arr)) return ""
    return "(" + arr.filter((e) => !_.isEmpty(e)).join("|") + ")"
  }

  // Figured out the max depth manually, 
  // where the sum stopped growing.
  const buildMatcher = (id: string, depth = 15): string => {
    if (depth <= 0) return ""

    const { main, right, left } = rules[id]
    if (main != null) return main

    const r = right.map((r) => buildMatcher(r, depth - 1))
    const l = left.map((l) => buildMatcher(l, depth - 1))
    return orGroup([group(r), group(l)])
  }

  // Replace rules
  rules["8"] = { main: null, right: ["42"], left: ["42", "8"] }
  rules["11"] = { main: null, right: ["42", "31"], left: ["42", "11", "31"] }

  const regex = RegExp("^" + buildMatcher("0") + "$")
  return messages.filter((msg) => msg.match(regex)).length
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
