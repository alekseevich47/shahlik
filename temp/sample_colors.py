from PIL import Image
from collections import Counter

BASE = r"C:\Users\Николай\.cursor\projects\c-Users-Documents-GitHub-shahlik\assets"
paths = {
    "light": BASE + r"\c__Users_________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_base_light-74f5af73-9011-42da-9d81-e3131f7446e8.png",
    "carddark": BASE + r"\c__Users_________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_card_dark-3819217d-64be-48f0-a21b-7188072ae07f.png",
    "admin": BASE + r"\c__Users_________AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_admin_panel-6f094253-fc61-4396-827c-84d3c94a9744.png",
}

TARGETS = {
    "light": [
        ("criteria-green", (376, 410, 410, 430)),
        ("discount-green", (968, 452, 1004, 470)),
    ],
    "carddark": [
        ("cta-green", (790, 505, 950, 540)),
        ("rating-green", (694, 105, 745, 128)),
    ],
    "admin": [
        ("chip-green", (318, 144, 372, 166)),
        ("value-green", (486, 472, 520, 494)),
    ],
}


def hexc(c):
    return "#%02X%02X%02X" % c[:3]


for key, p in paths.items():
    im = Image.open(p).convert("RGB")
    px = im.load()
    print(f"=== {key} ===")
    for name, (x0, y0, x1, y1) in TARGETS.get(key, []):
        cands = []
        for x in range(x0, x1):
            for y in range(y0, y1):
                r, g, b = px[x, y]
                cands.append((g - max(r, b), (r, g, b)))
        cands.sort(reverse=True)
        top = [hexc(c) for _, c in cands[:12]]
        print(f"   {name:16s} {Counter(top).most_common(5)}")
