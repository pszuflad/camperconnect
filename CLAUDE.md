# CamperConnect — zasady dla agentów

- **Wszystko powstaje wewnątrz tego katalogu (`camperconnect/`).** Nie twórz plików, katalogów ani worktree obok projektu (np. `../cc-*`).
- Git worktree zakładaj tylko w `.worktrees/<obszar>` (`git worktree add .worktrees/<obszar> -b feature/<obszar>`); katalog jest w `.gitignore`. Po scaleniu usuń je: `git worktree remove .worktrees/<obszar>`.
- Pliki tymczasowe i robocze, które nie należą do projektu, trzymaj poza repozytorium w katalogu tymczasowym sesji, nie w katalogu nadrzędnym.
- Dokumentacja: `docs/` — backlog (`CC_Makieta_MVP_Backlog.md`), prompty (`CC_Makieta_Prompty_Agenci.md`), kontrakt makiety (`KONTRAKT.md`), treść dokumentów wypożyczalni (`CC_Dokumenty_Wypozyczalni.md`).
- Oryginalne PDF-y wypożyczalni leżą lokalnie w katalogu głównym, są w `.gitignore` i nie trafiają do repozytorium.
