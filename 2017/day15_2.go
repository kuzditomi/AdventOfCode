package main

import (
	"fmt"
)

func generate(prev, factor, m, div int) int {
	val := (prev * factor) % div

	for val%m != 0 {
		val = (val * factor) % div
	}

	return val
}

func main() {
	prevA := 516
	factorA := 16807
	multipleA := 4

	prevB := 190
	factorB := 48271
	multipleB := 8

	div := 2147483647

	repeat := 5000000

	count := 0
	for i := 0; i < repeat; i++ {
		prevA = generate(prevA, factorA, multipleA, div)
		prevB = generate(prevB, factorB, multipleB, div)

		if prevA&0xFFFF == prevB&0xFFFF {
			count++
		}
	}

	fmt.Println(count)
}
