from flask import Flask, render_template, request, send_from_directory, redirect, jsonify
from flask_cors import CORS
from flask_compress import Compress
import requests
import json
import logging
import os


app = Flask(__name__)

app.config.update(
    DEBUG=os.environ.get("DEBUG", False),
    TEMPLATES_AUTO_RELOAD=os.environ.get("DEBUG", False),  # this is needed for hot-reloading
    DEVELOPMENT=os.environ.get("DEBUG", False),  # this is needed for hot-reloading
)

CORS(app)
Compress(app)


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.errorhandler(404)
def not_found(e):
    return render_template("404.html"), 404


@app.errorhandler(500)
def internal_server_error(error):
    if not os.environ.get("DEBUG"):
        message = compile_message(
            fallback="Don't Panic! Your app is throwing a 500",
            pretext="You might want to check your terminal",
            text="```{}```".format(traceback.format_exc())
        )
    return render_template("500.html"), 500


if __name__ == "__main__":
    if os.environ.get("DEBUG"):  # in case you wish to run this without docker
        app.run(debug=True, port=3000)
    else:
        app.run()
