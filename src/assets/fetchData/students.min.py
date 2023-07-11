import json

with open('./students.min.json', 'r', encoding='utf-8') as f:
    data = json.loads(f.read())
    result = []
    for item in data:
        student = {attr:item[attr] for attr in ['Id', 'Name', 'Birthday']}
        student['Avatar'] = f"https://schale.gg/images/student/collection/{item['CollectionTexture']}.webp"
        student['Bio'] = ''
        student['Alias'] = [item['PathName']]
        result.append(student)

def takeId(elem):
    return elem['Id']
result.sort(key=takeId)

print(result)
with open('./student.json', 'w', encoding='utf-8') as ff:
    ff.write(str(result))