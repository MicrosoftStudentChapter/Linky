package router

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	mapping "github.com/MicrosoftStudentChapter/Link-Generator/pkg/mapping"
	"github.com/redis/go-redis/v9"
)

var Mem *redis.Client

type RequestBody struct {
	Link     string `json:"link"`
	ShortURL string `json:"shortURL"`
	Expiry   string `json:"expiry"`
}

func HandleRouting(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	link := r.URL.Path[1:]
	url := mapping.GetURL(link, ctx, Mem)
	http.Redirect(w, r, url, http.StatusSeeOther)
	// w.WriteHeader(http.StatusOK)
	// w.Write([]byte(url))/
}

func AddLink(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	body, _ := io.ReadAll(r.Body)
	var req RequestBody
	_ = json.Unmarshal(body, &req)
	link, err := mapping.AddURL(req.Link, req.ShortURL, req.Expiry, ctx, Mem)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(link)
}
