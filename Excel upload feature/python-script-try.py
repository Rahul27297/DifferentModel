import urllib, xlrd, requests, json
dls = "https://firebasestorage.googleapis.com/v0/b/differentmodel-5b6b0.appspot.com/o/test.xlsx?alt=media&token=400fc147-c47e-4c42-8127-1971804e3252"
urllib.urlretrieve(dls, "test.xls")



workbook = xlrd.open_workbook('test.xls')
sheet = workbook.sheet_by_index(0) 
number_of_rows = sheet.nrows 
print number_of_rows

#r = requests.post("https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember"+"?societyID=1"+"&name="+name+"&contact="+contact+"&flatno="+flatno+"&type="+type+"&email="+email, data={societyID: 1, ': 'issue', 'action': 'show'})
#note the first row has all column names

# working
#r = requests.post(url = "https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember?societyID=1&name=name&contact=123&email=gg&type=ten&flatno=12", data = {})



cnt = 0
for row in range(1,number_of_rows):
    url = "https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember?"+"societyID=1"
    #r = requests.post(url = "https://us-central1-differentmodel-5b6b0.cloudfunctions.net/createMember?societyID=1&name=na  asd me&contact=123&email=gg&type=ten&flatno=12", data = {})
    name = "&name="+str(sheet.cell(row,0).value)
    email = "&email="+str(sheet.cell(row,1).value)
    flatno = "&flatno="+str(sheet.cell(row,2).value)
    contact = "&contact="+str(sheet.cell(row,3).value)
    type = "&type="+str(sheet.cell(row,4).value)
    url += name+email+flatno+contact+type
    r = requests.post(url = url, data = {})
    print "member added",row
    

