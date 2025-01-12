Proiect CC Bookstore
===============================================================================
Echipa:
Ceausene Oana-Patricia
Ciobanu Daria
Grupa EGOV-1A
===============================================================================
Am implementat un magazin online de carti, prin intermediu caruia utilizatorul
poate vizualiza si cumapara carti. Admin-ul are rolul de a adauga noi carti in
stoc, actualiza stocul si pretul cartilor si poate vizualiza comenzile.
===============================================================================
In implementarea aplicatiei, am utilizat:
-> auth-service: microserviciul pentru autentificare si autorizare (care utili-
zeaza o baza de date auth)
-> business-service: responsabil cu functionalitatile aplicatiei
-> database-service: care implementeaza operatiile cu baza de date bookstore
===============================================================================
Pentru creare si configurare cluster am folosit utilitarul kind: 
kind-compose.yaml
Pentru creare pods si deplyment microservicii: auth-service.yaml, 
business-service.yaml, database-service.yaml, auth-db-mongo.yaml,
bookstore-mongo.yaml
Pentru baza de date am ales sa folosim Mongo.
Ca utilizat pentru gestiunea bazei de date am ales Adminer: adminer-config.yaml
Ca utilizat pentru gestiunea clusterului am uitilizat Portainer cu credentialele 
(admin, password1111): portainer.yaml si pentru permisiuni pentru a putea vizua-
li detaliile clusterului portainer-clusterrole.yaml si
portainer-clusterrolebinding.yaml
===============================================================================
Imaginile folosite au fost incarcate in Docker Hub: 
https://hub.docker.com/u/patriciaceausene
===============================================================================
