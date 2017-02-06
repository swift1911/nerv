package main

import (
	"net/http"
	"log"
	chim "github.com/pressly/chi/middleware"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/pressly/chi"
	"github.com/ChaosXu/nerv/lib/rest/middleware"
	"github.com/ChaosXu/nerv/lib/rest"
	"github.com/ChaosXu/nerv/lib/db"
	"fmt"
	"github.com/ChaosXu/nerv/lib/env"
	"os"
	"github.com/ChaosXu/nerv/lib/service"
	_ "github.com/ChaosXu/nerv/cmd/server/service"
)

var (
	Version = "main.min.build"
)

func main() {
	fmt.Println("Workspace:" + os.Args[0])
	fmt.Println("Version:" + Version)
	env.Init()

	if *env.Setup {
		log.Println("setup...")
		setup()
		log.Println("setup success")
	} else {
		log.Println("run")
		initDB()
		defer db.DB.Close()

		initServices()
		r := initRouter()
		port := env.Config().GetMapString("http", "port", "3333")
		log.Fatal(http.ListenAndServe(":" + port, r))
	}
}

func initRouter() *chi.Mux {
	r := chi.NewRouter()
	r.Use(chim.Logger)
	r.Use(middleware.ParamsParser)

	rest.RouteObj(r)
	return r
}

func initServices() {
	for _, service := range service.Registry.Services {
		if err := service.Init(); err != nil {
			log.Fatal(err.Error())
		}
	}
}





