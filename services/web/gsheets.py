# coding: utf-8
import gspread
from oauth2client.service_account import ServiceAccountCredentials
scope = ['https://spreadsheets.google.com/feeds']
creds = ServiceAccountCredentials.from_json_keyfile_name('uso-de-apis-83138fa9ac9c.json', scope)
client = gspread.authorize(creds)

def doctors(n=1):
    '''
    Regresa n numero la las ultimas ubicaciones registradas en una hoja en google sheets
    '''
    sheet = client.open_by_url('https://docs.google.com/spreadsheets/d/1BB55ZvaeRf3yge3da9KPwwyfnNiFmE3PiEclULTc_O0').sheet1
    list_of_hashses = sheet.get_all_values()
    # [fecha, lat, long, commentario] strip de los campos que no necesario
    loca = [[l[0],l[1],l[2],l[6]] for l in list_of_hashses[-n:]] 
    return(loca)
    

def last_locs(n=1):
    '''
    Regresa n numero la las ultimas ubicaciones registradas en una hoja en google sheets
    '''
    sheet = client.open_by_url('https://docs.google.com/spreadsheets/d/1zDrMSAGzVkEI5gjx-9psG1XjAah-I8zRO-UirNTNDPo/edit#gid=0').sheet1
    list_of_hashses = sheet.get_all_values()
    # [fecha, lat, long, commentario] strip de los campos que no necesario
    loca = [[l[0],l[1],l[2],l[6]] for l in list_of_hashses[-n:]] 
    return(loca)
