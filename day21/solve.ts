// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"

type Puzzle = [string[], string[]][]

const [task, sample] = read("day21")
  .map((file) => file.split("\n").slice(0, -1))
  .map((file) =>
    file.map((l) => {
      const [ingredients, allergens] = l.replace(")", "").split("(contains ")
      return [ingredients.trim().split(" "), allergens.split(", ")]
    })
  )

console.clear()
console.log("🎄 Day 21: Allergen Assessment")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = (data: Puzzle) => {
  const ingredients = _.map(data, 0).flat()
  const list: Record<string, string[]> = {}

  for (const [ings, ags] of data) {
    for (const ag of ags) {
      if (list[ag] == undefined) {
        list[ag] = ings
        continue
      }
      list[ag] = _.intersection(list[ag], ings)
    }
  }

  const unsafe = _.uniq(_.values(list).flat())
  return _.sum(ingredients.map((v) => _.includes(unsafe, v) ? 0 : 1))
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Task)

/// Part 2

const solve2 = (data: Puzzle) => {
  const list: Record<string, string[]> = {}

  for (const [ings, ags] of data) {
    for (const ag of ags) {
      if (list[ag] == undefined) {
        list[ag] = ings
        continue
      }
      list[ag] = _.intersection(list[ag], ings)
    }
  }

  while (_.max(_.values(list).map((v) => v.length))! > 1) {
    const safeMatches = _.values(list)
      .filter((ings) => ings.length == 1)
      .flat()

    for (const ag of _.keys(list)) {
      if (list[ag].length > 1) {
        list[ag] = _.without(list[ag], ...safeMatches)
      }
    }
  }

  const sortedKeys = _.keys(list).sort()
  return sortedKeys.map((sk) => list[sk]).join(",")
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Task = runPart2 && runBoth ? solve2(task) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Task)
console.log()
