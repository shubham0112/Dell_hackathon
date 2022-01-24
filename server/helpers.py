import os
from pickle import FALSE
import shutil
import zipfile
from bs4 import BeautifulSoup 

def helper(zip_arr):
    # FIND ZIP CODE
    my_zip = r"F:\ZipFiles.zip"
    target_dir = "F:\DELL-RAW\Zip-folder"
    with zipfile.ZipFile(my_zip,"r") as zip_ref:
        zip_ref.extractall(target_dir)
    # my_zip = r"F:\DELL-RAW\mNewfolder.zip"

    ans=[]
    for ser_tag in zip_arr:
        search_zip = ser_tag + ".zip"
        zip_found = False
        found = False
        with zipfile.ZipFile(my_zip) as zip_file:
            #iterating all zip files
            for member in zip_file.namelist():
                filename = os.path.basename(member)
                if( filename == search_zip ): #required zip found
                    zip_found = True
                    # my_zip
                    search = ser_tag #id name aayega idhar
                    new_dir = search

                    # Parent Directory path
                    parent_dir = "F:\DELL-RAW"
                    # New Folder Path
                    path = os.path.join(parent_dir, new_dir)
                    os.mkdir(path)

                    with zipfile.ZipFile(os.path.join(target_dir, search_zip)) as zip_file:
                        #iterating all xml files inside that zip
                        for member in zip_file.namelist():
                            # raw.xml or another.xml
                            filename = os.path.basename(member)
                            # skip directories
                            if not filename:
                                continue
                            
                            # copy file (taken from zipfile's extract)
                            source = zip_file.open(member)
                            target = open(os.path.join(path,filename), "wb")
                            # print(os.path.join(path,filename))
                            with source, target:
                                shutil.copyfileobj(source, target) #extraction
                            with open(os.path.join(path,filename), 'r') as f:
                                data = f.read()
                            
                            # Passing the stored data inside the beautifulsoup parser 
                            bs_data = BeautifulSoup(data, 'xml')
                            b_id = bs_data.find('ID') 
                            if(b_id.text != search):
                                os.remove(os.path.join(path,filename))
                            if(b_id.text == search):
                                found=True
                                temp={"sales_order_number":"None",
                                    "mac_address":"None",
                                    "received_date":"None",
                                    "service_tag_filename":"None"
                                }

                                # Finding all instances of tag   
                                b_sales = bs_data.find('SALESORDNO') 
                                if(b_sales is not None):
                                    temp["sales_order_number"]=b_sales.text
                                
                                # Using find() to extract attributes of the first instance of the tag 
                                b_mac = bs_data.find('MACADD') 
                                if(b_mac is not None):
                                    temp["mac_address"]=b_mac.text

                                # Extracting the data stored in a specific attribute of the `child` tag 
                                b_rec = bs_data.find('RECEIVEDDATE') 
                                if(b_rec is not None):
                                    temp["received_date"]=b_rec.text
                                
                                # b_id = bs_data.find('ID') 
                                temp["service_tag_filename"]=b_id.text

                                ans.append(temp)
                                break
            if( found is False):
                ans.append({"sales_order_number":"...","service_tag_filename":"Service Tag - "+ser_tag+" Not Found","received_date":"...","mac_address":"..."})

    return ans
