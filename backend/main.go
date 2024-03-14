package main

import (
	"fmt"
	"net/http"

	router "github.com/MicrosoftStudentChapter/Link-Generator/pkg/router"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/add-link", router.AddLink).Methods("POST")
	r.HandleFunc("/{link}", router.HandleRouting).Methods("GET")
	fmt.Println("Server started at port 4000")
	http.ListenAndServe(":4000", r)
}
