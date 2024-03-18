FROM golang:1.20.4-alpine AS build

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY ./ ./

RUN go build -o main.exe main.go

FROM scratch
WORKDIR /app
COPY --from=build /app/main.exe ./
LABEL traefik.port=80
LABEL traefik.http.routers.link.rule="Host(`l.mlsctiet.com`)"
LABEL traefik.http.routers.link.tls=true
LABEL traefik.http.routers.link.tls.certresolver="lets-encrypt"
LABEL org.opencontainers.image.source="https://github.com/MicrosoftStudentChapter/link-generator"
EXPOSE 4000
CMD [ "./main.exe" ]