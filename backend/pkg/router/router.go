package router

import (
	"context"
	"encoding/json"
	"fmt"
	"html/template"
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

func GetAllLinks(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	links := mapping.GetAllLinks(ctx, Mem)
	page, err := template.ParseFiles("./go-templates/view.html")
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Internal Server Error"))
		return
	}
	w.WriteHeader(http.StatusOK)
	if len(links) == 0 {
		w.Write([]byte("No links found"))
		return
	}
	var linksData []string
	for _, link := range links {
		// w.Write([]byte(fmt.Sprintf("%s - %s\n", link.ShortURL, link.Link)))
		if link.Expire == "" {
			linksData = append(linksData, fmt.Sprintf("%s - %s - %s\n", link.ShortURL, link.Link, "No Expiry"))
		} else {

			linksData = append(linksData, fmt.Sprintf("%s - %s - %s\n", link.ShortURL, link.Link, link.Expire))
		}
	}
	page.Execute(w, linksData)
}

func HandleRouting(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	link := r.URL.Path[1:]
	url := mapping.GetURL(link, ctx, Mem)
	if url == "" {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Welcome to MLSC Link Generator! This link is not yet created."))
		return
	}
	http.Redirect(w, r, url, http.StatusSeeOther)
}

func AddLink(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	body, _ := io.ReadAll(r.Body)
	var req RequestBody
	_ = json.Unmarshal(body, &req)
	link, err := mapping.AddURL(req.Link, req.ShortURL, req.Expiry, ctx, Mem)
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		// w.Write([]byte(err.Error()))
		json.NewEncoder(w).Encode(link)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(link)
}
