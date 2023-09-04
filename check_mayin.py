import subprocess


import tempfile

# ===================== func in =======================
filename = tempfile.mktemp(".txt")
open (filename, "w", encoding="utf-8").write ("""
PRINT TEST
khaicafe khai cafe kkk hu kdksk
Tên khách hàng: Nguyễn Văn A
Tên khách hàng: Nguyễn Văn A
Tên khách hàng: Nguyễn Văn Aabc""")

# file_name = "test_bill.txt"
# file = open(file_name, "r", encoding="utf-8")
#
# # Đọc nội dung file
# file_names = file.read()

import os, sys

def prn_txt(text):
    import win32print
    printer_name = win32print.GetDefaultPrinter()
    hPrinter = win32print.OpenPrinter(printer_name)
    if sys.version_info >= (3,):
      raw_data = bytes (text, "utf-8")
    else:
      raw_data = text
    try:
      hJob = win32print.StartDocPrinter (hPrinter, 1, ("test of raw data", None, "text"))
      try:
        win32print.StartPagePrinter (hPrinter)
        win32print.WritePrinter (hPrinter, raw_data)
        win32print.EndPagePrinter (hPrinter)
      finally:
        win32print.EndDocPrinter (hPrinter)
    finally:
      win32print.ClosePrinter (hPrinter)
txt = "blabla khải"
# print (prn_txt(txt))

def test_print():
    # CREATION OF PDF FILE WITH REPORTLAB

    printer = win32print.GetDefaultPrinter()
    print(printer)
    printer = "58 Printer"
    PRINTER_DEFAULTS = {"DesiredAccess": win32print.PRINTER_ALL_ACCESS}
    print(PRINTER_DEFAULTS)
    pHandle = win32print.OpenPrinter(printer, PRINTER_DEFAULTS)
    level = 2
    properties = win32print.GetPrinter(pHandle, level)
    pDevModeObj = properties["pDevMode"]
    print(pDevModeObj)

    pDevModeObj.PaperSize = 0
    # pDevModeObj.PaperLength = 2200  # SIZE IN 1/10 mm
    # pDevModeObj.PaperWidth = 1000  # SIZE IN 1/10 mm

    # pDevModeObj.PaperLength = 2200  # SIZE IN 1/10 mm
    # pDevModeObj.PaperWidth = 480  # SIZE IN 1/10 mm

    properties["pDevMode"] = pDevModeObj
    win32print.SetPrinter(pHandle, level, properties, 0)

    # OPTION ONE
    # win32api.ShellExecute(0, "print", filename, None, ".", 0)
    # ShellExecute(0,              // NULL since it's not associated with a window
    #              "print",        // execute the "print" verb defined for the file type
    #              path_for_file,  // path to the document file to print
    #              None,           // no parameters, since the target is a document file
    #              ".",            // current directory, same as NULL here
    #              0)              // SW_HIDE passed to app associated with the file type
    # OPTION TWO
    # win32api.ShellExecute(0, "printto", filename, None, ".", 0)
    # win32api.ShellExecute(0, "printto", filename, '"%s"' % printer, ".", 0)

    win32print.ClosePrinter(pHandle)

    for printer in win32print.EnumPrinters(2):
        # print(printer[2])
        pass

    # AI code
    # Define the document to print
    printer_name = win32print.GetDefaultPrinter()
    file_name = "test_bill.txt"

    # Mở file
    file = open(file_name, "r", encoding="utf-8")

    # Đọc nội dung file
    file_content = file.read()
    # print(file_content)
def printa():
    import os, sys
    # Tạo nội dung hóa đơn
    content = "Hóa đơn\n\n"
    content += "Tên khách hàng: Nguyễn Văn A\n"
    content += "Số điện thoại: 0987654321\n"
    content += "Địa chỉ: Số 123, Đường ABC, Quận XYZ, TP. HCM\n\n"
    content += "Tên sản phẩm\t\t\tSố lượng\t\t\tGiá\n"
    content += "Sản phẩm 1\t\t\t2\t\t\t\t200.000 VND\n"
    content += "Sản phẩm 2\t\t\t3\t\t\t\t300.000 VND\n\n"
    content += "Tổng cộng: 900.000 VND"
    # content = bytes(content, "utf-8")
    # content = bytes(content, "utf-8") if sys.version_info >= (3,) else content
    x = 0
    y = 50

    hDC = win32ui.CreateDC()
    printer = "58 Printer"
    hDC.CreatePrinterDC(printer)
    hDC.StartDoc("Printing...")
    hDC.StartPage()
    multi_line_string = content.splitlines()
    for line in multi_line_string:
        hDC.TextOut(x, y, line)
        # print(hDC)
        y += 40
    hDC.EndPage()
    hDC.EndDoc()
# printa()
# -------------------  func print logo and text ------------------#
def main():
    printer_name = "58 Printer"  #wprn.GetDefaultPrinter()
    # out_file = ".\\test.pdf"
    #out_file = None  # Send to printer directly
    hdc = win32ui.CreateDC()
    hdc.CreatePrinterDC(printer_name)
    # if out_file and os.path.isfile(out_file):
    #     os.unlink(out_file)
    hdc.StartDoc("Test")
    add_img(hdc, "logo.ico")
    add_txt(hdc, "test_bill.txt")
    hdc.EndDoc()
    hdc.DeleteDC()
def add_txt(hdc, file_name, new_page=False):
    if new_page:
        hdc.StartPage()
    pixel_scale = 84
    with open(file_name, mode="r") as fin:
        for idx, line in enumerate(fin):
            print("Text line {:d}: {:s}".format(idx, line))
            hdc.TextOut(5, idx * pixel_scale, line)
    if new_page:
        hdc.EndPage()
def draw_img(hdc, dib, maxh, maxw):
    w, h = dib.size
    print("Image HW: ({:d}, {:d}), Max HW: ({:d}, {:d})".format(h, w, maxh, maxw))
    h = min(h, maxh)
    w = min(w, maxw)
    l = (maxw - w) // 2
    t = (maxh - h) // 2
    dib.draw(hdc, (l, t, l + w, t + h))
from PIL import Image as pil_image, ImageWin as pil_image_win
def add_img(hdc, file_name, new_page=False):
    if new_page:
        hdc.StartPage()
    maxw = hdc.GetDeviceCaps(wcon.HORZRES)
    maxh = hdc.GetDeviceCaps(wcon.VERTRES)
    img = pil_image.open(file_name)
    dib = pil_image_win.Dib(img)
    draw_img(hdc.GetHandleOutput(), dib, maxh, maxw)
    if new_page:
        hdc.EndPage()
# -------------------  func print logo and text ------------------#

HORZRES = 8
VERTRES = 10
LOGPIXELSX = 88
LOGPIXELSY = 90
PHYSICALWIDTH = 110
PHYSICALHEIGHT = 111

from PIL import ImageWin
import win32gui, win32ui, win32print, win32con, win32api

scale_factor = 20

pr_dict = dict()

paper_sizes = {
    "letter": 1,
    "lettersmall": 2,
    "tabloid": 3,
    "ledger": 4,
    "legal": 5,
    "statement": 6,
    "executive": 7,
    "a3": 8,
    "a4": 9,
    "envelope9": 19,
    "envelope10": 20,
    "envelope11": 21,
    "envelope12": 22,
    "envelope14": 23,
    "fanfold": 39,
}

orientations = {
    "portrait": 1,
    "landscape": 2,
}

duplexes = {
    "normal": 1,
    "none": 1,
    "long": 2,
    "short": 3,
}


class Document:

    def __init__(self, printer=None, paper_size=None, orientation=None, duplex=None):
        self.dc = None
        self.font = None
        self.printer = printer
        self.paper_size = paper_size
        self.orientation = orientation
        self.page = 0
        self.duplex = duplex
        self.pen = None
        self.hdc = None
        self.h_printer = None

    def scale_pos(self, pos):
        rc, _ = list(), self
        for i in range(len(pos)):
            p = pos[i]
            if i % 2:
                p *= -1
            rc.append(int(p * scale_factor))
        return tuple(rc)

    def begin_document(self, name="DMallPOS print job"):
        # open the printer
        if self.printer is None:
            self.printer = win32print.GetDefaultPrinter()
        self.h_printer = win32print.OpenPrinter(self.printer)

        # load default settings
        dev_mode = win32print.GetPrinter(self.h_printer, 8)["pDevMode"]

        # change paper size and orientation
        if self.paper_size is not None:
            if type(self.paper_size) is int:
                dev_mode.PaperSize = self.paper_size
            else:
                dev_mode.PaperSize = paper_sizes[self.paper_size]
        if self.orientation is not None:
            dev_mode.Orientation = orientations[self.orientation]
        if self.duplex is not None:
            dev_mode.Duplex = duplexes[self.duplex]
        # print(dev_mode.PaperSize, dev_mode.Orientation, dev_mode.Duplex)

        # create dc using new settings
        self.hdc = win32gui.CreateDC("WINSPOOL", self.printer, dev_mode)
        self.dc = win32ui.CreateDCFromHandle(self.hdc)

        # self.dc = win32ui.CreateDC()
        # if self.printer is not None:
        #     self.dc.CreatePrinterDC(self.printer)
        # else:
        #     self.dc.CreatePrinterDC()

        self.dc.SetMapMode(win32con.MM_TWIPS)  # hundredths of inches
        self.dc.StartDoc(name)
        self.dc.SetBkMode(win32con.TRANSPARENT)
        self.pen = win32ui.CreatePen(0, int(scale_factor), 0)
        self.dc.SelectObject(self.pen)
        win32gui.SetBkMode(self.hdc, 1)  # transparent
        self.page = 1

    def end_document(self):
        if self.page == 0:
            return  # document was never started
        self.dc.EndDoc()
        del self.dc

    def end_page(self):
        if self.page == 0:
            return  # nothing on the page
        # end page gets stupid if the page is completely blank
        self.text((1, 1), " ")
        self.dc.EndPage()
        self.page += 1

    def getsize(self):
        if not self.page:
            self.begin_document()
        # returns printable (width, height) in points
        width = float(self.dc.GetDeviceCaps(HORZRES)) * (72.0 / self.dc.GetDeviceCaps(LOGPIXELSX))
        height = float(self.dc.GetDeviceCaps(VERTRES)) * (72.0 / self.dc.GetDeviceCaps(LOGPIXELSY))
        return width, height

    def line(self, from_, to):
        if not self.page:
            self.begin_document()
        self.dc.MoveTo(self.scale_pos(from_))
        self.dc.LineTo(self.scale_pos(to))

    def rectangle(self, box):
        if not self.page:
            self.begin_document()
        self.dc.MoveTo(self.scale_pos((box[0], box[1])))
        self.dc.LineTo(self.scale_pos((box[2], box[1])))
        self.dc.LineTo(self.scale_pos((box[2], box[3])))
        self.dc.LineTo(self.scale_pos((box[0], box[3])))
        self.dc.LineTo(self.scale_pos((box[0], box[1])))

    def text(self, position, text):
        if self.page == 0:
            self.begin_document()
        self.dc.TextOut(int(scale_factor * position[0]),
                        int(-1 * scale_factor * position[1]), text)

    def set_font(self, name, size, bold=None, italic=None):
        if not self.page:
            self.begin_document()
        wt = 400
        if bold:
            wt = 700
        if italic:
            italic = 1
        else:
            italic = 0
        self.font = get_font(name, size, wt, italic)
        self.dc.SelectObject(self.font)

    def image(self, position, image, size):
        """print PIL image at position with given size"""
        if ImageWin is None:
            raise Exception()
        if self.page == 0:
            self.begin_document()
        dib = ImageWin.Dib(image)
        end_pos = (position[0] + size[0], position[1] + size[1])
        dst = (position[0] * scale_factor, -1 * position[1] * scale_factor,
               end_pos[0] * scale_factor, -1 * end_pos[1] * scale_factor)
        dib.draw(self.hdc, dst)

    def set_ink(self, ink):
        win32gui.SetTextColor(self.hdc, win32api.RGB(*ink))

    def set_fill(self, on_off):
        pass


def build_dict():
    global pr_dict
    lst = win32print.EnumPrinters(
        win32print.PRINTER_ENUM_CONNECTIONS
        + win32print.PRINTER_ENUM_LOCAL)
    pr_dict = {}
    for flags, description, name, comment in lst:
        pr_dict[name] = {}
        pr_dict[name]["flags"] = flags
        pr_dict[name]["description"] = description
        pr_dict[name]["comment"] = comment


def list_printers():
    dft = win32print.GetDefaultPrinter()
    if pr_dict is None:
        build_dict()
    keys = pr_dict.keys()
    # keys.sort()
    rc = [dft]
    for k in keys:
        if k != dft:
            rc.append(k)
    return rc


def desc(name):
    not pr_dict and list_printers()
    return pr_dict[name]


def get_font(name, size, weight=400, italic=0):
    if italic:
        return win32ui.CreateFont({"name": name, "height": scale_factor * size, "weight": weight, "italic": italic,})
    else:
        return win32ui.CreateFont({"name": name, "height": scale_factor * size, "weight": weight, })

def auto_line_break(text, max_width, doc):
    lines = []
    count_line = 0
    for line in text.splitlines():
        count_line+=1
        line_width = len(line)
        if text.find('HÓA ĐƠN') != -1:
            if (count_line ==2 or count_line ==3):
                line_width += 40

        # Nếu chiều rộng không cho phép, xuống dòng
        if line_width > max_width and line.find('------') == -1:

            # Biến đổi chuỗi thành một danh sách các từ
            words = line.split(' ')
            # print(words)

            # Biến đổi chuỗi thành một danh sách các dòng
            # lines = []
            current_line = ''

            # Duyệt qua từng từ
            for word in words:

                # Nếu từ hiện tại + từ tiếp theo vượt quá chiều rộng cho phép
                if len(current_line) + len(word) > max_width:
                    # print(len(current_line) + len(word),"\n", current_line, word)

                    # Thêm dòng hiện tại vào danh sách các dòng
                    lines.append(current_line)

                    # Reset dòng hiện tại
                    current_line = ''


                # Thêm từ hiện tại vào dòng hiện tại
                current_line += word + ' '
                print(current_line)
            if text.find('HÓA ĐƠN') != -1:
                if (count_line == 2 or count_line == 3):
                    current_line = '        ' + current_line

            # Thêm dòng cuối cùng vào danh sách các dòng
            lines.append(current_line)
        else:
            lines.append(line)

    # Trả về danh sách các dòng
    return lines


content1 = """      
        Cyber Game Thiên Thần
Đ/C: Bình Dương 1
    
    HÓA ĐƠN BÁN HÀNG

Ngày 05/04/2020
NV: Nguyễn Thị Nhị
KH: Nguyễn Thị Lan
VT: M-001

CHI TIẾT
----------------------------------------
Sting
1 x 15.000 = 15.000d
----------------------------------------
Cơm Gà
    1 x 25000d
=> Cơm thêm
    1 x 5.000d
1 x 30.000d = 30.000d
----------------------------------------
Tổng SL_Món: 2
Tổng: 45.000d"""

content2 = """
Bàn: M-001
Ngày 12:05:24 05/04/2020
NV: Nguyễn Thị Nhị
KH: Nguyễn Thị Lan

Cơm Gà sường gà buffe sườn chả.
=> 1 x Cơm thêm
=> 1 x Trứng Ốp la

Tổng: 945.000d     4/4"""

def print_bep_order(content):
    listprint = list_printers()
    # print(listprint)
    doc = Document(orientation="portrait")
    doc.begin_document()
    # Chiều rộng cho phép
    max_width = 25
    # Gọi hàm
    lines = auto_line_break(content, max_width, doc)
    x = 0
    y = 0
    count_line = 0
    if content.find('HÓA ĐƠN') != -1:
        for line in lines:
            x = 0
            count_line+=1
            ythem = 0
            doc.set_font("Consolas", 10, bold=True)
            if (count_line == 1):
                continue
            elif line == '':
                doc.set_font("Consolas", 13, bold=True)
                ythem = -6
            elif line.find('HÓA ĐƠN') > -1:
                doc.set_font("Consolas", 13, bold=True)
                ythem = 18
            elif line.find('Tổng') > -1 or line.find('CHI TIẾT') > -1:
                doc.set_font("Consolas", 13, bold=True)
                ythem = 3
            elif y < 31:
                doc.set_font("Consolas", 13, bold=True)
                x = 3
            doc.text((x, y+ ythem), line)
            y += 9 + ythem
        from PIL import Image
        img = Image.open("logo.ico", )
        print(img.size)
        # doc.image((0, 100), img, img.size)
        doc.image((0, 0), img, (50,50))
    else:
        for line in lines:
            count_line += 1
            ythem = 0
            # Courier New, Arial, Consolas
            # doc.set_font("Consolas", 10, bold=True)
            if (count_line == 1):
                continue
            elif line.find('.') > -1:
                doc.set_font("Consolas", 13, bold=True)
                ythem = 4
            elif line == '':
                doc.set_font("Consolas", 13, bold=True)
                ythem= -6
            doc.text((x, y), line)
            if line != '':
                doc.set_font("Consolas", 10, bold=True)
            y += 9 + ythem
            print(line, line.find('.'), y, line)
    doc.end_document()

    # from win32com import client
    # c = client.Dispatch("OPOS.CashDrawer")
    # c.Open("StanderU")
    # c.ClaimDevice(1000)
    # c.DeviceEnabled = True
    # c.OpenDrawer()
    # c.DeviceEnabled = False
    # c.Release()
    # c.Close()
print_bep_order(content1)


# ----------------------- --------------------#
def accept_output(text):

    print("printing ...", text)

    dc = win32ui.CreateDC()
    printername = win32print.GetDefaultPrinter()
    dc.CreatePrinterDC(printername)
    dc.SetMapMode(win32con.MM_TWIPS)
    scale_factor = 20
    dc.StartDoc('Win32print ')
    pen = win32ui.CreatePen(0, int(scale_factor), 0)
    dc.SelectObject(pen)
    font = win32ui.CreateFont({
        "name": "Lucida Console",
        "height": int(scale_factor * 10),
        "weight": 400,
    })
    dc.SelectObject(font)
    dc.TextOut(scale_factor * 72,-1 * scale_factor * 72, text) # <- text
    dc.EndDoc()
# accept_output(file_content)

# --------------------------
# printer = "58 Printer"
# # Open the printer
# hPrinter = win32print.OpenPrinter(printer)
#
# # Start the document
# hJob = win32print.StartDocPrinter(hPrinter, 1, ('content', None, "raw"))
#
# # Write the document to the printer
# win32print.WritePrinter(hPrinter, hDC)
#
# # end the page
# win32print.EndPagePrinter(hPrinter)
# # End the document
# win32print.EndDocPrinter(hPrinter)
#
# # Close the printer
# win32print.ClosePrinter(hPrinter)



# printer_name = win32print.GetDefaultPrinter()
# file_name = "invoice.txt"
#
# # Mở file
# file = open(file_name, "r")
#
# # Đọc nội dung file
# file_content = file.read()
# # In hóa đơn
# win32print.StartDoc(printer_name, 1, ("Invoice", None, "RAW"))
# win32print.WritePrinter(printer_name, file_content)
# win32print.EndDoc(printer_name)
#
# # Đóng file
# file.close()



