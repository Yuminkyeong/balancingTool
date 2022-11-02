from flask import Flask, render_template, request, jsonify
# from pymongo import MongoClient
import json

app = Flask(__name__)
# client = MongoClient('mongodb+srv://test:glassessroll@cluster0.lfye802.mongodb.net/Cluster0?retryWrites=true&w=majority')
# db = client.dbtest

#html actor
@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run('0.0.0.0', port=8000, debug=True)