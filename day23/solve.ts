// @deno-types="npm:@types/lodash"
import _ from "npm:lodash"
import { read } from "../utils/Reader.ts"
import { wait } from "../utils/utils.ts"

type Puzzle = string[][]

const [task, sample] = read("day23")
  .map((file) => file.split("").slice(0, -1))
  .map((file) => file.map((l) => parseInt(l)))

console.clear()
console.log("🎄 Day 23: Crab Cups")

const runPart1 = true
const runPart2 = false
const runBoth = false

/// Part 1

function cycle(nums: number[], index: number) {
  return nums[index % nums.length]
}

const solve1 = (data: Puzzle) => {
  let idx = -1
  let nums = _.cloneDeep(data)

  for (let m = 0; m < 100; m++) {
    console.log(`-- move ${m + 1} --`)
    
    idx = (idx + 1) % data.length
    const cur = nums[idx]
    const pickup = [...nums, ...nums].slice(idx + 1, idx + 4)

    console.log("cups:", nums.map((v, i) => i == idx ? `(${v})` : v).join("  "))
    console.log("pick up:", pickup.join(", "))

    nums = _.without(nums, ...pickup)
    let [destination, destIdx, target] = [null, -1, cur - 1]
    const [min, max] = [_.min(nums), _.max(nums)]

    while (destination == null) {
      if (target < min) destination = max
      destIdx = nums.indexOf(target)
      if (destIdx != -1) destination = nums[destIdx]
      target -= 1
    }

    console.log("destination:", destination)

    nums = [...nums.slice(0, destIdx + 1), ...pickup, ...nums.slice(destIdx + 1)]
    console.log("next nums:", nums.join("  "))
    wait()
  }
  const cur = 0
  const val = data[cur]
  console.log({ cur, val })
}

const solve1Sample = runPart1 ? solve1(sample) : "skipped"
const solve1Task = runPart1 && runBoth ? solve1(task) : "skipped"

console.log("\nPart 1:")
console.log("Sample:\t", solve1Sample)
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
