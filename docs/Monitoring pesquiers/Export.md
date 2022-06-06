### Values
| Paramètre | Définition          | Valeur autorisé                                        | Valeur par défaut |
| --------- | ------------------- | ------------------------------------------------------ | ----------------- |
| u         | unité               | true/false                                             | false             |
| balise_id | id de balise        | int                                                    | ø                 |
| sensor_id | id de capteur       | int                                                    | ø                 |
| from      | timestamp de début  |                                                        | ø                 |
| to        | timestamp de fin    |                                                        | ø                 |
| sort      | direction de triage | asc/desc                                               | asc               |
| sby       | trie par            | **['id', 'balise_id', 'sensor_id', 'value', 'timestamp']** | id                |
| limit     | nombre max de ligne | int                                                    | ∞                 |

### Sensors
| Paramètre | Définition          | Valeur autorisé                         | Valeur par défaut |
| --------- | ------------------- | --------------------------------------- | ----------------- |
| sensor_id | id de capteur       | int                                     | ø                 |
| sort      | direction de triage | asc/desc                                | asc               |
| sby       | trie par            | ['sensor_id', 'name', 'unit', 'symbol'] | id                |
| limit     | nombre max de ligne | int                                     | ∞                 |


### Nodes
| Paramètre | Définition  		  | Valeurs autorisé 		 				| Valeur par défaut |
| --------- | ------------------- | --------------------------------------- | ----------------- |
| sensors_id | ids de capteur	  | string (ex 1,2)   						| ø                 |
| sort      | direction de triage | asc/desc		 						| asc               |
| sby       | trie par            | ['sensor_id', 'name', 'unit', 'symbol'] | id                |
| limit     | nombre max de ligne | int                                     | ∞                 |

### Alerts
| Paramètre | Définition          | Valeur autorisé | Valeur par défaut |
| --------- | ------------------- | --------------- | ----------------- |
| sort      | direction du trie   | asc/desc        | asc               |
| limit     | nombre max de ligne | int             | ∞                 |
