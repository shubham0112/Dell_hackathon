from flask import Flask
from flask_cors import CORS
from flask import request

app = Flask(__name__)

CORS(app)

# Routes
@app.route("/members",methods=['POST'])
def members():
    # val is list
    val=request.json
    print(type(val))
    print(val)
    # processing
    return {
        "member1":"1",
        "member2":"2",
        "member3":"3",
    }

if __name__ == "__main__":
    app.run(debug=True)