# POSTGRES
postgres:
	-@docker rm local-postgres --force
	@docker run --name local-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres

# REDIS
redis:
	-@docker stop local-redis
	-@docker run --name local-redis -p 6379:6379 -d redis
	-@docker start local-redis

# KRAKEND
krakend:
	-@docker stop local-krakenD
	-@docker run --name local-krakend -p 1080:8080 -v /opt/krakend/config/:/etc/krakend/ devopsfaith/krakend
	-@docker start local-krakend

# MONGO
mongo:
	-@docker stop local-mongo
	-@docker run --name local-mongo -p 27017:27017 -d mongo
	-@docker start local-mongo

# HELPERS
docker-cleanup:
	-@docker image prune --all --force
	-@docker container prune --force
	-@docker system prune --force
	-@docker volume prune --force