from flask import Flask, render_template, jsonify, abort
from data.countries import COUNTRIES

app = Flask(__name__)


@app.route("/")
def index():
    """Main page — renders the interactive map with the list of countries."""
    country_list = [
        {"name": name, "logo": data["logo"], "continent": data["continent"]}
        for name, data in COUNTRIES.items()
    ]
    return render_template("index.html", countries=country_list)


@app.route("/api/country/<name>")
def get_country(name):
    """REST endpoint — returns full country data as JSON."""
    country = COUNTRIES.get(name)
    if not country:
        abort(404, description=f"Pays '{name}' introuvable.")
    return jsonify({"name": name, **country})


@app.route("/api/countries")
def list_countries():
    """REST endpoint — returns the full list of country names."""
    return jsonify(list(COUNTRIES.keys()))


if __name__ == "__main__":
    app.run(debug=True)