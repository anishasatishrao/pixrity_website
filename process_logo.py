from PIL import Image
import sys

def convert_logo():
    try:
        img = Image.open("assets/logo_raw.jpg")
        img = img.convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Change all white (also shades of whites)
            # to transparent
            if item[0] > 200 and item[1] > 200 and item[2] > 200:
                newData.append((255, 255, 255, 0))
            else:
                # Make the actual logo shape the "Warm Charcoal" color directly? 
                # Or just Black so we can color it with CSS filters/mask?
                # Let's make it SOLID BLACK (0,0,0,255) for maximum versatility as a mask 
                # OR directly match the theme var(--text-primary) #3E3C38
                newData.append((62, 60, 56, 255)) # 3E3C38

        img.putdata(newData)
        img.save("assets/logo.png", "PNG")
        print("Successfully created assets/logo.png")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    convert_logo()
