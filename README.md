# GeoIDO

Pour faire fonctionner le site convenablement il faut avoir un installé un serveur FROST. 

# Installer FROST sous Ubuntu : 

Installation de Maven :

$ sudo apt policy maven
$ sudo apt install maven
$ mvn -version

Installation PostgreSQL et pgAdmin3  (marche aussi avec le 4):

$ sudo apt-get install postgresql
Sudo apt install postgis
$ sudo apt-get install pgadmin3
$ sudo -u postgres psql postgres
$ sudo apt-get install postgresql-contrib

Une fois installer ouvrir PgAdmin3, créer un serveur SensorThings puis une BDD sensorThings.
Installation de TomCat :

Télécharger le fichier tar.gz ici :  https://tomcat.apache.org/download-90.cgi
sudo apt-get update
sudo apt-get install default-jdk
créer un dossier apache-tomcat9
ouvrir le fichier tar.gz puis le copier dans /usr/local/apache-tomcat9
echo "export CATALINA_HOME="/usr/local/apache-tomcat9"" >> ~/.bashrc
echo "export JAVA_HOME="/usr/lib/jvm/java-8-oracle"" >> ~/.bashrc
echo "export JRE_HOME="/usr/lib/jvm/java-8-oracle/jre"" >> ~/.bashrc
source ~/.bashrc
Démarrer le serveur Tomcat :
ouvrir un terminal dans apache-tomcat9/bin
sudo bash startup.sh 


Installation du serveur

Dans le dossier apache-tomcat9/webapps/ coller le fichier FROST-Server.MQTT*.war
Dans le dossier correspondant aller dans META-INF modifier le fichier context.xml avec :
    <Resource
        name="jdbc/sensorThings" auth="Container"
        type="javax.sql.DataSource" driverClassName="org.postgresql.Driver"
        url="jdbc:postgresql://database:5432/SensorThings"
        username="postgres" password="postgres"
        maxTotal="20" maxIdle="10" maxWaitMillis="-1"
        defaultAutoCommit="false"
    />
Remplir avec vos informations, puis le copier pour le coller dans apache-tomcat/conf en le renommant FROST-Server et supprimant ‘’driverClassName="org.postgresql.Driver" ‘’
Aller sur http://localhost:8080/FROST-Server/DatabaseStatus
Cliquer sur update et votre BDD est reliée à votre server (des tables ce sont créées dans votre BDD et Done est affiché).

# Installer FROST sous Windows : 

Mise place BDD :

- Installer PostGreSQL (https://www.postgresql.org/) et ne pas oublier pendant l’installation de demander l’installation de l’extension PostGis.
- Créer une nouvelle BDD (via un SGBB ex : PgAdmin) en la nommant SensorThings par exemple.
- En selectionnant la BDD SensorThings : executer la requete SQL : CREATE EXTENSION postgis.
- Si tout se passe bien un nombre important de fonctions à été rajouté à votre BDD.

Installer TomCat : https://tomcat.apache.org/download-80.cgi

- Ajouter PostGreSQL a TomCat : ajouter au dossier $Catalina_Home/lib les fichiers Postgres JDBC jar et postgis jar
- Ajouter FROST a TomCat : Copier le fichier FROST-Server-x.x.war (https://github.com/FraunhoferIOSB/FROST-Server) dans le dossier webapps de TomCat. (conseil : renommer le fichier Frost-Server.war pour faciliter les mises à jours)
- Dans le dossier conf/Catalina/localhost modifier le fichier FROST-Server.xml : en y rajoutant avant la fermeture de la balise </Context> :
<Resource
name="jdbc/sensorThings" auth="Container"
type="javax.sql.DataSource" driverClassName="org.postgresql.Driver"
url="jdbc:postgresql://localhost:5434/SensorThings"
username="postgres" password="postgres"
maxTotal="20" maxIdle="10" maxWaitMillis="-1"
defaultAutoCommit="false"
/>

Modifications à faire :

- Mettre dans la valeur url le chemin vers notre BDD
- Changer l’utilisateur/mot de passe tels que définis dans la BDD
Initialisation de la BDD :
- A http://localhost:8080/FROST-Server/DatabaseStatus : Cliquer sur Update si l’initialisation se passe bien : un Done. Apparait sur la page.
Frost est maintenant installé sur votre ordinateur : http://localhost:8080/FROST-Server/v1.0

# Mise en place du site : 

Après avoir installé FROST :

— Placer le dossier « GeoIDO » dans le dossier apache-tomCat9/webapps
— Ouvrir votre navigateur web et entrer l’url : localhost :8080/GeoIDO

Il faut maintenant alimenter le serveur, pour cela allez dans l'onglet "Alimentation" de votre site et télécharger les données CSV fournis avec le code. Vous pouvez maintenant visualiser les données dans l'onglet "Carte". 

Attention : Si vous n'alimentez pas le serveur aucune données ne sera affiché dans l'onglet "Carte". 


