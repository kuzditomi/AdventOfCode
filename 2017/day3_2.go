package main

import (
	"fmt"
	"math"
)

const (
	right = 0
	up    = 1
	left  = 2
	down  = 3
)

// try to guess the size of matrix
var matrix [][]int
var matrixSize = 12

func getCell(x, y int) int {
	if x < 0 || x >= matrixSize || y < 0 || y >= matrixSize {
		return 0
	}

	return matrix[x][y]
}
func calcCell(x, y int) int {
	return getCell(x-1, y-1) + getCell(x, y-1) + getCell(x+1, y-1) + getCell(x-1, y) + getCell(x+1, y) + getCell(x-1, y+1) + getCell(x, y+1) + getCell(x+1, y+1)
}

func main() {
	input := 368078

	// initialize the matrix
	matrix = make([][]int, matrixSize)
	for i := range matrix {
		matrix[i] = make([]int, matrixSize)
		for j := range matrix[i] {
			matrix[i][j] = 0
		}
	}

	// start from the middle
	x := int(math.Ceil((float64(matrixSize) / 2))) - 1
	y := x
	matrix[x][y] = 1

	dir := right
	cycleLength := 0

	// do the calculations
	for {
		if dir == right {
			cycleLength++
		}

		for i := 0; i < cycleLength; i++ {
			// move
			switch dir {
			case right:
				x++
				break
			case up:
				y++
				break
			case left:
				x--
				break
			case down:
				y--
				break
			}

			result := calcCell(x, y)
			matrix[x][y] = result

			if result > input {
				fmt.Println(result)
				return
			}
		}

		if dir == up {
			cycleLength++
		}

		dir = (dir + 1) % 4
	}
}
