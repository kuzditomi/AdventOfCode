package main

import (
	"fmt"
	"strconv"
	"strings"
)

var puzzle = `set i 31
set a 1
mul p 17
jgz p p
mul a 2
add i -1
jgz i -2
add a -1
set i 127
set p 680
mul p 8505
mod p a
mul p 129749
add p 12345
mod p a
set b p
mod b 10000
snd b
add i -1
jgz i -9
jgz a 3
rcv b
jgz b -1
set f 0
set i 126
rcv a
rcv b
set p a
mul p -1
add p b
jgz p 4
snd a
set a b
jgz 1 3
snd b
set f 1
add i -1
jgz i -11
snd a
jgz f -16
jgz a -19`

func main() {
	registers := make(map[string]int)
	rows := strings.Split(puzzle, "\n")
	playing := 0
	nextCommand := 0

	for {
		parts := strings.Split(rows[nextCommand], " ")
		command := parts[0]
		rcv := false

		switch command {
		case "snd":
			if value, err := strconv.Atoi(parts[1]); err != nil {
				playing = registers[parts[1]]
			} else {
				playing = value
			}
			break
		case "set":
			if value, err := strconv.Atoi(parts[2]); err != nil {
				registers[parts[1]] = registers[parts[2]]
			} else {
				registers[parts[1]] = value
			}
			break
		case "add":
			if value, err := strconv.Atoi(parts[2]); err != nil {
				registers[parts[1]] += registers[parts[2]]
			} else {
				registers[parts[1]] += value
			}
			break
		case "mul":
			if value, err := strconv.Atoi(parts[2]); err != nil {
				registers[parts[1]] *= registers[parts[2]]
			} else {
				registers[parts[1]] *= value
			}
			break
		case "mod":
			if value, err := strconv.Atoi(parts[2]); err != nil {
				registers[parts[1]] = registers[parts[1]] % registers[parts[2]]
			} else {
				registers[parts[1]] = registers[parts[1]] % value
			}
			break
		case "rcv":
			val := -1
			if value, err := strconv.Atoi(parts[1]); err != nil {
				val = registers[parts[1]]
			} else {
				val = value
			}

			if val != 0 {
				rcv = true
			}
			break
		case "jgz":
			x := 0
			if value, err := strconv.Atoi(parts[1]); err != nil {
				x = registers[parts[1]]
			} else {
				x = value
			}

			if x > 0 {
				y := 0
				if value, err := strconv.Atoi(parts[2]); err != nil {
					y = registers[parts[2]]
				} else {
					y = value
				}

				nextCommand += y - 1
			}

			break
		}

		if rcv {
			break
		}

		nextCommand++
	}

	fmt.Println(playing)
}
