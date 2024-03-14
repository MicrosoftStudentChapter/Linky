package mapping

import (
	"fmt"
	"regexp"
	"time"
)

type Links struct {
	Link      string
	ShortURL  string
	CreatedAt time.Time
	Expiry    time.Time
}

func (m *Links) GetShortURL() string {
	return m.ShortURL
}

func (m *Links) GetExpiry() time.Time {
	return m.Expiry
}

func (m *Links) CheckExpiry(time time.Time) bool {
	if m.Expiry.Before(time) {
		return true
	} else {
		return false
	}
}

func (m *Links) GetLink() string {
	return m.Link
}

// Change this in memory store to a redis adapter
var Mappings = make(map[string]Links)

func AddURL(linkURL string, shortURL string, exp string) (Links, error) {
	expiry, err := time.Parse(time.RFC3339, exp)
	if err != nil {
		return Links{}, err
	}
	linkPattern := "^[a-zA-Z0-9 -]+$"
	match, err := regexp.MatchString(linkPattern, shortURL)
	if err != nil {
		fmt.Println(err)
		return Links{}, err
	}
	if !match {
		return Links{}, fmt.Errorf("invalid link name")
	}
	mapping := Links{
		Link:      linkURL,
		ShortURL:  shortURL,
		CreatedAt: time.Now(),
		Expiry:    expiry,
	}
	Mappings[shortURL] = mapping
	return mapping, nil
}

func GetURL(shortURL string) string {
	mapping := Mappings[shortURL]
	if mapping == (Links{}) {
		return "Link not found"
	}
	return mapping.GetLink()
}

func RemoveURL(linkName string) bool {
	mapping := Mappings[linkName]
	isExpired := mapping.CheckExpiry(time.Now())
	if isExpired {
		delete(Mappings, linkName)
		return true
	}
	return false
}
