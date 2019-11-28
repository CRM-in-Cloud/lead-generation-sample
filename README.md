# Lead generation con CRM in Cloud

Questo _repo_ contiene un esempio in vanilla-Javascript di come costruire una form per la lead generation da inserire in un sito web.

Si possono utilizzare tutti i campi dell'oggetto lead del CRM come address, city, zipcode, province, region, state, vatid, website, taxidentificationnumber, ecc. Per i campi aggiuntivi bast aggiungere il prefisso `ff_` al nome del campo.
basta sostituire l'attributo name del tag input con il nome della proprietà che si vuole scrivere, preceduto dal prefisso `crmincloud_`

es: per scrivere nel campo aggiuntivo _Fidelity Card_ con codice fidelity_card va inserito il nome `crmincloud_ff_fidelity_card`

```<input id="fidelitycard" name="crmincloud_ff_fidelity_card" type="text" />```

Attenzione: è necessario generare un token (apiKey) come descritto in questa pagina: https://help.crmincloud.it/it/article/xpddi3/

Se si utilizza solo codice javascript. il token sarà visibile all'interno dell'html, quindi è importante limitare lo scope di accesso alla sola creazione di nuovi lead. 

E' possibile installare il file *form-to-lead.php*, che agisce da proxy. Nel qual caso il token andrà inserito nel sorgente del PHP, evitando così di esporlo.

[**CRM in Cloud**](https://www.crmincloud.it) è un prodotto TeamSystem S.p.A.
