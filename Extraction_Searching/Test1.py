import os
from pickle import FALSE
import shutil
import zipfile
from bs4 import BeautifulSoup 

# FIND ZIP CODE
zip_arr = ["23a","5v","6c"]
my_zip = r"D:\ZipFiles.zip"
target_dir = "D:\DELL-RAW\Zip-folder"
with zipfile.ZipFile(my_zip,"r") as zip_ref:
    zip_ref.extractall(target_dir)
# my_zip = r"D:\DELL-RAW\mNewfolder.zip"
for ser_tag in zip_arr:
    search_zip = ser_tag + ".zip"
    zip_found = False
    with zipfile.ZipFile(my_zip) as zip_file:
        for member in zip_file.namelist():
            # raw.xml or another.xml
            filename = os.path.basename(member)
            # print(filename)
            if( filename == search_zip ):
                zip_found = True
                # my_zip
                search = ser_tag #id name aayega idhar
                new_dir = search
                # Parent Directory path
                parent_dir = "D:\DELL-RAW"
                # New Folder Path
                path = os.path.join(parent_dir, new_dir)
                # print(path)
                os.mkdir(path)
                with zipfile.ZipFile(os.path.join(target_dir, search_zip)) as zip_file:
                    for member in zip_file.namelist():
                        # raw.xml or another.xml
                        filename = os.path.basename(member)
                        # print(filename)
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
                            #printing for each service tag found
                            print("*****Details of " + search +" zip: *****")
                            # Finding all instances of tag   
                            b_sales = bs_data.find('SALESORDNO') 
                            if(b_sales is None):
                                print("None")
                            else:
                                print(b_sales.text) 
                            # Using find() to extract attributes of the first instance of the tag 
                            b_mac = bs_data.find('MACADD') 
                            if(b_mac is None):
                                print("None")
                            else:
                                print(b_mac.text) 
                            # Extracting the data stored in a specific attribute of the `child` tag 
                            b_rec = bs_data.find('RECEIVEDDATE') 
                            if(b_rec is None):
                                print("None")
                            else:
                                print(b_rec.text)
                            
                            # b_id = bs_data.find('ID') 
                            print(b_id.text) 
                            break
        if( zip_found is False):
            print("*****Details of " + ser_tag +" zip: *****")
            print("Service Tag Not Found")
