## Webapp Environment Variables
|Environment Variable|Description|Values|Default Value|Example|Required?|
|----|----|----|----|----|----|
| DATABASE_URL | Points to Prisma database | URL | null | `postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public` | yes

## Docker Environment Variables
|Environment Variable|Description|Values|Default Value|Example|Required?|
|----|----|----|----|----|----|
| DATABASE_NAME | Default database name ( db service ) | STRING | null | `superawesomename` | yes
| DATABASE_SUPERUSER_USER | Declares superusers name | STRING | null | `superawesomeuser` | yes
| DATABASE_SUPERUSER_PASSWORD | Declares superusers password | STRING | null | `supersecretpass` | yes