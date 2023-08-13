# Descrizione del progetto

Si vuole realizzare un'applicazione che gestisca dei container Docker attraverso un'interfaccia grafica.

## Riassunto delle funzionalità

Control-board che permette:
- Elaborazione di un'immagine Docker attraverso il Dockerfile (build)
- Visualizzazione del file di log
- Creazione, lancio, arresto e riavvio di un container
- Pagina di autenticazione e registrazione che permettono all'utente di autenticarsi e creare un nuovo utente.
- Il progetto sarà fatto disponibile su Docker hub e sarà possibile utilizzarlo sia come immagine Docker, sia

lanciarlo tramite il codice sorgente sulla macchina locale (gestito via le variabili dell'ambiente).

## Tecnologie utilizzate

Lo stack MEAN
Altre librarie di Node come per esempio dotenv che permette di configurare Docker tramite le variabili dell'ambiente.

# User stories
| User story ID | Priority | Type               | As a <type of user>          | I want to <perform some task>                                | So that I can <achieve some goal>                       | Final story |
|---------------|----------|--------------------|------------------------------|--------------------------------------------------------------|---------------------------------------------------------|-------------|
| 1             | High     | Home Page          | First-time visitor           | Quickly understand what Docker-UI offers                     | Decide if the application is relevant to me.            | Yes         |
| 2             | High     | Documentation Page | Unexperienced user           | User-friendly documentation page                             | Easily learn what features the website offers.          | Yes         |
| 3             | Low      | Login/Signup Page  | Returning user or new member | Seamlessly load previous sessions' content                   | Be satisfied and make decisions based on previous data. | Yes         |
| 4             | High     | Dashboard Page     | Registered user              | Centralized dashboard to interact with a container’s actions | Manage created containers during their execution.       | Yes         |
| 5             | Medium   | Logger's Page      | Experienced user             | See logging messages within the browser                      | Easily debug running containers.                        | Yes         |
| 6             | Medium   | Docker Hub         | Product owner                | Simply distribute Docker UI                                  | Dispense the application quickly to interested users.   | Yes         |
