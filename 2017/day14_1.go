package main

import (
	"bytes"
	"fmt"
	"strconv"
)

func reverse(slice []int) {
	last := len(slice) - 1
	for i := 0; i < len(slice)/2; i++ {
		slice[i], slice[last-i] = slice[last-i], slice[i]
	}
}

func knotHash(puzzle string) string {
	const baselength = 256
	var buffer bytes.Buffer

	sparse := [baselength]int{}
	for i := 0; i < baselength; i++ {
		sparse[i] = i
	}

	lenghts := make([]int, len(puzzle)+5)
	for i, char := range puzzle {
		lenghts[i] = int(char)
	}

	lenghts[len(puzzle)] = 17
	lenghts[len(puzzle)+1] = 31
	lenghts[len(puzzle)+2] = 73
	lenghts[len(puzzle)+3] = 47
	lenghts[len(puzzle)+4] = 23

	current := 0
	skip := 0

	for j := 0; j < 64; j++ {
		for _, number := range lenghts {
			for i := 0; i < number/2; i++ {
				indexA := (current + i) % baselength
				indexB := (current + number - i - 1) % baselength

				sparse[indexA], sparse[indexB] = sparse[indexB], sparse[indexA]
			}

			current = (current + number + skip) % baselength
			skip++
		}
	}

	dense := make([]int, 16)
	currentSparse := 0
	for i := 0; i < 16; i++ {
		for j := 0; j < 16; j++ {
			dense[i] ^= sparse[currentSparse]
			currentSparse++
		}
	}

	for _, number := range dense {
		buffer.WriteString(fmt.Sprintf("%.02x", number))
	}

	return buffer.String()
}

func main() {
	input := "jxqlasbh"
	gridSize := 128

	sum := 0
	for i := 0; i < gridSize; i++ {
		row := fmt.Sprintf("%s-%d", input, i)
		hash := knotHash(row)

		for _, char := range hash {
			parsed, _ := strconv.ParseUint(string(char), 16, 4)
			binary := fmt.Sprintf("%04b", parsed)

			for _, c := range binary {
				if n, _ := strconv.Atoi(string(c)); n == 1 {
					sum++
				}
			}
		}
	}

	fmt.Println(sum)
}
