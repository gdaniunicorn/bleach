import pathlib

with open("characters.txt","r",encoding="utf-8") as f:
    characters = [sor.split(",")[0] for sor in f.readlines()[1:]]
    total = 0
    perfect = True
    pics = [f.name.split(".")[0] for f in pathlib.Path("pics").iterdir() if f.is_file()]
    for char in characters:
        if char in pics:
            total += 1
        else:
            print(f"Didn't find picture for {char}!")
            perfect = False
            total += 1
    if perfect:
        print("Every character has a picture!")
    print(f"\nScanned a total of {total} characters.")