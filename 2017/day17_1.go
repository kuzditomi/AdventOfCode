package main

import (
	"fmt"
)

func main() {
	step := 348
	current := 0
	nextval := 1
	buffer := []int{0}

	for nextval <= 2017 {
		insertTo := ((current + step) % len(buffer)) + 1

		buffer = append(buffer, 0)
		copy(buffer[insertTo+1:], buffer[insertTo:])

		current = insertTo
		buffer[insertTo] = nextval
		nextval++
	}

	fmt.Println(buffer[current+1])
}
