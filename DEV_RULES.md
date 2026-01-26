# Nila – Developer Rules (Quick Reference)

1. Do not alter existing migration files. Always create a new migration for any schema change.

2. Never create or modify tables manually in pgAdmin or any database UI. All changes must go through migrations.

3. The db folder is part of the backend system and must always live inside the backend repository.

4. The database is the single source of truth. Backend logic must follow the database, not the other way around.

5. No SQL queries are allowed outside repository files.

6. No business logic is allowed inside route files.

7. Controllers must stay thin and only handle request and response flow.

8. Services must contain all business rules and decision-making logic.

9. Seeds are for baseline system data only, not for random dummy or test data.

10. Never hardcode secrets such as database URLs, API keys, or JWT secrets. Use environment variables only.

11. Every developer must be able to set up the entire system using only the backend repository.

12. If a feature requires new data, the database schema must be updated before writing backend code.

13. Do not delete records directly unless explicitly required. Prefer soft deletes and status flags.

14. The backend repository must always be deployable as a complete system on its own.

15. If the database and backend logic disagree, the database is always considered correct.

---
