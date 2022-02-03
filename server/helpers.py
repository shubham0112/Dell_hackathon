import os
from pickle import FALSE
import shutil
import zipfile
from bs4 import BeautifulSoup
from lxml import etree
from timeit import default_timer as timer
from os.path import exists
import xml.etree.ElementTree as ET

par_dir = r"F:/DELL-RAW"

def parse_xml_file_elementTree(data,id):
    # elementTree Approach
    temp={"sales_order_number":"None",
        "mac_address":"None",
        "received_date":"None",
        "service_tag_filename":"None"
    }
    found=False
    tree = ET.ElementTree(ET.fromstring(data))
    root = tree.getroot()
    f = 0
    for elem in root.iter():
        if(elem.tag == 'SERVICETAG') and (elem.text != id):
            return temp,found
        if(elem.tag == 'SERVICETAG') and (elem.text == id):
            temp["service_tag_filename"]=elem.text
            f += 1
            found=True
        if (elem.tag=='SALESORDNO') and (elem.text is not None):
                temp["sales_order_number"]=elem.text
                f += 1
        if (elem.tag=='MACADD') and (elem.text is not None):
                temp["mac_address"]=elem.text
                f += 1
        if (elem.tag=='RECEIVEDDATE') and (elem.text is not None):
                temp["received_date"]=elem.text
                f += 1
        if( f == 4 ):
            break
    return temp,found

def parse_xml_file_rec(f_path,id):
    # recursive approach
    temp={"sales_order_number":"None",
        "mac_address":"None",
        "received_date":"None",
        "service_tag_filename":"None"
    }
    found=False
    root = etree.parse(f_path) # element tree
    for nbr in root.iter():
        if not len(nbr):
            if nbr.tag=="SERVICETAG":
                if nbr.text != id:
                    found=False
                    return temp,found
                else:
                    found=True
                    temp["service_tag_filename"]=nbr.text
            if (nbr.tag=="SALESORDNO") and (nbr.text is not None):
                    temp["sales_order_number"]=nbr.text
            if (nbr.tag=="MACADD") and (nbr.text is not None):
                    temp["mac_address"]=nbr.text
            if (nbr.tag=="RECEIVEDDATE") and (nbr.text is not None):
                    temp["received_date"]=nbr.text

    return temp,found


def parse_xml_file(f_path,id):
    # find approach
    temp={"sales_order_number":"None",
        "mac_address":"None",
        "received_date":"None",
        "service_tag_filename":"None",
    }

    found=False
    root = etree.parse(f_path) # element tree

    val=root.find(".//SERVICETAG")
    if val is None or val.text != id:
        return temp,found
    else:
        found=True
        temp["service_tag_filename"]=val.text

    val=root.find(".//SALESORDNO")
    if val is not None and val.text is not None:
        temp["sales_order_number"]=val.text

    val=root.find(".//MACADD")
    if val is not None and val.text is not None:
        temp["mac_address"]=val.text

    val=root.find(".//RECEIVEDDATE")
    if val is not None and val.text is not None:
        temp["received_date"]=val.text
        
    return temp,found
    
def helper(zip_arr,dp):
    
    zFiles_path = r"F:/ZipFiles"
    ans=[]

    timer_start = timer()
    
    for id in zip_arr:
        # checking whether it is present in dp or not
        temp={}
        for item in dp:
            if len(item) and item['service_tag_filename']==id:
                temp=item
                break
        if len(temp):
            temp["found"]="true"
            ans.append(temp)
            continue

        zip_path = os.path.join(zFiles_path, id + ".zip").replace('\\','/')
        zipfile_exists = exists(zip_path)
        
        # //a.ziD:Zipfolder/2.zip-->a,b,file.xml
        if zipfile_exists is False:
            ans.append({"sales_order_number":"...","service_tag_filename":"Service Tag - "+id+".zip Not Found","received_date":"...","mac_address":"...","found":"false"})
            continue
        
        #zip: name required to enter into a particular zip file
        zip = zipfile.ZipFile(zip_path)
        for member in zip.namelist():
            # a/1/users/documents/
            # a/1/users/file1.xml
            #member: absolute file path from the found zip file upto the subdirectory / file inside that zip
            #filename: Name of the XML file
            filename = os.path.basename(member)
            # member = .../users/
            # member = .../file.xml
            #skip directories
            if not filename:
                continue

            #LXML METHOD
            #if it's an XML File
            #path: path of new folders created with their respective names(ID named folders) 
            # path = os.path.join(par_dir, id).replace('\\','/')
            # os.makedirs(path,exist_ok=True)
            # source = zip.open(member)
            # f_path = os.path.join(path,filename).replace('\\','/')
            # target = open(f_path, "wb")
        
            # #To read each file, first extraction is needed to each folder
            # with source, target:
            #     shutil.copyfileobj(source, target) #extraction
            # #Content Reading inside each file
            # # find approach
            # temp,found = parse_xml_file(f_path,id)
            # if found:
            #     dp.append(temp)
            #     temp["found"]="true"
            #     ans.append(temp)
            #     break

            # ELEMENT TREE METHOD
            file = zip.open(member)
            # here you do your magic with [f] : parsing, etc.
            # this will print out file contents
            data = file.read()
            temp,found = parse_xml_file_elementTree(data,id)
            if found:
                dp.append(temp)
                temp["found"]="true"
                ans.append(temp)
                #if it's an XML File
                #path: path of new folders created with their respective names(ID named folders) 
                path = os.path.join(par_dir, id).replace('\\','/')
                os.makedirs(path,exist_ok=True)
                source = zip.open(member)
                f_path = os.path.join(path,filename).replace('\\','/')
                target = open(f_path, "wb")
                #To read each file, first extraction is needed to each folder
                with source, target:
                    shutil.copyfileobj(source, target) #extraction
                break
            # os.remove(f_path)

    seconds = timer() - timer_start
    print("time taken:",seconds)
    return [ans,dp]
    