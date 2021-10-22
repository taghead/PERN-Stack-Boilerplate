docker-up:
	docker-compose up -d
	timeout 20
	psql postgresql://superawesomeuser:supersecretpass@localhost:5432/superawesomename
	CREATE TABLE User
	CREATE TABLE Post
	CREATE TABLE Role


docker-down:
	docker-compose down