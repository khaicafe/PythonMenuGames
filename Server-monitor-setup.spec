# -*- mode: python ; coding: utf-8 -*-


block_cipher = None
added_files = [('./thuvienServer','.'),('./dist/classsend.py','.'),("./streamlit","./streamlit"),("./venv/Lib/site-packages/altair/vegalite/v4/schema/vega-lite-schema.json","./altair/vegalite/v4/schema/"),("./venv/Lib/site-packages/streamlit/static","./streamlit/static"),("./venv/Lib/site-packages/streamlit_option_menu","./streamlit_option_menu"),("./venv/Lib/site-packages/st_bridge","./st_bridge"),("./venv/Lib/site-packages/orjson","./orjson")]

a = Analysis(
    ['Server-monitor.py'],
    pathex=[],
    binaries=[],
    datas=added_files,
    hiddenimports=[],
    hookspath=['./hooks'],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name='Server-monitor',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir='%TEMP%\\clientservice',
    console=True, icon='C:\\python project\\ServerMenu\\logo.ico',
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
