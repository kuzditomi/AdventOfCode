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

var matrix [][]int

func calcCell(x, y int) int {
	//	fmt.Printf("calt: %d %d\n", x, y)
	return matrix[x-1][y-1] + matrix[x][y-1] + matrix[x+1][y-1] + matrix[x-1][y] + matrix[x+1][y] + matrix[x-1][y+1] + matrix[x][y+1] + matrix[x+1][y+1]
}

func main() {
	input := 23

	// try to guess the size of matrix
	matrixSize := 14

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
	matrix[x+1][y] = 1
	fmt.Printf("[%d][%d] = %d\n", x, y, 1)
	fmt.Printf("[%d][%d] = %d\n", x+1, y, 1)

	x++

	dir := up
	cycleLength := 1

	// do the calculations
	for {
		for i := 0; i < cycleLength; i++ {
			// move
			switch dir {
			case right:
				x++
				break
			case up:
				y--
				break
			case left:
				x--
				break
			case down:
				y++
				break
			}

			result := calcCell(x, y)
			fmt.Printf("[%d][%d] = %d\n", x, y, result)
			matrix[y][x] = result

			if result > input {
				fmt.Println(result)
				return
			}
		}

		cycleLength += 2
		dir = (dir + 1) % 4
	}
}
