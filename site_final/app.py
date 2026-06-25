from flask import Flask, render_template, jsonify, abort
from data.countries import COUNTRIES

app = Flask(__name__)


@app.route("/")
def index():
    country_list = [
        {"name": name, "logo": data["logo"], "continent": data["continent"]}
        for name, data in COUNTRIES.items()
    ]
    return render_template("index.html", countries=country_list)


@app.route("/api/country/<name>")
def get_country(name):
    country = COUNTRIES.get(name)
    if not country:
        abort(404, description=f"Pays '{name}' introuvable.")
    return jsonify({"name": name, **country})


@app.route("/api/countries")
def list_countries():
    return jsonify(list(COUNTRIES.keys()))


if __name__ == "__main__":
    app.run(debug=True)