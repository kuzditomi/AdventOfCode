package main

import (
	"fmt"
	"strconv"
	"strings"
)

func getMaxIndex(slice []int) int {
	maxIndex := 0
	max := slice[0]

	for i, number := range slice {
		if number > max {
			max = number
			maxIndex = i
		}
	}

	return maxIndex
}

func main() {
	puzzle := "4	1	15	12	0	9	9	5	5	8	7	3	14	5	12	3"

	split := strings.Split(puzzle, "\t")
	numbers := make([]int, len(split))

	for i, number := range split {
		numbers[i], _ = strconv.Atoi(number)
	}

	statesMap := make(map[string]int)
	loopstart := ""
	steps := 0
	inloop := false

	for {
		if loopstart != "" {
			steps++
		}

		maxIndex := getMaxIndex(numbers)

		numberToDistribute := numbers[maxIndex]
		numbers[maxIndex] = 0

		for i := 1; i <= numberToDistribute; i++ {
			indexToIncrease := (maxIndex + i) % len(numbers)
			numbers[indexToIncrease]++
		}

		stateHash := strings.Trim(strings.Join(strings.Split(fmt.Sprint(numbers), " "), ","), "[]")

		if inloop && stateHash == loopstart {
			fmt.Printf("%d", steps)
			break
		}

		if !inloop && statesMap[stateHash] == 1 {
			loopstart = stateHash
			inloop = true
		}

		statesMap[stateHash] = 1
	}
}
