package main

import (
	"fmt"
	"strconv"
	"strings"
)

var puzzle = `0: 4
1: 2
2: 3
4: 5
6: 8
8: 6
10: 4
12: 6
14: 6
16: 8
18: 8
20: 6
22: 8
24: 8
26: 8
28: 12
30: 12
32: 9
34: 14
36: 12
38: 12
40: 12
42: 12
44: 10
46: 12
48: 12
50: 10
52: 14
56: 12
58: 14
62: 14
64: 14
66: 12
68: 14
70: 14
72: 17
74: 14
76: 14
80: 20
82: 14
90: 24
92: 14
98: 14`

const (
	up   = -1
	down = 1
)

type Layer struct {
	scanningRange int
	scanner       int
	dir           int
}

var layers []Layer

func moveScanners() {
	for i := range layers {
		if layers[i].scanningRange != 0 {
			if layers[i].dir == down && layers[i].scanner == layers[i].scanningRange-1 {
				layers[i].dir = up
			} else if layers[i].dir == up && layers[i].scanner == 0 {
				layers[i].dir = down
			}

			layers[i].scanner += layers[i].dir
		}
	}
}

func main() {
	rows := strings.Split(puzzle, "\n")

	lastLayer, _ := strconv.Atoi(strings.Split(rows[len(rows)-1], ": ")[0])
	layers = make([]Layer, lastLayer+1)

	for _, row := range rows {
		parts := strings.Split(row, ": ")

		layer, _ := strconv.Atoi(parts[0])
		scanningRange, _ := strconv.Atoi(parts[1])

		layers[layer] = Layer{scanningRange: scanningRange, scanner: 0, dir: down}
	}

	totalSeverity := 0
	for i := 0; i <= lastLayer; i++ {
		if layers[i].scanner == 0 && layers[i].scanningRange > 0 {
			totalSeverity += layers[i].scanningRange * i
		}

		moveScanners()
	}

	fmt.Println(totalSeverity)
}
