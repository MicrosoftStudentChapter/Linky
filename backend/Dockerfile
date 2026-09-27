# Start with a very fast and tiny base for building
FROM golang:1.21-alpine AS build

WORKDIR /app

# Enable Go modules and caching for much faster rebuilds
ENV GO111MODULE=on
ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64

# Copy only mod files first to cache dependencies (this makes subsequent builds INSTANT)
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the code
COPY ./ ./

# Build a strictly static, highly optimized binary (-s -w strips debugging info to reduce file size heavily)
RUN go build -ldflags="-s -w" -o main.exe main.go

# Second stage: The absolute smallest possible container (Zero OS overhead)
FROM scratch
WORKDIR /app
COPY --from=build /app/main.exe ./
COPY --from=build /app/go-templates/ ./go-templates/

EXPOSE 4000
CMD [ "./main.exe" ]
