import os
def deleteFiles():
    json_path = "D:/DELL-RAW"
    
    test = os.listdir(json_path)
    for item in test:
        if item.endswith(".json"):
            os.remove(os.path.join(json_path, item))