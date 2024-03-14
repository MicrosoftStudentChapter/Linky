package router

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	mapping "github.com/MicrosoftStudentChapter/Link-Generator/pkg/mapping"
)

type RequestBody struct {
	Link     string `json:"link"`
	ShortURL string `json:"shortURL"`
	Expiry   string `json:"expiry"`
}

func HandleRouting(w http.ResponseWriter, r *http.Request) {
	link := r.URL.Path[1:]
	url := mapping.GetURL(link)
	// w.WriteHeader(http.StatusOK)
	// w.Write([]byte(url))
	http.Redirect(w, r, url, http.StatusSeeOther)
}

func AddLink(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	var req RequestBody
	_ = json.Unmarshal(body, &req)
	fmt.Println(req)
	link, err := mapping.AddURL(req.Link, req.ShortURL, req.Expiry)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(link)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}
