migrate:
	command -v migrate >/dev/null 2>&1 || go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
	migrate -path ./migrations -database "${DB_URI}?TimeZone=UTC&sslmode=disable&binary_parameters=yes" up
