package main

import (
	"fmt"
	"math"
)

func main() {
	input := 368078

	shellRoot := int(math.Ceil(math.Sqrt(float64(input))))
	if shellRoot%2 == 0 {
		shellRoot = shellRoot + 1
	}

	// bottom right number of the current shell
	shellCorner := shellRoot * shellRoot

	// counting back from the bottom right corner the distance decreases and increases
	cycle := (shellRoot - 1) / 2
	distance := shellRoot - 1
	dir := -1

	// start counting back
	for current := shellCorner; current > input; {
		for i := 0; i < cycle && current > input; i++ {
			distance += dir
			current--
		}
		dir *= -1
	}

	fmt.Println(distance)
}
