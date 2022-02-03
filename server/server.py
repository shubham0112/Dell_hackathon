from flask import Flask
from flask_cors import CORS
from flask import request
from helpers import helper

app = Flask(__name__)

CORS(app)

# Routes
@app.route("/members",methods=['POST'])
def members():
    val=request.json

   
    [ans,dp]=helper(val[0],val[1])

    return {
        # "data": [ {"sales_order_number":"1234","service_tag_filename":"293uhru.zip","received_date":"random","mac_address":"afa49220"},{"sales_order_number":"1","service_tag_filename":"2u4ru.zip","received_date":"arg","mac_address":"ajfn88"},{"sales_order_number":"1","service_tag_filename":"2u4ru.zip","received_date":"arg","mac_address":"ajfn88"}] 

        "data":ans,"dp":dp
    }

if __name__ == "__main__":
    app.run(debug=True)