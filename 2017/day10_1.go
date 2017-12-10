package main

import (
	"fmt"
)

var puzzle = []int{230, 1, 2, 221, 97, 252, 168, 169, 57, 99, 0, 254, 181, 255, 235, 167}

func reverse(slice []int) {
	last := len(slice) - 1
	for i := 0; i < len(slice)/2; i++ {
		slice[i], slice[last-i] = slice[last-i], slice[i]
	}
}

func main() {
	const baselength = 256
	values := [baselength]int{}
	for i := 0; i < baselength; i++ {
		values[i] = i
	}

	current := 0
	skip := 0

	for _, number := range puzzle {
		for i := 0; i < number/2; i++ {
			indexA := (current + i) % baselength
			indexB := (current + number - i - 1) % baselength

			values[indexA], values[indexB] = values[indexB], values[indexA]
		}

		current = (current + number + skip) % baselength
		skip++
	}

	fmt.Print(values[0] * values[1])
}
