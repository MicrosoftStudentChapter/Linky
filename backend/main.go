package main

import (
	"context"
	"fmt"
	"net/http"

	router "github.com/MicrosoftStudentChapter/Link-Generator/pkg/router"

	"github.com/gorilla/mux"
	"github.com/redis/go-redis/v9"
)

func main() {
	conn := redis.NewClient(&redis.Options{
		Addr:     ":6379",
		Password: "",
		DB:       0,
	})
	router.Mem = conn
	res, err := conn.Ping(context.Background()).Result()
	if err != nil {
		panic(err)
	}
	fmt.Println("Redis [PING]: ", res)

	r := mux.NewRouter()
	r.HandleFunc("/add-link", router.AddLink).Methods("POST")
	r.HandleFunc("/{link}", router.HandleRouting).Methods("GET")
	fmt.Println("Server started at port 4000")
	http.ListenAndServe(":4000", r)
}
