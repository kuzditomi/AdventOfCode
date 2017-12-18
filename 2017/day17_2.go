package main

import (
	"fmt"
)

type bit struct {
	prev  *bit
	next  *bit
	value int
}

func main() {
	step := 348
	nextval := 1
	iterator := &(bit{value: 0})
	iterator.next = iterator
	iterator.prev = iterator

	for nextval <= 50000000 {
		for i := 0; i <= step; i++ {
			iterator = iterator.next
		}

		newbit := bit{value: nextval}

		newbit.next = iterator.next
		newbit.prev = iterator

		iterator.next.prev = &newbit
		iterator.next = &newbit

		nextval++
	}

	for {
		if iterator.value == 0 {
			fmt.Println(iterator.next.value)
			break
		}
		iterator = iterator.next
	}
}
