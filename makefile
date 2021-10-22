all:
	timeout 0

docker-up:
	docker-compose up -d
	timeout 4
	npx prisma migrate dev

docker-down:
	docker-compose down