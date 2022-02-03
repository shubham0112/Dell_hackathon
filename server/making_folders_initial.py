import os
import shutil
import re

os.makedirs('F:\Data_Folder',exist_ok=True)

subfolder_names = []
for i in range(1,6):
    subfolder_names.append(os.path.join('F:\Data_Folder', 'subfolder' + str(i)))
    os.makedirs(os.path.join('F:\Data_Folder', 'subfolder' + str(i)), exist_ok=True)

for subfolder_name in subfolder_names:
    # more subfolders
    for i in range(1,6):
        path=os.path.join( subfolder_name,'sub'+str(i))
        os.makedirs(path, exist_ok=True )

        # creating files
        for j in range(1,10):
            completeName=os.path.join(path,str(j)+'.xml')
            
            # open both files
            with open('F:\sample.xml','r') as firstfile, open(completeName,'w') as secondfile:
                
                # read content from first file
                for line in firstfile:
                        
                    # write content to second file
                    if(re.search("SERVICETAG",str(line)) ):
                        # give here name of zip file
                        secondfile.write("<SERVICETAG>"+str(j)+"</SERVICETAG>\n")
                    else:
                        secondfile.write(line)

            firstfile.close()
            secondfile.close()

        i=i+1