all:
	timeout 0

docker-up:
	docker-compose up -d
	timeout 4
	npx prisma migrate dev
	npx prisma db seed

docker-down:
	docker-compose down