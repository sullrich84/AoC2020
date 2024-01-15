// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Rule = {
  name: string
  main: string | null
  right: number[]
  left: number[]
}

type Puzzle = [Rule[], string[]]

const [task, sample] = read("day19")
  .map((file) => file.split("\n\n"))
  .map(([r, m]) => {
    const rules = r.split("\n").map((e) => {
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
    const messages = m.split("\n").slice(0, -1)
    return [rules, messages]
  })

console.clear()
console.log("🎄 Day 19: Monster Messages")

const runPart1 = true
const runPart2 = false
const runBoth = true

/// Part 1

const solve1 = ([rules, messages]: Puzzle) => {
  const rule0 = rules.find(({ name }) => name == "0")!
  const ruleA = rules.find(({ main }) => main == "a")!
  const ruleB = rules.find(({ main }) => main == "b")!

  const group = (arr: string[]) => {
    if (_.isEmpty(arr)) return ""
    return "(" + arr.filter((e) => !_.isEmpty(e)).join("") + ")"
  }

  const orGroup = (arr: string[]) => {
    if (_.isEmpty(arr)) return ""
    return "(" + arr.filter((e) => !_.isEmpty(e)).join("|") + ")"
  }

  const buildMatcher = (id: string) => {
    const { main, right, left } = rules.find(({ name }) => name == id)!
    if (main != null) return [main]

    const r = right.map((r) => buildMatcher(r))
    const l = left.map((l) => buildMatcher(l))
    return orGroup([group(r), group(l)])
  }

  // const seen = new Set()
  // const stack = [ruleA.name, ruleB.name]
  // while (stack.length > 0) {
  //   const id = stack.shift()
  //
  //   if (seen.has(id)) continue
  //   seen.add(id)
  //
  //   // const { right, left } = rules[id]
  //   // console.log("Children", id, right.length, left.length)
  //   // if (right.length + left.length > 10) {
  //   //   stack.push(id)
  //   //   console.log("Skipping", id)
  //   //   continue
  //   // }
  //   //
  //   // buildMatcher(id)
  //
  //   const r = rules
  //     .filter(({ right }) => _.includes(right, id))
  //     .map(({ name }) => name)
  //
  //   const l = rules
  //     .filter(({ left }) => _.includes(left, id))
  //     .map(({ name }) => name)
  //
  //   console.log({ id, r: r.join(), l: l.join() })
  //   stack.push(...r)
  //   stack.push(...l)
  // }


  const regex = RegExp("^" + buildMatcher("0") + "$")
  return messages.filter((msg) => msg.match(regex)).length
}

// const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
// console.log("Sample:\t", solve1Sample)
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
