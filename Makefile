migrate:
	dbmate -d "./migrations" -u "${DB_URI}?TimeZone=UTC&sslmode=disable&binary_parameters=yes" migrate
