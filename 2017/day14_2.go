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

var grid [][]int

func fillGrid(input string, gridSize int) {
	grid = make([][]int, gridSize)
	for i := 0; i < gridSize; i++ {
		grid[i] = make([]int, gridSize)
	}

	for i := 0; i < gridSize; i++ {
		row := fmt.Sprintf("%s-%d", input, i)
		hash := knotHash(row)

		for j, char := range hash {
			parsed, _ := strconv.ParseUint(string(char), 16, 4)
			binary := fmt.Sprintf("%04b", parsed)

			for x, c := range binary {
				value, _ := strconv.Atoi(string(c))
				grid[j*4+x][i] = value
			}
		}
	}
}

var visited = make(map[int]int)
var reverseVisited = make(map[int][]int)
var groupNaming = 1
var groupsCount = 1

func fixGroup(groupToFix int, groupNumber int) {
	for k, v := range visited {
		if v == groupToFix {
			visited[k] = groupNumber
		}
	}

	for n := range reverseVisited[groupToFix] {
		reverseVisited[groupNumber] = append(reverseVisited[groupNumber], n)
	}
	reverseVisited[groupToFix] = []int{}
}

func visitPoint(i, j int) {
	if grid[i][j] == 0 {
		return
	}

	neighbours := [][]int{{i + 1, j}, {i - 1, j}, {i, j + 1}, {i, j - 1}}

	for _, n := range neighbours {
		visitedIndex := n[0]*1000 + n[1]

		if group, ok := visited[visitedIndex]; ok {
			// check if already found group with other neightbour
			if visited[i*1000+j] == 0 {
				visited[i*1000+j] = group
				reverseVisited[group] = append(reverseVisited[group], i*1000+j)
			} else {
				if visited[i*1000+j] != group {
					groupsCount--
				}

				if visited[i*1000+j] < group {
					fixGroup(group, visited[i*1000+j])
				} else {
					fixGroup(visited[i*1000+j], group)
				}

			}
		}
	}

	if visited[i*1000+j] == 0 {
		groupsCount++
		groupNaming++
		visited[i*1000+j] = groupNaming
	}
}

func main() {
	input := "jxqlasbh"

	gridSize := 128
	visited = make(map[int]int)

	fillGrid(input, gridSize)

	for i := 0; i < gridSize; i++ {
		for j := 0; j < gridSize; j++ {
			visitPoint(i, j)
		}
	}

	fmt.Println(groupsCount - 1)
}
