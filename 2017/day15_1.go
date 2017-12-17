package main

import (
	"fmt"
)

func generate(prev, factor, div int) int {
	return (prev * factor) % div
}

func main() {
	prevA := 516
	factorA := 16807

	prevB := 190
	factorB := 48271

	div := 2147483647

	repeat := 40000000

	count := 0
	for i := 0; i < repeat; i++ {
		prevA = generate(prevA, factorA, div)
		prevB = generate(prevB, factorB, div)

		if prevA&0xFFFF == prevB&0xFFFF {
			count++
		}
	}

	fmt.Println(count)
}
