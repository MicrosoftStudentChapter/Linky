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

	r.HandleFunc("/add-link", router.AddLink).Methods(http.MethodOptions, http.MethodPost)
	r.HandleFunc("/{link}", router.HandleRouting).Methods(http.MethodOptions, http.MethodGet)

	r.Use(LoggingMiddleware)
	r.Use(mux.CORSMethodMiddleware(r))
	r.Use(HandlePreflight)

	fmt.Println("Server started at port 4000")

	http.ListenAndServe(":4000", r)
}

// Middlewares

func HandlePreflight(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Logger:  ", r.Method, r.URL)
		next.ServeHTTP(w, r)
	})
}
