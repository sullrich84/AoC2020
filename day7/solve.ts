// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = string[]

const [task, sample] = read("day7")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) => file)

console.clear()
console.log("🎄 Day 7: Handy Haversacks")

const runPart1 = true
const runPart2 = true
const runBoth = true

function buildTree(data: Puzzle) {
  const tree: { [key: string]: { [key: string]: number } } = {}

  for (let line of data) {
    line = line
      .replaceAll("no other", "")
      .replaceAll("bags", "")
      .replaceAll("bag", "")
      .replaceAll(".", "")

    const [root, content] = line.split("contain").map((i) => i.trim())
    if (!content) continue

    const leafs: [number, string][] = content.split(",").map((i) => i.trim())
      .map((i) => [parseInt(i.substring(0, 1)), i.substring(2)])

    for (const [n, leaf] of leafs) {
      tree[root] = tree[root] || {}
      tree[root][leaf] = n
    }
  }
  return tree
}

/// Part 1

const solve1 = (data: Puzzle) => {
  const tree: { [key: string]: { [key: string]: number } } = buildTree(data)

  const count = new Set()

  // Tree search for target
  for (const key of _.keys(tree)) {
    const stack: [string, string[]][] = [[key, []]]

    while (stack.length) {
      const [node, path] = stack.pop()!
      for (const leaf of _.keys(tree[node])) {
        if (leaf == "shiny gold") [...path, node].forEach((e) => count.add(e))
        stack.push([leaf, [...path, node]])
      }
    }
  }

  return count.size
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  const tree = buildTree(data)
  const count = []

  // Tree search for target
  const stack: [string, number][] = [["shiny gold", 1]]

  while (stack.length) {
    const [node, n] = stack.pop()!
    for (const [leaf, ln] of _.entries(tree[node])) {
      const nn = n * ln
      count.push(nn)
      stack.push([leaf, n * ln])
    }
  }

  return _.sum(count)
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
