import sys, json, glob, os
from rapidocr_onnxruntime import RapidOCR
ocr = RapidOCR()
for vid in sys.argv[1:]:
    res = {}
    for f in sorted(glob.glob(f"analysis/{vid}/frames/*.jpg")):
        r, _ = ocr(f)
        res[os.path.basename(f)[:-4]] = [dict(t=x[1], c=round(float(x[2]),2)) for x in (r or []) if float(x[2]) > 0.6]
    json.dump(res, open(f"text/{vid}_ocr.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
    print(vid, sum(1 for v in res.values() if v), "/", len(res), "frames with text")
