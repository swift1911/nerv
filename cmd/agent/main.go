package main

import (
	"log"
	"github.com/ChaosXu/nerv/lib/env"
	"github.com/ChaosXu/nerv/lib/rpc"
)

var (
	Version = "main.min.build"
)

func main() {
	log.Println("Version:" + Version)
	env.Init()

	if agent,err := NewAgent(); err != nil {
		log.Fatalln(err.Error())
	}else{
		rpc.Register(agent)
	}

	if err := rpc.Start(); err != nil {
		log.Fatalln(err.Error())
	}
}

