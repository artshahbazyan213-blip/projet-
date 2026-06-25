from flask import Flask, render_template, jsonify, abort  # Import Flask outils
from data.countries import COUNTRIES                      # Import données pays

app = Flask(__name__)                                     # Créer application


@app.route("/")                                           # Route principale
def index():                                              # Fonction accueil
    country_list = [                                      # Créer liste
        {"name": name, "logo": data["logo"], "continent": data["continent"]}  # Données simplifiées
        for name, data in COUNTRIES.items()               # Parcourir pays
    ]
    return render_template("index.html", countries=country_list)  # Afficher page


@app.route("/api/country/<name>")                         # Route API pays
def get_country(name):                                    # Obtenir pays
    country = COUNTRIES.get(name)                         # Chercher pays
    if not country:                                       # Vérifier existence
        abort(404, description=f"Pays '{name}' introuvable.")  # Erreur 404
    return jsonify({"name": name, **country})             # Retourner JSON


@app.route("/api/countries")                              # Route liste pays
def list_countries():                                     # Lister pays
    return jsonify(list(COUNTRIES.keys()))                # Retourner noms


if __name__ == "__main__":                                # Exécution directe
    app.run(debug=True)                                   # Démarrer serveur
