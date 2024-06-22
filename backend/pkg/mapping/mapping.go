package mapping

import (
	"context"
	"fmt"
	"regexp"
	"time"

	"github.com/redis/go-redis/v9"
)

type Link struct {
	Link     string `redis:"Link" json:"link"`
	ShortURL string `redis:"ShortURL" json:"shortURL"`
	Expire   string `redis:"Expire" json:"expire"`
}

func AddURL(linkURL string, shortURL string, exp string, ctx context.Context, conn *redis.Client) (Link, error) {
	existingMap := conn.HGetAll(ctx, shortURL).Val()
	if len(existingMap) != 0 {
		if existingMap["Link"] == linkURL {
			return Link{
				Link:     existingMap["Link"],
				ShortURL: existingMap["ShortURL"],
				Expire:   existingMap["Expire"],
			}, nil
		} else {
			return Link{}, fmt.Errorf("shortURL already exists")
		}
	}
	linkPattern := "^[a-zA-Z0-9 -]+$"
	match, err := regexp.MatchString(linkPattern, shortURL)
	if err != nil {
		fmt.Println(err)
		return Link{}, err
	}
	if !match {
		return Link{}, fmt.Errorf("invalid link url")
	}
	existingPaths := []string{"about", "community", "events", "gallery", "team", "sponsors", "health", "links"}
	for _, path := range existingPaths {
		if path == shortURL {
			return Link{}, fmt.Errorf("link already exists on website")
		}
	}
	mapping := Link{
		Link:     linkURL,
		ShortURL: shortURL,
		Expire:   exp,
	}
	err = conn.HSet(ctx, shortURL, mapping).Err()
	if err != nil {
		return Link{}, err
	}
	if exp != "" {
		expiry, err := time.Parse(time.RFC3339, exp)
		if err != nil {
			return Link{}, err
		}
		_, err = conn.Expire(ctx, shortURL, time.Until(expiry)).Result()
		if err != nil {
			return Link{}, err
		}
	}
	return mapping, nil
}

func GetURL(shortURL string, ctx context.Context, conn *redis.Client) string {
	mapping := conn.HGetAll(ctx, shortURL).Val()
	if mapping == nil {
		return "Link not found"
	}
	return mapping["Link"]
}

func GetAllLinks(ctx context.Context, conn *redis.Client) []Link {
	keys := conn.Keys(ctx, "*").Val()
	var links []Link
	for _, key := range keys {
		link := conn.HGetAll(ctx, key).Val()
		links = append(links, Link{
			Link:     link["Link"],
			ShortURL: link["ShortURL"],
			Expire:   link["Expire"],
		})
	}
	return links
}
