import requests


char = "https://bleach.fandom.com/wiki/K%C5%ABgo_Ginj%C5%8D"



res = requests.get(char)

content = res.text
content = content[content.find('<main class="page__main"'):content.find('</body>')]

def getData(name,plus,end='<'):
    return content[content.find(name)+plus:][:content[content.find(name)+plus:].find(end)]

data = ""

data += content[content.find('<span class="mw-page-title-main">')+33:][:content[content.find('<span class="mw-page-title-main">')+33:].find('<')].split(" ")[0].lower() + ","
data += content[content.find('<span class="mw-page-title-main">')+33:][:content[content.find('<span class="mw-page-title-main">')+33:].find('<')] + ","
data += content[content.find('data-source="gender"')+120:][:content[content.find('data-source="gender"')+120:].find('<')] + ","
data += getData('data-source="race"',152) + ","
data += "__age__" + ","
data += getData('data-source="height"',120,' cm') + ","
data += "__hair__" + ","
data += "Karakura Town" + ","
h3 = content[content.find('<span class="mw-headline" id="Plot">Plot</span>')+600:][:content[content.find('<span class="mw-headline" id="Plot">Plot</span>')+600:].find('</span><span class="mw-editsection">')]
id = h3[h3.find('id="')+4:][:h3[h3.find('id="')+4:].find('"')]
data += h3[h3.find(id)+len(id)+2:] + ","
data += content[content.find('<span class="mw-page-title-main">')+33:][:content[content.find('<span class="mw-page-title-main">')+33:].find('<')].lower()

print(data)
i = input("> ")
if i=="y":
    with open("characters.txt","a",encoding="utf-8") as f:
        f.write(data)