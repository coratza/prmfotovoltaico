

## Creare utente admin prmfotovoltaico@gmail.com

### Passaggi

1. **Creare l'utente** tramite la funzione di signup di Supabase Auth con email `prmfotovoltaico@gmail.com` e password `PrmFotovoltaico123` (con auto-confirm abilitato per evitare la verifica email)
2. **Assegnare il ruolo admin** inserendo una riga nella tabella `user_roles` con il nuovo `user_id` e ruolo `admin`
3. **Testare il login** navigando su `/admin` e verificando che il form accetti le credenziali e mostri la dashboard

### Note tecniche

- L'utente verra creato con email gia confermata (senza bisogno di cliccare il link di verifica)
- La password `PrmFotovoltaico123` e quella che userai per accedere - ti consiglio di cambiarla dopo il primo accesso
- Nessuna modifica al codice frontend necessaria: il sistema di login esistente funzionera con il nuovo utente

### Nessun file da modificare

Solo operazioni sul database (creazione utente + inserimento ruolo).

