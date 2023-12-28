// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { data, Puzzle, sample } from "./data.ts"

console.clear()
console.log("🎄 Day 4: Passport Processing")

const runPart1 = true
const runPart2 = true
const runBoth = true

/// Part 1

const solve1 = (data: Puzzle) => {
  return _.sum(data.map((pp) =>
    pp.byr &&
      pp.iyr &&
      pp.eyr &&
      pp.hgt &&
      pp.hcl &&
      pp.ecl &&
      pp.pid
      ? 1
      : 0
  ))
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Data = runPart1 && runBoth ? solve1(data) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
console.log("Task:\t", solve1Data)

/// Part 2

const solve2 = (data: Puzzle) => {
  let validPP = 0

  for (const { byr, iyr, eyr, hgt, hcl, ecl, pid } of data) {
    if (!byr || !_.inRange(parseInt(byr), 1920, 2002 + 1)) continue
    if (!iyr || !_.inRange(parseInt(iyr), 2010, 2020 + 1)) continue
    if (!eyr || !_.inRange(parseInt(eyr), 2020, 2030 + 1)) continue
    if (!hgt || !(_.endsWith(hgt, "cm") || _.endsWith(hgt, "in"))) continue
    const [height, unit] = [parseInt(hgt), hgt?.slice(-2)]
    if (unit == "cm" && !_.inRange(height, 150, 193 + 1)) continue
    if (unit == "in" && !_.inRange(height, 59, 76 + 1)) continue
    if (!hcl || !/^#[a-f0-9]{6}$/.test(hcl)) continue
    const validEcl = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
    if (!ecl || !_.includes(validEcl, ecl)) continue
    if (!pid || !/^[0-9]{9}$/.test(pid)) continue
    validPP += 1
  }

  return validPP
}

const solve2Sample = runPart2 ? solve2(sample) : "skipped"
const solve2Data = runPart2 && runBoth ? solve2(data) : "skipped"

console.log("\nPart 2:")
console.log("Sample:\t", solve2Sample)
console.log("Task:\t", solve2Data)
console.log()
