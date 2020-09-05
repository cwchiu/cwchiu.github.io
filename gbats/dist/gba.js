// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiateAsync, __instantiate;

(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };

  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }

  __instantiateAsync = async (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExpA(m);
  };

  __instantiate = (m) => {
    System = __instantiateAsync = __instantiate = undefined;
    rF(m);
    return gExp(m);
  };
})();

System.register("interfaces", [], function (exports_1, context_1) {
    "use strict";
    var MemoryRegion, MemoryBase, MemoryRegionSize, MemorySize, ARMMode, ARMBank, OpExecMode, LogLevel, IRQType, IRQMask;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (MemoryRegion) {
                MemoryRegion[MemoryRegion["BIOS"] = 0] = "BIOS";
                MemoryRegion[MemoryRegion["WORKING_RAM"] = 2] = "WORKING_RAM";
                MemoryRegion[MemoryRegion["WORKING_IRAM"] = 3] = "WORKING_IRAM";
                MemoryRegion[MemoryRegion["IO"] = 4] = "IO";
                MemoryRegion[MemoryRegion["PALETTE_RAM"] = 5] = "PALETTE_RAM";
                MemoryRegion[MemoryRegion["VRAM"] = 6] = "VRAM";
                MemoryRegion[MemoryRegion["OAM"] = 7] = "OAM";
                MemoryRegion[MemoryRegion["CART0"] = 8] = "CART0";
                MemoryRegion[MemoryRegion["CART1"] = 10] = "CART1";
                MemoryRegion[MemoryRegion["CART2"] = 12] = "CART2";
                MemoryRegion[MemoryRegion["CART_SRAM"] = 14] = "CART_SRAM";
            })(MemoryRegion || (MemoryRegion = {}));
            exports_1("MemoryRegion", MemoryRegion);
            (function (MemoryBase) {
                MemoryBase[MemoryBase["BASE_BIOS"] = 0] = "BASE_BIOS";
                MemoryBase[MemoryBase["BASE_WORKING_RAM"] = 33554432] = "BASE_WORKING_RAM";
                MemoryBase[MemoryBase["BASE_WORKING_IRAM"] = 50331648] = "BASE_WORKING_IRAM";
                MemoryBase[MemoryBase["BASE_IO"] = 67108864] = "BASE_IO";
                MemoryBase[MemoryBase["BASE_PALETTE_RAM"] = 83886080] = "BASE_PALETTE_RAM";
                MemoryBase[MemoryBase["BASE_VRAM"] = 100663296] = "BASE_VRAM";
                MemoryBase[MemoryBase["BASE_OAM"] = 117440512] = "BASE_OAM";
                MemoryBase[MemoryBase["BASE_CART0"] = 134217728] = "BASE_CART0";
                MemoryBase[MemoryBase["BASE_CART1"] = 167772160] = "BASE_CART1";
                MemoryBase[MemoryBase["BASE_CART2"] = 201326592] = "BASE_CART2";
                MemoryBase[MemoryBase["BASE_CART_SRAM"] = 234881024] = "BASE_CART_SRAM";
                MemoryBase[MemoryBase["BASE_MASK"] = 251658240] = "BASE_MASK";
                MemoryBase[MemoryBase["BASE_OFFSET"] = 24] = "BASE_OFFSET";
            })(MemoryBase || (MemoryBase = {}));
            exports_1("MemoryBase", MemoryBase);
            (function (MemoryRegionSize) {
                MemoryRegionSize[MemoryRegionSize["BIOS"] = 16384] = "BIOS";
                MemoryRegionSize[MemoryRegionSize["WORKING_RAM"] = 262144] = "WORKING_RAM";
                MemoryRegionSize[MemoryRegionSize["WORKING_IRAM"] = 32768] = "WORKING_IRAM";
                MemoryRegionSize[MemoryRegionSize["IO"] = 1024] = "IO";
                MemoryRegionSize[MemoryRegionSize["PALETTE_RAM"] = 1024] = "PALETTE_RAM";
                MemoryRegionSize[MemoryRegionSize["VRAM"] = 98304] = "VRAM";
                MemoryRegionSize[MemoryRegionSize["OAM"] = 1024] = "OAM";
                MemoryRegionSize[MemoryRegionSize["CART0"] = 33554432] = "CART0";
                MemoryRegionSize[MemoryRegionSize["CART1"] = 33554432] = "CART1";
                MemoryRegionSize[MemoryRegionSize["CART2"] = 33554432] = "CART2";
                MemoryRegionSize[MemoryRegionSize["CART_SRAM"] = 32768] = "CART_SRAM";
                MemoryRegionSize[MemoryRegionSize["CART_FLASH512"] = 65536] = "CART_FLASH512";
                MemoryRegionSize[MemoryRegionSize["CART_FLASH1M"] = 131072] = "CART_FLASH1M";
                MemoryRegionSize[MemoryRegionSize["CART_EEPROM"] = 8192] = "CART_EEPROM";
            })(MemoryRegionSize || (MemoryRegionSize = {}));
            exports_1("MemoryRegionSize", MemoryRegionSize);
            (function (MemorySize) {
                MemorySize[MemorySize["SIZE_BIOS"] = 16384] = "SIZE_BIOS";
                MemorySize[MemorySize["SIZE_WORKING_RAM"] = 262144] = "SIZE_WORKING_RAM";
                MemorySize[MemorySize["SIZE_WORKING_IRAM"] = 32768] = "SIZE_WORKING_IRAM";
                MemorySize[MemorySize["SIZE_IO"] = 1024] = "SIZE_IO";
                MemorySize[MemorySize["SIZE_PALETTE_RAM"] = 1024] = "SIZE_PALETTE_RAM";
                MemorySize[MemorySize["SIZE_VRAM"] = 98304] = "SIZE_VRAM";
                MemorySize[MemorySize["SIZE_OAM"] = 1024] = "SIZE_OAM";
                MemorySize[MemorySize["SIZE_CART0"] = 33554432] = "SIZE_CART0";
                MemorySize[MemorySize["SIZE_CART1"] = 33554432] = "SIZE_CART1";
                MemorySize[MemorySize["SIZE_CART2"] = 33554432] = "SIZE_CART2";
                MemorySize[MemorySize["SIZE_CART_SRAM"] = 32768] = "SIZE_CART_SRAM";
                MemorySize[MemorySize["SIZE_CART_FLASH512"] = 65536] = "SIZE_CART_FLASH512";
                MemorySize[MemorySize["SIZE_CART_FLASH1M"] = 131072] = "SIZE_CART_FLASH1M";
                MemorySize[MemorySize["SIZE_CART_EEPROM"] = 8192] = "SIZE_CART_EEPROM";
            })(MemorySize || (MemorySize = {}));
            exports_1("MemorySize", MemorySize);
            (function (ARMMode) {
                ARMMode[ARMMode["User"] = 16] = "User";
                ARMMode[ARMMode["System"] = 31] = "System";
                ARMMode[ARMMode["FIQ"] = 17] = "FIQ";
                ARMMode[ARMMode["SVC"] = 19] = "SVC";
                ARMMode[ARMMode["ABT"] = 23] = "ABT";
                ARMMode[ARMMode["IRQ"] = 18] = "IRQ";
                ARMMode[ARMMode["Undef"] = 27] = "Undef"; // Undefine
            })(ARMMode || (ARMMode = {}));
            exports_1("ARMMode", ARMMode);
            (function (ARMBank) {
                ARMBank[ARMBank["NONE"] = 0] = "NONE";
                ARMBank[ARMBank["FIQ"] = 1] = "FIQ";
                ARMBank[ARMBank["IRQ"] = 2] = "IRQ";
                ARMBank[ARMBank["SUPERVISOR"] = 3] = "SUPERVISOR";
                ARMBank[ARMBank["ABORT"] = 4] = "ABORT";
                ARMBank[ARMBank["UNDEFINED"] = 5] = "UNDEFINED";
            })(ARMBank || (ARMBank = {}));
            exports_1("ARMBank", ARMBank);
            (function (OpExecMode) {
                OpExecMode[OpExecMode["ARM"] = 0] = "ARM";
                OpExecMode[OpExecMode["THUMB"] = 1] = "THUMB";
            })(OpExecMode || (OpExecMode = {}));
            exports_1("OpExecMode", OpExecMode);
            (function (LogLevel) {
                LogLevel[LogLevel["Error"] = 0] = "Error";
            })(LogLevel || (LogLevel = {}));
            exports_1("LogLevel", LogLevel);
            (function (IRQType) {
                IRQType[IRQType["VBLANK"] = 0] = "VBLANK";
                IRQType[IRQType["HBLANK"] = 1] = "HBLANK";
                IRQType[IRQType["VCOUNTER"] = 2] = "VCOUNTER";
                IRQType[IRQType["TIMER0"] = 3] = "TIMER0";
                IRQType[IRQType["TIMER1"] = 4] = "TIMER1";
                IRQType[IRQType["TIMER2"] = 5] = "TIMER2";
                IRQType[IRQType["TIMER3"] = 6] = "TIMER3";
                IRQType[IRQType["SIO"] = 7] = "SIO";
                IRQType[IRQType["DMA0"] = 8] = "DMA0";
                IRQType[IRQType["DMA1"] = 9] = "DMA1";
                IRQType[IRQType["DMA2"] = 10] = "DMA2";
                IRQType[IRQType["DMA3"] = 11] = "DMA3";
                IRQType[IRQType["KEYPAD"] = 12] = "KEYPAD";
                IRQType[IRQType["GAMEPAK"] = 13] = "GAMEPAK";
            })(IRQType || (IRQType = {}));
            exports_1("IRQType", IRQType);
            (function (IRQMask) {
                IRQMask[IRQMask["VBLANK"] = 1] = "VBLANK";
                IRQMask[IRQMask["HBLANK"] = 2] = "HBLANK";
                IRQMask[IRQMask["VCOUNTER"] = 4] = "VCOUNTER";
                IRQMask[IRQMask["TIMER0"] = 8] = "TIMER0";
                IRQMask[IRQMask["TIMER1"] = 16] = "TIMER1";
                IRQMask[IRQMask["TIMER2"] = 32] = "TIMER2";
                IRQMask[IRQMask["TIMER3"] = 64] = "TIMER3";
                IRQMask[IRQMask["SIO"] = 128] = "SIO";
                IRQMask[IRQMask["DMA0"] = 256] = "DMA0";
                IRQMask[IRQMask["DMA1"] = 512] = "DMA1";
                IRQMask[IRQMask["DMA2"] = 1024] = "DMA2";
                IRQMask[IRQMask["DMA3"] = 2048] = "DMA3";
                IRQMask[IRQMask["KEYPAD"] = 4096] = "KEYPAD";
                IRQMask[IRQMask["GAMEPAK"] = 8192] = "GAMEPAK";
            })(IRQMask || (IRQMask = {}));
            exports_1("IRQMask", IRQMask);
        }
    };
});
System.register("utils", [], function (exports_2, context_2) {
    "use strict";
    var Serializer;
    var __moduleName = context_2 && context_2.id;
    function hex(number, leading, usePrefix = false) {
        if (typeof (usePrefix) === 'undefined') {
            usePrefix = true;
        }
        if (typeof (leading) === 'undefined') {
            leading = 8;
        }
        const string = (number >>> 0).toString(16).toUpperCase();
        leading -= string.length;
        if (leading < 0)
            return string;
        return (usePrefix ? '0x' : '') + new Array(leading + 1).join('0') + string;
    }
    exports_2("hex", hex);
    return {
        setters: [],
        execute: function () {
            Serializer = /** @class */ (() => {
                class Serializer {
                    static prefix(value) {
                        return new Blob([Serializer.pack(value.byteLength), value], { type: Serializer.TYPE });
                    }
                    static pack(value) {
                        const object = new DataView(new ArrayBuffer(4));
                        object.setUint32(0, value, true);
                        return object.buffer;
                    }
                }
                Serializer.TYPE = 'application/octet-stream';
                return Serializer;
            })();
            exports_2("Serializer", Serializer);
        }
    };
});
System.register("gpio/GameBoyAdvanceIO", ["interfaces", "utils"], function (exports_3, context_3) {
    "use strict";
    var interfaces_ts_1, utils_ts_1, GameBoyAdvanceIO;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (interfaces_ts_1_1) {
                interfaces_ts_1 = interfaces_ts_1_1;
            },
            function (utils_ts_1_1) {
                utils_ts_1 = utils_ts_1_1;
            }
        ],
        execute: function () {
            GameBoyAdvanceIO = class GameBoyAdvanceIO {
                constructor(ctx) {
                    this.buffer = new Uint16Array(0);
                    this.icache = [];
                    this.view = new DataView(new ArrayBuffer(0));
                    this.mask = 0;
                    this.registers = null;
                    // video: IVideo | null = null
                    // audio: IAudio | null = null;
                    // keypad: IKeypad | null = null
                    // sio: ISIO | null = null
                    // Video
                    this.DISPCNT = 0x000;
                    this.GREENSWP = 0x002;
                    this.DISPSTAT = 0x004;
                    this.VCOUNT = 0x006;
                    this.BG0CNT = 0x008;
                    this.BG1CNT = 0x00A;
                    this.BG2CNT = 0x00C;
                    this.BG3CNT = 0x00E;
                    this.BG0HOFS = 0x010;
                    this.BG0VOFS = 0x012;
                    this.BG1HOFS = 0x014;
                    this.BG1VOFS = 0x016;
                    this.BG2HOFS = 0x018;
                    this.BG2VOFS = 0x01A;
                    this.BG3HOFS = 0x01C;
                    this.BG3VOFS = 0x01E;
                    this.BG2PA = 0x020;
                    this.BG2PB = 0x022;
                    this.BG2PC = 0x024;
                    this.BG2PD = 0x026;
                    this.BG2X_LO = 0x028;
                    this.BG2X_HI = 0x02A;
                    this.BG2Y_LO = 0x02C;
                    this.BG2Y_HI = 0x02E;
                    this.BG3PA = 0x030;
                    this.BG3PB = 0x032;
                    this.BG3PC = 0x034;
                    this.BG3PD = 0x036;
                    this.BG3X_LO = 0x038;
                    this.BG3X_HI = 0x03A;
                    this.BG3Y_LO = 0x03C;
                    this.BG3Y_HI = 0x03E;
                    this.WIN0H = 0x040;
                    this.WIN1H = 0x042;
                    this.WIN0V = 0x044;
                    this.WIN1V = 0x046;
                    this.WININ = 0x048;
                    this.WINOUT = 0x04A;
                    this.MOSAIC = 0x04C;
                    this.BLDCNT = 0x050;
                    this.BLDALPHA = 0x052;
                    this.BLDY = 0x054;
                    // Sound
                    this.SOUND1CNT_LO = 0x060;
                    this.SOUND1CNT_HI = 0x062;
                    this.SOUND1CNT_X = 0x064;
                    this.SOUND2CNT_LO = 0x068;
                    this.SOUND2CNT_HI = 0x06C;
                    this.SOUND3CNT_LO = 0x070;
                    this.SOUND3CNT_HI = 0x072;
                    this.SOUND3CNT_X = 0x074;
                    this.SOUND4CNT_LO = 0x078;
                    this.SOUND4CNT_HI = 0x07C;
                    this.SOUNDCNT_LO = 0x080;
                    this.SOUNDCNT_HI = 0x082;
                    this.SOUNDCNT_X = 0x084;
                    this.SOUNDBIAS = 0x088;
                    this.WAVE_RAM0_LO = 0x090;
                    this.WAVE_RAM0_HI = 0x092;
                    this.WAVE_RAM1_LO = 0x094;
                    this.WAVE_RAM1_HI = 0x096;
                    this.WAVE_RAM2_LO = 0x098;
                    this.WAVE_RAM2_HI = 0x09A;
                    this.WAVE_RAM3_LO = 0x09C;
                    this.WAVE_RAM3_HI = 0x09E;
                    this.FIFO_A_LO = 0x0A0;
                    this.FIFO_A_HI = 0x0A2;
                    this.FIFO_B_LO = 0x0A4;
                    this.FIFO_B_HI = 0x0A6;
                    // DMA
                    this.DMA0SAD_LO = 0x0B0;
                    this.DMA0SAD_HI = 0x0B2;
                    this.DMA0DAD_LO = 0x0B4;
                    this.DMA0DAD_HI = 0x0B6;
                    this.DMA0CNT_LO = 0x0B8;
                    this.DMA0CNT_HI = 0x0BA;
                    this.DMA1SAD_LO = 0x0BC;
                    this.DMA1SAD_HI = 0x0BE;
                    this.DMA1DAD_LO = 0x0C0;
                    this.DMA1DAD_HI = 0x0C2;
                    this.DMA1CNT_LO = 0x0C4;
                    this.DMA1CNT_HI = 0x0C6;
                    this.DMA2SAD_LO = 0x0C8;
                    this.DMA2SAD_HI = 0x0CA;
                    this.DMA2DAD_LO = 0x0CC;
                    this.DMA2DAD_HI = 0x0CE;
                    this.DMA2CNT_LO = 0x0D0;
                    this.DMA2CNT_HI = 0x0D2;
                    this.DMA3SAD_LO = 0x0D4;
                    this.DMA3SAD_HI = 0x0D6;
                    this.DMA3DAD_LO = 0x0D8;
                    this.DMA3DAD_HI = 0x0DA;
                    this.DMA3CNT_LO = 0x0DC;
                    this.DMA3CNT_HI = 0x0DE;
                    // Timers
                    this.TM0CNT_LO = 0x100;
                    this.TM0CNT_HI = 0x102;
                    this.TM1CNT_LO = 0x104;
                    this.TM1CNT_HI = 0x106;
                    this.TM2CNT_LO = 0x108;
                    this.TM2CNT_HI = 0x10A;
                    this.TM3CNT_LO = 0x10C;
                    this.TM3CNT_HI = 0x10E;
                    // SIO (note: some of these are repeated)
                    this.SIODATA32_LO = 0x120;
                    this.SIOMULTI0 = 0x120;
                    this.SIODATA32_HI = 0x122;
                    this.SIOMULTI1 = 0x122;
                    this.SIOMULTI2 = 0x124;
                    this.SIOMULTI3 = 0x126;
                    this.SIOCNT = 0x128;
                    this.SIOMLT_SEND = 0x12A;
                    this.SIODATA8 = 0x12A;
                    this.RCNT = 0x134;
                    this.JOYCNT = 0x140;
                    this.JOY_RECV = 0x150;
                    this.JOY_TRANS = 0x154;
                    this.JOYSTAT = 0x158;
                    // Keypad
                    this.KEYINPUT = 0x130;
                    this.KEYCNT = 0x132;
                    // Interrupts, etc
                    this.IE = 0x200;
                    this.IF = 0x202;
                    this.WAITCNT = 0x204;
                    this.IME = 0x208;
                    this.POSTFLG = 0x300;
                    this.HALTCNT = 0x301;
                    this.DEFAULT_DISPCNT = 0x0080;
                    this.DEFAULT_SOUNDBIAS = 0x200;
                    this.DEFAULT_BGPA = 1;
                    this.DEFAULT_BGPD = 1;
                    this.DEFAULT_RCNT = 0x8000;
                    this.core = ctx;
                }
                /**
                 *
                 */
                clear() {
                    this.registers = new Uint16Array(interfaces_ts_1.MemoryRegionSize.IO);
                    this.registers[this.DISPCNT >> 1] = this.DEFAULT_DISPCNT;
                    this.registers[this.SOUNDBIAS >> 1] = this.DEFAULT_SOUNDBIAS;
                    this.registers[this.BG2PA >> 1] = this.DEFAULT_BGPA;
                    this.registers[this.BG2PD >> 1] = this.DEFAULT_BGPD;
                    this.registers[this.BG3PA >> 1] = this.DEFAULT_BGPA;
                    this.registers[this.BG3PD >> 1] = this.DEFAULT_BGPD;
                    this.registers[this.RCNT >> 1] = this.DEFAULT_RCNT;
                }
                /**
                 *
                 */
                freeze() {
                    if (!this.registers) {
                        throw new Error("register no init");
                    }
                    return {
                        'registers': utils_ts_1.Serializer.prefix(this.registers.buffer)
                    };
                }
                /**
                 *
                 * @param frost
                 */
                defrost(frost) {
                    if (!this.registers) {
                        throw new Error("register no init");
                    }
                    this.registers = new Uint16Array(frost.registers);
                    // Video registers don't serialize themselves
                    for (let i = 0; i <= this.BLDY; i += 2) {
                        this.store16(this.registers[i >> 1], 0 /* bug? */);
                    }
                }
                replaceData(memory, offset) {
                    throw new Error("no imp");
                }
                getMemoryView() {
                    return this;
                }
                /**
                 *
                 * @param offset
                 */
                load8(offset) {
                    throw 'Unimplmeneted unaligned I/O access';
                }
                /**
                 *
                 * @param offset
                 */
                load16(offset) {
                    return (this.loadU16(offset) << 16) >> 16;
                }
                /**
                 *
                 * @param offset
                 */
                load32(offset) {
                    offset &= 0xFFFFFFFC;
                    switch (offset) {
                        case this.DMA0CNT_LO:
                        case this.DMA1CNT_LO:
                        case this.DMA2CNT_LO:
                        case this.DMA3CNT_LO:
                            return this.loadU16(offset | 2) << 16;
                        case this.IME:
                            return this.loadU16(offset) & 0xFFFF;
                        case this.JOY_RECV:
                        case this.JOY_TRANS:
                            this.getLog().STUB('Unimplemented JOY register read: 0x' + offset.toString(16));
                            return 0;
                    }
                    return this.loadU16(offset) | (this.loadU16(offset | 2) << 16);
                }
                /**
                 *
                 * @param offset
                 */
                loadU8(offset) {
                    const odd = offset & 0x0001;
                    const value = this.loadU16(offset & 0xFFFE);
                    return (value >>> (odd << 3)) & 0xFF;
                }
                getGBAContext() {
                    return this.core;
                }
                getGBAMMU() {
                    return this.getGBAContext().getMMU();
                }
                getGBAMMUView() {
                    const view = this.getGBAMMU().badMemory;
                    if (!view) {
                        throw new Error("view no init");
                    }
                    return view;
                }
                getIRQ() {
                    // return this.getCPU().irq as IIRQ;
                    return this.getGBAContext().getIRQ();
                }
                getCPU() {
                    return this.core.getCPU();
                }
                getKeypad() {
                    return this.core.getKeypad();
                }
                getSIO() {
                    return this.core.getSIO();
                }
                /**
                 *
                 * @param offset
                 */
                loadU16(offset) {
                    if (!this.registers) {
                        throw new Error("register no init");
                    }
                    const registerValue = this.registers[offset >> 1];
                    if ([
                        this.DISPCNT,
                        this.BG0CNT,
                        this.BG1CNT,
                        this.BG2CNT,
                        this.BG3CNT,
                        this.WININ,
                        this.WINOUT,
                        this.SOUND1CNT_LO,
                        this.SOUND3CNT_LO,
                        this.SOUNDCNT_LO,
                        this.SOUNDCNT_HI,
                        this.SOUNDBIAS,
                        this.BLDCNT,
                        this.BLDALPHA,
                        this.TM0CNT_HI,
                        this.TM1CNT_HI,
                        this.TM2CNT_HI,
                        this.TM3CNT_HI,
                        this.DMA0CNT_HI,
                        this.DMA1CNT_HI,
                        this.DMA2CNT_HI,
                        this.DMA3CNT_HI,
                        this.RCNT,
                        this.WAITCNT,
                        this.IE,
                        this.IF,
                        this.IME,
                        this.POSTFLG,
                    ].includes(offset)) {
                        // Handled transparently by the written registers
                        return registerValue;
                    }
                    if ([
                        this.BG0HOFS,
                        this.BG0VOFS,
                        this.BG1HOFS,
                        this.BG1VOFS,
                        this.BG2HOFS,
                        this.BG2VOFS,
                        this.BG3HOFS,
                        this.BG3VOFS,
                        this.BG2PA,
                        this.BG2PB,
                        this.BG2PC,
                        this.BG2PD,
                        this.BG3PA,
                        this.BG3PB,
                        this.BG3PC,
                        this.BG3PD,
                        this.BG2X_LO,
                        this.BG2X_HI,
                        this.BG2Y_LO,
                        this.BG2Y_HI,
                        this.BG3X_LO,
                        this.BG3X_HI,
                        this.BG3Y_LO,
                        this.BG3Y_HI,
                        this.WIN0H,
                        this.WIN1H,
                        this.WIN0V,
                        this.WIN1V,
                        this.BLDY,
                        this.DMA0SAD_LO,
                        this.DMA0SAD_HI,
                        this.DMA0DAD_LO,
                        this.DMA0DAD_HI,
                        this.DMA0CNT_LO,
                        this.DMA1SAD_LO,
                        this.DMA1SAD_HI,
                        this.DMA1DAD_LO,
                        this.DMA1DAD_HI,
                        this.DMA1CNT_LO,
                        this.DMA2SAD_LO,
                        this.DMA2SAD_HI,
                        this.DMA2DAD_LO,
                        this.DMA2DAD_HI,
                        this.DMA2CNT_LO,
                        this.DMA3SAD_LO,
                        this.DMA3SAD_HI,
                        this.DMA3DAD_LO,
                        this.DMA3DAD_HI,
                        this.DMA3CNT_LO,
                        this.FIFO_A_LO,
                        this.FIFO_A_HI,
                        this.FIFO_B_LO,
                        this.FIFO_B_HI,
                    ].includes(offset)) {
                        this.core.getLog().WARN('Read for write-only register: 0x' + offset.toString(16));
                        return this.getGBAMMUView().loadU16(0);
                    }
                    const video = this.getVideo();
                    const irq = this.getIRQ();
                    const keypad = this.getKeypad();
                    const sio = this.getSIO();
                    const log = this.getLog();
                    switch (offset) {
                        // Video
                        case this.DISPSTAT:
                            return registerValue | video.readDisplayStat();
                        case this.VCOUNT:
                            return video.vcount;
                        // Sound
                        case this.SOUND1CNT_HI:
                        case this.SOUND2CNT_LO:
                            return registerValue & 0xFFC0;
                        case this.SOUND1CNT_X:
                        case this.SOUND2CNT_HI:
                        case this.SOUND3CNT_X:
                            return registerValue & 0x4000;
                        case this.SOUND3CNT_HI:
                            return registerValue & 0xE000;
                        case this.SOUND4CNT_LO:
                            return registerValue & 0xFF00;
                        case this.SOUND4CNT_HI:
                            return registerValue & 0x40FF;
                        case this.SOUNDCNT_X:
                            this.core.getLog().STUB('Unimplemented sound register read: SOUNDCNT_X');
                            return registerValue | 0x0000;
                        // Timers
                        case this.TM0CNT_LO:
                            return irq.timerRead(0);
                        case this.TM1CNT_LO:
                            return irq.timerRead(1);
                        case this.TM2CNT_LO:
                            return irq.timerRead(2);
                        case this.TM3CNT_LO:
                            return irq.timerRead(3);
                        // SIO
                        case this.SIOCNT:
                            return sio.readSIOCNT();
                        case this.KEYINPUT:
                            keypad.pollGamepads();
                            return keypad.currentDown;
                        case this.KEYCNT:
                            log.STUB('Unimplemented I/O register read: KEYCNT');
                            return 0;
                        case this.MOSAIC:
                            log.WARN('Read for write-only register: 0x' + offset.toString(16));
                            return 0;
                        case this.SIOMULTI0:
                        case this.SIOMULTI1:
                        case this.SIOMULTI2:
                        case this.SIOMULTI3:
                            return sio.read((offset - this.SIOMULTI0) >> 1);
                        case this.SIODATA8:
                            log.STUB('Unimplemented SIO register read: 0x' + offset.toString(16));
                            return 0;
                        case this.JOYCNT:
                        case this.JOYSTAT:
                            log.STUB('Unimplemented JOY register read: 0x' + offset.toString(16));
                            return 0;
                        default:
                            log.WARN('Bad I/O register read: 0x' + offset.toString(16));
                            return this.getGBAMMUView().loadU16(0);
                    }
                    // return this.registers[offset >> 1];
                }
                getLog() {
                    return this.core.getLog();
                }
                store8(offset, value) {
                    switch (offset) {
                        // case this.WININ:
                        //     this.value & 0x3F;
                        //     break;
                        // case this.WININ | 1:
                        //     this.value & 0x3F;
                        //     break;
                        // case this.WINOUT:
                        //     this.value & 0x3F;
                        //     break;
                        // case this.WINOUT | 1:
                        //     this.value & 0x3F;
                        //     break;
                        case this.SOUND1CNT_LO:
                        case this.SOUND1CNT_LO | 1:
                        case this.SOUND1CNT_HI:
                        case this.SOUND1CNT_HI | 1:
                        case this.SOUND1CNT_X:
                        case this.SOUND1CNT_X | 1:
                        case this.SOUND2CNT_LO:
                        case this.SOUND2CNT_LO | 1:
                        case this.SOUND2CNT_HI:
                        case this.SOUND2CNT_HI | 1:
                        case this.SOUND3CNT_LO:
                        case this.SOUND3CNT_LO | 1:
                        case this.SOUND3CNT_HI:
                        case this.SOUND3CNT_HI | 1:
                        case this.SOUND3CNT_X:
                        case this.SOUND3CNT_X | 1:
                        case this.SOUND4CNT_LO:
                        case this.SOUND4CNT_LO | 1:
                        case this.SOUND4CNT_HI:
                        case this.SOUND4CNT_HI | 1:
                        case this.SOUNDCNT_LO:
                        case this.SOUNDCNT_LO | 1:
                        case this.SOUNDCNT_X:
                        case this.IF:
                        case this.IME:
                            break;
                        case this.SOUNDBIAS | 1:
                            this.STUB_REG('sound', offset);
                            break;
                        case this.HALTCNT:
                            value &= 0x80;
                            if (!value) {
                                this.getIRQ().halt();
                            }
                            else {
                                this.getLog().STUB('Stop');
                            }
                            return;
                        default:
                            this.STUB_REG('8-bit I/O', offset);
                            break;
                    }
                    if (!this.registers) {
                        throw new Error("register no init");
                    }
                    if (offset & 1) {
                        value <<= 8;
                        value |= (this.registers[offset >> 1] & 0x00FF);
                    }
                    else {
                        value &= 0x00FF;
                        value |= (this.registers[offset >> 1] & 0xFF00);
                    }
                    this.store16(offset & 0xFFFFFFE, value);
                }
                getVideo() {
                    return this.core.getVideo();
                }
                getVideoRender() {
                    return this.getVideo().renderPath;
                }
                getAudio() {
                    return this.core.getAudio();
                }
                store16(offset, value) {
                    if (!this.registers) {
                        throw new Error("register no init");
                    }
                    const render = this.getVideoRender();
                    const audio = this.getAudio();
                    const video = this.getVideo();
                    const irq = this.getIRQ();
                    const sio = this.getSIO();
                    switch (offset) {
                        // Video
                        case this.DISPCNT:
                            render.writeDisplayControl(value);
                            break;
                        case this.DISPSTAT:
                            value &= video.DISPSTAT_MASK;
                            video.writeDisplayStat(value);
                            break;
                        case this.BG0CNT:
                            render.writeBackgroundControl(0, value);
                            break;
                        case this.BG1CNT:
                            render.writeBackgroundControl(1, value);
                            break;
                        case this.BG2CNT:
                            render.writeBackgroundControl(2, value);
                            break;
                        case this.BG3CNT:
                            render.writeBackgroundControl(3, value);
                            break;
                        case this.BG0HOFS:
                            render.writeBackgroundHOffset(0, value);
                            break;
                        case this.BG0VOFS:
                            render.writeBackgroundVOffset(0, value);
                            break;
                        case this.BG1HOFS:
                            render.writeBackgroundHOffset(1, value);
                            break;
                        case this.BG1VOFS:
                            render.writeBackgroundVOffset(1, value);
                            break;
                        case this.BG2HOFS:
                            render.writeBackgroundHOffset(2, value);
                            break;
                        case this.BG2VOFS:
                            render.writeBackgroundVOffset(2, value);
                            break;
                        case this.BG3HOFS:
                            render.writeBackgroundHOffset(3, value);
                            break;
                        case this.BG3VOFS:
                            render.writeBackgroundVOffset(3, value);
                            break;
                        case this.BG2X_LO:
                            render.writeBackgroundRefX(2, (this.registers[(offset >> 1) | 1] << 16) | value);
                            break;
                        case this.BG2X_HI:
                            render.writeBackgroundRefX(2, this.registers[(offset >> 1) ^ 1] | (value << 16));
                            break;
                        case this.BG2Y_LO:
                            render.writeBackgroundRefY(2, (this.registers[(offset >> 1) | 1] << 16) | value);
                            break;
                        case this.BG2Y_HI:
                            render.writeBackgroundRefY(2, this.registers[(offset >> 1) ^ 1] | (value << 16));
                            break;
                        case this.BG2PA:
                            render.writeBackgroundParamA(2, value);
                            break;
                        case this.BG2PB:
                            render.writeBackgroundParamB(2, value);
                            break;
                        case this.BG2PC:
                            render.writeBackgroundParamC(2, value);
                            break;
                        case this.BG2PD:
                            render.writeBackgroundParamD(2, value);
                            break;
                        case this.BG3X_LO:
                            render.writeBackgroundRefX(3, (this.registers[(offset >> 1) | 1] << 16) | value);
                            break;
                        case this.BG3X_HI:
                            render.writeBackgroundRefX(3, this.registers[(offset >> 1) ^ 1] | (value << 16));
                            break;
                        case this.BG3Y_LO:
                            render.writeBackgroundRefY(3, (this.registers[(offset >> 1) | 1] << 16) | value);
                            break;
                        case this.BG3Y_HI:
                            render.writeBackgroundRefY(3, this.registers[(offset >> 1) ^ 1] | (value << 16));
                            break;
                        case this.BG3PA:
                            render.writeBackgroundParamA(3, value);
                            break;
                        case this.BG3PB:
                            render.writeBackgroundParamB(3, value);
                            break;
                        case this.BG3PC:
                            render.writeBackgroundParamC(3, value);
                            break;
                        case this.BG3PD:
                            render.writeBackgroundParamD(3, value);
                            break;
                        case this.WIN0H:
                            render.writeWin0H(value);
                            break;
                        case this.WIN1H:
                            render.writeWin1H(value);
                            break;
                        case this.WIN0V:
                            render.writeWin0V(value);
                            break;
                        case this.WIN1V:
                            render.writeWin1V(value);
                            break;
                        case this.WININ:
                            value &= 0x3F3F;
                            render.writeWinIn(value);
                            break;
                        case this.WINOUT:
                            value &= 0x3F3F;
                            render.writeWinOut(value);
                            break;
                        case this.BLDCNT:
                            value &= 0x7FFF;
                            render.writeBlendControl(value);
                            break;
                        case this.BLDALPHA:
                            value &= 0x1F1F;
                            render.writeBlendAlpha(value);
                            break;
                        case this.BLDY:
                            value &= 0x001F;
                            render.writeBlendY(value);
                            break;
                        case this.MOSAIC:
                            render.writeMosaic(value);
                            break;
                        // Sound
                        case this.SOUND1CNT_LO:
                            value &= 0x007F;
                            audio.writeSquareChannelSweep(0, value);
                            break;
                        case this.SOUND1CNT_HI:
                            audio.writeSquareChannelDLE(0, value);
                            break;
                        case this.SOUND1CNT_X:
                            value &= 0xC7FF;
                            audio.writeSquareChannelFC(0, value);
                            value &= ~0x8000;
                            break;
                        case this.SOUND2CNT_LO:
                            audio.writeSquareChannelDLE(1, value);
                            break;
                        case this.SOUND2CNT_HI:
                            value &= 0xC7FF;
                            audio.writeSquareChannelFC(1, value);
                            value &= ~0x8000;
                            break;
                        case this.SOUND3CNT_LO:
                            value &= 0x00E0;
                            audio.writeChannel3Lo(value);
                            break;
                        case this.SOUND3CNT_HI:
                            value &= 0xE0FF;
                            audio.writeChannel3Hi(value);
                            break;
                        case this.SOUND3CNT_X:
                            value &= 0xC7FF;
                            audio.writeChannel3X(value);
                            value &= ~0x8000;
                            break;
                        case this.SOUND4CNT_LO:
                            value &= 0xFF3F;
                            audio.writeChannel4LE(value);
                            break;
                        case this.SOUND4CNT_HI:
                            value &= 0xC0FF;
                            audio.writeChannel4FC(value);
                            value &= ~0x8000;
                            break;
                        case this.SOUNDCNT_LO:
                            value &= 0xFF77;
                            audio.writeSoundControlLo(value);
                            break;
                        case this.SOUNDCNT_HI:
                            value &= 0xFF0F;
                            audio.writeSoundControlHi(value);
                            break;
                        case this.SOUNDCNT_X:
                            value &= 0x0080;
                            audio.writeEnable(value);
                            break;
                        case this.WAVE_RAM0_LO:
                        case this.WAVE_RAM0_HI:
                        case this.WAVE_RAM1_LO:
                        case this.WAVE_RAM1_HI:
                        case this.WAVE_RAM2_LO:
                        case this.WAVE_RAM2_HI:
                        case this.WAVE_RAM3_LO:
                        case this.WAVE_RAM3_HI:
                            audio.writeWaveData(offset - this.WAVE_RAM0_LO, value, 2);
                            break;
                        // DMA
                        case this.DMA0SAD_LO:
                        case this.DMA0DAD_LO:
                        case this.DMA1SAD_LO:
                        case this.DMA1DAD_LO:
                        case this.DMA2SAD_LO:
                        case this.DMA2DAD_LO:
                        case this.DMA3SAD_LO:
                        case this.DMA3DAD_LO:
                            this.store32(offset, (this.registers[(offset >> 1) + 1] << 16) | value);
                            return;
                        case this.DMA0SAD_HI:
                        case this.DMA0DAD_HI:
                        case this.DMA1SAD_HI:
                        case this.DMA1DAD_HI:
                        case this.DMA2SAD_HI:
                        case this.DMA2DAD_HI:
                        case this.DMA3SAD_HI:
                        case this.DMA3DAD_HI:
                            this.store32(offset - 2, this.registers[(offset >> 1) - 1] | (value << 16));
                            return;
                        case this.DMA0CNT_LO:
                            irq.dmaSetWordCount(0, value);
                            break;
                        case this.DMA0CNT_HI:
                            // The DMA registers need to set the values before writing the control, as writing the
                            // control can synchronously trigger a DMA transfer
                            this.registers[offset >> 1] = value & 0xFFE0;
                            irq.dmaWriteControl(0, value);
                            return;
                        case this.DMA1CNT_LO:
                            irq.dmaSetWordCount(1, value);
                            break;
                        case this.DMA1CNT_HI:
                            this.registers[offset >> 1] = value & 0xFFE0;
                            irq.dmaWriteControl(1, value);
                            return;
                        case this.DMA2CNT_LO:
                            irq.dmaSetWordCount(2, value);
                            break;
                        case this.DMA2CNT_HI:
                            this.registers[offset >> 1] = value & 0xFFE0;
                            irq.dmaWriteControl(2, value);
                            return;
                        case this.DMA3CNT_LO:
                            irq.dmaSetWordCount(3, value);
                            break;
                        case this.DMA3CNT_HI:
                            this.registers[offset >> 1] = value & 0xFFE0;
                            irq.dmaWriteControl(3, value);
                            return;
                        // Timers
                        case this.TM0CNT_LO:
                            irq.timerSetReload(0, value);
                            return;
                        case this.TM1CNT_LO:
                            irq.timerSetReload(1, value);
                            return;
                        case this.TM2CNT_LO:
                            irq.timerSetReload(2, value);
                            return;
                        case this.TM3CNT_LO:
                            irq.timerSetReload(3, value);
                            return;
                        case this.TM0CNT_HI:
                            value &= 0x00C7;
                            irq.timerWriteControl(0, value);
                            break;
                        case this.TM1CNT_HI:
                            value &= 0x00C7;
                            irq.timerWriteControl(1, value);
                            break;
                        case this.TM2CNT_HI:
                            value &= 0x00C7;
                            irq.timerWriteControl(2, value);
                            break;
                        case this.TM3CNT_HI:
                            value &= 0x00C7;
                            irq.timerWriteControl(3, value);
                            break;
                        // SIO
                        case this.SIOMULTI0:
                        case this.SIOMULTI1:
                        case this.SIOMULTI2:
                        case this.SIOMULTI3:
                        case this.SIODATA8:
                            this.STUB_REG('SIO', offset);
                            break;
                        case this.RCNT:
                            sio.setMode(((value >> 12) & 0xC) | ((this.registers[this.SIOCNT >> 1] >> 12) & 0x3));
                            sio.writeRCNT(value);
                            break;
                        case this.SIOCNT:
                            sio.setMode(((value >> 12) & 0x3) | ((this.registers[this.RCNT >> 1] >> 12) & 0xC));
                            sio.writeSIOCNT(value);
                            return;
                        case this.JOYCNT:
                        case this.JOYSTAT:
                            this.STUB_REG('JOY', offset);
                            break;
                        // Misc
                        case this.IE:
                            value &= 0x3FFF;
                            irq.setInterruptsEnabled(value > 0);
                            break;
                        case this.IF:
                            irq.dismissIRQs(value);
                            return;
                        case this.WAITCNT:
                            value &= 0xDFFF;
                            this.getGBAMMU().adjustTimings(value);
                            break;
                        case this.IME:
                            value &= 0x0001;
                            irq.masterEnable(value > 0);
                            break;
                        default:
                            this.STUB_REG('I/O', offset);
                    }
                    this.registers[offset >> 1] = value;
                }
                /**
                 *
                 * @param offset
                 * @param value
                 */
                store32(offset, value) {
                    // const video = this.getVideo();
                    const audio = this.getAudio();
                    const render = this.getVideoRender();
                    const irq = this.getIRQ();
                    switch (offset) {
                        case this.BG2X_LO:
                            value &= 0x0FFFFFFF;
                            render.writeBackgroundRefX(2, value);
                            break;
                        case this.BG2Y_LO:
                            value &= 0x0FFFFFFF;
                            render.writeBackgroundRefY(2, value);
                            break;
                        case this.BG3X_LO:
                            value &= 0x0FFFFFFF;
                            render.writeBackgroundRefX(3, value);
                            break;
                        case this.BG3Y_LO:
                            value &= 0x0FFFFFFF;
                            render.writeBackgroundRefY(3, value);
                            break;
                        case this.DMA0SAD_LO:
                            irq.dmaSetSourceAddress(0, value);
                            break;
                        case this.DMA0DAD_LO:
                            irq.dmaSetDestAddress(0, value);
                            break;
                        case this.DMA1SAD_LO:
                            irq.dmaSetSourceAddress(1, value);
                            break;
                        case this.DMA1DAD_LO:
                            irq.dmaSetDestAddress(1, value);
                            break;
                        case this.DMA2SAD_LO:
                            irq.dmaSetSourceAddress(2, value);
                            break;
                        case this.DMA2DAD_LO:
                            irq.dmaSetDestAddress(2, value);
                            break;
                        case this.DMA3SAD_LO:
                            irq.dmaSetSourceAddress(3, value);
                            break;
                        case this.DMA3DAD_LO:
                            irq.dmaSetDestAddress(3, value);
                            break;
                        case this.FIFO_A_LO:
                            audio.appendToFifoA(value);
                            return;
                        case this.FIFO_B_LO:
                            audio.appendToFifoB(value);
                            return;
                        // High bits of this write should be ignored
                        case this.IME:
                            this.store16(offset, value & 0xFFFF);
                            return;
                        case this.JOY_RECV:
                        case this.JOY_TRANS:
                            this.STUB_REG('JOY', offset);
                            return;
                        default:
                            this.store16(offset, value & 0xFFFF);
                            this.store16(offset | 2, value >>> 16);
                            return;
                    }
                    if (!this.registers) {
                        throw new Error("register no init");
                    }
                    this.registers[offset >> 1] = value & 0xFFFF;
                    this.registers[(offset >> 1) + 1] = value >>> 16;
                }
                /**
                 *
                 * @param address
                 */
                invalidatePage(address) { }
                /**
                 *
                 * @param type
                 * @param offset
                 */
                STUB_REG(type, offset) {
                    this.getLog().STUB('Unimplemented ' + type + ' register write: ' + offset.toString(16));
                }
            };
            exports_3("default", GameBoyAdvanceIO);
        }
    };
});
System.register("gpio/GameBoyAdvanceSIO", ["utils"], function (exports_4, context_4) {
    "use strict";
    var utils_ts_2, GameBoyAdvanceSIO;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (utils_ts_2_1) {
                utils_ts_2 = utils_ts_2_1;
            }
        ],
        execute: function () {
            GameBoyAdvanceSIO = class GameBoyAdvanceSIO {
                constructor(ctx) {
                    this.mode = 0;
                    this.sd = false;
                    this.irq = 0;
                    this.multiplayer = null;
                    this.linkLayer = null;
                    this.core = ctx;
                    this.SIO_NORMAL_8 = 0;
                    this.SIO_NORMAL_32 = 1;
                    this.SIO_MULTI = 2;
                    this.SIO_UART = 3;
                    this.SIO_GPIO = 8;
                    this.SIO_JOYBUS = 12;
                    this.BAUD = [9600, 38400, 57600, 115200];
                }
                clear() {
                    this.mode = this.SIO_GPIO;
                    this.sd = false;
                    this.irq = 0;
                    this.multiplayer = {
                        baud: 0,
                        si: 0,
                        id: 0,
                        error: 0,
                        busy: 0,
                        irq: 0,
                        states: [0xFFFF, 0xFFFF, 0xFFFF, 0xFFFF]
                    };
                    this.linkLayer = null;
                }
                /**
                 *
                 * @param mode
                 */
                setMode(mode) {
                    if (mode & 0x8) {
                        mode &= 0xC;
                    }
                    else {
                        mode &= 0x3;
                    }
                    this.mode = mode;
                    this.getLog().INFO('Setting SIO mode to ' + utils_ts_2.hex(mode, 1));
                }
                getLog() {
                    return this.core.getLog();
                }
                /**
                 *
                 * @param value
                 */
                writeRCNT(value) {
                    if (this.mode != this.SIO_GPIO) {
                        return;
                    }
                    this.getLog().STUB('General purpose serial not supported');
                }
                getMultiPlayer() {
                    if (!this.multiplayer) {
                        throw new Error("multipplayer no init");
                    }
                    return this.multiplayer;
                }
                /**
                 *
                 * @param value
                 */
                writeSIOCNT(value) {
                    const log = this.getLog();
                    const multiplayer = this.getMultiPlayer();
                    switch (this.mode) {
                        case this.SIO_NORMAL_8:
                            log.STUB('8-bit transfer unsupported');
                            break;
                        case this.SIO_NORMAL_32:
                            log.STUB('32-bit transfer unsupported');
                            break;
                        case this.SIO_MULTI:
                            multiplayer.baud = value & 0x0003;
                            if (this.linkLayer) {
                                this.linkLayer.setBaud(this.BAUD[multiplayer.baud]);
                            }
                            if (!multiplayer.si) {
                                multiplayer.busy = value & 0x0080;
                                if (this.linkLayer && multiplayer.busy) {
                                    this.linkLayer.startMultiplayerTransfer();
                                }
                            }
                            this.irq = value & 0x4000;
                            break;
                        case this.SIO_UART:
                            log.STUB('UART unsupported');
                            break;
                        case this.SIO_GPIO:
                            // This register isn't used in general-purpose mode
                            break;
                        case this.SIO_JOYBUS:
                            log.STUB('JOY BUS unsupported');
                            break;
                    }
                }
                /**
                 *
                 */
                readSIOCNT() {
                    let value = (this.mode << 12) & 0xFFFF;
                    const log = this.getLog();
                    const multiplayer = this.getMultiPlayer();
                    switch (this.mode) {
                        case this.SIO_NORMAL_8:
                            log.STUB('8-bit transfer unsupported');
                            break;
                        case this.SIO_NORMAL_32:
                            log.STUB('32-bit transfer unsupported');
                            break;
                        case this.SIO_MULTI:
                            value |= multiplayer.baud;
                            value |= multiplayer.si;
                            value |= (!!this.sd ? 1 : 0) << 3;
                            value |= multiplayer.id << 4;
                            value |= multiplayer.error;
                            value |= multiplayer.busy;
                            value |= (!!multiplayer.irq ? 1 : 0) << 14;
                            break;
                        case this.SIO_UART:
                            log.STUB('UART unsupported');
                            break;
                        case this.SIO_GPIO:
                            // This register isn't used in general-purpose mode
                            break;
                        case this.SIO_JOYBUS:
                            log.STUB('JOY BUS unsupported');
                            break;
                    }
                    return value;
                }
                /**
                 *
                 * @param slot
                 */
                read(slot) {
                    const log = this.getLog();
                    const multiplayer = this.getMultiPlayer();
                    switch (this.mode) {
                        case this.SIO_NORMAL_32:
                            log.STUB('32-bit transfer unsupported');
                            break;
                        case this.SIO_MULTI:
                            return multiplayer.states[slot];
                        case this.SIO_UART:
                            log.STUB('UART unsupported');
                            break;
                        default:
                            log.WARN('Reading from transfer register in unsupported mode');
                            break;
                    }
                    return 0;
                }
            };
            exports_4("default", GameBoyAdvanceSIO);
        }
    };
});
System.register("gpio/GameBoyAdvanceRTC", [], function (exports_5, context_5) {
    "use strict";
    var GameBoyAdvanceRTC;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            GameBoyAdvanceRTC = class GameBoyAdvanceRTC {
                constructor(gpio) {
                    this.read = false;
                    this.gpio = gpio;
                    // PINOUT: SCK | SIO | CS | -
                    this.pins = 0;
                    this.direction = 0;
                    this.totalBytes = [
                        0,
                        0,
                        7,
                        0,
                        1,
                        0,
                        3,
                        0 // Empty
                    ];
                    this.bytesRemaining = 0;
                    // Transfer sequence:
                    // == Initiate
                    // > HI | - | LO | -
                    // > HI | - | HI | -
                    // == Transfer bit (x8)
                    // > LO | x | HI | -
                    // > HI | - | HI | -
                    // < ?? | x | ?? | -
                    // == Terminate
                    // >  - | - | LO | -
                    this.transferStep = 0;
                    this.reading = 0;
                    this.bitsRead = 0;
                    this.bits = 0;
                    this.command = -1;
                    this.control = 0x40;
                    this.time = [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0 // Second
                    ];
                }
                setPins(nybble) {
                    switch (this.transferStep) {
                        case 0:
                            if ((nybble & 5) == 1) {
                                this.transferStep = 1;
                            }
                            break;
                        case 1:
                            if (nybble & 4) {
                                this.transferStep = 2;
                            }
                            break;
                        case 2:
                            if (!(nybble & 1)) {
                                this.bits &= ~(1 << this.bitsRead);
                                this.bits |= ((nybble & 2) >> 1) << this.bitsRead;
                            }
                            else {
                                if (nybble & 4) {
                                    // SIO direction should always != this.read
                                    if ((this.direction & 2) && !this.read) {
                                        ++this.bitsRead;
                                        if (this.bitsRead == 8) {
                                            this.processByte();
                                        }
                                    }
                                    else {
                                        this.gpio.outputPins(5 | (this.sioOutputPin() << 1));
                                        ++this.bitsRead;
                                        if (this.bitsRead == 8) {
                                            --this.bytesRemaining;
                                            if (this.bytesRemaining <= 0) {
                                                this.command = -1;
                                            }
                                            this.bitsRead = 0;
                                        }
                                    }
                                }
                                else {
                                    this.bitsRead = 0;
                                    this.bytesRemaining = 0;
                                    this.command = -1;
                                    this.transferStep = 0;
                                }
                            }
                            break;
                    }
                    this.pins = nybble & 7;
                }
                setDirection(direction) {
                    this.direction = direction;
                }
                processByte() {
                    --this.bytesRemaining;
                    switch (this.command) {
                        case -1:
                            if ((this.bits & 0x0F) == 0x06) {
                                this.command = (this.bits >> 4) & 7;
                                this.reading = this.bits & 0x80;
                                this.bytesRemaining = this.totalBytes[this.command];
                                switch (this.command) {
                                    case 0:
                                        this.control = 0;
                                        break;
                                    case 2:
                                    case 6:
                                        this.updateClock();
                                        break;
                                }
                            }
                            else {
                                this.gpio.core.WARN('Invalid RTC command byte: ' + this.bits.toString(16));
                            }
                            break;
                        case 4:
                            // Control
                            this.control = this.bits & 0x40;
                            break;
                    }
                    this.bits = 0;
                    this.bitsRead = 0;
                    if (!this.bytesRemaining) {
                        this.command = -1;
                    }
                }
                sioOutputPin() {
                    let outputByte = 0;
                    switch (this.command) {
                        case 4:
                            outputByte = this.control;
                            break;
                        case 2:
                        case 6:
                            outputByte = this.time[7 - this.bytesRemaining];
                            break;
                    }
                    return (outputByte >> this.bitsRead) & 1;
                }
                updateClock() {
                    var date = new Date();
                    this.time[0] = this.bcd(date.getFullYear());
                    this.time[1] = this.bcd(date.getMonth() + 1);
                    this.time[2] = this.bcd(date.getDate());
                    this.time[3] = date.getDay() - 1;
                    if (this.time[3] < 0) {
                        this.time[3] = 6;
                    }
                    if (this.control & 0x40) {
                        // 24 hour
                        this.time[4] = this.bcd(date.getHours());
                    }
                    else {
                        this.time[4] = this.bcd(date.getHours() % 2);
                        if (date.getHours() >= 12) {
                            this.time[4] |= 0x80;
                        }
                    }
                    this.time[5] = this.bcd(date.getMinutes());
                    this.time[6] = this.bcd(date.getSeconds());
                }
                bcd(binary) {
                    var counter = binary % 10;
                    binary /= 10;
                    counter += (binary % 10) << 4;
                    return counter;
                }
            };
            exports_5("default", GameBoyAdvanceRTC);
        }
    };
});
System.register("gpio/GameBoyAdvanceGPIO", ["gpio/GameBoyAdvanceRTC"], function (exports_6, context_6) {
    "use strict";
    var GameBoyAdvanceRTC_ts_1, GameBoyAdvanceGPIO;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (GameBoyAdvanceRTC_ts_1_1) {
                GameBoyAdvanceRTC_ts_1 = GameBoyAdvanceRTC_ts_1_1;
            }
        ],
        execute: function () {
            GameBoyAdvanceGPIO = class GameBoyAdvanceGPIO {
                constructor(core, rom) {
                    this.core = core;
                    this.rom = rom;
                    this.readWrite = 0;
                    this.direction = 0;
                    this.device = new GameBoyAdvanceRTC_ts_1.default(this); // TODO: Support more devices
                }
                store16(offset, value) {
                    switch (offset) {
                        case 0xC4:
                            this.device.setPins(value & 0xF);
                            break;
                        case 0xC6:
                            this.direction = value & 0xF;
                            this.device.setDirection(this.direction);
                            break;
                        case 0xC8:
                            this.readWrite = value & 1;
                            break;
                        default:
                            throw new Error('BUG: Bad offset passed to GPIO: ' + offset.toString(16));
                    }
                    if (this.readWrite) {
                        var old = this.rom.view.getUint16(offset, true);
                        old &= ~this.direction;
                        this.rom.view.setUint16(offset, old | (value & this.direction), true);
                    }
                }
                store32(offset, value) {
                    throw new Error("no implements");
                }
                outputPins(nybble) {
                    if (this.readWrite) {
                        let old = this.rom.view.getUint16(0xC4, true);
                        old &= this.direction;
                        this.rom.view.setUint16(0xC4, old | (nybble & ~this.direction & 0xF), true);
                    }
                }
            };
            exports_6("default", GameBoyAdvanceGPIO);
        }
    };
});
System.register("gpio/mod", ["gpio/GameBoyAdvanceIO", "gpio/GameBoyAdvanceSIO", "gpio/GameBoyAdvanceGPIO"], function (exports_7, context_7) {
    "use strict";
    var GameBoyAdvanceIO_ts_1, GameBoyAdvanceSIO_ts_1, GameBoyAdvanceGPIO_ts_1;
    var __moduleName = context_7 && context_7.id;
    function factoryIO(ctx) {
        return new GameBoyAdvanceIO_ts_1.default(ctx);
    }
    exports_7("factoryIO", factoryIO);
    function factorySIO(ctx) {
        return new GameBoyAdvanceSIO_ts_1.default(ctx);
    }
    exports_7("factorySIO", factorySIO);
    return {
        setters: [
            function (GameBoyAdvanceIO_ts_1_1) {
                GameBoyAdvanceIO_ts_1 = GameBoyAdvanceIO_ts_1_1;
            },
            function (GameBoyAdvanceSIO_ts_1_1) {
                GameBoyAdvanceSIO_ts_1 = GameBoyAdvanceSIO_ts_1_1;
            },
            function (GameBoyAdvanceGPIO_ts_1_1) {
                GameBoyAdvanceGPIO_ts_1 = GameBoyAdvanceGPIO_ts_1_1;
            }
        ],
        execute: function () {
            exports_7("GameBoyAdvanceGPIO", GameBoyAdvanceGPIO_ts_1.default);
        }
    };
});
System.register("audio/GameBoyAdvanceAudio", ["interfaces"], function (exports_8, context_8) {
    "use strict";
    var interfaces_ts_2, GameBoyAdvanceAudio;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (interfaces_ts_2_1) {
                interfaces_ts_2 = interfaces_ts_2_1;
            }
        ],
        execute: function () {
            GameBoyAdvanceAudio = class GameBoyAdvanceAudio {
                constructor(ctx) {
                    this.SOUND_MAX = 0x400;
                    this.FIFO_MAX = 0x200;
                    this.PSG_MAX = 0x080;
                    this.bufferSize = 0;
                    this.maxSamples = 0;
                    this.sampleMask = 0;
                    this.jsAudio = null;
                    this.context = null;
                    this.buffers = [];
                    this.nextEvent = 0;
                    this.nextSample = 0;
                    this.samplePointer = 0;
                    this.backup = 0;
                    this.outputPointer = 0;
                    this.totalSamples = 0;
                    this.sampleRate = 0;
                    this.sampleInterval = 0;
                    this.resampleRatio = 0;
                    this.cpuFrequency = 0;
                    this.waveData = new Uint8Array(0);
                    this.channel3Dimension = 0;
                    this.channel3Bank = 0;
                    this.channel3Volume = 0;
                    this.channel3Interval = 0;
                    this.channel3Next = 0;
                    this.channel3Length = 0;
                    this.channel3Timed = false;
                    this.channel3End = 0;
                    this.channel3Pointer = 0;
                    this.channel3Sample = 0;
                    this.enableChannel3 = 0;
                    this.masterVolumeLeft = 0;
                    this.masterVolumeRight = 0;
                    this.enabledLeft = 0;
                    this.enabledRight = 0;
                    // enableChannel3: boolean = false;
                    this.enableChannel4 = false;
                    this.enableChannelA = false;
                    this.enableChannelB = false;
                    this.enableRightChannelA = false;
                    this.enableLeftChannelA = false;
                    this.enableRightChannelB = false;
                    this.enableLeftChannelB = false;
                    this.playingChannel3 = false;
                    this.playingChannel4 = false;
                    this.volumeLeft = 0;
                    this.volumeRight = 0;
                    this.ratioChannelA = 0;
                    this.ratioChannelB = 0;
                    this.dmaA = 0;
                    this.dmaB = 0;
                    this.soundTimerA = 0;
                    this.soundTimerB = 0;
                    this.fifoASample = 0;
                    this.fifoBSample = 0;
                    this.soundRatio = 0;
                    this.soundBias = 0x200;
                    this.enabled = false;
                    this.squareChannels = [];
                    this.channel4 = null;
                    this.fifoA = [];
                    this.fifoB = [];
                    this.channel3Write = false;
                    this.setupNativeAudio();
                    this.core = ctx;
                    if (this.context) {
                        this.bufferSize = 0;
                        this.bufferSize = 4096;
                        this.maxSamples = this.bufferSize << 2;
                        this.buffers = [new Float32Array(this.maxSamples), new Float32Array(this.maxSamples)];
                        this.sampleMask = this.maxSamples - 1;
                    }
                    this.masterEnable = true;
                    this.masterVolume = 1.0;
                }
                setupNativeAudio() {
                    // @ts-ignore
                    window.AudioContext = window.AudioContext || window.webkitAudioContext;
                    // @ts-ignore
                    if (window.AudioContext) {
                        // @ts-ignore
                        this.context = new AudioContext();
                        if (!this.context) {
                            throw new Error("audio context init fail");
                        }
                        const factory = this.context.createScriptProcessor || this.context.createJavaScriptNode;
                        if (!factory) {
                            throw new Error("audio context init fail");
                        }
                        this.jsAudio = factory.call(this.context, this.bufferSize);
                        const self = this;
                        this.jsAudio.onaudioprocess = function (e) { self.audioProcess(e); };
                    }
                    else {
                        this.context = null;
                    }
                }
                clear() {
                    this.fifoA = [];
                    this.fifoB = [];
                    this.fifoASample = 0;
                    this.fifoBSample = 0;
                    this.enabled = false;
                    if (this.context) {
                        try {
                            this.getJsAudio().disconnect(this.context.destination);
                        }
                        catch (e) {
                        }
                    }
                    this.enableChannel3 = 0;
                    this.enableChannel4 = false;
                    this.enableChannelA = false;
                    this.enableChannelB = false;
                    this.enableRightChannelA = false;
                    this.enableLeftChannelA = false;
                    this.enableRightChannelB = false;
                    this.enableLeftChannelB = false;
                    this.playingChannel3 = false;
                    this.playingChannel4 = false;
                    this.volumeLeft = 0;
                    this.volumeRight = 0;
                    this.ratioChannelA = 1;
                    this.ratioChannelB = 1;
                    this.enabledLeft = 0;
                    this.enabledRight = 0;
                    this.dmaA = -1;
                    this.dmaB = -1;
                    this.soundTimerA = 0;
                    this.soundTimerB = 0;
                    this.soundRatio = 1;
                    this.soundBias = 0x200;
                    this.squareChannels = [];
                    for (let i = 0; i < 2; ++i) {
                        this.squareChannels[i] = {
                            nextSweep: 0,
                            enabled: false,
                            playing: false,
                            sample: 0,
                            duty: 0.5,
                            increment: 0,
                            step: 0,
                            initialVolume: 0,
                            volume: 0,
                            frequency: 0,
                            interval: 0,
                            sweepSteps: 0,
                            sweepIncrement: 0,
                            sweepInterval: 0,
                            doSweep: false,
                            raise: 0,
                            lower: 0,
                            nextStep: 0,
                            timed: false,
                            length: 0,
                            end: 0
                        };
                    }
                    this.waveData = new Uint8Array(32);
                    this.channel3Dimension = 0;
                    this.channel3Bank = 0;
                    this.channel3Volume = 0;
                    this.channel3Interval = 0;
                    this.channel3Next = 0;
                    this.channel3Length = 0;
                    this.channel3Timed = false;
                    this.channel3End = 0;
                    this.channel3Pointer = 0;
                    this.channel3Sample = 0;
                    this.cpuFrequency = this.getIRQ().FREQUENCY;
                    this.channel4 = {
                        sample: 0,
                        lfsr: 0,
                        width: 15,
                        interval: this.cpuFrequency / 524288,
                        increment: 0,
                        step: 0,
                        initialVolume: 0,
                        volume: 0,
                        nextStep: 0,
                        timed: false,
                        length: 0,
                        end: 0,
                        next: 0
                    };
                    this.nextEvent = 0;
                    this.nextSample = 0;
                    this.outputPointer = 0;
                    this.samplePointer = 0;
                    this.backup = 0;
                    this.totalSamples = 0;
                    this.sampleRate = 32768;
                    this.sampleInterval = this.cpuFrequency / this.sampleRate;
                    this.resampleRatio = 1;
                    if (this.context) {
                        this.resampleRatio = this.sampleRate / this.context.sampleRate;
                    }
                    this.writeSquareChannelFC(0, 0);
                    this.writeSquareChannelFC(1, 0);
                    this.writeChannel4FC(0);
                }
                getGBA() {
                    return this.core.getGBA();
                }
                freeze() {
                    return {
                        nextSample: this.nextSample
                    };
                }
                defrost(frost) {
                    this.nextSample = frost.nextSample;
                }
                getJsAudio() {
                    if (!this.jsAudio) {
                        throw new Error("jsaudio no init");
                    }
                    return this.jsAudio;
                }
                pause(paused) {
                    if (this.context) {
                        if (paused) {
                            try {
                                this.getJsAudio().disconnect(this.context.destination);
                            }
                            catch (e) {
                                // Sigh
                            }
                        }
                        else if (this.enabled) {
                            this.getJsAudio().connect(this.context.destination);
                        }
                    }
                }
                getCPU() {
                    return this.core.getCPU();
                }
                updateTimers() {
                    var cycles = this.getCPU().cycles;
                    if (!this.enabled || (cycles < this.nextEvent && cycles < this.nextSample)) {
                        return;
                    }
                    if (cycles >= this.nextEvent) {
                        var channel = this.squareChannels[0];
                        this.nextEvent = Infinity;
                        if (channel.playing) {
                            this.updateSquareChannel(channel, cycles);
                        }
                        channel = this.squareChannels[1];
                        if (channel.playing) {
                            this.updateSquareChannel(channel, cycles);
                        }
                        if (this.enableChannel3 && this.playingChannel3) {
                            if (cycles >= this.channel3Next) {
                                if (this.channel3Write) {
                                    var sample = this.waveData[this.channel3Pointer >> 1];
                                    this.channel3Sample = (((sample >> ((this.channel3Pointer & 1) << 2)) & 0xF) - 0x8) / 8;
                                    this.channel3Pointer = (this.channel3Pointer + 1);
                                    if (this.channel3Dimension && this.channel3Pointer >= 64) {
                                        this.channel3Pointer -= 64;
                                    }
                                    else if (!this.channel3Bank && this.channel3Pointer >= 32) {
                                        this.channel3Pointer -= 32;
                                    }
                                    else if (this.channel3Pointer >= 64) {
                                        this.channel3Pointer -= 32;
                                    }
                                }
                                this.channel3Next += this.channel3Interval;
                                if (this.channel3Interval && this.nextEvent > this.channel3Next) {
                                    this.nextEvent = this.channel3Next;
                                }
                            }
                            if (this.channel3Timed && cycles >= this.channel3End) {
                                this.playingChannel3 = false;
                            }
                        }
                        const channel4 = this.getChannel4();
                        if (this.enableChannel4 && this.playingChannel4) {
                            if (channel4.timed && cycles >= channel4.end) {
                                this.playingChannel4 = false;
                            }
                            else {
                                if (cycles >= channel4.next) {
                                    channel4.lfsr >>= 1;
                                    var sample = channel4.lfsr & 1;
                                    channel4.lfsr |= (((channel4.lfsr >> 1) & 1) ^ sample) << (channel4.width - 1);
                                    channel4.next += channel4.interval;
                                    channel4.sample = (sample - 0.5) * 2 * channel4.volume;
                                }
                                this.updateEnvelope(channel4, cycles);
                                if (this.nextEvent > channel4.next) {
                                    this.nextEvent = channel4.next;
                                }
                                if (channel4.timed && this.nextEvent > channel4.end) {
                                    this.nextEvent = channel4.end;
                                }
                            }
                        }
                    }
                    if (cycles >= this.nextSample) {
                        this.sample();
                        this.nextSample += this.sampleInterval;
                    }
                    this.nextEvent = Math.ceil(this.nextEvent);
                    if ((this.nextEvent < cycles) || (this.nextSample < cycles)) {
                        // STM instructions may take a long time
                        this.updateTimers();
                    }
                }
                getChannel4() {
                    if (!this.channel4) {
                        throw new Error("channel4 no init");
                    }
                    return this.channel4;
                }
                /**
                 *
                 * @param value
                 */
                writeEnable(value) {
                    this.enabled = !!value;
                    this.nextEvent = this.getCPU().cycles;
                    this.nextSample = this.nextEvent;
                    this.updateTimers();
                    this.getIRQ().pollNextEvent();
                    if (this.context) {
                        if (this.enabled) {
                            this.getJsAudio().connect(this.context.destination);
                        }
                        else {
                            try {
                                this.getJsAudio().disconnect(this.context.destination);
                            }
                            catch (e) {
                            }
                        }
                    }
                }
                /**
                 *
                 * @param value
                 */
                writeSoundControlLo(value) {
                    this.masterVolumeLeft = value & 0x7;
                    this.masterVolumeRight = (value >> 4) & 0x7;
                    this.enabledLeft = (value >> 8) & 0xF;
                    this.enabledRight = (value >> 12) & 0xF;
                    this.setSquareChannelEnabled(this.squareChannels[0], ((this.enabledLeft | this.enabledRight) & 0x1) > 0);
                    this.setSquareChannelEnabled(this.squareChannels[1], ((this.enabledLeft | this.enabledRight) & 0x2) > 0);
                    this.enableChannel3 = (this.enabledLeft | this.enabledRight) & 0x4;
                    this.setChannel4Enabled(((this.enabledLeft | this.enabledRight) & 0x8) > 0);
                    this.updateTimers();
                    this.getIRQ().pollNextEvent();
                }
                /**
                 *
                 * @param value
                 */
                writeSoundControlHi(value) {
                    switch (value & 0x0003) {
                        case 0:
                            this.soundRatio = 0.25;
                            break;
                        case 1:
                            this.soundRatio = 0.50;
                            break;
                        case 2:
                            this.soundRatio = 1;
                            break;
                    }
                    this.ratioChannelA = (((value & 0x0004) >> 2) + 1) * 0.5;
                    this.ratioChannelB = (((value & 0x0008) >> 3) + 1) * 0.5;
                    this.enableRightChannelA = (value & 0x0100) > 0;
                    this.enableLeftChannelA = (value & 0x0200) > 0;
                    this.enableChannelA = (value & 0x0300) > 0;
                    this.soundTimerA = value & 0x0400;
                    if (value & 0x0800) {
                        this.fifoA = [];
                    }
                    this.enableRightChannelB = (value & 0x1000) > 0;
                    this.enableLeftChannelB = (value & 0x2000) > 0;
                    this.enableChannelB = (value & 0x3000) > 0;
                    this.soundTimerB = value & 0x4000;
                    if (value & 0x8000) {
                        this.fifoB = [];
                    }
                }
                /**
                 *
                 * @param channel
                 */
                resetSquareChannel(channel) {
                    const cpu = this.getCPU();
                    if (channel.step) {
                        channel.nextStep = cpu.cycles + channel.step;
                    }
                    if (channel.enabled && !channel.playing) {
                        channel.raise = cpu.cycles;
                        channel.lower = channel.raise + channel.duty * channel.interval;
                        channel.end = cpu.cycles + channel.length;
                        this.nextEvent = cpu.cycles;
                    }
                    channel.playing = channel.enabled;
                    this.updateTimers();
                    this.getIRQ().pollNextEvent();
                }
                /**
                 *
                 * @param channel
                 * @param enable
                 */
                setSquareChannelEnabled(channel, enable) {
                    if (!(channel.enabled && channel.playing) && enable) {
                        channel.enabled = !!enable;
                        this.updateTimers();
                        this.getIRQ().pollNextEvent();
                    }
                    else {
                        channel.enabled = !!enable;
                    }
                }
                /**
                 *
                 * @param channelId
                 * @param value
                 */
                writeSquareChannelSweep(channelId, value) {
                    const channel = this.squareChannels[channelId];
                    channel.sweepSteps = value & 0x07;
                    channel.sweepIncrement = (value & 0x08) ? -1 : 1;
                    channel.sweepInterval = ((value >> 4) & 0x7) * this.cpuFrequency / 128;
                    channel.doSweep = !!channel.sweepInterval;
                    channel.nextSweep = this.getCPU().cycles + channel.sweepInterval;
                    this.resetSquareChannel(channel);
                }
                /**
                 *
                 */
                writeSquareChannelDLE(channelId, value) {
                    const channel = this.squareChannels[channelId];
                    const duty = (value >> 6) & 0x3;
                    switch (duty) {
                        case 0:
                            channel.duty = 0.125;
                            break;
                        case 1:
                            channel.duty = 0.25;
                            break;
                        case 2:
                            channel.duty = 0.5;
                            break;
                        case 3:
                            channel.duty = 0.75;
                            break;
                    }
                    this.writeChannelLE(channel, value);
                    this.resetSquareChannel(channel);
                }
                /**
                 *
                 * @param channelId
                 * @param value
                 */
                writeSquareChannelFC(channelId, value) {
                    var channel = this.squareChannels[channelId];
                    var frequency = value & 2047;
                    channel.frequency = frequency;
                    channel.interval = this.cpuFrequency * (2048 - frequency) / 131072;
                    channel.timed = !!(value & 0x4000);
                    if (value & 0x8000) {
                        this.resetSquareChannel(channel);
                        channel.volume = channel.initialVolume;
                    }
                }
                /**
                 *
                 * @param channel
                 * @param cycles
                 */
                updateSquareChannel(channel, cycles) {
                    if (channel.timed && cycles >= channel.end) {
                        channel.playing = false;
                        return;
                    }
                    if (channel.doSweep && cycles >= channel.nextSweep) {
                        channel.frequency += channel.sweepIncrement * (channel.frequency >> channel.sweepSteps);
                        if (channel.frequency < 0) {
                            channel.frequency = 0;
                        }
                        else if (channel.frequency > 2047) {
                            channel.frequency = 2047;
                            channel.playing = false;
                            return;
                        }
                        channel.interval = this.cpuFrequency * (2048 - channel.frequency) / 131072;
                        channel.nextSweep += channel.sweepInterval;
                    }
                    if (cycles >= channel.raise) {
                        channel.sample = channel.volume;
                        channel.lower = channel.raise + channel.duty * channel.interval;
                        channel.raise += channel.interval;
                    }
                    else if (cycles >= channel.lower) {
                        channel.sample = -channel.volume;
                        channel.lower += channel.interval;
                    }
                    this.updateEnvelope(channel, cycles);
                    if (this.nextEvent > channel.raise) {
                        this.nextEvent = channel.raise;
                    }
                    if (this.nextEvent > channel.lower) {
                        this.nextEvent = channel.lower;
                    }
                    if (channel.timed && this.nextEvent > channel.end) {
                        this.nextEvent = channel.end;
                    }
                    if (channel.doSweep && this.nextEvent > channel.nextSweep) {
                        this.nextEvent = channel.nextSweep;
                    }
                }
                /**
                 *
                 * @param value
                 */
                writeChannel3Lo(value) {
                    this.channel3Dimension = value & 0x20;
                    this.channel3Bank = value & 0x40;
                    var enable = value & 0x80;
                    if (!this.channel3Write && enable) {
                        this.channel3Write = enable > 0;
                        this.resetChannel3();
                    }
                    else {
                        this.channel3Write = enable > 0;
                    }
                }
                /**
                 *
                 * @param value
                 */
                writeChannel3Hi(value) {
                    this.channel3Length = this.cpuFrequency * (0x100 - (value & 0xFF)) / 256;
                    var volume = (value >> 13) & 0x7;
                    switch (volume) {
                        case 0:
                            this.channel3Volume = 0;
                            break;
                        case 1:
                            this.channel3Volume = 1;
                            break;
                        case 2:
                            this.channel3Volume = 0.5;
                            break;
                        case 3:
                            this.channel3Volume = 0.25;
                            break;
                        default:
                            this.channel3Volume = 0.75;
                    }
                }
                /**
                 *
                 * @param value
                 */
                writeChannel3X(value) {
                    this.channel3Interval = this.cpuFrequency * (2048 - (value & 0x7FF)) / 2097152;
                    this.channel3Timed = !!(value & 0x4000);
                    if (this.channel3Write) {
                        this.resetChannel3();
                    }
                }
                /**
                 *
                 */
                resetChannel3() {
                    const cpu = this.getCPU();
                    this.channel3Next = cpu.cycles;
                    this.nextEvent = this.channel3Next;
                    this.channel3End = cpu.cycles + this.channel3Length;
                    this.playingChannel3 = this.channel3Write;
                    this.updateTimers();
                    this.getIRQ().pollNextEvent();
                }
                /**
                 *
                 * @param offset
                 * @param data
                 * @param width
                 */
                writeWaveData(offset, data, width) {
                    if (!this.channel3Bank) {
                        offset += 16;
                    }
                    if (width == 2) {
                        this.waveData[offset] = data & 0xFF;
                        data >>= 8;
                        ++offset;
                    }
                    this.waveData[offset] = data & 0xFF;
                }
                setChannel4Enabled(enable) {
                    if (!this.enableChannel4 && enable) {
                        const cpu = this.getCPU();
                        const channel4 = this.getChannel4();
                        channel4.next = cpu.cycles;
                        channel4.end = cpu.cycles + channel4.length;
                        this.enableChannel4 = true;
                        this.playingChannel4 = true;
                        this.nextEvent = cpu.cycles;
                        this.updateEnvelope(channel4);
                        this.updateTimers();
                        this.getIRQ().pollNextEvent();
                    }
                    else {
                        this.enableChannel4 = enable;
                    }
                }
                /**
                 *
                 * @param value
                 */
                writeChannel4LE(value) {
                    this.writeChannelLE(this.getChannel4(), value);
                    this.resetChannel4();
                }
                /**
                 *
                 * @param value
                 */
                writeChannel4FC(value) {
                    const channel4 = this.getChannel4();
                    channel4.timed = !!(value & 0x4000);
                    var r = value & 0x7;
                    if (!r) {
                        r = 0.5;
                    }
                    var s = (value >> 4) & 0xF;
                    var interval = this.cpuFrequency * (r * (2 << s)) / 524288;
                    if (interval != channel4.interval) {
                        channel4.interval = interval;
                        this.resetChannel4();
                    }
                    var width = (value & 0x8) ? 7 : 15;
                    if (width != channel4.width) {
                        channel4.width = width;
                        this.resetChannel4();
                    }
                    if (value & 0x8000) {
                        this.resetChannel4();
                    }
                }
                resetChannel4() {
                    const channel4 = this.getChannel4();
                    if (channel4.width == 15) {
                        channel4.lfsr = 0x4000;
                    }
                    else {
                        channel4.lfsr = 0x40;
                    }
                    channel4.volume = channel4.initialVolume;
                    const cpu = this.getCPU();
                    if (channel4.step) {
                        channel4.nextStep = cpu.cycles + channel4.step;
                    }
                    channel4.end = cpu.cycles + channel4.length;
                    channel4.next = cpu.cycles;
                    this.nextEvent = channel4.next;
                    this.playingChannel4 = this.enableChannel4;
                    this.updateTimers();
                    this.getIRQ().pollNextEvent();
                }
                /**
                 *
                 * @param channel
                 * @param value
                 */
                writeChannelLE(channel, value) {
                    channel.length = this.cpuFrequency * ((0x40 - (value & 0x3F)) / 256);
                    if (value & 0x0800) {
                        channel.increment = 1 / 16;
                    }
                    else {
                        channel.increment = -1 / 16;
                    }
                    channel.initialVolume = ((value >> 12) & 0xF) / 16;
                    channel.step = this.cpuFrequency * (((value >> 8) & 0x7) / 64);
                }
                /**
                 *
                 * @param channel
                 * @param cycles
                 */
                updateEnvelope(channel, cycles = 0) {
                    if (channel.step) {
                        if (cycles >= channel.nextStep) {
                            channel.volume += channel.increment;
                            if (channel.volume > 1) {
                                channel.volume = 1;
                            }
                            else if (channel.volume < 0) {
                                channel.volume = 0;
                            }
                            channel.nextStep += channel.step;
                        }
                        if (this.nextEvent > channel.nextStep) {
                            this.nextEvent = channel.nextStep;
                        }
                    }
                }
                /**
                 *
                 * @param value
                 */
                appendToFifoA(value) {
                    var b;
                    if (this.fifoA.length > 28) {
                        this.fifoA = this.fifoA.slice(-28);
                    }
                    for (var i = 0; i < 4; ++i) {
                        b = (value & 0xFF) << 24;
                        value >>= 8;
                        this.fifoA.push(b / 0x80000000);
                    }
                }
                /**
                 *
                 * @param value
                 */
                appendToFifoB(value) {
                    var b;
                    if (this.fifoB.length > 28) {
                        this.fifoB = this.fifoB.slice(-28);
                    }
                    for (var i = 0; i < 4; ++i) {
                        b = (value & 0xFF) << 24;
                        value >>= 8;
                        this.fifoB.push(b / 0x80000000);
                    }
                }
                /**
                 *
                 */
                sampleFifoA() {
                    if (this.fifoA.length <= 16) {
                        const dma = this.getIRQ().dma[this.dmaA];
                        dma.nextCount = 4;
                        this.getMMU().serviceDma(this.dmaA, dma);
                    }
                    this.fifoASample = this.fifoA.shift() || 0;
                }
                sampleFifoB() {
                    if (this.fifoB.length <= 16) {
                        const dma = this.getIRQ().dma[this.dmaB];
                        dma.nextCount = 4;
                        this.getMMU().serviceDma(this.dmaB, dma);
                    }
                    this.fifoBSample = this.fifoB.shift() ?? 0;
                }
                getLog() {
                    return this.core.getLog();
                }
                getGBAContext() {
                    return this.core;
                }
                getMMU() {
                    return this.getGBAContext().getMMU();
                }
                getIRQ() {
                    return this.getGBAContext().getIRQ();
                }
                getIIO() {
                    return this.core.getIO();
                }
                /**
                 *
                 * @param number
                 * @param info
                 */
                scheduleFIFODma(number, info) {
                    const mmu = this.getMMU();
                    const io = this.getIIO();
                    switch (info.dest) {
                        case interfaces_ts_2.MemoryBase.BASE_IO | io.FIFO_A_LO:
                            // FIXME: is this needed or a hack?
                            info.dstControl = 2;
                            this.dmaA = number;
                            break;
                        case interfaces_ts_2.MemoryBase.BASE_IO | io.FIFO_B_LO:
                            info.dstControl = 2;
                            this.dmaB = number;
                            break;
                        default:
                            this.getLog().WARN('Tried to schedule FIFO DMA for non-FIFO destination');
                            break;
                    }
                }
                /**
                 *
                 */
                sample() {
                    var sampleLeft = 0;
                    var sampleRight = 0;
                    var sample;
                    var channel;
                    channel = this.squareChannels[0];
                    if (channel.playing) {
                        sample = channel.sample * this.soundRatio * this.PSG_MAX;
                        if (this.enabledLeft & 0x1) {
                            sampleLeft += sample;
                        }
                        if (this.enabledRight & 0x1) {
                            sampleRight += sample;
                        }
                    }
                    channel = this.squareChannels[1];
                    if (channel.playing) {
                        sample = channel.sample * this.soundRatio * this.PSG_MAX;
                        if (this.enabledLeft & 0x2) {
                            sampleLeft += sample;
                        }
                        if (this.enabledRight & 0x2) {
                            sampleRight += sample;
                        }
                    }
                    if (this.playingChannel3) {
                        sample = this.channel3Sample * this.soundRatio * this.channel3Volume * this.PSG_MAX;
                        if (this.enabledLeft & 0x4) {
                            sampleLeft += sample;
                        }
                        if (this.enabledRight & 0x4) {
                            sampleRight += sample;
                        }
                    }
                    if (this.playingChannel4) {
                        sample = this.getChannel4().sample * this.soundRatio * this.PSG_MAX;
                        if (this.enabledLeft & 0x8) {
                            sampleLeft += sample;
                        }
                        if (this.enabledRight & 0x8) {
                            sampleRight += sample;
                        }
                    }
                    if (this.enableChannelA) {
                        sample = this.fifoASample * this.FIFO_MAX * this.ratioChannelA;
                        if (this.enableLeftChannelA) {
                            sampleLeft += sample;
                        }
                        if (this.enableRightChannelA) {
                            sampleRight += sample;
                        }
                    }
                    if (this.enableChannelB) {
                        sample = this.fifoBSample * this.FIFO_MAX * this.ratioChannelB;
                        if (this.enableLeftChannelB) {
                            sampleLeft += sample;
                        }
                        if (this.enableRightChannelB) {
                            sampleRight += sample;
                        }
                    }
                    const samplePointer = this.samplePointer;
                    sampleLeft *= this.masterVolume / this.SOUND_MAX;
                    sampleLeft = Math.max(Math.min(sampleLeft, 1), -1);
                    sampleRight *= this.masterVolume / this.SOUND_MAX;
                    sampleRight = Math.max(Math.min(sampleRight, 1), -1);
                    if (this.buffers) {
                        this.buffers[0][samplePointer] = sampleLeft;
                        this.buffers[1][samplePointer] = sampleRight;
                    }
                    this.samplePointer = (samplePointer + 1) & this.sampleMask;
                }
                audioProcess(audioProcessingEvent) {
                    const left = audioProcessingEvent.outputBuffer.getChannelData(0);
                    const right = audioProcessingEvent.outputBuffer.getChannelData(1);
                    if (this.masterEnable) {
                        var i;
                        var o = this.outputPointer;
                        for (i = 0; i < this.bufferSize; ++i, o += this.resampleRatio) {
                            if (o >= this.maxSamples) {
                                o -= this.maxSamples;
                            }
                            if ((o | 0) == this.samplePointer) {
                                ++this.backup;
                                break;
                            }
                            left[i] = this.buffers[0][o | 0];
                            right[i] = this.buffers[1][o | 0];
                        }
                        for (; i < this.bufferSize; ++i) {
                            left[i] = 0;
                            right[i] = 0;
                        }
                        this.outputPointer = o;
                        ++this.totalSamples;
                    }
                    else {
                        for (i = 0; i < this.bufferSize; ++i) {
                            left[i] = 0;
                            right[i] = 0;
                        }
                    }
                }
            };
            exports_8("default", GameBoyAdvanceAudio);
        }
    };
});
System.register("audio/mod", ["audio/GameBoyAdvanceAudio"], function (exports_9, context_9) {
    "use strict";
    var GameBoyAdvanceAudio_ts_1;
    var __moduleName = context_9 && context_9.id;
    function factoryAudio(ctx) {
        return new GameBoyAdvanceAudio_ts_1.default(ctx);
    }
    exports_9("factoryAudio", factoryAudio);
    return {
        setters: [
            function (GameBoyAdvanceAudio_ts_1_1) {
                GameBoyAdvanceAudio_ts_1 = GameBoyAdvanceAudio_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("video/GameBoyAdvanceSoftwareRenderer", ["interfaces", "video/utils"], function (exports_10, context_10) {
    "use strict";
    var interfaces_ts_3, utils_ts_3, DrawBackdrop, GameBoyAdvanceSoftwareRenderer;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (interfaces_ts_3_1) {
                interfaces_ts_3 = interfaces_ts_3_1;
            },
            function (utils_ts_3_1) {
                utils_ts_3 = utils_ts_3_1;
            }
        ],
        execute: function () {
            DrawBackdrop = class DrawBackdrop {
                constructor(video) {
                    this.bg = true;
                    this.priority = -1;
                    this.enabled = true;
                    this.video = video;
                    this.index = video.LAYER_BACKDROP;
                }
                drawScanline(backing, layer, start, end) {
                    // TODO: interactions with blend modes and OBJWIN
                    const video = this.video;
                    if (!video) {
                        throw new Error("video no init");
                    }
                    if (!video.palette) {
                        throw new Error("palette no init");
                    }
                    for (var x = start; x < end; ++x) {
                        if (!(backing.stencil[x] & video.WRITTEN_MASK)) {
                            backing.color[x] = video.palette.accessColor(this.index, 0);
                            backing.stencil[x] = video.WRITTEN_MASK;
                        }
                        else if (backing.stencil[x] & video.TARGET1_MASK) {
                            backing.color[x] = video.palette.mix(video.blendB, video.palette.accessColor(this.index, 0), video.blendA, backing.color[x]);
                            backing.stencil[x] = video.WRITTEN_MASK;
                        }
                    }
                }
            };
            GameBoyAdvanceSoftwareRenderer = class GameBoyAdvanceSoftwareRenderer {
                constructor() {
                    this.LAYER_BG0 = 0;
                    this.LAYER_BG1 = 1;
                    this.LAYER_BG2 = 2;
                    this.LAYER_BG3 = 3;
                    this.LAYER_OBJ = 4;
                    this.LAYER_BACKDROP = 5;
                    this.HDRAW_LENGTH = 1006;
                    this.HORIZONTAL_PIXELS = 240;
                    this.VERTICAL_PIXELS = 160;
                    this.LAYER_MASK = 0x06;
                    this.BACKGROUND_MASK = 0x01;
                    this.TARGET2_MASK = 0x08;
                    this.TARGET1_MASK = 0x10;
                    this.OBJWIN_MASK = 0x20;
                    this.WRITTEN_MASK = 0x80;
                    this.PRIORITY_MASK = this.LAYER_MASK | this.BACKGROUND_MASK;
                    this.scanline = null;
                    this.pixelData = null;
                    this.palette = null;
                    this.backgroundMode = 0;
                    this.displayFrameSelect = 0;
                    this.hblankIntervalFree = 0;
                    this.objCharacterMapping = false;
                    this.forcedBlank = 0;
                    this.win0 = 0;
                    this.win1 = 0;
                    this.objwin = 0;
                    this.windows = [];
                    this.target1 = [];
                    this.target2 = [];
                    this.objwinActive = false;
                    this.alphaEnabled = false;
                    this.objwinLayer = null;
                    this.mosaic = false;
                    this.video = null;
                    this.sharedMap = null;
                    this.sharedColor = [];
                    this.drawLayers = [];
                    this.bgModes = [];
                    // VCOUNT
                    this.vcount = 0;
                    // WIN0H
                    this.win0Left = 0;
                    this.win0Right = 0;
                    // WIN1H
                    this.win1Left = 0;
                    this.win1Right = 0;
                    // WIN0V
                    this.win0Top = 0;
                    this.win0Bottom = 0;
                    // WIN1V
                    this.win1Top = 0;
                    this.win1Bottom = 0;
                    this.blendMode = 0;
                    // BLDALPHA
                    this.blendA = 0;
                    this.blendB = 0;
                    // BLDY
                    this.blendY = 0;
                    // MOSAIC
                    this.bgMosaicX = 0;
                    this.bgMosaicY = 0;
                    this.objMosaicX = 0;
                    this.objMosaicY = 0;
                    this.lastHblank = 0;
                    this.nextHblank = 0;
                    this.nextEvent = 0;
                    this.nextHblankIRQ = 0;
                    this.nextVblankIRQ = 0;
                    this.nextVcounterIRQ = 0;
                    this.oam = null;
                    this.vram = null;
                    this.objLayers = [];
                    this.bg = [];
                    this.drawBackdrop = new DrawBackdrop(this);
                }
                clear(mmu) {
                    this.palette = utils_ts_3.factoryVideoPalette();
                    this.vram = utils_ts_3.factoryVideoRAM(interfaces_ts_3.MemorySize.SIZE_VRAM);
                    this.oam = utils_ts_3.factoryOAM(interfaces_ts_3.MemorySize.SIZE_OAM);
                    this.oam.video = this;
                    this.objLayers = [
                        utils_ts_3.factoryVideoObjectLayer(this, 0),
                        utils_ts_3.factoryVideoObjectLayer(this, 1),
                        utils_ts_3.factoryVideoObjectLayer(this, 2),
                        utils_ts_3.factoryVideoObjectLayer(this, 3)
                    ];
                    this.objwinLayer = utils_ts_3.factoryVideoObjectLayer(this, 4);
                    this.objwinLayer.objwin = this.OBJWIN_MASK;
                    // DISPCNT
                    this.backgroundMode = 0;
                    this.displayFrameSelect = 0;
                    this.hblankIntervalFree = 0;
                    this.objCharacterMapping = false;
                    this.forcedBlank = 1;
                    this.win0 = 0;
                    this.win1 = 0;
                    this.objwin = 0;
                    // VCOUNT
                    this.vcount = -1;
                    // WIN0H
                    this.win0Left = 0;
                    this.win0Right = 240;
                    // WIN1H
                    this.win1Left = 0;
                    this.win1Right = 240;
                    // WIN0V
                    this.win0Top = 0;
                    this.win0Bottom = 160;
                    // WIN1V
                    this.win1Top = 0;
                    this.win1Bottom = 160;
                    // WININ/WINOUT
                    this.windows = new Array();
                    for (var i = 0; i < 4; ++i) {
                        this.windows.push({
                            enabled: [false, false, false, false, false, true],
                            special: 0
                        });
                    }
                    ;
                    // BLDCNT
                    this.target1 = new Array(5);
                    this.target2 = new Array(5);
                    this.blendMode = 0;
                    // BLDALPHA
                    this.blendA = 0;
                    this.blendB = 0;
                    // BLDY
                    this.blendY = 0;
                    // MOSAIC
                    this.bgMosaicX = 1;
                    this.bgMosaicY = 1;
                    this.objMosaicX = 1;
                    this.objMosaicY = 1;
                    this.lastHblank = 0;
                    this.nextHblank = this.HDRAW_LENGTH;
                    this.nextEvent = this.nextHblank;
                    this.nextHblankIRQ = 0;
                    this.nextVblankIRQ = 0;
                    this.nextVcounterIRQ = 0;
                    this.bg = [];
                    for (let i = 0; i < 4; ++i) {
                        this.bg.push({
                            bg: true,
                            index: i,
                            enabled: false,
                            video: this,
                            vram: this.vram,
                            priority: 0,
                            charBase: 0,
                            mosaic: false,
                            multipalette: 0,
                            screenBase: 0,
                            overflow: 0,
                            size: 0,
                            x: 0,
                            y: 0,
                            refx: 0,
                            refy: 0,
                            dx: 1,
                            dmx: 0,
                            dy: 0,
                            dmy: 1,
                            sx: 0,
                            sy: 0,
                            pushPixel: GameBoyAdvanceSoftwareRenderer.pushPixel,
                            drawScanline: this.drawScanlineBGMode0
                        });
                    }
                    this.bgModes = [
                        this.drawScanlineBGMode0,
                        this.drawScanlineBGMode2,
                        this.drawScanlineBGMode2,
                        this.drawScanlineBGMode3,
                        this.drawScanlineBGMode4,
                        this.drawScanlineBGMode5
                    ];
                    this.drawLayers = [
                        this.bg[0],
                        this.bg[1],
                        this.bg[2],
                        this.bg[3],
                        this.objLayers[0],
                        this.objLayers[1],
                        this.objLayers[2],
                        this.objLayers[3],
                        this.objwinLayer,
                        this.drawBackdrop
                    ];
                    this.objwinActive = false;
                    this.alphaEnabled = false;
                    this.scanline = {
                        color: new Uint16Array(this.HORIZONTAL_PIXELS),
                        // Stencil format:
                        // Bits 0-1: Layer
                        // Bit 2: Is background
                        // Bit 3: Is Target 2
                        // Bit 4: Is Target 1
                        // Bit 5: Is OBJ Window
                        // Bit 6: Reserved
                        // Bit 7: Has been written
                        stencil: new Uint8Array(this.HORIZONTAL_PIXELS),
                        createImageData(a, b) {
                            return { data: {} };
                        }
                    };
                    this.sharedColor = [0, 0, 0];
                    this.sharedMap = {
                        tile: 0,
                        hflip: false,
                        vflip: false,
                        palette: 0
                    };
                }
                getPalette() {
                    if (!this.palette) {
                        throw new Error('palette no init');
                    }
                    return this.palette;
                }
                clearSubsets(mmu, regions) {
                    if (regions & 0x04) {
                        this.getPalette().overwrite(new Uint16Array(interfaces_ts_3.MemoryRegionSize.PALETTE_RAM >> 1));
                    }
                    if (regions & 0x08) {
                        this.getVideoRAM().insert(0, new Uint16Array(interfaces_ts_3.MemoryRegionSize.VRAM >> 1));
                    }
                    if (regions & 0x10) {
                        const oam = this.getOAM();
                        oam.overwrite(new Uint16Array(interfaces_ts_3.MemoryRegionSize.OAM >> 1));
                        oam.video = this;
                    }
                }
                getOAM() {
                    if (!this.oam) {
                        throw new Error("oam no init");
                    }
                    return this.oam;
                }
                freeze() {
                    return {};
                }
                defrost(frost) {
                }
                setBacking(backing) {
                    this.pixelData = backing;
                    // Clear backing first
                    for (var offset = 0; offset < this.HORIZONTAL_PIXELS * this.VERTICAL_PIXELS * 4;) {
                        this.pixelData.data[offset++] = 0xFF;
                        this.pixelData.data[offset++] = 0xFF;
                        this.pixelData.data[offset++] = 0xFF;
                        this.pixelData.data[offset++] = 0xFF;
                    }
                }
                writeDisplayControl(value) {
                    this.backgroundMode = value & 0x0007;
                    this.displayFrameSelect = value & 0x0010;
                    this.hblankIntervalFree = value & 0x0020;
                    this.objCharacterMapping = (value & 0x0040) > 0;
                    this.forcedBlank = value & 0x0080;
                    this.bg[0].enabled = (value & 0x0100) > 0;
                    this.bg[1].enabled = (value & 0x0200) > 0;
                    this.bg[2].enabled = (value & 0x0400) > 0;
                    this.bg[3].enabled = (value & 0x0800) > 0;
                    this.objLayers[0].enabled = (value & 0x1000) > 0;
                    this.objLayers[1].enabled = (value & 0x1000) > 0;
                    this.objLayers[2].enabled = (value & 0x1000) > 0;
                    this.objLayers[3].enabled = (value & 0x1000) > 0;
                    this.win0 = value & 0x2000;
                    this.win1 = value & 0x4000;
                    this.objwin = value & 0x8000;
                    if (!this.objwinLayer) {
                        throw new Error("objwinLayer no init");
                    }
                    this.objwinLayer.enabled = (value & 0x1000) > 0 && (value & 0x8000) > 0;
                    // Total hack so we can store both things that would set it to 256-color mode in the same variable
                    this.bg[2].multipalette &= ~0x0001;
                    this.bg[3].multipalette &= ~0x0001;
                    if (this.backgroundMode > 0) {
                        this.bg[2].multipalette |= 0x0001;
                    }
                    if (this.backgroundMode == 2) {
                        this.bg[3].multipalette |= 0x0001;
                    }
                    this.resetLayers();
                }
                writeBackgroundControl(bg, value) {
                    const bgData = this.bg[bg];
                    bgData.priority = value & 0x0003;
                    bgData.charBase = (value & 0x000C) << 12;
                    bgData.mosaic = (value & 0x0040) > 0;
                    bgData.multipalette &= ~0x0080;
                    if (bg < 2 || this.backgroundMode == 0) {
                        bgData.multipalette |= value & 0x0080;
                    }
                    bgData.screenBase = (value & 0x1F00) << 3;
                    bgData.overflow = value & 0x2000;
                    bgData.size = (value & 0xC000) >> 14;
                    this.drawLayers.sort(this.layerComparator);
                }
                /**
                 *
                 */
                writeBackgroundHOffset(bg, value) {
                    this.bg[bg].x = value & 0x1FF;
                }
                writeBackgroundVOffset(bg, value) {
                    this.bg[bg].y = value & 0x1FF;
                }
                writeBackgroundRefX(bg, value) {
                    this.bg[bg].refx = (value << 4) / 0x1000;
                    this.bg[bg].sx = this.bg[bg].refx;
                }
                writeBackgroundRefY(bg, value) {
                    this.bg[bg].refy = (value << 4) / 0x1000;
                    this.bg[bg].sy = this.bg[bg].refy;
                }
                writeBackgroundParamA(bg, value) {
                    this.bg[bg].dx = (value << 16) / 0x1000000;
                }
                writeBackgroundParamB(bg, value) {
                    this.bg[bg].dmx = (value << 16) / 0x1000000;
                }
                writeBackgroundParamC(bg, value) {
                    this.bg[bg].dy = (value << 16) / 0x1000000;
                }
                writeBackgroundParamD(bg, value) {
                    this.bg[bg].dmy = (value << 16) / 0x1000000;
                }
                writeWin0H(value) {
                    this.win0Left = (value & 0xFF00) >> 8;
                    this.win0Right = Math.min(this.HORIZONTAL_PIXELS, value & 0x00FF);
                    if (this.win0Left > this.win0Right) {
                        this.win0Right = this.HORIZONTAL_PIXELS;
                    }
                }
                writeWin1H(value) {
                    this.win1Left = (value & 0xFF00) >> 8;
                    this.win1Right = Math.min(this.HORIZONTAL_PIXELS, value & 0x00FF);
                    if (this.win1Left > this.win1Right) {
                        this.win1Right = this.HORIZONTAL_PIXELS;
                    }
                }
                writeWin0V(value) {
                    this.win0Top = (value & 0xFF00) >> 8;
                    this.win0Bottom = Math.min(this.VERTICAL_PIXELS, value & 0x00FF);
                    if (this.win0Top > this.win0Bottom) {
                        this.win0Bottom = this.VERTICAL_PIXELS;
                    }
                }
                writeWin1V(value) {
                    this.win1Top = (value & 0xFF00) >> 8;
                    this.win1Bottom = Math.min(this.VERTICAL_PIXELS, value & 0x00FF);
                    if (this.win1Top > this.win1Bottom) {
                        this.win1Bottom = this.VERTICAL_PIXELS;
                    }
                }
                writeWindow(index, value) {
                    const window = this.windows[index];
                    window.enabled[0] = (value & 0x01) > 0;
                    window.enabled[1] = (value & 0x02) > 0;
                    window.enabled[2] = (value & 0x04) > 0;
                    window.enabled[3] = (value & 0x08) > 0;
                    window.enabled[4] = (value & 0x10) > 0;
                    window.special = value & 0x20;
                }
                writeWinIn(value) {
                    this.writeWindow(0, value);
                    this.writeWindow(1, value >> 8);
                }
                writeWinOut(value) {
                    this.writeWindow(2, value);
                    this.writeWindow(3, value >> 8);
                }
                writeBlendControl(value) {
                    this.target2[5] = ((value & 0x2000) > 0 ? 1 : 0) * this.TARGET2_MASK;
                    this.target1[0] = ((value & 0x0001) > 0 ? 1 : 0) * this.TARGET1_MASK;
                    this.target1[1] = ((value & 0x0002) > 0 ? 1 : 0) * this.TARGET1_MASK;
                    this.target1[2] = ((value & 0x0004) > 0 ? 1 : 0) * this.TARGET1_MASK;
                    this.target1[3] = ((value & 0x0008) > 0 ? 1 : 0) * this.TARGET1_MASK;
                    this.target1[4] = ((value & 0x0010) > 0 ? 1 : 0) * this.TARGET1_MASK;
                    this.target1[5] = ((value & 0x0020) > 0 ? 1 : 0) * this.TARGET1_MASK;
                    this.target2[0] = ((value & 0x0100) > 0 ? 1 : 0) * this.TARGET2_MASK;
                    this.target2[1] = ((value & 0x0200) > 0 ? 1 : 0) * this.TARGET2_MASK;
                    this.target2[2] = ((value & 0x0400) > 0 ? 1 : 0) * this.TARGET2_MASK;
                    this.target2[3] = ((value & 0x0800) > 0 ? 1 : 0) * this.TARGET2_MASK;
                    this.target2[4] = ((value & 0x1000) > 0 ? 1 : 0) * this.TARGET2_MASK;
                    this.blendMode = (value & 0x00C0) >> 6;
                    const palette = this.getPalette();
                    switch (this.blendMode) {
                        case 1:
                        // Alpha
                        // Fall through
                        case 0:
                            // Normal
                            palette.makeNormalPalettes();
                            break;
                        case 2:
                            // Brighter
                            palette.makeBrightPalettes(value & 0x3F);
                            break;
                        case 3:
                            // Darker
                            palette.makeDarkPalettes(value & 0x3F);
                            break;
                    }
                }
                setBlendEnabled(layer, enabled, override) {
                    this.alphaEnabled = enabled && override == 1;
                    const palette = this.getPalette();
                    if (enabled) {
                        switch (override) {
                            case 1:
                            // Alpha
                            // Fall through
                            case 0:
                                // Normal
                                palette.makeNormalPalette(layer);
                                break;
                            case 2:
                            // Brighter
                            case 3:
                                // Darker
                                palette.makeSpecialPalette(layer);
                                break;
                        }
                    }
                    else {
                        palette.makeNormalPalette(layer);
                    }
                }
                writeBlendAlpha(value) {
                    this.blendA = (value & 0x001F) / 16;
                    if (this.blendA > 1) {
                        this.blendA = 1;
                    }
                    this.blendB = ((value & 0x1F00) >> 8) / 16;
                    if (this.blendB > 1) {
                        this.blendB = 1;
                    }
                }
                writeBlendY(value) {
                    this.blendY = value;
                    this.getPalette().setBlendY(value >= 16 ? 1 : (value / 16));
                }
                writeMosaic(value) {
                    this.bgMosaicX = (value & 0xF) + 1;
                    this.bgMosaicY = ((value >> 4) & 0xF) + 1;
                    this.objMosaicX = ((value >> 8) & 0xF) + 1;
                    this.objMosaicY = ((value >> 12) & 0xF) + 1;
                }
                resetLayers() {
                    if (this.backgroundMode > 1) {
                        this.bg[0].enabled = false;
                        this.bg[1].enabled = false;
                    }
                    if (this.bg[2].enabled) {
                        this.bg[2].drawScanline = this.bgModes[this.backgroundMode];
                    }
                    if ((this.backgroundMode == 0 || this.backgroundMode == 2)) {
                        if (this.bg[3].enabled) {
                            this.bg[3].drawScanline = this.bgModes[this.backgroundMode];
                        }
                    }
                    else {
                        this.bg[3].enabled = false;
                    }
                    this.drawLayers.sort(this.layerComparator);
                }
                layerComparator(a, b) {
                    const diff = b.priority - a.priority;
                    if (!diff) {
                        if (a.bg && !b.bg) {
                            return -1;
                        }
                        else if (!a.bg && b.bg) {
                            return 1;
                        }
                        return b.index - a.index;
                    }
                    return diff;
                }
                getVideoRAM() {
                    if (!this.vram) {
                        throw new Error("vram no init");
                    }
                    return this.vram;
                }
                accessMapMode0(base, size, x, yBase, out) {
                    let offset = base + ((x >> 2) & 0x3E) + yBase;
                    if (size & 1) {
                        offset += (x & 0x100) << 3;
                    }
                    const mem = this.getVideoRAM().loadU16(offset);
                    out.tile = mem & 0x03FF;
                    out.hflip = (mem & 0x0400) > 0;
                    out.vflip = (mem & 0x0800) > 0;
                    out.palette = (mem & 0xF000) >> 8; // This is shifted up 4 to make pushPixel faster
                }
                accessMapMode1(base, size, x, yBase, out) {
                    const offset = base + (x >> 3) + yBase;
                    out.tile = this.getVideoRAM().loadU8(offset);
                }
                accessTile(base, tile, y) {
                    var offset = base + (tile << 5);
                    offset |= y << 2;
                    return this.getVideoRAM().load32(offset);
                }
                static pushPixel(layer, map, video, row, x, offset, backing, mask, raw) {
                    let index = 0;
                    if (!raw) {
                        // @ts-ignore
                        if (this.multipalette > 0) {
                            index = (row >> (x << 3)) & 0xFF;
                        }
                        else {
                            index = (row >> (x << 2)) & 0xF;
                        }
                        // Index 0 is transparent
                        if (!index) {
                            return;
                            // @ts-ignore
                        }
                        else if (!this.multipalette) {
                            index |= map.palette;
                        }
                    }
                    var stencil = video.WRITTEN_MASK;
                    var oldStencil = backing.stencil[offset];
                    var blend = video.blendMode;
                    if (video.objwinActive) {
                        if (oldStencil & video.OBJWIN_MASK) {
                            if (video.windows[3].enabled[layer]) {
                                video.setBlendEnabled(layer, video.windows[3].special > 0 && video.target1[layer] > 0, blend);
                                if (video.windows[3].special && video.alphaEnabled) {
                                    mask |= video.target1[layer];
                                }
                                stencil |= video.OBJWIN_MASK;
                            }
                            else {
                                return;
                            }
                        }
                        else if (video.windows[2].enabled[layer]) {
                            video.setBlendEnabled(layer, video.windows[2].special > 0 && video.target1[layer] > 0, blend);
                            if (video.windows[2].special && video.alphaEnabled) {
                                mask |= video.target1[layer];
                            }
                        }
                        else {
                            return;
                        }
                    }
                    if ((mask & video.TARGET1_MASK) && (oldStencil & video.TARGET2_MASK)) {
                        video.setBlendEnabled(layer, true, 1);
                    }
                    if (!video.palette) {
                        throw new Error("palette no init");
                    }
                    var pixel = raw ? row : video.palette.accessColor(layer, index);
                    if (mask & video.TARGET1_MASK) {
                        video.setBlendEnabled(layer, !!blend, blend);
                    }
                    let highPriority = (mask & video.PRIORITY_MASK) < (oldStencil & video.PRIORITY_MASK);
                    // Backgrounds can draw over each other, too.
                    if ((mask & video.PRIORITY_MASK) == (oldStencil & video.PRIORITY_MASK)) {
                        highPriority = (mask & video.BACKGROUND_MASK) > 0;
                    }
                    if (!(oldStencil & video.WRITTEN_MASK)) {
                        // Nothing here yet, just continue
                        stencil |= mask;
                    }
                    else if (highPriority) {
                        // We are higher priority
                        if (mask & video.TARGET1_MASK && oldStencil & video.TARGET2_MASK) {
                            pixel = video.palette.mix(video.blendA, pixel, video.blendB, backing.color[offset]);
                        }
                        // We just drew over something, so it doesn't make sense for us to be a TARGET1 anymore...
                        stencil |= mask & ~video.TARGET1_MASK;
                    }
                    else if ((mask & video.PRIORITY_MASK) > (oldStencil & video.PRIORITY_MASK)) {
                        // We're below another layer, but might be the blend target for it
                        stencil = oldStencil & ~(video.TARGET1_MASK | video.TARGET2_MASK);
                        if (mask & video.TARGET2_MASK && oldStencil & video.TARGET1_MASK) {
                            pixel = video.palette.mix(video.blendB, pixel, video.blendA, backing.color[offset]);
                        }
                        else {
                            return;
                        }
                    }
                    else {
                        return;
                    }
                    if (mask & video.OBJWIN_MASK) {
                        // We ARE the object window, don't draw pixels!
                        backing.stencil[offset] |= video.OBJWIN_MASK;
                        return;
                    }
                    backing.color[offset] = pixel;
                    backing.stencil[offset] = stencil;
                }
                // identity(x) {
                //     return x;
                // }
                drawScanlineBlank(backing) {
                    for (var x = 0; x < this.HORIZONTAL_PIXELS; ++x) {
                        backing.color[x] = 0xFFFF;
                        backing.stencil[x] = 0;
                    }
                }
                prepareScanline(backing) {
                    for (var x = 0; x < this.HORIZONTAL_PIXELS; ++x) {
                        backing.stencil[x] = this.target2[this.LAYER_BACKDROP];
                    }
                }
                getVideoRender() {
                    if (!this.video) {
                        throw new Error("video no init");
                    }
                    return this.video;
                }
                drawScanlineBGMode0(backing, bg, start, end) {
                    const video = this.video;
                    if (!video) {
                        throw new Error("video no init");
                    }
                    const y = video.vcount;
                    let offset = start;
                    const xOff = bg.x;
                    const yOff = bg.y;
                    let localX;
                    let localY = y + yOff;
                    if (this.mosaic) {
                        localY -= y % video.bgMosaicY;
                    }
                    const localYLo = localY & 0x7;
                    let mosaicX;
                    const screenBase = bg.screenBase;
                    const charBase = bg.charBase;
                    const size = bg.size;
                    const index = bg.index;
                    const map = video.sharedMap;
                    if (!map) {
                        throw new Error("sharemap is null");
                    }
                    const paletteShift = bg.multipalette ? 1 : 0;
                    let mask = video.target2[index] | (bg.priority << 1) | video.BACKGROUND_MASK;
                    if (video.blendMode == 1 && video.alphaEnabled) {
                        mask |= video.target1[index];
                    }
                    let yBase = (localY << 3) & 0x7C0;
                    if (size == 2) {
                        yBase += (localY << 3) & 0x800;
                    }
                    else if (size == 3) {
                        yBase += (localY << 4) & 0x1000;
                    }
                    var xMask;
                    if (size & 1) {
                        xMask = 0x1FF;
                    }
                    else {
                        xMask = 0xFF;
                    }
                    video.accessMapMode0(screenBase, size, (start + xOff) & xMask, yBase, map);
                    let tileRow = video.accessTile(charBase, map.tile << paletteShift, (!map.vflip ? localYLo : 7 - localYLo) << paletteShift);
                    let localXLo;
                    for (let x = start; x < end; ++x) {
                        localX = (x + xOff) & xMask;
                        mosaicX = this.mosaic ? offset % video.bgMosaicX : 0;
                        localX -= mosaicX;
                        localXLo = localX & 0x7;
                        if (!paletteShift) {
                            if (!localXLo || (this.mosaic && !mosaicX)) {
                                video.accessMapMode0(screenBase, size, localX, yBase, map);
                                tileRow = video.accessTile(charBase, map.tile, !map.vflip ? localYLo : 7 - localYLo);
                                if (!tileRow && !localXLo) {
                                    x += 7;
                                    offset += 8;
                                    continue;
                                }
                            }
                        }
                        else {
                            if (!localXLo || (this.mosaic && !mosaicX)) {
                                video.accessMapMode0(screenBase, size, localX, yBase, map);
                            }
                            if (!(localXLo & 0x3) || (this.mosaic && !mosaicX)) {
                                tileRow = video.accessTile(charBase + (!!(localX & 0x4) == !map.hflip ? 4 : 0), map.tile << 1, (!map.vflip ? localYLo : 7 - localYLo) << 1);
                                if (!tileRow && !(localXLo & 0x3)) {
                                    x += 3;
                                    offset += 4;
                                    continue;
                                }
                            }
                        }
                        if (map.hflip) {
                            localXLo = 7 - localXLo;
                        }
                        bg.pushPixel(index, map, video, tileRow, localXLo, offset, backing, mask, 0);
                        offset++;
                    }
                }
                drawScanlineBGMode2(backing, bg, start, end) {
                    const video = this.video;
                    if (!video) {
                        throw new Error("video no init");
                    }
                    const index = bg.index;
                    const map = video.sharedMap;
                    if (!map) {
                        throw new Error("sharemap is null");
                    }
                    var color;
                    var mask = video.target2[index] | (bg.priority << 1) | video.BACKGROUND_MASK;
                    if (video.blendMode == 1 && video.alphaEnabled) {
                        mask |= video.target1[index];
                    }
                    let yBase;
                    const vram = this.vram;
                    if (!vram) {
                        throw new Error('vram no init');
                    }
                    const y = video.vcount;
                    let offset = start;
                    let localX;
                    let localY;
                    const screenBase = bg.screenBase;
                    const charBase = bg.charBase;
                    const size = bg.size;
                    const sizeAdjusted = 128 << size;
                    for (let x = start; x < end; ++x) {
                        localX = bg.dx * x + bg.sx;
                        localY = bg.dy * x + bg.sy;
                        if (this.mosaic) {
                            localX -= (x % video.bgMosaicX) * bg.dx + (y % video.bgMosaicY) * bg.dmx;
                            localY -= (x % video.bgMosaicX) * bg.dy + (y % video.bgMosaicY) * bg.dmy;
                        }
                        if (bg.overflow) {
                            localX &= sizeAdjusted - 1;
                            if (localX < 0) {
                                localX += sizeAdjusted;
                            }
                            localY &= sizeAdjusted - 1;
                            if (localY < 0) {
                                localY += sizeAdjusted;
                            }
                        }
                        else if (localX < 0 || localY < 0 || localX >= sizeAdjusted || localY >= sizeAdjusted) {
                            offset++;
                            continue;
                        }
                        yBase = ((localY << 1) & 0x7F0) << size;
                        video.accessMapMode1(screenBase, size, localX, yBase, map);
                        color = vram.loadU8(charBase + (map.tile << 6) + ((localY & 0x7) << 3) + (localX & 0x7));
                        bg.pushPixel(index, map, video, color, 0, offset, backing, mask, 0);
                        offset++;
                    }
                }
                drawScanlineBGMode3(backing, bg, start, end) {
                    const video = this.video;
                    if (!video) {
                        throw new Error("video no init");
                    }
                    const index = bg.index;
                    const map = video.sharedMap;
                    if (!map) {
                        throw new Error("sharemap is null");
                    }
                    let mask = video.target2[index] | (bg.priority << 1) | video.BACKGROUND_MASK;
                    if (video.blendMode == 1 && video.alphaEnabled) {
                        mask |= video.target1[index];
                    }
                    // var yBase;
                    const vram = this.vram;
                    if (!vram) {
                        throw new Error('vram no init');
                    }
                    let color;
                    const y = video.vcount;
                    let offset = start;
                    let localX;
                    let localY;
                    for (let x = start; x < end; ++x) {
                        localX = bg.dx * x + bg.sx;
                        localY = bg.dy * x + bg.sy;
                        if (this.mosaic) {
                            localX -= (x % video.bgMosaicX) * bg.dx + (y % video.bgMosaicY) * bg.dmx;
                            localY -= (x % video.bgMosaicX) * bg.dy + (y % video.bgMosaicY) * bg.dmy;
                        }
                        if (localX < 0 || localY < 0 || localX >= video.HORIZONTAL_PIXELS || localY >= video.VERTICAL_PIXELS) {
                            offset++;
                            continue;
                        }
                        color = vram.loadU16(((localY * video.HORIZONTAL_PIXELS) + localX) << 1);
                        bg.pushPixel(index, map, video, color, 0, offset, backing, mask, 1);
                        offset++;
                    }
                }
                drawScanlineBGMode4(backing, bg, start, end) {
                    const video = this.video;
                    if (!video) {
                        throw new Error("video no init");
                    }
                    let charBase = 0;
                    if (video.displayFrameSelect) {
                        charBase += 0xA000;
                    }
                    // var size = bg.size;
                    const index = bg.index;
                    const map = video.sharedMap;
                    if (!map) {
                        throw new Error("sharemap is null");
                    }
                    let mask = video.target2[index] | (bg.priority << 1) | video.BACKGROUND_MASK;
                    if (video.blendMode == 1 && video.alphaEnabled) {
                        mask |= video.target1[index];
                    }
                    const vram = this.vram;
                    if (!vram) {
                        throw new Error('vram no init');
                    }
                    let yBase;
                    let color;
                    let localX;
                    let localY;
                    const y = video.vcount;
                    let offset = start;
                    for (let x = start; x < end; ++x) {
                        localX = bg.dx * x + bg.sx;
                        localY = 0 | bg.dy * x + bg.sy;
                        if (this.mosaic) {
                            localX -= (x % video.bgMosaicX) * bg.dx + (y % video.bgMosaicY) * bg.dmx;
                            localY -= (x % video.bgMosaicX) * bg.dy + (y % video.bgMosaicY) * bg.dmy;
                        }
                        yBase = (localY << 2) & 0x7E0;
                        if (localX < 0 || localY < 0 || localX >= video.HORIZONTAL_PIXELS || localY >= video.VERTICAL_PIXELS) {
                            offset++;
                            continue;
                        }
                        color = vram.loadU8(charBase + (localY * video.HORIZONTAL_PIXELS) + localX);
                        bg.pushPixel(index, map, video, color, 0, offset, backing, mask, 0);
                        offset++;
                    }
                }
                drawScanlineBGMode5(backing, bg, start, end) {
                    const video = this.video;
                    if (!video) {
                        throw new Error("video no init");
                    }
                    let charBase = 0;
                    if (video.displayFrameSelect) {
                        charBase += 0xA000;
                    }
                    const index = bg.index;
                    const map = video.sharedMap;
                    if (!map) {
                        throw new Error("sharemap is null");
                    }
                    let mask = video.target2[index] | (bg.priority << 1) | video.BACKGROUND_MASK;
                    if (video.blendMode == 1 && video.alphaEnabled) {
                        mask |= video.target1[index];
                    }
                    const vram = this.vram;
                    if (!vram) {
                        throw new Error('vram no init');
                    }
                    const y = video.vcount;
                    let color;
                    let offset = start;
                    let localX;
                    let localY;
                    for (let x = start; x < end; ++x) {
                        localX = bg.dx * x + bg.sx;
                        localY = bg.dy * x + bg.sy;
                        if (this.mosaic) {
                            localX -= (x % video.bgMosaicX) * bg.dx + (y % video.bgMosaicY) * bg.dmx;
                            localY -= (x % video.bgMosaicX) * bg.dy + (y % video.bgMosaicY) * bg.dmy;
                        }
                        if (localX < 0 || localY < 0 || localX >= 160 || localY >= 128) {
                            offset++;
                            continue;
                        }
                        color = vram.loadU16(charBase + ((localY * 160) + localX) << 1);
                        bg.pushPixel(index, map, video, color, 0, offset, backing, mask, 1);
                        offset++;
                    }
                }
                drawScanline(y) {
                    const backing = this.scanline;
                    if (!backing) {
                        throw new Error("scanline no init");
                    }
                    if (this.forcedBlank) {
                        this.drawScanlineBlank(backing);
                        return;
                    }
                    this.prepareScanline(backing);
                    let layer;
                    var firstStart;
                    var firstEnd;
                    var lastStart;
                    var lastEnd;
                    this.vcount = y;
                    // Draw lower priority first and then draw over them
                    for (let i = 0; i < this.drawLayers.length; ++i) {
                        layer = this.drawLayers[i];
                        if (!layer.enabled) {
                            continue;
                        }
                        this.objwinActive = false;
                        if (!(this.win0 || this.win1 || this.objwin)) {
                            this.setBlendEnabled(layer.index, this.target1[layer.index] > 0, this.blendMode);
                            layer.drawScanline(backing, layer, 0, this.HORIZONTAL_PIXELS);
                        }
                        else {
                            firstStart = 0;
                            firstEnd = this.HORIZONTAL_PIXELS;
                            lastStart = 0;
                            lastEnd = this.HORIZONTAL_PIXELS;
                            if (this.win0 && y >= this.win0Top && y < this.win0Bottom) {
                                if (this.windows[0].enabled[layer.index]) {
                                    this.setBlendEnabled(layer.index, this.windows[0].special > 0 && this.target1[layer.index] > 0, this.blendMode);
                                    layer.drawScanline(backing, layer, this.win0Left, this.win0Right);
                                }
                                firstStart = Math.max(firstStart, this.win0Left);
                                firstEnd = Math.min(firstEnd, this.win0Left);
                                lastStart = Math.max(lastStart, this.win0Right);
                                lastEnd = Math.min(lastEnd, this.win0Right);
                            }
                            if (this.win1 && y >= this.win1Top && y < this.win1Bottom) {
                                if (this.windows[1].enabled[layer.index]) {
                                    this.setBlendEnabled(layer.index, this.windows[1].special > 0 && this.target1[layer.index] > 0, this.blendMode);
                                    if (!this.windows[0].enabled[layer.index] && (this.win1Left < firstStart || this.win1Right < lastStart)) {
                                        // We've been cut in two by window 0!
                                        layer.drawScanline(backing, layer, this.win1Left, firstStart);
                                        layer.drawScanline(backing, layer, lastEnd, this.win1Right);
                                    }
                                    else {
                                        layer.drawScanline(backing, layer, this.win1Left, this.win1Right);
                                    }
                                }
                                firstStart = Math.max(firstStart, this.win1Left);
                                firstEnd = Math.min(firstEnd, this.win1Left);
                                lastStart = Math.max(lastStart, this.win1Right);
                                lastEnd = Math.min(lastEnd, this.win1Right);
                            }
                            // Do last two
                            if (this.windows[2].enabled[layer.index] || (this.objwin && this.windows[3].enabled[layer.index])) {
                                // WINOUT/OBJWIN
                                this.objwinActive = this.objwin > 0;
                                this.setBlendEnabled(layer.index, this.windows[2].special > 0 && this.target1[layer.index] > 0, this.blendMode); // Window 3 handled in pushPixel
                                if (firstEnd > lastStart) {
                                    layer.drawScanline(backing, layer, 0, this.HORIZONTAL_PIXELS);
                                }
                                else {
                                    if (firstEnd) {
                                        layer.drawScanline(backing, layer, 0, firstEnd);
                                    }
                                    if (lastStart < this.HORIZONTAL_PIXELS) {
                                        layer.drawScanline(backing, layer, lastStart, this.HORIZONTAL_PIXELS);
                                    }
                                    if (lastEnd < firstStart) {
                                        layer.drawScanline(backing, layer, lastEnd, firstStart);
                                    }
                                }
                            }
                            this.setBlendEnabled(this.LAYER_BACKDROP, this.target1[this.LAYER_BACKDROP] > 0 && this.windows[2].special > 0, this.blendMode);
                        }
                        if (layer.bg) {
                            layer.sx += layer.dmx;
                            layer.sy += layer.dmy;
                        }
                    }
                    this.finishScanline(backing);
                }
                getVideoPalette() {
                    if (!this.palette) {
                        throw new Error("palette no init");
                    }
                    return this.palette;
                }
                finishScanline(backing) {
                    var color;
                    const palette = this.getVideoPalette();
                    var bd = palette.accessColor(this.LAYER_BACKDROP, 0);
                    var xx = this.vcount * this.HORIZONTAL_PIXELS * 4;
                    var isTarget2 = this.target2[this.LAYER_BACKDROP];
                    const pixelData = this.getPixelData();
                    for (var x = 0; x < this.HORIZONTAL_PIXELS; ++x) {
                        if (backing.stencil[x] & this.WRITTEN_MASK) {
                            color = backing.color[x];
                            if (isTarget2 && backing.stencil[x] & this.TARGET1_MASK) {
                                color = palette.mix(this.blendA, color, this.blendB, bd);
                            }
                            palette.convert16To32(color, this.sharedColor);
                        }
                        else {
                            palette.convert16To32(bd, this.sharedColor);
                        }
                        pixelData.data[xx++] = this.sharedColor[0];
                        pixelData.data[xx++] = this.sharedColor[1];
                        pixelData.data[xx++] = this.sharedColor[2];
                        xx++;
                    }
                }
                getPixelData() {
                    if (!this.pixelData) {
                        throw new Error("pixelData no init");
                    }
                    return this.pixelData;
                }
                startDraw() {
                    // Nothing to do
                }
                finishDraw(caller) {
                    this.bg[2].sx = this.bg[2].refx;
                    this.bg[2].sy = this.bg[2].refy;
                    this.bg[3].sx = this.bg[3].refx;
                    this.bg[3].sy = this.bg[3].refy;
                    if (!this.pixelData) {
                        throw new Error("pixel data is null");
                    }
                    caller.finishDraw(this.pixelData);
                }
            };
            exports_10("default", GameBoyAdvanceSoftwareRenderer);
        }
    };
});
System.register("video/GameBoyAdvanceOBJ", ["video/GameBoyAdvanceSoftwareRenderer"], function (exports_11, context_11) {
    "use strict";
    var GameBoyAdvanceSoftwareRenderer_ts_1, GameBoyAdvanceOBJ;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (GameBoyAdvanceSoftwareRenderer_ts_1_1) {
                GameBoyAdvanceSoftwareRenderer_ts_1 = GameBoyAdvanceSoftwareRenderer_ts_1_1;
            }
        ],
        execute: function () {
            GameBoyAdvanceOBJ = class GameBoyAdvanceOBJ {
                constructor(oam, index) {
                    this.TILE_OFFSET = 0x10000;
                    this.x = 0;
                    this.y = 0;
                    this.scalerot = 0;
                    this.doublesize = 0;
                    this.disable = true;
                    this.mode = 0;
                    this.mosaic = false;
                    this.multipalette = 0;
                    this.shape = 0;
                    this.scalerotParam = 0;
                    this.hflip = 0;
                    this.vflip = 0;
                    this.tileBase = 0;
                    this.priority = 0;
                    this.palette = 0;
                    this.cachedWidth = 8;
                    this.cachedHeight = 8;
                    this.scalerotOam = null;
                    this.size = 0;
                    this.oam = oam;
                    this.index = index;
                    this.drawScanline = this.drawScanlineNormal;
                    this.pushPixel = GameBoyAdvanceSoftwareRenderer_ts_1.default.pushPixel;
                }
                drawScanlineNormal(backing, y, yOff, start, end) {
                    const video = this.getVideo();
                    let x = 0;
                    var underflow;
                    var offset;
                    var mask = this.mode | video.target2[video.LAYER_OBJ] | (this.priority << 1);
                    if (this.mode == 0x10) {
                        mask |= video.TARGET1_MASK;
                    }
                    if (video.blendMode == 1 && video.alphaEnabled) {
                        mask |= video.target1[video.LAYER_OBJ];
                    }
                    let totalWidth = this.cachedWidth;
                    if (this.x < video.HORIZONTAL_PIXELS) {
                        if (this.x < start) {
                            underflow = start - this.x;
                            offset = start;
                        }
                        else {
                            underflow = 0;
                            offset = this.x;
                        }
                        if (end < this.cachedWidth + this.x) {
                            totalWidth = end - this.x;
                        }
                    }
                    else {
                        underflow = start + 512 - this.x;
                        offset = start;
                        if (end < this.cachedWidth - underflow) {
                            totalWidth = end;
                        }
                    }
                    var localX;
                    var localY;
                    if (!this.vflip) {
                        localY = y - yOff;
                    }
                    else {
                        localY = this.cachedHeight - y + yOff - 1;
                    }
                    var localYLo = localY & 0x7;
                    var mosaicX;
                    var tileOffset;
                    var paletteShift = this.multipalette ? 1 : 0;
                    if (video.objCharacterMapping) {
                        tileOffset = ((localY & 0x01F8) * this.cachedWidth) >> 6;
                    }
                    else {
                        tileOffset = (localY & 0x01F8) << (2 - paletteShift);
                    }
                    if (this.mosaic) {
                        mosaicX = video.objMosaicX - 1 - (video.objMosaicX + offset - 1) % video.objMosaicX;
                        offset += mosaicX;
                        underflow += mosaicX;
                    }
                    if (!this.hflip) {
                        localX = underflow;
                    }
                    else {
                        localX = this.cachedWidth - underflow - 1;
                    }
                    var tileRow = video.accessTile(this.TILE_OFFSET + (x & 0x4) * paletteShift, this.tileBase + (tileOffset << paletteShift) + ((localX & 0x01F8) >> (3 - paletteShift)), localYLo << paletteShift);
                    for (x = underflow; x < totalWidth; ++x) {
                        mosaicX = this.mosaic ? offset % video.objMosaicX : 0;
                        if (!this.hflip) {
                            localX = x - mosaicX;
                        }
                        else {
                            localX = this.cachedWidth - (x - mosaicX) - 1;
                        }
                        if (!paletteShift) {
                            if (!(x & 0x7) || (this.mosaic && !mosaicX)) {
                                tileRow = video.accessTile(this.TILE_OFFSET, this.tileBase + tileOffset + (localX >> 3), localYLo);
                            }
                        }
                        else {
                            if (!(x & 0x3) || (this.mosaic && !mosaicX)) {
                                tileRow = video.accessTile(this.TILE_OFFSET + (localX & 0x4), this.tileBase + (tileOffset << 1) + ((localX & 0x01F8) >> 2), localYLo << 1);
                            }
                        }
                        this.pushPixel(video.LAYER_OBJ, this, video, tileRow, localX & 0x7, offset, backing, mask, 0);
                        offset++;
                    }
                }
                getVideo() {
                    if (!this.oam.video) {
                        throw new Error("video no init");
                    }
                    return this.oam.video;
                }
                drawScanlineAffine(backing, y, yOff, start, end) {
                    const video = this.getVideo();
                    var x;
                    var underflow;
                    var offset;
                    var mask = this.mode | video.target2[video.LAYER_OBJ] | (this.priority << 1);
                    if (this.mode == 0x10) {
                        mask |= video.TARGET1_MASK;
                    }
                    if (video.blendMode == 1 && video.alphaEnabled) {
                        mask |= video.target1[video.LAYER_OBJ];
                    }
                    var localX;
                    var localY;
                    var yDiff = y - yOff;
                    var tileOffset;
                    var paletteShift = this.multipalette ? 1 : 0;
                    var totalWidth = this.cachedWidth << this.doublesize;
                    var totalHeight = this.cachedHeight << this.doublesize;
                    var drawWidth = totalWidth;
                    if (drawWidth > video.HORIZONTAL_PIXELS) {
                        totalWidth = video.HORIZONTAL_PIXELS;
                    }
                    if (this.x < video.HORIZONTAL_PIXELS) {
                        if (this.x < start) {
                            underflow = start - this.x;
                            offset = start;
                        }
                        else {
                            underflow = 0;
                            offset = this.x;
                        }
                        if (end < drawWidth + this.x) {
                            drawWidth = end - this.x;
                        }
                    }
                    else {
                        underflow = start + 512 - this.x;
                        offset = start;
                        if (end < drawWidth - underflow) {
                            drawWidth = end;
                        }
                    }
                    const scalerotOam = this.getScalerotOam();
                    let tileRow;
                    for (x = underflow; x < drawWidth; ++x) {
                        localX = scalerotOam.a * (x - (totalWidth >> 1)) + scalerotOam.b * (yDiff - (totalHeight >> 1)) + (this.cachedWidth >> 1);
                        localY = scalerotOam.c * (x - (totalWidth >> 1)) + scalerotOam.d * (yDiff - (totalHeight >> 1)) + (this.cachedHeight >> 1);
                        if (this.mosaic) {
                            localX -= (x % video.objMosaicX) * scalerotOam.a + (y % video.objMosaicY) * scalerotOam.b;
                            localY -= (x % video.objMosaicX) * scalerotOam.c + (y % video.objMosaicY) * scalerotOam.d;
                        }
                        if (localX < 0 || localX >= this.cachedWidth || localY < 0 || localY >= this.cachedHeight) {
                            offset++;
                            continue;
                        }
                        if (video.objCharacterMapping) {
                            tileOffset = ((localY & 0x01F8) * this.cachedWidth) >> 6;
                        }
                        else {
                            tileOffset = (localY & 0x01F8) << (2 - paletteShift);
                        }
                        tileRow = video.accessTile(this.TILE_OFFSET + (localX & 0x4) * paletteShift, this.tileBase + (tileOffset << paletteShift) + ((localX & 0x01F8) >> (3 - paletteShift)), (localY & 0x7) << paletteShift);
                        this.pushPixel(video.LAYER_OBJ, this, video, tileRow, localX & 0x7, offset, backing, mask, 0);
                        offset++;
                    }
                }
                getScalerotOam() {
                    if (!this.scalerotOam) {
                        throw new Error("scalerotOam no init");
                    }
                    return this.scalerotOam;
                }
                recalcSize() {
                    switch (this.shape) {
                        case 0:
                            // Square
                            this.cachedHeight = this.cachedWidth = 8 << this.size;
                            break;
                        case 1:
                            // Horizontal
                            switch (this.size) {
                                case 0:
                                    this.cachedHeight = 8;
                                    this.cachedWidth = 16;
                                    break;
                                case 1:
                                    this.cachedHeight = 8;
                                    this.cachedWidth = 32;
                                    break;
                                case 2:
                                    this.cachedHeight = 16;
                                    this.cachedWidth = 32;
                                    break;
                                case 3:
                                    this.cachedHeight = 32;
                                    this.cachedWidth = 64;
                                    break;
                            }
                            break;
                        case 2:
                            // Vertical
                            switch (this.size) {
                                case 0:
                                    this.cachedHeight = 16;
                                    this.cachedWidth = 8;
                                    break;
                                case 1:
                                    this.cachedHeight = 32;
                                    this.cachedWidth = 8;
                                    break;
                                case 2:
                                    this.cachedHeight = 32;
                                    this.cachedWidth = 16;
                                    break;
                                case 3:
                                    this.cachedHeight = 64;
                                    this.cachedWidth = 32;
                                    break;
                            }
                            break;
                        default:
                        // Bad!
                    }
                }
            };
            exports_11("default", GameBoyAdvanceOBJ);
        }
    };
});
System.register("video/GameBoyAdvancePalette", [], function (exports_12, context_12) {
    "use strict";
    var GameBoyAdvancePalette;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [],
        execute: function () {
            GameBoyAdvancePalette = class GameBoyAdvancePalette {
                constructor() {
                    this.buffer = new Uint16Array(0);
                    this.icache = [];
                    this.view = new DataView(new ArrayBuffer(0));
                    this.mask = 0;
                    this.blendY = 0;
                    this.colors = [new Array(0x100), new Array(0x100)];
                    this.adjustedColors = [new Array(0x100), new Array(0x100)];
                    this.passthroughColors = [
                        this.colors[0],
                        this.colors[0],
                        this.colors[0],
                        this.colors[0],
                        this.colors[1],
                        this.colors[0] // Backdrop
                    ];
                    this.blendY = 1;
                    this.adjustColor = this.adjustColorBright;
                }
                getMemoryView() {
                    return this;
                }
                replaceData(memory, offset) {
                    throw new Error("no imp");
                }
                load8(offset) {
                    throw new Error("no support");
                }
                store8(offset, value) {
                    throw new Error("no support");
                }
                /**
                 *
                 */
                overwrite(memory) {
                    for (var i = 0; i < 512; ++i) {
                        this.store16(i << 1, memory[i]);
                    }
                }
                /**
                 *
                 * @param offset
                 */
                loadU8(offset) {
                    return (this.loadU16(offset) >> (8 * (offset & 1))) & 0xFF;
                }
                /**
                 *
                 * @param offset
                 */
                loadU16(offset) {
                    return this.colors[(offset & 0x200) >> 9][(offset & 0x1FF) >> 1];
                }
                load16(offset) {
                    return (this.loadU16(offset) << 16) >> 16;
                }
                load32(offset) {
                    return this.loadU16(offset) | (this.loadU16(offset + 2) << 16);
                }
                store16(offset, value) {
                    var type = (offset & 0x200) >> 9;
                    var index = (offset & 0x1FF) >> 1;
                    this.colors[type][index] = value;
                    this.adjustedColors[type][index] = this.adjustColor(value);
                }
                store32(offset, value) {
                    this.store16(offset, value & 0xFFFF);
                    this.store16(offset + 2, value >> 16);
                }
                invalidatePage(address) { }
                convert16To32(value, input) {
                    const r = (value & 0x001F) << 3;
                    const g = (value & 0x03E0) >> 2;
                    const b = (value & 0x7C00) >> 7;
                    input[0] = r;
                    input[1] = g;
                    input[2] = b;
                }
                /**
                 *
                 * @param aWeight
                 * @param aColor
                 * @param bWeight
                 * @param bColor
                 */
                mix(aWeight, aColor, bWeight, bColor) {
                    const ar = (aColor & 0x001F);
                    const ag = (aColor & 0x03E0) >> 5;
                    const ab = (aColor & 0x7C00) >> 10;
                    const br = (bColor & 0x001F);
                    const bg = (bColor & 0x03E0) >> 5;
                    const bb = (bColor & 0x7C00) >> 10;
                    const r = Math.min(aWeight * ar + bWeight * br, 0x1F);
                    const g = Math.min(aWeight * ag + bWeight * bg, 0x1F);
                    const b = Math.min(aWeight * ab + bWeight * bb, 0x1F);
                    return r | (g << 5) | (b << 10);
                }
                makeDarkPalettes(layers) {
                    if (this.adjustColor != this.adjustColorDark) {
                        this.adjustColor = this.adjustColorDark;
                        this.resetPalettes();
                    }
                    this.resetPaletteLayers(layers);
                }
                makeBrightPalettes(layers) {
                    if (this.adjustColor != this.adjustColorBright) {
                        this.adjustColor = this.adjustColorBright;
                        this.resetPalettes();
                    }
                    this.resetPaletteLayers(layers);
                }
                makeNormalPalettes() {
                    this.passthroughColors[0] = this.colors[0];
                    this.passthroughColors[1] = this.colors[0];
                    this.passthroughColors[2] = this.colors[0];
                    this.passthroughColors[3] = this.colors[0];
                    this.passthroughColors[4] = this.colors[1];
                    this.passthroughColors[5] = this.colors[0];
                }
                makeSpecialPalette(layer) {
                    this.passthroughColors[layer] = this.adjustedColors[layer == 4 ? 1 : 0];
                }
                makeNormalPalette(layer) {
                    this.passthroughColors[layer] = this.colors[layer == 4 ? 1 : 0];
                }
                resetPaletteLayers(layers) {
                    if (layers & 0x01) {
                        this.passthroughColors[0] = this.adjustedColors[0];
                    }
                    else {
                        this.passthroughColors[0] = this.colors[0];
                    }
                    if (layers & 0x02) {
                        this.passthroughColors[1] = this.adjustedColors[0];
                    }
                    else {
                        this.passthroughColors[1] = this.colors[0];
                    }
                    if (layers & 0x04) {
                        this.passthroughColors[2] = this.adjustedColors[0];
                    }
                    else {
                        this.passthroughColors[2] = this.colors[0];
                    }
                    if (layers & 0x08) {
                        this.passthroughColors[3] = this.adjustedColors[0];
                    }
                    else {
                        this.passthroughColors[3] = this.colors[0];
                    }
                    if (layers & 0x10) {
                        this.passthroughColors[4] = this.adjustedColors[1];
                    }
                    else {
                        this.passthroughColors[4] = this.colors[1];
                    }
                    if (layers & 0x20) {
                        this.passthroughColors[5] = this.adjustedColors[0];
                    }
                    else {
                        this.passthroughColors[5] = this.colors[0];
                    }
                }
                resetPalettes() {
                    const outPalette = this.adjustedColors[0];
                    const inPalette = this.colors[0];
                    for (let i = 0; i < 256; ++i) {
                        outPalette[i] = this.adjustColor(inPalette[i]);
                    }
                    const outPalette1 = this.adjustedColors[1];
                    const inPalette1 = this.colors[1];
                    for (let i = 0; i < 256; ++i) {
                        outPalette1[i] = this.adjustColor(inPalette1[i]);
                    }
                }
                /**
                 *
                 * @param layer
                 * @param index
                 */
                accessColor(layer, index) {
                    return this.passthroughColors[layer][index];
                }
                /**
                 *
                 * @param color
                 */
                adjustColorDark(color) {
                    let r = (color & 0x001F);
                    let g = (color & 0x03E0) >> 5;
                    let b = (color & 0x7C00) >> 10;
                    r = r - (r * this.blendY);
                    g = g - (g * this.blendY);
                    b = b - (b * this.blendY);
                    return r | (g << 5) | (b << 10);
                }
                /**
                 *
                 * @param color
                 */
                adjustColorBright(color) {
                    let r = (color & 0x001F);
                    let g = (color & 0x03E0) >> 5;
                    let b = (color & 0x7C00) >> 10;
                    r = r + ((31 - r) * this.blendY);
                    g = g + ((31 - g) * this.blendY);
                    b = b + ((31 - b) * this.blendY);
                    return r | (g << 5) | (b << 10);
                }
                setBlendY(y) {
                    if (this.blendY != y) {
                        this.blendY = y;
                        this.resetPalettes();
                    }
                }
            };
            exports_12("default", GameBoyAdvancePalette);
        }
    };
});
System.register("video/MemoryAligned16", [], function (exports_13, context_13) {
    "use strict";
    var MemoryAligned16;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [],
        execute: function () {
            MemoryAligned16 = class MemoryAligned16 {
                constructor(size) {
                    this.icache = [];
                    this.mask = 0;
                    this.buffer = new Uint16Array(size >> 1);
                    this.view = new DataView(this.buffer.buffer);
                }
                replaceData(memory, offset) {
                    throw new Error("no imp");
                }
                load8(offset) {
                    return (this.loadU8(offset) << 24) >> 24;
                }
                load16(offset) {
                    return (this.loadU16(offset) << 16) >> 16;
                }
                loadU8(offset) {
                    const index = offset >> 1;
                    if (offset & 1) {
                        return (this.buffer[index] & 0xFF00) >>> 8;
                    }
                    else {
                        return this.buffer[index] & 0x00FF;
                    }
                }
                loadU16(offset) {
                    return this.buffer[offset >> 1];
                }
                load32(offset) {
                    return this.buffer[(offset >> 1) & ~1] | (this.buffer[(offset >> 1) | 1] << 16);
                }
                store8(offset, value) {
                    const index = offset >> 1;
                    this.store16(offset, (value << 8) | value);
                }
                store16(offset, value) {
                    this.buffer[offset >> 1] = value;
                }
                store32(offset, value) {
                    const index = offset >> 1;
                    this.store16(offset, this.buffer[index] = value & 0xFFFF);
                    this.store16(offset + 2, this.buffer[index + 1] = value >>> 16);
                }
                insert(start, data) {
                    this.buffer.set(data, start);
                }
                invalidatePage(address) { }
            };
            exports_13("default", MemoryAligned16);
        }
    };
});
System.register("video/GameBoyAdvanceVRAM", ["video/MemoryAligned16"], function (exports_14, context_14) {
    "use strict";
    var MemoryAligned16_ts_1, GameBoyAdvanceVRAM;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (MemoryAligned16_ts_1_1) {
                MemoryAligned16_ts_1 = MemoryAligned16_ts_1_1;
            }
        ],
        execute: function () {
            GameBoyAdvanceVRAM = class GameBoyAdvanceVRAM extends MemoryAligned16_ts_1.default {
                constructor(size) {
                    super(size);
                    this.vram = this.buffer;
                }
                getMemoryView() {
                    return this;
                }
            };
            exports_14("default", GameBoyAdvanceVRAM);
        }
    };
});
System.register("video/GameBoyAdvanceOAM", ["video/MemoryAligned16", "video/utils"], function (exports_15, context_15) {
    "use strict";
    var MemoryAligned16_ts_2, utils_ts_4, GameBoyAdvanceOAM;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (MemoryAligned16_ts_2_1) {
                MemoryAligned16_ts_2 = MemoryAligned16_ts_2_1;
            },
            function (utils_ts_4_1) {
                utils_ts_4 = utils_ts_4_1;
            }
        ],
        execute: function () {
            GameBoyAdvanceOAM = class GameBoyAdvanceOAM extends MemoryAligned16_ts_2.default {
                constructor(size) {
                    super(size);
                    this.video = null;
                    this.oam = this.buffer;
                    this.objs = new Array(128);
                    for (let i = 0; i < 128; ++i) {
                        this.objs[i] = utils_ts_4.factoryVideoObject(this, i);
                    }
                    this.scalerot = new Array(32);
                    for (var i = 0; i < 32; ++i) {
                        this.scalerot[i] = {
                            a: 1,
                            b: 0,
                            c: 0,
                            d: 1
                        };
                    }
                }
                getMemoryView() {
                    return this;
                }
                /**
                 *
                 * @param memory
                 */
                overwrite(memory) {
                    for (var i = 0; i < (this.buffer.byteLength >> 1); ++i) {
                        this.store16(i << 1, memory[i]);
                    }
                }
                store16(offset, value) {
                    var index = (offset & 0x3F8) >> 3;
                    var obj = this.objs[index];
                    var scalerot = this.scalerot[index >> 2];
                    var layer = obj.priority;
                    var disable = obj.disable;
                    var y = obj.y;
                    switch (offset & 0x00000006) {
                        case 0:
                            // Attribute 0
                            obj.y = value & 0x00FF;
                            var wasScalerot = obj.scalerot;
                            obj.scalerot = value & 0x0100;
                            if (obj.scalerot) {
                                obj.scalerotOam = this.scalerot[obj.scalerotParam];
                                obj.doublesize = !!(value & 0x0200) ? 1 : 0;
                                obj.disable = false;
                                obj.hflip = 0;
                                obj.vflip = 0;
                            }
                            else {
                                obj.doublesize = 0;
                                obj.disable = (value & 0x0200) > 0;
                                if (wasScalerot) {
                                    obj.hflip = obj.scalerotParam & 0x0008;
                                    obj.vflip = obj.scalerotParam & 0x0010;
                                }
                            }
                            obj.mode = (value & 0x0C00) >> 6; // This lines up with the stencil format
                            obj.mosaic = (value & 0x1000) > 0;
                            obj.multipalette = value & 0x2000;
                            obj.shape = (value & 0xC000) >> 14;
                            obj.recalcSize();
                            break;
                        case 2:
                            // Attribute 1
                            obj.x = value & 0x01FF;
                            if (obj.scalerot) {
                                obj.scalerotParam = (value & 0x3E00) >> 9;
                                obj.scalerotOam = this.scalerot[obj.scalerotParam];
                                obj.hflip = 0;
                                obj.vflip = 0;
                                obj.drawScanline = obj.drawScanlineAffine;
                            }
                            else {
                                obj.hflip = value & 0x1000;
                                obj.vflip = value & 0x2000;
                                obj.drawScanline = obj.drawScanlineNormal;
                            }
                            obj.size = (value & 0xC000) >> 14;
                            obj.recalcSize();
                            break;
                        case 4:
                            // Attribute 2
                            obj.tileBase = value & 0x03FF;
                            obj.priority = (value & 0x0C00) >> 10;
                            obj.palette = (value & 0xF000) >> 8; // This is shifted up 4 to make pushPixel faster
                            break;
                        case 6:
                            // Scaling/rotation parameter
                            switch (index & 0x3) {
                                case 0:
                                    scalerot.a = (value << 16) / 0x1000000;
                                    break;
                                case 1:
                                    scalerot.b = (value << 16) / 0x1000000;
                                    break;
                                case 2:
                                    scalerot.c = (value << 16) / 0x1000000;
                                    break;
                                case 3:
                                    scalerot.d = (value << 16) / 0x1000000;
                                    break;
                            }
                            break;
                    }
                    super.store16(offset, value);
                }
            };
            exports_15("default", GameBoyAdvanceOAM);
        }
    };
});
System.register("video/GameBoyAdvanceOBJLayer", [], function (exports_16, context_16) {
    "use strict";
    var GameBoyAdvanceOBJLayer;
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [],
        execute: function () {
            GameBoyAdvanceOBJLayer = class GameBoyAdvanceOBJLayer {
                constructor(video, index) {
                    this.video = video;
                    this.bg = false;
                    this.index = video.LAYER_OBJ;
                    this.priority = index;
                    this.enabled = false;
                    this.objwin = 0;
                }
                getOAM() {
                    if (!this.video.oam) {
                        throw new Error('oam no init');
                    }
                    return this.video.oam;
                }
                /**
                 *
                 * @param backing
                 * @param layer
                 * @param start
                 * @param end
                 */
                drawScanline(backing, layer, start, end) {
                    if (start >= end) {
                        return;
                    }
                    const y = this.video.vcount;
                    const objs = this.getOAM().objs;
                    for (var i = 0; i < objs.length; ++i) {
                        const obj = objs[i];
                        if (obj.disable) {
                            continue;
                        }
                        if ((obj.mode & this.video.OBJWIN_MASK) != this.objwin) {
                            continue;
                        }
                        if (!(obj.mode & this.video.OBJWIN_MASK) && this.priority != obj.priority) {
                            continue;
                        }
                        let wrappedY;
                        if (obj.y < this.video.VERTICAL_PIXELS) {
                            wrappedY = obj.y;
                        }
                        else {
                            wrappedY = obj.y - 256;
                        }
                        let totalHeight;
                        if (!obj.scalerot) {
                            totalHeight = obj.cachedHeight;
                        }
                        else {
                            totalHeight = obj.cachedHeight << obj.doublesize;
                        }
                        let mosaicY;
                        if (!obj.mosaic) {
                            mosaicY = y;
                        }
                        else {
                            mosaicY = y - y % this.video.objMosaicY;
                        }
                        if (wrappedY <= y && (wrappedY + totalHeight) > y) {
                            obj.drawScanline(backing, mosaicY, wrappedY, start, end);
                        }
                    }
                }
                objComparator(a, b) {
                    return a.index - b.index;
                }
            };
            exports_16("default", GameBoyAdvanceOBJLayer);
        }
    };
});
System.register("video/utils", ["video/GameBoyAdvanceOBJ", "video/GameBoyAdvanceSoftwareRenderer", "video/GameBoyAdvancePalette", "video/GameBoyAdvanceVRAM", "video/GameBoyAdvanceOAM", "video/GameBoyAdvanceOBJLayer"], function (exports_17, context_17) {
    "use strict";
    var GameBoyAdvanceOBJ_ts_1, GameBoyAdvanceSoftwareRenderer_ts_2, GameBoyAdvancePalette_ts_1, GameBoyAdvanceVRAM_ts_1, GameBoyAdvanceOAM_ts_1, GameBoyAdvanceOBJLayer_ts_1;
    var __moduleName = context_17 && context_17.id;
    function factoryVideoRenderer() {
        return new GameBoyAdvanceSoftwareRenderer_ts_2.default();
    }
    exports_17("factoryVideoRenderer", factoryVideoRenderer);
    function factoryVideoObject(oam, index) {
        return new GameBoyAdvanceOBJ_ts_1.default(oam, index);
    }
    exports_17("factoryVideoObject", factoryVideoObject);
    function factoryOAM(size) {
        return new GameBoyAdvanceOAM_ts_1.default(size);
    }
    exports_17("factoryOAM", factoryOAM);
    function factoryVideoRAM(size) {
        return new GameBoyAdvanceVRAM_ts_1.default(size);
    }
    exports_17("factoryVideoRAM", factoryVideoRAM);
    function factoryVideoPalette() {
        return new GameBoyAdvancePalette_ts_1.default();
    }
    exports_17("factoryVideoPalette", factoryVideoPalette);
    function factoryVideoObjectLayer(renderPath, index) {
        return new GameBoyAdvanceOBJLayer_ts_1.default(renderPath, index);
    }
    exports_17("factoryVideoObjectLayer", factoryVideoObjectLayer);
    return {
        setters: [
            function (GameBoyAdvanceOBJ_ts_1_1) {
                GameBoyAdvanceOBJ_ts_1 = GameBoyAdvanceOBJ_ts_1_1;
            },
            function (GameBoyAdvanceSoftwareRenderer_ts_2_1) {
                GameBoyAdvanceSoftwareRenderer_ts_2 = GameBoyAdvanceSoftwareRenderer_ts_2_1;
            },
            function (GameBoyAdvancePalette_ts_1_1) {
                GameBoyAdvancePalette_ts_1 = GameBoyAdvancePalette_ts_1_1;
            },
            function (GameBoyAdvanceVRAM_ts_1_1) {
                GameBoyAdvanceVRAM_ts_1 = GameBoyAdvanceVRAM_ts_1_1;
            },
            function (GameBoyAdvanceOAM_ts_1_1) {
                GameBoyAdvanceOAM_ts_1 = GameBoyAdvanceOAM_ts_1_1;
            },
            function (GameBoyAdvanceOBJLayer_ts_1_1) {
                GameBoyAdvanceOBJLayer_ts_1 = GameBoyAdvanceOBJLayer_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("video/GameBoyAdvanceVideo", ["video/utils"], function (exports_18, context_18) {
    "use strict";
    var utils_ts_5, GameBoyAdvanceVideo;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [
            function (utils_ts_5_1) {
                utils_ts_5 = utils_ts_5_1;
            }
        ],
        execute: function () {
            GameBoyAdvanceVideo = class GameBoyAdvanceVideo {
                constructor(ctx) {
                    this.CYCLES_PER_PIXEL = 4;
                    this.HORIZONTAL_PIXELS = 240;
                    this.HBLANK_PIXELS = 68;
                    this.HDRAW_LENGTH = 1006;
                    this.HBLANK_LENGTH = 226;
                    this.HORIZONTAL_LENGTH = 1232;
                    this.VERTICAL_PIXELS = 160;
                    this.VBLANK_PIXELS = 68;
                    this.VERTICAL_TOTAL_PIXELS = 228;
                    this.TOTAL_LENGTH = 280896;
                    this.DISPSTAT_MASK = 0;
                    this.inHblank = false;
                    this.inVblank = false;
                    this.vcounter = 0;
                    this.vblankIRQ = 0;
                    this.hblankIRQ = 0;
                    this.vcounterIRQ = 0;
                    this.vcountSetting = 0;
                    this.context = null;
                    this.vcount = 0;
                    this.lastHblank = 0;
                    this.nextHblank = 0;
                    this.nextEvent = 0;
                    this.nextHblankIRQ = 0;
                    this.nextVblankIRQ = 0;
                    this.nextVcounterIRQ = 0;
                    this.core = ctx;
                    this.renderPath = utils_ts_5.factoryVideoRenderer();
                    this.drawCallback = function () { };
                    this.vblankCallback = function () { };
                }
                getMMU() {
                    return this.core.getMMU();
                }
                clear() {
                    this.getRenderPath().clear(this.getMMU());
                    // DISPSTAT
                    this.DISPSTAT_MASK = 0xFF38;
                    this.inHblank = false;
                    this.inVblank = false;
                    this.vcounter = 0;
                    this.vblankIRQ = 0;
                    this.hblankIRQ = 0;
                    this.vcounterIRQ = 0;
                    this.vcountSetting = 0;
                    // VCOUNT
                    this.vcount = -1;
                    this.lastHblank = 0;
                    this.nextHblank = this.HDRAW_LENGTH;
                    this.nextEvent = this.nextHblank;
                    this.nextHblankIRQ = 0;
                    this.nextVblankIRQ = 0;
                    this.nextVcounterIRQ = 0;
                }
                freeze() {
                    return {
                        'inHblank': this.inHblank,
                        'inVblank': this.inVblank,
                        'vcounter': this.vcounter,
                        'vblankIRQ': this.vblankIRQ,
                        'hblankIRQ': this.hblankIRQ,
                        'vcounterIRQ': this.vcounterIRQ,
                        'vcountSetting': this.vcountSetting,
                        'vcount': this.vcount,
                        'lastHblank': this.lastHblank,
                        'nextHblank': this.nextHblank,
                        'nextEvent': this.nextEvent,
                        'nextHblankIRQ': this.nextHblankIRQ,
                        'nextVblankIRQ': this.nextVblankIRQ,
                        'nextVcounterIRQ': this.nextVcounterIRQ,
                        'renderPath': this.getClose().freeze()
                    };
                }
                defrost(frost) {
                    this.inHblank = frost.inHblank;
                    this.inVblank = frost.inVblank;
                    this.vcounter = frost.vcounter;
                    this.vblankIRQ = frost.vblankIRQ;
                    this.hblankIRQ = frost.hblankIRQ;
                    this.vcounterIRQ = frost.vcounterIRQ;
                    this.vcountSetting = frost.vcountSetting;
                    this.vcount = frost.vcount;
                    this.lastHblank = frost.lastHblank;
                    this.nextHblank = frost.nextHblank;
                    this.nextEvent = frost.nextEvent;
                    this.nextHblankIRQ = frost.nextHblankIRQ;
                    this.nextVblankIRQ = frost.nextVblankIRQ;
                    this.nextVcounterIRQ = frost.nextVcounterIRQ;
                    this.getClose().defrost(frost.renderPath);
                }
                getClose() {
                    return this.renderPath;
                }
                setBacking(backing) {
                    const pixelData = backing.createImageData(this.HORIZONTAL_PIXELS, this.VERTICAL_PIXELS);
                    this.context = backing;
                    // Clear backing first
                    for (var offset = 0; offset < this.HORIZONTAL_PIXELS * this.VERTICAL_PIXELS * 4;) {
                        pixelData.data[offset++] = 0xFF;
                        pixelData.data[offset++] = 0xFF;
                        pixelData.data[offset++] = 0xFF;
                        pixelData.data[offset++] = 0xFF;
                    }
                    this.getRenderPath().setBacking(pixelData);
                }
                getIRQ() {
                    return this.core.getIRQ();
                }
                getRenderPath() {
                    return this.renderPath;
                }
                updateTimers(cpu) {
                    const cycles = cpu.cycles;
                    if (this.nextEvent <= cycles) {
                        const irq = this.getIRQ();
                        const renderPath = this.getRenderPath();
                        if (this.inHblank) {
                            // End Hblank
                            this.inHblank = false;
                            this.nextEvent = this.nextHblank;
                            ++this.vcount;
                            switch (this.vcount) {
                                case this.VERTICAL_PIXELS:
                                    this.inVblank = true;
                                    renderPath.finishDraw(this);
                                    this.nextVblankIRQ = this.nextEvent + this.TOTAL_LENGTH;
                                    this.getMMU().runVblankDmas();
                                    if (this.vblankIRQ) {
                                        irq.raiseIRQ(irq.IRQ_VBLANK);
                                    }
                                    this.vblankCallback();
                                    break;
                                case this.VERTICAL_TOTAL_PIXELS - 1:
                                    this.inVblank = false;
                                    break;
                                case this.VERTICAL_TOTAL_PIXELS:
                                    this.vcount = 0;
                                    renderPath.startDraw();
                                    break;
                            }
                            this.vcounter = (this.vcount == this.vcountSetting) ? 1 : 0;
                            if (this.vcounter && this.vcounterIRQ) {
                                irq.raiseIRQ(irq.IRQ_VCOUNTER);
                                this.nextVcounterIRQ += this.TOTAL_LENGTH;
                            }
                            if (this.vcount < this.VERTICAL_PIXELS) {
                                renderPath.drawScanline(this.vcount);
                            }
                        }
                        else {
                            // Begin Hblank
                            this.inHblank = true;
                            this.lastHblank = this.nextHblank;
                            this.nextEvent = this.lastHblank + this.HBLANK_LENGTH;
                            this.nextHblank = this.nextEvent + this.HDRAW_LENGTH;
                            this.nextHblankIRQ = this.nextHblank;
                            if (this.vcount < this.VERTICAL_PIXELS) {
                                this.getMMU().runHblankDmas();
                            }
                            if (this.hblankIRQ) {
                                irq.raiseIRQ(irq.IRQ_HBLANK);
                            }
                        }
                    }
                }
                writeDisplayStat(value) {
                    this.vblankIRQ = value & 0x0008;
                    this.hblankIRQ = value & 0x0010;
                    this.vcounterIRQ = value & 0x0020;
                    this.vcountSetting = (value & 0xFF00) >> 8;
                    if (this.vcounterIRQ) {
                        // FIXME: this can be too late if we're in the middle of an Hblank
                        this.nextVcounterIRQ = this.nextHblank + this.HBLANK_LENGTH + (this.vcountSetting - this.vcount) * this.HORIZONTAL_LENGTH;
                        if (this.nextVcounterIRQ < this.nextEvent) {
                            this.nextVcounterIRQ += this.TOTAL_LENGTH;
                        }
                    }
                }
                readDisplayStat() {
                    return (this.inVblank ? 1 : 0) | ((this.inHblank ? 1 : 0) << 1) | (this.vcounter << 2);
                }
                finishDraw(pixelData) {
                    this.getVideoCanvas().putImageData(pixelData, 0, 0);
                    this.drawCallback();
                }
                getVideoCanvas() {
                    if (!this.context) {
                        throw new Error("video canvas no init");
                    }
                    return this.context;
                }
            };
            exports_18("default", GameBoyAdvanceVideo);
        }
    };
});
System.register("video/mod", ["video/GameBoyAdvanceVideo"], function (exports_19, context_19) {
    "use strict";
    var GameBoyAdvanceVideo_ts_1;
    var __moduleName = context_19 && context_19.id;
    function factoryVideo(ctx) {
        return new GameBoyAdvanceVideo_ts_1.default(ctx);
    }
    exports_19("factoryVideo", factoryVideo);
    return {
        setters: [
            function (GameBoyAdvanceVideo_ts_1_1) {
                GameBoyAdvanceVideo_ts_1 = GameBoyAdvanceVideo_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("keypad/GameBoyAdvanceKeypad", [], function (exports_20, context_20) {
    "use strict";
    var GameBoyAdvanceKeypad;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [],
        execute: function () {
            GameBoyAdvanceKeypad = class GameBoyAdvanceKeypad {
                constructor() {
                    this.KEYCODE_LEFT = 37;
                    this.KEYCODE_UP = 38;
                    this.KEYCODE_RIGHT = 39;
                    this.KEYCODE_DOWN = 40;
                    this.KEYCODE_START = 13;
                    this.KEYCODE_SELECT = 220;
                    this.KEYCODE_A = 90;
                    this.KEYCODE_B = 88;
                    this.KEYCODE_L = 65;
                    this.KEYCODE_R = 83;
                    this.GAMEPAD_LEFT = 14;
                    this.GAMEPAD_UP = 12;
                    this.GAMEPAD_RIGHT = 15;
                    this.GAMEPAD_DOWN = 13;
                    this.GAMEPAD_START = 9;
                    this.GAMEPAD_SELECT = 8;
                    this.GAMEPAD_A = 1;
                    this.GAMEPAD_B = 0;
                    this.GAMEPAD_L = 4;
                    this.GAMEPAD_R = 5;
                    this.GAMEPAD_THRESHOLD = 0.2;
                    this.A = 0;
                    this.B = 1;
                    this.SELECT = 2;
                    this.START = 3;
                    this.RIGHT = 4;
                    this.LEFT = 5;
                    this.UP = 6;
                    this.DOWN = 7;
                    this.R = 8;
                    this.L = 9;
                    this.currentDown = 0x03FF;
                    this.eatInput = false;
                    this.gamepads = [];
                }
                keyboardHandler(e) {
                    let toggle = 0;
                    switch (e.keyCode) {
                        case this.KEYCODE_START:
                            toggle = this.START;
                            break;
                        case this.KEYCODE_SELECT:
                            toggle = this.SELECT;
                            break;
                        case this.KEYCODE_A:
                            toggle = this.A;
                            break;
                        case this.KEYCODE_B:
                            toggle = this.B;
                            break;
                        case this.KEYCODE_L:
                            toggle = this.L;
                            break;
                        case this.KEYCODE_R:
                            toggle = this.R;
                            break;
                        case this.KEYCODE_UP:
                            toggle = this.UP;
                            break;
                        case this.KEYCODE_RIGHT:
                            toggle = this.RIGHT;
                            break;
                        case this.KEYCODE_DOWN:
                            toggle = this.DOWN;
                            break;
                        case this.KEYCODE_LEFT:
                            toggle = this.LEFT;
                            break;
                        default:
                            return;
                    }
                    toggle = 1 << toggle;
                    if (e.type == "keydown") {
                        this.currentDown &= ~toggle;
                    }
                    else {
                        this.currentDown |= toggle;
                    }
                    if (this.eatInput) {
                        e.preventDefault();
                    }
                }
                gamepadHandler(gamepad) {
                    let value = 0;
                    if (gamepad.buttons[this.GAMEPAD_LEFT] > this.GAMEPAD_THRESHOLD) {
                        value |= 1 << this.LEFT;
                    }
                    if (gamepad.buttons[this.GAMEPAD_UP] > this.GAMEPAD_THRESHOLD) {
                        value |= 1 << this.UP;
                    }
                    if (gamepad.buttons[this.GAMEPAD_RIGHT] > this.GAMEPAD_THRESHOLD) {
                        value |= 1 << this.RIGHT;
                    }
                    if (gamepad.buttons[this.GAMEPAD_DOWN] > this.GAMEPAD_THRESHOLD) {
                        value |= 1 << this.DOWN;
                    }
                    if (gamepad.buttons[this.GAMEPAD_START] > this.GAMEPAD_THRESHOLD) {
                        value |= 1 << this.START;
                    }
                    if (gamepad.buttons[this.GAMEPAD_SELECT] > this.GAMEPAD_THRESHOLD) {
                        value |= 1 << this.SELECT;
                    }
                    if (gamepad.buttons[this.GAMEPAD_A] > this.GAMEPAD_THRESHOLD) {
                        value |= 1 << this.A;
                    }
                    if (gamepad.buttons[this.GAMEPAD_B] > this.GAMEPAD_THRESHOLD) {
                        value |= 1 << this.B;
                    }
                    if (gamepad.buttons[this.GAMEPAD_L] > this.GAMEPAD_THRESHOLD) {
                        value |= 1 << this.L;
                    }
                    if (gamepad.buttons[this.GAMEPAD_R] > this.GAMEPAD_THRESHOLD) {
                        value |= 1 << this.R;
                    }
                    this.currentDown = ~value & 0x3FF;
                }
                /**
                 *
                 * @param gamepad
                 */
                gamepadConnectHandler(gamepad) {
                    this.gamepads.push(gamepad);
                }
                /**
                 *
                 * @param gamepad
                 */
                gamepadDisconnectHandler(gamepad) {
                    this.gamepads = this.gamepads.filter((other) => other != gamepad);
                }
                /**
                 *
                 */
                pollGamepads() {
                    let navigatorList = [];
                    // @ts-ignore
                    if (navigator.webkitGetGamepads) {
                        // @ts-ignore
                        navigatorList = navigator.webkitGetGamepads();
                        // @ts-ignore
                    }
                    else if (navigator.getGamepads) {
                        // @ts-ignore
                        navigatorList = navigator.getGamepads();
                    }
                    // Let's all give a shout out to Chrome for making us get the gamepads EVERY FRAME
                    if (navigatorList.length) {
                        this.gamepads = [];
                    }
                    for (var i = 0; i < navigatorList.length; ++i) {
                        if (navigatorList[i]) {
                            this.gamepads.push(navigatorList[i]);
                        }
                    }
                    if (this.gamepads.length > 0) {
                        this.gamepadHandler(this.gamepads[0]);
                    }
                }
                /**
                 *
                 */
                registerHandlers() {
                    // @ts-ignore
                    window.addEventListener("keydown", this.keyboardHandler.bind(this), true);
                    // @ts-ignore
                    window.addEventListener("keyup", this.keyboardHandler.bind(this), true);
                    // @ts-ignore
                    window.addEventListener("gamepadconnected", this.gamepadConnectHandler.bind(this), true);
                    // @ts-ignore
                    window.addEventListener("mozgamepadconnected", this.gamepadConnectHandler.bind(this), true);
                    // @ts-ignore
                    window.addEventListener("webkitgamepadconnected", this.gamepadConnectHandler.bind(this), true);
                    // @ts-ignore
                    window.addEventListener("gamepaddisconnected", this.gamepadDisconnectHandler.bind(this), true);
                    // @ts-ignore
                    window.addEventListener("mozgamepaddisconnected", this.gamepadDisconnectHandler.bind(this), true);
                    // @ts-ignore
                    window.addEventListener("webkitgamepaddisconnected", this.gamepadDisconnectHandler.bind(this), true);
                }
            };
            exports_20("default", GameBoyAdvanceKeypad);
        }
    };
});
System.register("keypad/mod", ["keypad/GameBoyAdvanceKeypad"], function (exports_21, context_21) {
    "use strict";
    var GameBoyAdvanceKeypad_ts_1;
    var __moduleName = context_21 && context_21.id;
    function factoryKeypad() {
        return new GameBoyAdvanceKeypad_ts_1.default();
    }
    exports_21("factoryKeypad", factoryKeypad);
    return {
        setters: [
            function (GameBoyAdvanceKeypad_ts_1_1) {
                GameBoyAdvanceKeypad_ts_1 = GameBoyAdvanceKeypad_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("mmu/MemoryView", [], function (exports_22, context_22) {
    "use strict";
    var MemoryView;
    var __moduleName = context_22 && context_22.id;
    return {
        setters: [],
        execute: function () {
            MemoryView = class MemoryView {
                constructor(memory, offset = 0) {
                    this.mask8 = 0;
                    this.mask16 = 0;
                    this.mask32 = 0;
                    this.icache = [];
                    this.buffer = memory;
                    this.view = new DataView(this.buffer, offset);
                    this.mask = memory.byteLength - 1;
                    this.resetMask();
                }
                resetMask() {
                    this.mask8 = this.mask & 0xFFFFFFFF;
                    this.mask16 = this.mask & 0xFFFFFFFE;
                    this.mask32 = this.mask & 0xFFFFFFFC;
                }
                load8(offset) {
                    return this.view.getInt8(offset & this.mask8);
                }
                /**
                   * Unaligned 16-bit loads are unpredictable...let's just pretend they work
                   * @param offset
                   */
                load16(offset) {
                    return this.view.getInt16(offset & this.mask, true);
                }
                loadU8(offset) {
                    return this.view.getUint8(offset & this.mask8);
                }
                /**
                   * Unaligned 16-bit loads are unpredictable...let's just pretend they work
                   * @param offset
                   */
                loadU16(offset) {
                    return this.view.getUint16(offset & this.mask, true);
                }
                /**
                   * Unaligned 32-bit loads are "rotated" so they make some semblance of sense
                   * @param offset
                   */
                load32(offset) {
                    const rotate = (offset & 3) << 3;
                    const mem = this.view.getInt32(offset & this.mask32, true);
                    return (mem >>> rotate) | (mem << (32 - rotate));
                }
                store8(offset, value) {
                    this.view.setInt8(offset & this.mask8, value);
                }
                store16(offset, value) {
                    this.view.setInt16(offset & this.mask16, value, true);
                }
                store32(offset, value) {
                    this.view.setInt32(offset & this.mask32, value, true);
                }
                invalidatePage(address) { }
                replaceData(memory, offset = 0) {
                    this.buffer = memory;
                    this.view = new DataView(this.buffer, offset);
                    if (this.icache) {
                        this.icache = new Array(this.icache.length);
                    }
                }
            };
            exports_22("default", MemoryView);
        }
    };
});
System.register("mmu/MemoryBlock", ["mmu/MemoryView"], function (exports_23, context_23) {
    "use strict";
    var MemoryView_ts_1, MemoryBlock;
    var __moduleName = context_23 && context_23.id;
    return {
        setters: [
            function (MemoryView_ts_1_1) {
                MemoryView_ts_1 = MemoryView_ts_1_1;
            }
        ],
        execute: function () {
            MemoryBlock = class MemoryBlock extends MemoryView_ts_1.default {
                constructor(size, cacheBits) {
                    super(new ArrayBuffer(size));
                    this.ICACHE_PAGE_BITS = cacheBits;
                    this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1;
                    this.icache = new Array(size >> (this.ICACHE_PAGE_BITS + 1));
                }
                invalidatePage(address) {
                    if (!this.icache) {
                        throw new Error("no init icache");
                    }
                    const page = this.icache[(address & this.mask) >> this.ICACHE_PAGE_BITS];
                    if (page) {
                        page.invalid = true;
                    }
                }
            };
            exports_23("default", MemoryBlock);
        }
    };
});
System.register("irq/GameBoyAdvanceInterruptHandler", ["interfaces", "mmu/MemoryBlock"], function (exports_24, context_24) {
    "use strict";
    var interfaces_ts_4, MemoryBlock_ts_1, GameBoyAdvanceInterruptHandler;
    var __moduleName = context_24 && context_24.id;
    return {
        setters: [
            function (interfaces_ts_4_1) {
                interfaces_ts_4 = interfaces_ts_4_1;
            },
            function (MemoryBlock_ts_1_1) {
                MemoryBlock_ts_1 = MemoryBlock_ts_1_1;
            }
        ],
        execute: function () {
            GameBoyAdvanceInterruptHandler = class GameBoyAdvanceInterruptHandler {
                constructor(ctx) {
                    this.FREQUENCY = 0x1000000;
                    this.enable = false;
                    this.IRQ_VBLANK = 0x0;
                    this.IRQ_HBLANK = 0x1;
                    this.IRQ_VCOUNTER = 0x2;
                    this.IRQ_TIMER0 = 0x3;
                    this.IRQ_TIMER1 = 0x4;
                    this.IRQ_TIMER2 = 0x5;
                    this.IRQ_TIMER3 = 0x6;
                    this.IRQ_SIO = 0x7;
                    this.IRQ_DMA0 = 0x8;
                    this.IRQ_DMA1 = 0x9;
                    this.IRQ_DMA2 = 0xA;
                    this.IRQ_DMA3 = 0xB;
                    this.IRQ_KEYPAD = 0xC;
                    this.IRQ_GAMEPAK = 0xD;
                    this.MASK_VBLANK = 0x0001;
                    this.MASK_HBLANK = 0x0002;
                    this.MASK_VCOUNTER = 0x0004;
                    this.MASK_TIMER0 = 0x0008;
                    this.MASK_TIMER1 = 0x0010;
                    this.MASK_TIMER2 = 0x0020;
                    this.MASK_TIMER3 = 0x0040;
                    this.MASK_SIO = 0x0080;
                    this.MASK_DMA0 = 0x0100;
                    this.MASK_DMA1 = 0x0200;
                    this.MASK_DMA2 = 0x0400;
                    this.MASK_DMA3 = 0x0800;
                    this.MASK_KEYPAD = 0x1000;
                    this.MASK_GAMEPAK = 0x2000;
                    this.enabledIRQs = false;
                    this.interruptFlags = 0;
                    this.timersEnabled = 0;
                    this.nextEvent = 0;
                    this.springIRQ = false;
                    this.dma = [];
                    this.timers = [];
                    this.core = ctx;
                }
                getClear() {
                    return this;
                }
                /**
                 *
                 */
                clear() {
                    this.enable = false;
                    this.enabledIRQs = false;
                    this.interruptFlags = 0;
                    this.dma = [];
                    for (let i = 0; i < 4; ++i) {
                        this.dma.push({
                            source: 0,
                            dest: 0,
                            count: 0,
                            nextSource: 0,
                            nextDest: 0,
                            nextCount: 0,
                            srcControl: 0,
                            dstControl: 0,
                            repeat: false,
                            width: 0,
                            drq: false,
                            timing: 0,
                            doIrq: false,
                            enable: false,
                            nextIRQ: 0
                        });
                    }
                    this.timersEnabled = 0;
                    this.timers = new Array();
                    for (let i = 0; i < 4; ++i) {
                        this.timers.push({
                            reload: 0,
                            oldReload: 0,
                            prescaleBits: 0,
                            countUp: false,
                            doIrq: false,
                            enable: false,
                            lastEvent: 0,
                            nextEvent: 0,
                            overflowInterval: 1
                        });
                    }
                    this.nextEvent = 0;
                    this.springIRQ = false;
                    this.resetSP();
                }
                /**
                 *
                 */
                freeze() {
                    return {
                        'enable': this.enable,
                        'enabledIRQs': this.enabledIRQs,
                        'interruptFlags': this.interruptFlags,
                        'dma': this.dma,
                        'timers': this.timers,
                        'nextEvent': this.nextEvent,
                        'springIRQ': this.springIRQ
                    };
                }
                /**
                 *
                 * @param frost
                 */
                defrost(frost) {
                    this.enable = frost.enable;
                    this.enabledIRQs = frost.enabledIRQs;
                    this.interruptFlags = frost.interruptFlags;
                    this.dma = frost.dma;
                    this.timers = frost.timers;
                    this.timersEnabled = 0;
                    if (this.timers[0].enable) {
                        ++this.timersEnabled;
                    }
                    if (this.timers[1].enable) {
                        ++this.timersEnabled;
                    }
                    if (this.timers[2].enable) {
                        ++this.timersEnabled;
                    }
                    if (this.timers[3].enable) {
                        ++this.timersEnabled;
                    }
                    this.nextEvent = frost.nextEvent;
                    this.springIRQ = frost.springIRQ;
                }
                getVideo() {
                    return this.core.getVideo();
                }
                /**
                 *
                 */
                updateTimers() {
                    const cpu = this.getCPU();
                    if (this.nextEvent > cpu.cycles) {
                        return;
                    }
                    if (this.springIRQ) {
                        cpu.raiseIRQ();
                        this.springIRQ = false;
                    }
                    const video = this.getVideo();
                    // if (!this.video) {
                    // throw new Error("video no init");
                    // }
                    video.updateTimers(cpu);
                    // if (!this.audio) {
                    // throw new Error("audio no init");
                    // }
                    const audio = this.getAudio();
                    audio.updateTimers();
                    const io = this.core.getIO();
                    if (!io.registers) {
                        throw new Error("register no init");
                    }
                    if (this.timersEnabled) {
                        var timer = this.timers[0];
                        if (timer.enable) {
                            if (cpu.cycles >= timer.nextEvent) {
                                timer.lastEvent = timer.nextEvent;
                                timer.nextEvent += timer.overflowInterval;
                                io.registers[io.TM0CNT_LO >> 1] = timer.reload;
                                timer.oldReload = timer.reload;
                                if (timer.doIrq) {
                                    this.raiseIRQ(this.IRQ_TIMER0);
                                }
                                if (audio.enabled) {
                                    if (audio.enableChannelA && !audio.soundTimerA && audio.dmaA >= 0) {
                                        audio.sampleFifoA();
                                    }
                                    if (audio.enableChannelB && !audio.soundTimerB && audio.dmaB >= 0) {
                                        audio.sampleFifoB();
                                    }
                                }
                                timer = this.timers[1];
                                if (timer.countUp) {
                                    if (++io.registers[io.TM1CNT_LO >> 1] == 0x10000) {
                                        timer.nextEvent = cpu.cycles;
                                    }
                                }
                            }
                        }
                        timer = this.timers[1];
                        if (timer.enable) {
                            if (cpu.cycles >= timer.nextEvent) {
                                timer.lastEvent = timer.nextEvent;
                                timer.nextEvent += timer.overflowInterval;
                                if (!timer.countUp || io.registers[io.TM1CNT_LO >> 1] == 0x10000) {
                                    io.registers[io.TM1CNT_LO >> 1] = timer.reload;
                                }
                                timer.oldReload = timer.reload;
                                if (timer.doIrq) {
                                    this.raiseIRQ(this.IRQ_TIMER1);
                                }
                                if (timer.countUp) {
                                    timer.nextEvent = 0;
                                }
                                if (audio.enabled) {
                                    if (audio.enableChannelA && audio.soundTimerA && audio.dmaA >= 0) {
                                        audio.sampleFifoA();
                                    }
                                    if (audio.enableChannelB && audio.soundTimerB && audio.dmaB >= 0) {
                                        audio.sampleFifoB();
                                    }
                                }
                                timer = this.timers[2];
                                if (timer.countUp) {
                                    if (++io.registers[io.TM2CNT_LO >> 1] == 0x10000) {
                                        timer.nextEvent = cpu.cycles;
                                    }
                                }
                            }
                        }
                        timer = this.timers[2];
                        if (timer.enable) {
                            if (cpu.cycles >= timer.nextEvent) {
                                timer.lastEvent = timer.nextEvent;
                                timer.nextEvent += timer.overflowInterval;
                                if (!timer.countUp || io.registers[io.TM2CNT_LO >> 1] == 0x10000) {
                                    io.registers[io.TM2CNT_LO >> 1] = timer.reload;
                                }
                                timer.oldReload = timer.reload;
                                if (timer.doIrq) {
                                    this.raiseIRQ(this.IRQ_TIMER2);
                                }
                                if (timer.countUp) {
                                    timer.nextEvent = 0;
                                }
                                timer = this.timers[3];
                                if (timer.countUp) {
                                    if (++io.registers[io.TM3CNT_LO >> 1] == 0x10000) {
                                        timer.nextEvent = cpu.cycles;
                                    }
                                }
                            }
                        }
                        timer = this.timers[3];
                        if (timer.enable) {
                            if (cpu.cycles >= timer.nextEvent) {
                                timer.lastEvent = timer.nextEvent;
                                timer.nextEvent += timer.overflowInterval;
                                if (!timer.countUp || io.registers[io.TM3CNT_LO >> 1] == 0x10000) {
                                    io.registers[io.TM3CNT_LO >> 1] = timer.reload;
                                }
                                timer.oldReload = timer.reload;
                                if (timer.doIrq) {
                                    this.raiseIRQ(this.IRQ_TIMER3);
                                }
                                if (timer.countUp) {
                                    timer.nextEvent = 0;
                                }
                            }
                        }
                    }
                    let dma = this.dma[0];
                    if (dma.enable && dma.doIrq && dma.nextIRQ && cpu.cycles >= dma.nextIRQ) {
                        dma.nextIRQ = 0;
                        this.raiseIRQ(this.IRQ_DMA0);
                    }
                    dma = this.dma[1];
                    if (dma.enable && dma.doIrq && dma.nextIRQ && cpu.cycles >= dma.nextIRQ) {
                        dma.nextIRQ = 0;
                        this.raiseIRQ(this.IRQ_DMA1);
                    }
                    dma = this.dma[2];
                    if (dma.enable && dma.doIrq && dma.nextIRQ && cpu.cycles >= dma.nextIRQ) {
                        dma.nextIRQ = 0;
                        this.raiseIRQ(this.IRQ_DMA2);
                    }
                    dma = this.dma[3];
                    if (dma.enable && dma.doIrq && dma.nextIRQ && cpu.cycles >= dma.nextIRQ) {
                        dma.nextIRQ = 0;
                        this.raiseIRQ(this.IRQ_DMA3);
                    }
                    this.pollNextEvent();
                }
                /**
                 *
                 */
                resetSP() {
                    const cpu = this.getCPU();
                    cpu.switchMode(interfaces_ts_4.ARMMode.SVC);
                    cpu.gprs[cpu.SP] = 0x3007FE0;
                    cpu.switchMode(interfaces_ts_4.ARMMode.IRQ);
                    cpu.gprs[cpu.SP] = 0x3007FA0;
                    cpu.switchMode(interfaces_ts_4.ARMMode.System);
                    cpu.gprs[cpu.SP] = 0x3007F00;
                }
                /**
                 *
                 * @param opcode
                 */
                swi32(opcode) {
                    this.swi(opcode >> 16);
                }
                getGBA() {
                    return this.core.getGBA();
                }
                getGBAMMU() {
                    return this.getGBA().getContext().getMMU();
                }
                getBIOS() {
                    return this.getGBAMMU().getBIOS();
                }
                getCPU() {
                    return this.core.getCPU();
                }
                /**
                 *
                 * @param opcode
                 */
                swi(opcode) {
                    const cpu = this.getCPU();
                    if (this.getBIOS().real) {
                        cpu.raiseTrap();
                        return;
                    }
                    const mmu = this.getGBAMMU();
                    switch (opcode) {
                        case 0x00:
                            // SoftReset            
                            const mem = mmu.memory[interfaces_ts_4.MemoryRegion.WORKING_IRAM];
                            const flag = mem.loadU8(0x7FFA);
                            for (let i = 0x7E00; i < 0x8000; i += 4) {
                                mem.store32(i, 0);
                            }
                            this.resetSP();
                            if (!flag) {
                                cpu.gprs[cpu.LR] = 0x08000000;
                            }
                            else {
                                cpu.gprs[cpu.LR] = 0x02000000;
                            }
                            cpu.switchExecMode(interfaces_ts_4.OpExecMode.ARM);
                            if (!cpu.instruction) {
                                throw new Error("instruction no init");
                            }
                            cpu.instruction.writesPC = true;
                            cpu.gprs[cpu.PC] = cpu.gprs[cpu.LR];
                            break;
                        case 0x01:
                            // RegisterRamReset            
                            const regions = cpu.gprs[0];
                            if (regions & 0x01) {
                                mmu.memory[interfaces_ts_4.MemoryRegion.WORKING_RAM] = new MemoryBlock_ts_1.default(interfaces_ts_4.MemoryRegionSize.WORKING_RAM, 9);
                            }
                            if (regions & 0x02) {
                                const iram = mmu.memory[interfaces_ts_4.MemoryRegion.WORKING_IRAM];
                                for (var i = 0; i < interfaces_ts_4.MemoryRegionSize.WORKING_IRAM - 0x200; i += 4) {
                                    iram.store32(i, 0);
                                }
                            }
                            if (regions & 0x1C) {
                                this.getVideo().renderPath.clearSubsets(interfaces_ts_4.MemoryRegionSize.PALETTE_RAM /* can remove */, regions);
                            }
                            if (regions & 0xE0) {
                                this.getLog().STUB('Unimplemented RegisterRamReset');
                            }
                            break;
                        case 0x02:
                            // Halt
                            this.halt();
                            break;
                        case 0x05:
                            // VBlankIntrWait
                            cpu.gprs[0] = 1;
                            cpu.gprs[1] = 1;
                        // Fall through:
                        case 0x04:
                            // IntrWait
                            if (!this.enable) {
                                const io = this.getIO();
                                io.store16(io.IME, 1);
                            }
                            if (!cpu.gprs[0] && this.interruptFlags & cpu.gprs[1]) {
                                return;
                            }
                            this.dismissIRQs(0xFFFFFFFF);
                            cpu.raiseTrap();
                            break;
                        case 0x06:
                            // Div
                            var result = (cpu.gprs[0] | 0) / (cpu.gprs[1] | 0);
                            var mod = (cpu.gprs[0] | 0) % (cpu.gprs[1] | 0);
                            cpu.gprs[0] = result | 0;
                            cpu.gprs[1] = mod | 0;
                            cpu.gprs[3] = Math.abs(result | 0);
                            break;
                        case 0x07:
                            // DivArm
                            var result = (cpu.gprs[1] | 0) / (cpu.gprs[0] | 0);
                            var mod = (cpu.gprs[1] | 0) % (cpu.gprs[0] | 0);
                            cpu.gprs[0] = result | 0;
                            cpu.gprs[1] = mod | 0;
                            cpu.gprs[3] = Math.abs(result | 0);
                            break;
                        case 0x08:
                            // Sqrt
                            var root = Math.sqrt(cpu.gprs[0]);
                            cpu.gprs[0] = root | 0; // Coerce down to int
                            break;
                        case 0x0A:
                            // ArcTan2
                            var x = cpu.gprs[0] / 16384;
                            var y = cpu.gprs[1] / 16384;
                            cpu.gprs[0] = (Math.atan2(y, x) / (2 * Math.PI)) * 0x10000;
                            break;
                        case 0x0B:
                            // CpuSet
                            var source = cpu.gprs[0];
                            var dest = cpu.gprs[1];
                            var mode = cpu.gprs[2];
                            var count = mode & 0x000FFFFF;
                            var fill = mode & 0x01000000;
                            var wordsize = (mode & 0x04000000) ? 4 : 2;
                            if (fill) {
                                if (wordsize == 4) {
                                    source &= 0xFFFFFFFC;
                                    dest &= 0xFFFFFFFC;
                                    var word = mmu.load32(source);
                                    for (var i = 0; i < count; ++i) {
                                        mmu.store32(dest + (i << 2), word);
                                    }
                                }
                                else {
                                    source &= 0xFFFFFFFE;
                                    dest &= 0xFFFFFFFE;
                                    var word = mmu.load16(source);
                                    for (let i = 0; i < count; ++i) {
                                        mmu.store16(dest + (i << 1), word);
                                    }
                                }
                            }
                            else {
                                if (wordsize == 4) {
                                    source &= 0xFFFFFFFC;
                                    dest &= 0xFFFFFFFC;
                                    for (let i = 0; i < count; ++i) {
                                        var word = mmu.load32(source + (i << 2));
                                        mmu.store32(dest + (i << 2), word);
                                    }
                                }
                                else {
                                    source &= 0xFFFFFFFE;
                                    dest &= 0xFFFFFFFE;
                                    for (let i = 0; i < count; ++i) {
                                        const word = mmu.load16(source + (i << 1));
                                        mmu.store16(dest + (i << 1), word);
                                    }
                                }
                            }
                            return;
                        case 0x0C:
                            // FastCpuSet
                            var source = cpu.gprs[0] & 0xFFFFFFFC;
                            var dest = cpu.gprs[1] & 0xFFFFFFFC;
                            var mode = cpu.gprs[2];
                            var count = mode & 0x000FFFFF;
                            count = ((count + 7) >> 3) << 3;
                            var fill = mode & 0x01000000;
                            if (fill) {
                                var word = mmu.load32(source);
                                for (var i = 0; i < count; ++i) {
                                    mmu.store32(dest + (i << 2), word);
                                }
                            }
                            else {
                                for (var i = 0; i < count; ++i) {
                                    var word = mmu.load32(source + (i << 2));
                                    mmu.store32(dest + (i << 2), word);
                                }
                            }
                            return;
                        case 0x0E:
                            // BgAffineSet
                            var i = cpu.gprs[2];
                            var ox, oy;
                            var cx, cy;
                            var sx, sy;
                            var theta;
                            var offset = cpu.gprs[0];
                            var destination = cpu.gprs[1];
                            var a, b, c, d;
                            var rx, ry;
                            while (i--) {
                                // [ sx   0  0 ]   [ cos(theta)  -sin(theta)  0 ]   [ 1  0  cx - ox ]   [ A B rx ]
                                // [  0  sy  0 ] * [ sin(theta)   cos(theta)  0 ] * [ 0  1  cy - oy ] = [ C D ry ]
                                // [  0   0  1 ]   [     0            0       1 ]   [ 0  0     1    ]   [ 0 0  1 ]
                                ox = mmu.load32(offset) / 256;
                                oy = mmu.load32(offset + 4) / 256;
                                cx = mmu.load16(offset + 8);
                                cy = mmu.load16(offset + 10);
                                sx = mmu.load16(offset + 12) / 256;
                                sy = mmu.load16(offset + 14) / 256;
                                theta = (mmu.loadU16(offset + 16) >> 8) / 128 * Math.PI;
                                offset += 20;
                                // Rotation
                                a = d = Math.cos(theta);
                                b = c = Math.sin(theta);
                                // Scale
                                a *= sx;
                                b *= -sx;
                                c *= sy;
                                d *= sy;
                                // Translate
                                rx = ox - (a * cx + b * cy);
                                ry = oy - (c * cx + d * cy);
                                mmu.store16(destination, (a * 256) | 0);
                                mmu.store16(destination + 2, (b * 256) | 0);
                                mmu.store16(destination + 4, (c * 256) | 0);
                                mmu.store16(destination + 6, (d * 256) | 0);
                                mmu.store32(destination + 8, (rx * 256) | 0);
                                mmu.store32(destination + 12, (ry * 256) | 0);
                                destination += 16;
                            }
                            break;
                        case 0x0F:
                            // ObjAffineSet
                            var i = cpu.gprs[2];
                            var sx, sy;
                            var theta;
                            var offset = cpu.gprs[0];
                            var destination = cpu.gprs[1];
                            var diff = cpu.gprs[3];
                            var a, b, c, d;
                            while (i--) {
                                // [ sx   0 ]   [ cos(theta)  -sin(theta) ]   [ A B ]
                                // [  0  sy ] * [ sin(theta)   cos(theta) ] = [ C D ]
                                sx = mmu.load16(offset) / 256;
                                sy = mmu.load16(offset + 2) / 256;
                                theta = (mmu.loadU16(offset + 4) >> 8) / 128 * Math.PI;
                                offset += 6;
                                // Rotation
                                a = d = Math.cos(theta);
                                b = c = Math.sin(theta);
                                // Scale
                                a *= sx;
                                b *= -sx;
                                c *= sy;
                                d *= sy;
                                mmu.store16(destination, (a * 256) | 0);
                                mmu.store16(destination + diff, (b * 256) | 0);
                                mmu.store16(destination + diff * 2, (c * 256) | 0);
                                mmu.store16(destination + diff * 3, (d * 256) | 0);
                                destination += diff * 4;
                            }
                            break;
                        case 0x11:
                            // LZ77UnCompWram
                            this.lz77(cpu.gprs[0], cpu.gprs[1], 1);
                            break;
                        case 0x12:
                            // LZ77UnCompVram
                            this.lz77(cpu.gprs[0], cpu.gprs[1], 2);
                            break;
                        case 0x13:
                            // HuffUnComp
                            this.huffman(cpu.gprs[0], cpu.gprs[1]);
                            break;
                        case 0x14:
                            // RlUnCompWram
                            this.rl(cpu.gprs[0], cpu.gprs[1], 1);
                            break;
                        case 0x15:
                            // RlUnCompVram
                            this.rl(cpu.gprs[0], cpu.gprs[1], 2);
                            break;
                        case 0x1F:
                            // MidiKey2Freq
                            var key = mmu.load32(cpu.gprs[0] + 4);
                            cpu.gprs[0] = key / Math.pow(2, (180 - cpu.gprs[1] - cpu.gprs[2] / 256) / 12) >>> 0;
                            break;
                        default:
                            throw "Unimplemented software interrupt: 0x" + opcode.toString(16);
                    }
                }
                getIO() {
                    return this.core.getIO();
                }
                /**
                 *
                 * @param value
                 */
                masterEnable(value) {
                    this.enable = value;
                    if (this.enable && this.getenabledIRSsValue() & this.interruptFlags) {
                        this.getCPU().raiseIRQ();
                    }
                }
                getLog() {
                    return this.core.getLog();
                }
                /**
                 *
                 * @param value
                 */
                setInterruptsEnabled(value) {
                    this.enabledIRQs = value;
                    const enable = this.enabledIRQs ? 1 : 0;
                    const log = this.getLog();
                    if (enable & this.MASK_SIO) {
                        log.STUB('Serial I/O interrupts not implemented');
                    }
                    if (enable & this.MASK_KEYPAD) {
                        log.STUB('Keypad interrupts not implemented');
                    }
                    if (this.enable && enable & this.interruptFlags) {
                        this.getCPU().raiseIRQ();
                    }
                }
                getAudio() {
                    return this.core.getAudio();
                }
                /**
                 *
                 */
                pollNextEvent() {
                    let nextEvent = this.getVideo().nextEvent;
                    let test;
                    const audio = this.getAudio();
                    if (audio.enabled) {
                        test = audio.nextEvent;
                        if (!nextEvent || test < nextEvent) {
                            nextEvent = test;
                        }
                    }
                    if (this.timersEnabled) {
                        let timer = this.timers[0];
                        test = timer.nextEvent;
                        if (timer.enable && test && (!nextEvent || test < nextEvent)) {
                            nextEvent = test;
                        }
                        timer = this.timers[1];
                        test = timer.nextEvent;
                        if (timer.enable && test && (!nextEvent || test < nextEvent)) {
                            nextEvent = test;
                        }
                        timer = this.timers[2];
                        test = timer.nextEvent;
                        if (timer.enable && test && (!nextEvent || test < nextEvent)) {
                            nextEvent = test;
                        }
                        timer = this.timers[3];
                        test = timer.nextEvent;
                        if (timer.enable && test && (!nextEvent || test < nextEvent)) {
                            nextEvent = test;
                        }
                    }
                    let dma = this.dma[0];
                    test = dma.nextIRQ;
                    if (dma.enable && dma.doIrq && test && (!nextEvent || test < nextEvent)) {
                        nextEvent = test;
                    }
                    dma = this.dma[1];
                    test = dma.nextIRQ;
                    if (dma.enable && dma.doIrq && test && (!nextEvent || test < nextEvent)) {
                        nextEvent = test;
                    }
                    dma = this.dma[2];
                    test = dma.nextIRQ;
                    if (dma.enable && dma.doIrq && test && (!nextEvent || test < nextEvent)) {
                        nextEvent = test;
                    }
                    dma = this.dma[3];
                    test = dma.nextIRQ;
                    if (dma.enable && dma.doIrq && test && (!nextEvent || test < nextEvent)) {
                        nextEvent = test;
                    }
                    // this.cpu.ASSERT(nextEvent >= this.cpu.cycles, "Next event is before present");
                    this.nextEvent = nextEvent;
                }
                /**
                 *
                 */
                waitForIRQ() {
                    let timer;
                    const video = this.getVideo();
                    let irqPending = this.testIRQ() || video.hblankIRQ > 0 || video.vblankIRQ > 0 || video.vcounterIRQ > 0;
                    if (this.timersEnabled) {
                        timer = this.timers[0];
                        irqPending = irqPending || timer.doIrq;
                        timer = this.timers[1];
                        irqPending = irqPending || timer.doIrq;
                        timer = this.timers[2];
                        irqPending = irqPending || timer.doIrq;
                        timer = this.timers[3];
                        irqPending = irqPending || timer.doIrq;
                    }
                    if (!irqPending) {
                        return false;
                    }
                    const cpu = this.getCPU();
                    for (;;) {
                        this.pollNextEvent();
                        if (!this.nextEvent) {
                            return false;
                        }
                        else {
                            cpu.cycles = this.nextEvent;
                            this.updateTimers();
                            if (this.interruptFlags) {
                                return true;
                            }
                        }
                    }
                }
                getenabledIRSsValue() {
                    return this.enabledIRQs ? 1 : 0;
                }
                /**
                 *
                 */
                testIRQ() {
                    if (this.enable && this.getenabledIRSsValue() & this.interruptFlags) {
                        this.springIRQ = true;
                        this.nextEvent = this.getCPU().cycles;
                        return true;
                    }
                    return false;
                }
                /**
                 *
                 * @param irqType
                 */
                raiseIRQ(irqType) {
                    this.interruptFlags |= 1 << irqType;
                    const io = this.getIO();
                    io.registers[io.IF >> 1] = this.interruptFlags;
                    if (this.enable && (this.getenabledIRSsValue() & 1 << irqType)) {
                        this.getCPU().raiseIRQ();
                    }
                }
                /**
                 *
                 * @param irqMask
                 */
                dismissIRQs(irqMask) {
                    this.interruptFlags &= ~irqMask;
                    const io = this.getIO();
                    io.registers[io.IF >> 1] = this.interruptFlags;
                }
                /**
                 *
                 * @param dma
                 * @param address
                 */
                dmaSetSourceAddress(dma, address) {
                    this.dma[dma].source = address & 0xFFFFFFFE;
                }
                /**
                 *
                 * @param dma
                 * @param address
                 */
                dmaSetDestAddress(dma, address) {
                    this.dma[dma].dest = address & 0xFFFFFFFE;
                }
                /**
                 *
                 * @param dma
                 * @param count
                 */
                dmaSetWordCount(dma, count) {
                    this.dma[dma].count = count ? count : (dma == 3 ? 0x10000 : 0x4000);
                }
                /**
                 *
                 * @param dma
                 * @param control
                 */
                dmaWriteControl(dma, control) {
                    var currentDma = this.dma[dma];
                    var wasEnabled = currentDma.enable;
                    currentDma.dstControl = (control & 0x0060) >> 5;
                    currentDma.srcControl = (control & 0x0180) >> 7;
                    currentDma.repeat = !!(control & 0x0200);
                    currentDma.width = (control & 0x0400) ? 4 : 2;
                    currentDma.drq = !!(control & 0x0800);
                    currentDma.timing = (control & 0x3000) >> 12;
                    currentDma.doIrq = !!(control & 0x4000);
                    currentDma.enable = !!(control & 0x8000);
                    currentDma.nextIRQ = 0;
                    if (currentDma.drq) {
                        this.getLog().WARN('DRQ not implemented');
                    }
                    if (!wasEnabled && currentDma.enable) {
                        currentDma.nextSource = currentDma.source;
                        currentDma.nextDest = currentDma.dest;
                        currentDma.nextCount = currentDma.count;
                        this.getGBAMMU().scheduleDma(dma, currentDma);
                    }
                }
                /**
                 *
                 * @param timer
                 * @param reload
                 */
                timerSetReload(timer, reload) {
                    this.timers[timer].reload = reload & 0xFFFF;
                }
                /**
                 *
                 * @param timer
                 * @param control
                 */
                timerWriteControl(timer, control) {
                    var currentTimer = this.timers[timer];
                    var oldPrescale = currentTimer.prescaleBits;
                    switch (control & 0x0003) {
                        case 0x0000:
                            currentTimer.prescaleBits = 0;
                            break;
                        case 0x0001:
                            currentTimer.prescaleBits = 6;
                            break;
                        case 0x0002:
                            currentTimer.prescaleBits = 8;
                            break;
                        case 0x0003:
                            currentTimer.prescaleBits = 10;
                            break;
                    }
                    currentTimer.countUp = !!(control & 0x0004);
                    currentTimer.doIrq = !!(control & 0x0040);
                    currentTimer.overflowInterval = (0x10000 - currentTimer.reload) << currentTimer.prescaleBits;
                    var wasEnabled = currentTimer.enable;
                    currentTimer.enable = !!(((control & 0x0080) >> 7) << timer);
                    const cpu = this.getCPU();
                    const io = this.getIO();
                    if (!wasEnabled && currentTimer.enable) {
                        if (!currentTimer.countUp) {
                            currentTimer.lastEvent = cpu.cycles;
                            currentTimer.nextEvent = cpu.cycles + currentTimer.overflowInterval;
                        }
                        else {
                            currentTimer.nextEvent = 0;
                        }
                        io.registers[(io.TM0CNT_LO + (timer << 2)) >> 1] = currentTimer.reload;
                        currentTimer.oldReload = currentTimer.reload;
                        ++this.timersEnabled;
                    }
                    else if (wasEnabled && !currentTimer.enable) {
                        if (!currentTimer.countUp) {
                            io.registers[(io.TM0CNT_LO + (timer << 2)) >> 1] = currentTimer.oldReload + (cpu.cycles - currentTimer.lastEvent) >> oldPrescale;
                        }
                        --this.timersEnabled;
                    }
                    else if (currentTimer.prescaleBits != oldPrescale && !currentTimer.countUp) {
                        // FIXME: this might be before present
                        currentTimer.nextEvent = currentTimer.lastEvent + currentTimer.overflowInterval;
                    }
                    // We've changed the timers somehow...we need to reset the next event
                    this.pollNextEvent();
                }
                /**
                 *
                 * @param timer
                 */
                timerRead(timer) {
                    const currentTimer = this.timers[timer];
                    if (currentTimer.enable && !currentTimer.countUp) {
                        return currentTimer.oldReload + (this.getCPU().cycles - currentTimer.lastEvent) >> currentTimer.prescaleBits;
                    }
                    else {
                        const io = this.getIO();
                        return io.registers[(io.TM0CNT_LO + (timer << 2)) >> 1];
                    }
                }
                /**
                 *
                 */
                halt() {
                    if (!this.enable) {
                        throw "Requested HALT when interrupts were disabled!";
                    }
                    if (!this.waitForIRQ()) {
                        throw "Waiting on interrupt forever.";
                    }
                }
                /**
                 *
                 * @param source
                 * @param dest
                 * @param unitsize
                 */
                lz77(source, dest, unitsize) {
                    // TODO: move to a different file
                    const mmu = this.getGBAMMU();
                    var remaining = (mmu.load32(source) & 0xFFFFFF00) >> 8;
                    // We assume the signature byte (0x10) is correct
                    let blockheader = 0;
                    var sPointer = source + 4;
                    var dPointer = dest;
                    var blocksRemaining = 0;
                    var block;
                    var disp;
                    var bytes;
                    var buffer = 0;
                    var loaded;
                    while (remaining > 0) {
                        if (blocksRemaining) {
                            if (blockheader & 0x80) {
                                // Compressed
                                block = mmu.loadU8(sPointer) | (mmu.loadU8(sPointer + 1) << 8);
                                sPointer += 2;
                                disp = dPointer - (((block & 0x000F) << 8) | ((block & 0xFF00) >> 8)) - 1;
                                bytes = ((block & 0x00F0) >> 4) + 3;
                                while (bytes-- && remaining) {
                                    loaded = mmu.loadU8(disp++);
                                    if (unitsize == 2) {
                                        buffer >>= 8;
                                        buffer |= loaded << 8;
                                        if (dPointer & 1) {
                                            mmu.store16(dPointer - 1, buffer);
                                        }
                                    }
                                    else {
                                        mmu.store8(dPointer, loaded);
                                    }
                                    --remaining;
                                    ++dPointer;
                                }
                            }
                            else {
                                // Uncompressed
                                loaded = mmu.loadU8(sPointer++);
                                if (unitsize == 2) {
                                    buffer >>= 8;
                                    buffer |= loaded << 8;
                                    if (dPointer & 1) {
                                        mmu.store16(dPointer - 1, buffer);
                                    }
                                }
                                else {
                                    mmu.store8(dPointer, loaded);
                                }
                                --remaining;
                                ++dPointer;
                            }
                            blockheader <<= 1;
                            --blocksRemaining;
                        }
                        else {
                            blockheader = mmu.loadU8(sPointer++);
                            blocksRemaining = 8;
                        }
                    }
                }
                /**
                 *
                 * @param source
                 * @param dest
                 */
                huffman(source, dest) {
                    source = source & 0xFFFFFFFC;
                    const mmu = this.getGBAMMU();
                    const header = mmu.load32(source);
                    const bits = header & 0xF;
                    if (32 % bits) {
                        throw 'Unimplemented unaligned Huffman';
                    }
                    let remaining = header >> 8;
                    const padding = (4 - remaining) & 0x3;
                    remaining &= 0xFFFFFFFC;
                    let tree = [];
                    const treesize = (mmu.loadU8(source + 4) << 1) + 1;
                    let block = 0;
                    let sPointer = source + 5 + treesize;
                    let dPointer = dest & 0xFFFFFFFC;
                    for (let i = 0; i < treesize; ++i) {
                        tree.push(mmu.loadU8(source + 5 + i));
                    }
                    let node;
                    let offset = 0;
                    let bitsRemaining;
                    let readBits;
                    let bitsSeen = 0;
                    node = tree[0];
                    while (remaining > 0) {
                        var bitstream = mmu.load32(sPointer);
                        sPointer += 4;
                        for (bitsRemaining = 32; bitsRemaining > 0; --bitsRemaining, bitstream <<= 1) {
                            if (typeof (node) === 'number') {
                                // Lazily construct tree
                                const next = (offset - 1 | 1) + ((node & 0x3F) << 1) + 2;
                                node = {
                                    l: next,
                                    r: next + 1,
                                    lTerm: node & 0x80,
                                    rTerm: node & 0x40
                                };
                                tree[offset] = node;
                            }
                            if (bitstream & 0x80000000) {
                                // Go right
                                if (node.rTerm) {
                                    readBits = tree[node.r];
                                }
                                else {
                                    offset = node.r;
                                    node = tree[node.r];
                                    continue;
                                }
                            }
                            else {
                                // Go left
                                if (node.lTerm) {
                                    readBits = tree[node.l];
                                }
                                else {
                                    offset = node.l;
                                    node = tree[offset];
                                    continue;
                                }
                            }
                            block |= (readBits & ((1 << bits) - 1)) << bitsSeen;
                            bitsSeen += bits;
                            offset = 0;
                            node = tree[0];
                            if (bitsSeen == 32) {
                                bitsSeen = 0;
                                mmu.store32(dPointer, block);
                                dPointer += 4;
                                remaining -= 4;
                                block = 0;
                            }
                        }
                    }
                    if (padding) {
                        mmu.store32(dPointer, block);
                    }
                }
                /**
                 *
                 * @param source
                 * @param dest
                 * @param unitsize
                 */
                rl(source, dest, unitsize) {
                    source = source & 0xFFFFFFFC;
                    const mmu = this.getGBAMMU();
                    var remaining = (mmu.load32(source) & 0xFFFFFF00) >> 8;
                    var padding = (4 - remaining) & 0x3;
                    // We assume the signature byte (0x30) is correct
                    var blockheader;
                    var block;
                    var sPointer = source + 4;
                    var dPointer = dest;
                    var buffer = 0;
                    while (remaining > 0) {
                        blockheader = mmu.loadU8(sPointer++);
                        if (blockheader & 0x80) {
                            // Compressed
                            blockheader &= 0x7F;
                            blockheader += 3;
                            block = mmu.loadU8(sPointer++);
                            while (blockheader-- && remaining) {
                                --remaining;
                                if (unitsize == 2) {
                                    buffer >>= 8;
                                    buffer |= block << 8;
                                    if (dPointer & 1) {
                                        mmu.store16(dPointer - 1, buffer);
                                    }
                                }
                                else {
                                    mmu.store8(dPointer, block);
                                }
                                ++dPointer;
                            }
                        }
                        else {
                            // Uncompressed
                            blockheader++;
                            while (blockheader-- && remaining) {
                                --remaining;
                                block = mmu.loadU8(sPointer++);
                                if (unitsize == 2) {
                                    buffer >>= 8;
                                    buffer |= block << 8;
                                    if (dPointer & 1) {
                                        mmu.store16(dPointer - 1, buffer);
                                    }
                                }
                                else {
                                    mmu.store8(dPointer, block);
                                }
                                ++dPointer;
                            }
                        }
                    }
                    while (padding--) {
                        mmu.store8(dPointer++, 0);
                    }
                }
            };
            exports_24("default", GameBoyAdvanceInterruptHandler);
        }
    };
});
System.register("irq/mod", ["irq/GameBoyAdvanceInterruptHandler"], function (exports_25, context_25) {
    "use strict";
    var GameBoyAdvanceInterruptHandler_ts_1;
    var __moduleName = context_25 && context_25.id;
    function factoryIRQ(ctx) {
        return new GameBoyAdvanceInterruptHandler_ts_1.default(ctx);
    }
    exports_25("factoryIRQ", factoryIRQ);
    return {
        setters: [
            function (GameBoyAdvanceInterruptHandler_ts_1_1) {
                GameBoyAdvanceInterruptHandler_ts_1 = GameBoyAdvanceInterruptHandler_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("mmu/BIOSView", ["mmu/MemoryView"], function (exports_26, context_26) {
    "use strict";
    var MemoryView_ts_2, BIOSView;
    var __moduleName = context_26 && context_26.id;
    return {
        setters: [
            function (MemoryView_ts_2_1) {
                MemoryView_ts_2 = MemoryView_ts_2_1;
            }
        ],
        execute: function () {
            BIOSView = class BIOSView extends MemoryView_ts_2.default {
                constructor(rom, offset = 0) {
                    super(rom, offset);
                    this.real = false;
                    this.ICACHE_PAGE_BITS = 16;
                    this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1;
                    this.icache = new Array(1);
                }
                load8(offset) {
                    if (offset >= this.buffer.byteLength) {
                        return -1;
                    }
                    return this.view.getInt8(offset);
                }
                load16(offset) {
                    if (offset >= this.buffer.byteLength) {
                        return -1;
                    }
                    return this.view.getInt16(offset, true);
                }
                loadU8(offset) {
                    if (offset >= this.buffer.byteLength) {
                        return -1;
                    }
                    return this.view.getUint8(offset);
                }
                loadU16(offset) {
                    if (offset >= this.buffer.byteLength) {
                        return -1;
                    }
                    return this.view.getUint16(offset, true);
                }
                load32(offset) {
                    if (offset >= this.buffer.byteLength) {
                        return -1;
                    }
                    return this.view.getInt32(offset, true);
                }
                store8(offset, value) { }
                store16(offset, value) { }
                store32(offset, value) { }
            };
            exports_26("default", BIOSView);
        }
    };
});
System.register("mmu/BadMemory", ["interfaces"], function (exports_27, context_27) {
    "use strict";
    var interfaces_ts_5, BadMemory;
    var __moduleName = context_27 && context_27.id;
    return {
        setters: [
            function (interfaces_ts_5_1) {
                interfaces_ts_5 = interfaces_ts_5_1;
            }
        ],
        execute: function () {
            BadMemory = class BadMemory {
                constructor(mmu, cpu) {
                    this.mask = 0;
                    this.cpu = cpu;
                    this.mmu = mmu;
                    this.buffer = new ArrayBuffer(0);
                    this.view = new DataView(this.buffer);
                    this.icache = [];
                }
                load8(offset) {
                    return this.mmu.load8(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth + (offset & 0x3));
                }
                load16(offset) {
                    return this.mmu.load16(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth + (offset & 0x2));
                }
                loadU8(offset) {
                    return this.mmu.loadU8(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth + (offset & 0x3));
                }
                loadU16(offset) {
                    return this.mmu.loadU16(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth + (offset & 0x2));
                }
                load32(offset) {
                    if (this.cpu.execMode == interfaces_ts_5.OpExecMode.ARM) {
                        // return this.mmu.load32(this.cpu.gprs[this.cpu.gprs.PC] - this.cpu.instructionWidth);
                        return this.mmu.load32(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth);
                    }
                    else {
                        var halfword = this.mmu.loadU16(this.cpu.gprs[this.cpu.PC] - this.cpu.instructionWidth);
                        return halfword | (halfword << 16);
                    }
                }
                store8(offset, value) { }
                store16(offset, value) { }
                store32(offset, value) { }
                invalidatePage(address) { }
                replaceData(memory, offset = 0) {
                }
            };
            exports_27("default", BadMemory);
        }
    };
});
System.register("mmu/ROMView", ["mmu/MemoryView"], function (exports_28, context_28) {
    "use strict";
    var MemoryView_ts_3, ROMView;
    var __moduleName = context_28 && context_28.id;
    return {
        setters: [
            function (MemoryView_ts_3_1) {
                MemoryView_ts_3 = MemoryView_ts_3_1;
            }
        ],
        execute: function () {
            ROMView = class ROMView extends MemoryView_ts_3.default {
                constructor(rom, offset = 0) {
                    super(rom, offset);
                    this.ICACHE_PAGE_BITS = 10;
                    this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1;
                    // this.icache = new Array(rom.byteLength >> (this.ICACHE_PAGE_BITS + 1));
                    this.mask = 0x01FFFFFF;
                    this.resetMask();
                }
                #mmu;
                setMMU(mmu) {
                    this.#mmu = mmu;
                }
                store8(offset, value) { }
                store16(offset, value) {
                    if (offset < 0xCA && offset >= 0xC4) {
                        if (!this.gpio) {
                            this.gpio = this.#mmu?.allocGPIO(this);
                        }
                        this.gpio?.store16(offset, value);
                    }
                }
                store32(offset, value) {
                    if (offset < 0xCA && offset >= 0xC4) {
                        if (!this.gpio) {
                            this.gpio = this.#mmu?.allocGPIO(this);
                        }
                        this.gpio?.store32(offset, value);
                    }
                }
            };
            exports_28("default", ROMView);
        }
    };
});
System.register("savedata/EEPROMSavedata", ["mmu/MemoryView"], function (exports_29, context_29) {
    "use strict";
    var MemoryView_ts_4, EEPROMSavedata;
    var __moduleName = context_29 && context_29.id;
    return {
        setters: [
            function (MemoryView_ts_4_1) {
                MemoryView_ts_4 = MemoryView_ts_4_1;
            }
        ],
        execute: function () {
            EEPROMSavedata = class EEPROMSavedata extends MemoryView_ts_4.default {
                constructor(size) {
                    super(new ArrayBuffer(size));
                    this.writePending = false;
                    this.dma = null;
                    this.COMMAND_NULL = 0;
                    this.COMMAND_PENDING = 1;
                    this.COMMAND_WRITE = 2;
                    this.COMMAND_READ_PENDING = 3;
                    this.COMMAND_READ = 4;
                    this.writeAddress = 0;
                    this.readBitsRemaining = 0;
                    this.readAddress = 0;
                    this.command = 0;
                    this.commandBitsRemaining = 0;
                    this.realSize = 0;
                    this.addressBits = 0;
                    // this.mmu = mmu;    
                    // this.dma = (mmu.cpu.irq as IIRQ).dma[3];
                }
                load8(offset) {
                    throw new Error("Unsupported 8-bit access!");
                }
                load16(offset) {
                    return this.loadU16(offset);
                }
                loadU8(offset) {
                    throw new Error("Unsupported 8-bit access!");
                }
                loadU16(offset) {
                    if (!this.dma) {
                        throw new Error("dma is null");
                    }
                    if (this.command != this.COMMAND_READ || !this.dma.enable) {
                        return 1;
                    }
                    --this.readBitsRemaining;
                    if (this.readBitsRemaining < 64) {
                        const step = 63 - this.readBitsRemaining;
                        const data = this.view.getUint8((this.readAddress + step) >> 3) >>
                            (0x7 - (step & 0x7));
                        if (!this.readBitsRemaining) {
                            this.command = this.COMMAND_NULL;
                        }
                        return data & 0x1;
                    }
                    return 0;
                }
                load32(offset) {
                    throw new Error("Unsupported 32-bit access!");
                }
                store8(offset, value) {
                    throw new Error("Unsupported 8-bit access!");
                }
                store16(offset, value) {
                    switch (this.command) {
                        // Read header
                        case this.COMMAND_NULL:
                        default:
                            this.command = value & 0x1;
                            break;
                        case this.COMMAND_PENDING:
                            this.command <<= 1;
                            this.command |= value & 0x1;
                            if (!this.dma) {
                                throw new Error("dma is null");
                            }
                            if (this.command == this.COMMAND_WRITE) {
                                if (!this.realSize) {
                                    var bits = this.dma.count - 67;
                                    this.realSize = 8 << bits;
                                    this.addressBits = bits;
                                }
                                this.commandBitsRemaining = this.addressBits + 64 + 1;
                                this.writeAddress = 0;
                            }
                            else {
                                if (!this.realSize) {
                                    var bits = this.dma.count - 3;
                                    this.realSize = 8 << bits;
                                    this.addressBits = bits;
                                }
                                this.commandBitsRemaining = this.addressBits + 1;
                                this.readAddress = 0;
                            }
                            break;
                        // Do commands
                        case this.COMMAND_WRITE:
                            // Write
                            if (--this.commandBitsRemaining > 64) {
                                this.writeAddress <<= 1;
                                this.writeAddress |= (value & 0x1) << 6;
                            }
                            else if (this.commandBitsRemaining <= 0) {
                                this.command = this.COMMAND_NULL;
                                this.writePending = true;
                            }
                            else {
                                var current = this.view.getUint8(this.writeAddress >> 3);
                                current &= ~(1 << (0x7 - (this.writeAddress & 0x7)));
                                current |= (value & 0x1) << (0x7 - (this.writeAddress & 0x7));
                                this.view.setUint8(this.writeAddress >> 3, current);
                                ++this.writeAddress;
                            }
                            break;
                        case this.COMMAND_READ_PENDING:
                            // Read
                            if (--this.commandBitsRemaining > 0) {
                                this.readAddress <<= 1;
                                if (value & 0x1) {
                                    this.readAddress |= 0x40;
                                }
                            }
                            else {
                                this.readBitsRemaining = 68;
                                this.command = this.COMMAND_READ;
                            }
                            break;
                    }
                }
                store32(offset, value) {
                    throw new Error("Unsupported 32-bit access!");
                }
            };
            exports_29("default", EEPROMSavedata);
        }
    };
});
System.register("savedata/FlashSavedata", ["mmu/MemoryView"], function (exports_30, context_30) {
    "use strict";
    var MemoryView_ts_5, FlashSavedata;
    var __moduleName = context_30 && context_30.id;
    return {
        setters: [
            function (MemoryView_ts_5_1) {
                MemoryView_ts_5 = MemoryView_ts_5_1;
            }
        ],
        execute: function () {
            FlashSavedata = /** @class */ (() => {
                class FlashSavedata extends MemoryView_ts_5.default {
                    constructor(size) {
                        super(new ArrayBuffer(size), 0);
                        this.writePending = false;
                        this.idMode = false;
                        this.first = 0;
                        this.second = 0;
                        this.command = 0;
                        this.pendingCommand = 0;
                        this.dma = null;
                        this.bank0 = new DataView(this.buffer, 0, 0x00010000);
                        if (size > 0x00010000) {
                            this.id = FlashSavedata.ID_SANYO;
                            this.bank1 = new DataView(this.buffer, 0x00010000);
                        }
                        else {
                            this.id = FlashSavedata.ID_PANASONIC;
                            this.bank1 = null;
                        }
                        this.bank = this.bank0;
                    }
                    load8(offset) {
                        if (this.idMode && offset < 2) {
                            return (this.id >> (offset << 3)) & 0xFF;
                        }
                        else if (offset < 0x10000) {
                            return this.bank.getInt8(offset);
                        }
                        else {
                            return 0;
                        }
                    }
                    load16(offset) {
                        return (this.load8(offset) & 0xFF) | (this.load8(offset + 1) << 8);
                    }
                    load32(offset) {
                        return (this.load8(offset) & 0xFF) | (this.load8(offset + 1) << 8) | (this.load8(offset + 2) << 16) | (this.load8(offset + 3) << 24);
                    }
                    loadU8(offset) {
                        return this.load8(offset) & 0xFF;
                    }
                    loadU16(offset) {
                        return (this.loadU8(offset) & 0xFF) | (this.loadU8(offset + 1) << 8);
                    }
                    store8(offset, value) {
                        switch (this.command) {
                            case 0:
                                if (offset == 0x5555) {
                                    if (this.second == 0x55) {
                                        switch (value) {
                                            case FlashSavedata.COMMAND_ERASE:
                                                this.pendingCommand = value;
                                                break;
                                            case FlashSavedata.COMMAND_ID:
                                                this.idMode = true;
                                                break;
                                            case FlashSavedata.COMMAND_TERMINATE_ID:
                                                this.idMode = false;
                                                break;
                                            default:
                                                this.command = value;
                                                break;
                                        }
                                        this.second = 0;
                                        this.first = 0;
                                    }
                                    else {
                                        this.command = 0;
                                        this.first = value;
                                        this.idMode = false;
                                    }
                                }
                                else if (offset == 0x2AAA && this.first == 0xAA) {
                                    this.first = 0;
                                    if (this.pendingCommand) {
                                        this.command = this.pendingCommand;
                                    }
                                    else {
                                        this.second = value;
                                    }
                                }
                                break;
                            case FlashSavedata.COMMAND_ERASE:
                                switch (value) {
                                    case FlashSavedata.COMMAND_WIPE:
                                        if (offset == 0x5555) {
                                            for (var i = 0; i < this.view.byteLength; i += 4) {
                                                this.view.setInt32(i, -1);
                                            }
                                        }
                                        break;
                                    case FlashSavedata.COMMAND_ERASE_SECTOR:
                                        if ((offset & 0x0FFF) == 0) {
                                            for (var i = offset; i < offset + 0x1000; i += 4) {
                                                this.bank.setInt32(i, -1);
                                            }
                                        }
                                        break;
                                }
                                this.pendingCommand = 0;
                                this.command = 0;
                                break;
                            case FlashSavedata.COMMAND_WRITE:
                                this.bank.setInt8(offset, value);
                                this.command = 0;
                                this.writePending = true;
                                break;
                            case FlashSavedata.COMMAND_SWITCH_BANK:
                                if (this.bank1 && offset == 0) {
                                    if (value == 1) {
                                        this.bank = this.bank1;
                                    }
                                    else {
                                        this.bank = this.bank0;
                                    }
                                }
                                this.command = 0;
                                break;
                        }
                    }
                    store16(offset, value) {
                        throw new Error("Unaligned save to flash!");
                    }
                    store32(offset, value) {
                        throw new Error("Unaligned save to flash!");
                    }
                    replaceData(memory) {
                        const bank = this.view === this.bank1;
                        super.replaceData(memory, 0);
                        this.bank0 = new DataView(this.buffer, 0, 0x00010000);
                        if (memory.byteLength > 0x00010000) {
                            this.bank1 = new DataView(this.buffer, 0x00010000);
                        }
                        else {
                            this.bank1 = null;
                        }
                        if (bank && !this.bank1) {
                            throw new Error("no init bank");
                        }
                        this.bank = bank ? this.bank1 : this.bank0;
                    }
                }
                FlashSavedata.COMMAND_WIPE = 0x10;
                FlashSavedata.COMMAND_ERASE_SECTOR = 0x30;
                FlashSavedata.COMMAND_ERASE = 0x80;
                FlashSavedata.COMMAND_ID = 0x90;
                FlashSavedata.COMMAND_WRITE = 0xA0;
                FlashSavedata.COMMAND_SWITCH_BANK = 0xB0;
                FlashSavedata.COMMAND_TERMINATE_ID = 0xF0;
                FlashSavedata.ID_PANASONIC = 0x1B32;
                FlashSavedata.ID_SANYO = 0x1362;
                return FlashSavedata;
            })();
            exports_30("default", FlashSavedata);
        }
    };
});
System.register("savedata/SRAMSavedata", ["mmu/MemoryView"], function (exports_31, context_31) {
    "use strict";
    var MemoryView_ts_6, SRAMSavedata;
    var __moduleName = context_31 && context_31.id;
    return {
        setters: [
            function (MemoryView_ts_6_1) {
                MemoryView_ts_6 = MemoryView_ts_6_1;
            }
        ],
        execute: function () {
            SRAMSavedata = class SRAMSavedata extends MemoryView_ts_6.default {
                constructor(size) {
                    super(new ArrayBuffer(size));
                    this.writePending = false;
                    this.dma = null;
                }
                store8(offset, value) {
                    this.view.setInt8(offset, value);
                    this.writePending = true;
                }
                store16(offset, value) {
                    this.view.setInt16(offset, value, true);
                    this.writePending = true;
                }
                store32(offset, value) {
                    this.view.setInt32(offset, value, true);
                    this.writePending = true;
                }
            };
            exports_31("default", SRAMSavedata);
        }
    };
});
// https://github.com/mgba-emu/mgba/blob/master/src/gba/savedata.c
// SRAM
// FLASH1M
// FLASH512
// EEPROM
// EEPROM512
System.register("savedata/mod", ["savedata/EEPROMSavedata", "savedata/FlashSavedata", "savedata/SRAMSavedata", "interfaces"], function (exports_32, context_32) {
    "use strict";
    var EEPROMSavedata_ts_1, FlashSavedata_ts_1, SRAMSavedata_ts_1, interfaces_ts_6;
    var __moduleName = context_32 && context_32.id;
    function factory(saveType) {
        switch (saveType) {
            case 'FLASH_V':
            case 'FLASH512_V':
                return {
                    region: interfaces_ts_6.MemoryRegion.CART_SRAM,
                    savedata: new FlashSavedata_ts_1.default(interfaces_ts_6.MemoryRegionSize.CART_FLASH512),
                    saveType
                };
            case 'FLASH1M_V':
                return {
                    region: interfaces_ts_6.MemoryRegion.CART_SRAM,
                    savedata: new FlashSavedata_ts_1.default(interfaces_ts_6.MemoryRegionSize.CART_FLASH1M),
                    saveType
                };
            case 'SRAM_V':
                return {
                    region: interfaces_ts_6.MemoryRegion.CART_SRAM,
                    savedata: new SRAMSavedata_ts_1.default(interfaces_ts_6.MemoryRegionSize.CART_SRAM),
                    saveType
                };
            case 'EEPROM_V':
                return {
                    region: interfaces_ts_6.MemoryRegion.CART2 + 1,
                    savedata: new EEPROMSavedata_ts_1.default(interfaces_ts_6.MemoryRegionSize.CART_EEPROM),
                    saveType
                };
        }
        return {
            region: interfaces_ts_6.MemoryRegion.CART_SRAM,
            savedata: new SRAMSavedata_ts_1.default(interfaces_ts_6.MemoryRegionSize.CART_SRAM),
            saveType: 'SRAM_V'
        };
    }
    exports_32("factory", factory);
    return {
        setters: [
            function (EEPROMSavedata_ts_1_1) {
                EEPROMSavedata_ts_1 = EEPROMSavedata_ts_1_1;
            },
            function (FlashSavedata_ts_1_1) {
                FlashSavedata_ts_1 = FlashSavedata_ts_1_1;
            },
            function (SRAMSavedata_ts_1_1) {
                SRAMSavedata_ts_1 = SRAMSavedata_ts_1_1;
            },
            function (interfaces_ts_6_1) {
                interfaces_ts_6 = interfaces_ts_6_1;
            }
        ],
        execute: function () {
            exports_32("EEPROMSavedata", EEPROMSavedata_ts_1.default);
            exports_32("FlashSavedata", FlashSavedata_ts_1.default);
            exports_32("SRAMSavedata", SRAMSavedata_ts_1.default);
        }
    };
});
System.register("mmu/GameBoyAdvanceMMU", ["mmu/BIOSView", "mmu/MemoryBlock", "mmu/BadMemory", "mmu/ROMView", "gpio/mod", "interfaces", "savedata/mod", "utils"], function (exports_33, context_33) {
    "use strict";
    var BIOSView_ts_1, MemoryBlock_ts_2, BadMemory_ts_1, ROMView_ts_1, mod_ts_1, interfaces_ts_7, mod_ts_2, utils_ts_6, GameBoyAdvanceMMU;
    var __moduleName = context_33 && context_33.id;
    return {
        setters: [
            function (BIOSView_ts_1_1) {
                BIOSView_ts_1 = BIOSView_ts_1_1;
            },
            function (MemoryBlock_ts_2_1) {
                MemoryBlock_ts_2 = MemoryBlock_ts_2_1;
            },
            function (BadMemory_ts_1_1) {
                BadMemory_ts_1 = BadMemory_ts_1_1;
            },
            function (ROMView_ts_1_1) {
                ROMView_ts_1 = ROMView_ts_1_1;
            },
            function (mod_ts_1_1) {
                mod_ts_1 = mod_ts_1_1;
            },
            function (interfaces_ts_7_1) {
                interfaces_ts_7 = interfaces_ts_7_1;
            },
            function (mod_ts_2_1) {
                mod_ts_2 = mod_ts_2_1;
            },
            function (utils_ts_6_1) {
                utils_ts_6 = utils_ts_6_1;
            }
        ],
        execute: function () {
            GameBoyAdvanceMMU = class GameBoyAdvanceMMU {
                constructor(ctx) {
                    this.OFFSET_MASK = 0x00FFFFFF;
                    this.DMA_TIMING_NOW = 0;
                    this.DMA_TIMING_VBLANK = 1;
                    this.DMA_TIMING_HBLANK = 2;
                    this.DMA_TIMING_CUSTOM = 3;
                    this.DMA_INCREMENT = 0;
                    this.DMA_DECREMENT = 1;
                    this.DMA_FIXED = 2;
                    this.DMA_INCREMENT_RELOAD = 3;
                    this.DMA_OFFSET = [1, -1, 0, 1];
                    this.ROM_WS = [4, 3, 2, 8];
                    this.ROM_WS_SEQ = [
                        [2, 1],
                        [4, 1],
                        [8, 1]
                    ];
                    this.ICACHE_PAGE_BITS = 8;
                    this.WAITSTATES = [0, 0, 2, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4];
                    this.WAITSTATES_32 = [0, 0, 5, 0, 0, 1, 0, 1, 7, 7, 9, 9, 13, 13, 8];
                    this.WAITSTATES_SEQ = [0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 4, 4, 8, 8, 4];
                    this.WAITSTATES_SEQ_32 = [0, 0, 5, 0, 0, 1, 0, 1, 5, 5, 9, 9, 17, 17, 8];
                    this.NULLWAIT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    this.waitstates = [];
                    this.waitstatesSeq = [];
                    this.waitstates32 = [];
                    this.waitstatesSeq32 = [];
                    this.waitstatesPrefetch = [];
                    this.waitstatesPrefetch32 = [];
                    this.badMemory = null;
                    this.bios = null;
                    this.save = null;
                    this.memory = [];
                    this.cart = null;
                    for (let i = 15; i < 256; ++i) {
                        this.WAITSTATES[i] = 0;
                        this.WAITSTATES_32[i] = 0;
                        this.WAITSTATES_SEQ[i] = 0;
                        this.WAITSTATES_SEQ_32[i] = 0;
                        this.NULLWAIT[i] = 0;
                    }
                    this.PAGE_MASK = (2 << this.ICACHE_PAGE_BITS) - 1;
                    this.core = ctx;
                }
                getBIOS() {
                    return this.bios;
                }
                /**
                 *
                 * @param region
                 * @param object
                 */
                mmap(region, object) {
                    this.memory[region] = object;
                }
                getILog() {
                    return this.core.getLog();
                }
                getCPU() {
                    return this.core.getCPU();
                }
                /**
                 * 清除記憶體
                 */
                clear() {
                    this.badMemory = new BadMemory_ts_1.default(this, this.getCPU());
                    // 0~255
                    // 0x00000000 BIOS
                    // 0x01000000
                    // 0x02000000 On-Board RAM
                    // 0x03000000 In-Chip RAM
                    // 0x04000000 I/O
                    // 0x05000000 Palette
                    // 0x06000000 VRAM
                    // 0x07000000 ORAM
                    // 0x08000000 Gamepak WS0
                    // 0x0A000000 Gamepak WS1
                    // 0x0C000000 Gamepak WS2
                    // 0x0E000000 Gamepak SRAM
                    this.memory = [
                        this.bios,
                        this.badMemory,
                        new MemoryBlock_ts_2.default(interfaces_ts_7.MemoryRegionSize.WORKING_RAM, 9),
                        new MemoryBlock_ts_2.default(interfaces_ts_7.MemoryRegionSize.WORKING_IRAM, 7),
                        null,
                        null,
                        null,
                        null,
                        this.badMemory,
                        this.badMemory,
                        this.badMemory,
                        this.badMemory,
                        this.badMemory,
                        this.badMemory,
                        this.badMemory,
                        this.badMemory // Unused
                    ];
                    for (let i = 16; i < 256; ++i) {
                        this.memory[i] = this.badMemory;
                    }
                    this.waitstates = this.WAITSTATES.slice(0);
                    this.waitstatesSeq = this.WAITSTATES_SEQ.slice(0);
                    this.waitstates32 = this.WAITSTATES_32.slice(0);
                    this.waitstatesSeq32 = this.WAITSTATES_SEQ_32.slice(0);
                    this.waitstatesPrefetch = this.WAITSTATES_SEQ.slice(0);
                    this.waitstatesPrefetch32 = this.WAITSTATES_SEQ_32.slice(0);
                    this.cart = null;
                    this.save = null;
                    const io = this.core.getIO();
                    this.DMA_REGISTER = [
                        io.DMA0CNT_HI >> 1,
                        io.DMA1CNT_HI >> 1,
                        io.DMA2CNT_HI >> 1,
                        io.DMA3CNT_HI >> 1
                    ];
                }
                freeze() {
                    return {
                        'ram': utils_ts_6.Serializer.prefix(this.getWorkingRam().buffer),
                        'iram': utils_ts_6.Serializer.prefix(this.getWorkingIRam().buffer),
                    };
                }
                getWorkingRam() {
                    return this.memory[interfaces_ts_7.MemoryRegion.WORKING_RAM];
                }
                getWorkingIRam() {
                    return this.memory[interfaces_ts_7.MemoryRegion.WORKING_IRAM];
                }
                defrost(frost) {
                    this.getWorkingRam().replaceData(frost.ram, 0);
                    this.getWorkingIRam().replaceData(frost.iram, 0);
                }
                /**
                 * 載入 BIOS
                 * @param bios
                 * @param real
                 */
                loadBios(bios, real = false) {
                    this.bios = new BIOSView_ts_1.default(bios);
                    this.bios.real = real;
                }
                /**
                 * 載入遊戲
                 * @param rom 遊戲 ROM
                 * @param process
                 */
                loadRom(rom, process) {
                    const lo = new ROMView_ts_1.default(rom);
                    if (lo.view.getUint8(0xB2) != 0x96) {
                        // Not a valid ROM
                        return null;
                    }
                    lo.setMMU(this); // Needed for GPIO        
                    this.memory[interfaces_ts_7.MemoryRegion.CART0] = lo;
                    this.memory[interfaces_ts_7.MemoryRegion.CART1] = lo;
                    this.memory[interfaces_ts_7.MemoryRegion.CART2] = lo;
                    if (rom.byteLength > 0x01000000) {
                        const hi = new ROMView_ts_1.default(rom, 0x01000000);
                        this.memory[interfaces_ts_7.MemoryRegion.CART0 + 1] = hi;
                        this.memory[interfaces_ts_7.MemoryRegion.CART1 + 1] = hi;
                        this.memory[interfaces_ts_7.MemoryRegion.CART2 + 1] = hi;
                    }
                    let cart = {
                        title: null,
                        code: null,
                        maker: null,
                        memory: rom,
                        saveType: null,
                    };
                    if (process) {
                        cart.title = this.findTitle(rom);
                        cart.code = this.findCode(rom);
                        cart.maker = this.findMaker(rom);
                        // Find savedata type
                        const saveType = this.findSaveType(rom);
                        // if(saveType){                
                        // try{
                        const result = mod_ts_2.factory(saveType || '');
                        this.save = result.savedata;
                        this.memory[result.region] = result.savedata;
                        this.save.dma = this.getIRQ().dma[3];
                        cart.saveType = result.saveType;
                        // }catch(err){
                        // nothing
                        // }
                        // }
                        // if (!this.save) {
                        // Assume we have SRAM
                        // this.save = this.memory[MemoryRegion.CART_SRAM] = new SRAMSavedata(this.SIZE_CART_SRAM);
                        // }
                    }
                    this.cart = cart;
                    return cart;
                }
                findTitle(rom) {
                    const content = new Uint8Array(rom);
                    return String.fromCharCode(...content.slice(0xa0, 0xa0 + 12));
                }
                findCode(rom) {
                    const content = new Uint8Array(rom);
                    return String.fromCharCode(...content.slice(0xac, 0xac + 4));
                }
                findMaker(rom) {
                    const content = new Uint8Array(rom);
                    return String.fromCharCode(...content.slice(0xb0, 0xb0 + 2));
                }
                /**
                 * 存檔格式類型
                 * @param rom
                 */
                findSaveType(rom) {
                    let state = '';
                    let next;
                    const pattern1 = ['F',
                        'FL',
                        'FLA',
                        'FLAS',
                        'FLASH',
                        'FLASH_',
                        'FLASH5',
                        'FLASH51',
                        'FLASH512',
                        'FLASH512_',
                        'FLASH1',
                        'FLASH1M',
                        'FLASH1M_',
                        'S',
                        'SR',
                        'SRA',
                        'SRAM',
                        'SRAM_',
                        'E',
                        'EE',
                        'EEP',
                        'EEPR',
                        'EEPRO',
                        'EEPROM',
                        'EEPROM_'];
                    const pattern2 = [
                        'FLASH_V',
                        'FLASH512_V',
                        'FLASH1M_V',
                        'SRAM_V',
                        'EEPROM_V',
                    ];
                    const content = new Uint8Array(rom);
                    for (let i = 0xe4; i < content.length; ++i) {
                        next = String.fromCharCode(content[i]);
                        state += next;
                        if (pattern1.includes(state)) {
                            continue;
                        }
                        if (pattern2.includes(state)) {
                            return state;
                        }
                        state = next;
                    }
                    return null;
                }
                /**
                 * 載入遊戲狀態
                 * @param save
                 */
                loadSavedata(save) {
                    if (!this.save) {
                        throw new Error("save is null");
                    }
                    this.save.replaceData(save, 0);
                }
                ;
                getMemoryView(offset) {
                    return this.memory[offset >>> interfaces_ts_7.MemoryBase.BASE_OFFSET];
                }
                load8(offset) {
                    return this.getMemoryView(offset).load8(offset & 0x00FFFFFF);
                }
                load16(offset) {
                    return this.getMemoryView(offset).load16(offset & 0x00FFFFFF);
                }
                load32(offset) {
                    return this.getMemoryView(offset).load32(offset & 0x00FFFFFF);
                }
                loadU8(offset) {
                    return this.getMemoryView(offset).loadU8(offset & 0x00FFFFFF);
                }
                loadU16(offset) {
                    return this.getMemoryView(offset).loadU16(offset & 0x00FFFFFF);
                }
                /**
                 *
                 * @param offset
                 * @param value
                 */
                store8(offset, value) {
                    const maskedOffset = offset & 0x00FFFFFF;
                    const memory = this.getMemoryView(offset);
                    memory.store8(maskedOffset, value);
                    memory.invalidatePage(maskedOffset);
                }
                /**
                 *
                 * @param offset
                 * @param value
                 */
                store16(offset, value) {
                    const maskedOffset = offset & 0x00FFFFFE;
                    const memory = this.getMemoryView(offset);
                    memory.store16(maskedOffset, value);
                    memory.invalidatePage(maskedOffset);
                }
                /**
                 *
                 * @param offset
                 * @param value
                 */
                store32(offset, value) {
                    const maskedOffset = offset & 0x00FFFFFC;
                    const memory = this.getMemoryView(offset);
                    memory.store32(maskedOffset, value);
                    memory.invalidatePage(maskedOffset);
                    memory.invalidatePage(maskedOffset + 2);
                }
                // private getCPU(): ICPU {
                //     if (!this.cpu) {
                //         throw new Error("cpu is null");
                //     }
                //     return this.cpu as ICPU;
                // }
                getMemoryIndex(memory) {
                    return memory >>> interfaces_ts_7.MemoryBase.BASE_OFFSET;
                }
                /**
                 *
                 * @param memory
                 */
                waitPrefetch(memory) {
                    this.getCPU().cycles += 1 + this.waitstatesPrefetch[this.getMemoryIndex(memory)];
                }
                /**
                 *
                 * @param memory
                 */
                waitPrefetch32(memory) {
                    this.getCPU().cycles += 1 + this.waitstatesPrefetch32[this.getMemoryIndex(memory)];
                }
                /**
                 *
                 * @param memory
                 */
                wait(memory) {
                    this.getCPU().cycles += 1 + this.waitstates[this.getMemoryIndex(memory)];
                }
                /**
                 *
                 * @param memory
                 */
                wait32(memory) {
                    this.getCPU().cycles += 1 + this.waitstates32[this.getMemoryIndex(memory)];
                }
                /**
                 *
                 * @param memory
                 */
                waitSeq(memory) {
                    this.getCPU().cycles += 1 + this.waitstatesSeq[this.getMemoryIndex(memory)];
                }
                /**
                 *
                 * @param memory
                 */
                waitSeq32(memory) {
                    this.getCPU().cycles += 1 + this.waitstatesSeq32[this.getMemoryIndex(memory)];
                }
                /**
                 *
                 * @param rs
                 */
                waitMul(rs) {
                    const cpu = this.getCPU();
                    if (((rs & 0xFFFFFF00) == 0xFFFFFF00) || !(rs & 0xFFFFFF00)) {
                        cpu.cycles += 1;
                    }
                    else if (((rs & 0xFFFF0000) == 0xFFFF0000) || !(rs & 0xFFFF0000)) {
                        cpu.cycles += 2;
                    }
                    else if (((rs & 0xFF000000) == 0xFF000000) || !(rs & 0xFF000000)) {
                        cpu.cycles += 3;
                    }
                    else {
                        cpu.cycles += 4;
                    }
                }
                /**
                 *
                 * @param memory
                 * @param seq
                 */
                waitMulti32(memory, seq) {
                    const cpu = this.getCPU();
                    const index = this.getMemoryIndex(memory);
                    cpu.cycles += 1 + this.waitstates32[index];
                    cpu.cycles += (1 + this.waitstatesSeq32[index]) * (seq - 1);
                }
                addressToPage(region, address) {
                    if (!this.memory[region]) {
                        throw new Error("memory is invalid");
                    }
                    const memory = this.memory[region];
                    return address >> memory.ICACHE_PAGE_BITS;
                }
                /**
                 *
                 * @param region
                 * @param pageId
                 */
                accessPage(region, pageId) {
                    const memory = this.memory[region];
                    if (!memory.icache) {
                        throw new Error("no init icache");
                    }
                    const bios = this.memory[region];
                    let page = memory.icache[pageId];
                    if (!page || page.invalid) {
                        page = {
                            thumb: new Array(1 << (bios.ICACHE_PAGE_BITS)),
                            arm: new Array(1 << bios.ICACHE_PAGE_BITS - 1),
                            invalid: false
                        };
                        memory.icache[pageId] = page;
                    }
                    return page;
                }
                scheduleDma(number, info) {
                    switch (info.timing) {
                        case this.DMA_TIMING_NOW:
                            this.serviceDma(number, info);
                            break;
                        case this.DMA_TIMING_HBLANK:
                            // Handled implicitly
                            break;
                        case this.DMA_TIMING_VBLANK:
                            // Handled implicitly
                            break;
                        case this.DMA_TIMING_CUSTOM:
                            switch (number) {
                                case 0:
                                    this.core.getLog().WARN('Discarding invalid DMA0 scheduling');
                                    break;
                                case 1:
                                case 2:
                                    this.getAudio().scheduleFIFODma(number, info);
                                    break;
                                // case 3:
                                // this.getIRQ().video.scheduleVCaptureDma(dma, info);
                                // break;
                            }
                    }
                }
                getAudio() {
                    return this.core.getAudio();
                }
                getIRQ() {
                    return this.core.getIRQ();
                }
                /**
                 *
                 */
                runHblankDmas() {
                    const irq = this.getIRQ();
                    for (let i = 0; i < irq.dma.length; ++i) {
                        const dma = irq.dma[i];
                        if (dma.enable && dma.timing == this.DMA_TIMING_HBLANK) {
                            this.serviceDma(i, dma);
                        }
                    }
                }
                /**
                 *
                 */
                runVblankDmas() {
                    const irq = this.getIRQ();
                    for (let i = 0; i < irq.dma.length; ++i) {
                        const dma = irq.dma[i];
                        if (dma.enable && dma.timing == this.DMA_TIMING_VBLANK) {
                            this.serviceDma(i, dma);
                        }
                    }
                }
                /**
                 *
                 * @param number
                 * @param info
                 */
                serviceDma(number, info) {
                    if (!info.enable) {
                        // There was a DMA scheduled that got canceled
                        return;
                    }
                    const width = info.width;
                    const sourceOffset = this.DMA_OFFSET[info.srcControl] * width;
                    const destOffset = this.DMA_OFFSET[info.dstControl] * width;
                    let wordsRemaining = info.nextCount;
                    let source = info.nextSource & this.OFFSET_MASK;
                    let dest = info.nextDest & this.OFFSET_MASK;
                    const sourceRegion = info.nextSource >>> interfaces_ts_7.MemoryBase.BASE_OFFSET;
                    const destRegion = info.nextDest >>> interfaces_ts_7.MemoryBase.BASE_OFFSET;
                    const sourceBlock = this.memory[sourceRegion];
                    const sourceBlockMem = this.memory[sourceRegion];
                    const destBlock = this.memory[destRegion];
                    const destBlockMem = this.memory[destRegion];
                    let sourceView = null;
                    let destView = null;
                    let sourceMask = 0xFFFFFFFF;
                    let destMask = 0xFFFFFFFF;
                    let word;
                    if (destBlock.ICACHE_PAGE_BITS) {
                        var endPage = (dest + wordsRemaining * width) >> destBlock.ICACHE_PAGE_BITS;
                        for (var i = dest >> destBlock.ICACHE_PAGE_BITS; i <= endPage; ++i) {
                            destBlockMem.invalidatePage(i << destBlock.ICACHE_PAGE_BITS);
                        }
                    }
                    if (destRegion == interfaces_ts_7.MemoryRegion.WORKING_RAM || destRegion == interfaces_ts_7.MemoryRegion.WORKING_IRAM) {
                        destView = destBlockMem.view;
                        destMask = destBlockMem.mask;
                    }
                    if (sourceRegion == interfaces_ts_7.MemoryRegion.WORKING_RAM || sourceRegion == interfaces_ts_7.MemoryRegion.WORKING_IRAM || sourceRegion == interfaces_ts_7.MemoryRegion.CART0 || sourceRegion == interfaces_ts_7.MemoryRegion.CART1) {
                        sourceView = sourceBlockMem.view;
                        sourceMask = sourceBlockMem.mask;
                    }
                    if (sourceBlock && destBlock) {
                        if (sourceView && destView) {
                            if (width == 4) {
                                source &= 0xFFFFFFFC;
                                dest &= 0xFFFFFFFC;
                                while (wordsRemaining--) {
                                    word = sourceView.getInt32(source & sourceMask);
                                    destView.setInt32(dest & destMask, word);
                                    source += sourceOffset;
                                    dest += destOffset;
                                }
                            }
                            else {
                                while (wordsRemaining--) {
                                    word = sourceView.getUint16(source & sourceMask);
                                    destView.setUint16(dest & destMask, word);
                                    source += sourceOffset;
                                    dest += destOffset;
                                }
                            }
                        }
                        else if (sourceView) {
                            if (width == 4) {
                                source &= 0xFFFFFFFC;
                                dest &= 0xFFFFFFFC;
                                while (wordsRemaining--) {
                                    word = sourceView.getInt32(source & sourceMask, true);
                                    destBlockMem.store32(dest, word);
                                    source += sourceOffset;
                                    dest += destOffset;
                                }
                            }
                            else {
                                while (wordsRemaining--) {
                                    word = sourceView.getUint16(source & sourceMask, true);
                                    destBlockMem.store16(dest, word);
                                    source += sourceOffset;
                                    dest += destOffset;
                                }
                            }
                        }
                        else {
                            if (width == 4) {
                                source &= 0xFFFFFFFC;
                                dest &= 0xFFFFFFFC;
                                while (wordsRemaining--) {
                                    word = sourceBlockMem.load32(source);
                                    destBlockMem.store32(dest, word);
                                    source += sourceOffset;
                                    dest += destOffset;
                                }
                            }
                            else {
                                while (wordsRemaining--) {
                                    word = sourceBlockMem.loadU16(source);
                                    destBlockMem.store16(dest, word);
                                    source += sourceOffset;
                                    dest += destOffset;
                                }
                            }
                        }
                    }
                    else {
                        this.getILog().WARN('Invalid DMA');
                    }
                    if (info.doIrq) {
                        info.nextIRQ = this.getCPU().cycles + 2;
                        info.nextIRQ += (width == 4 ? this.waitstates32[sourceRegion] + this.waitstates32[destRegion]
                            : this.waitstates[sourceRegion] + this.waitstates[destRegion]);
                        info.nextIRQ += (info.count - 1) * (width == 4 ? this.waitstatesSeq32[sourceRegion] + this.waitstatesSeq32[destRegion]
                            : this.waitstatesSeq[sourceRegion] + this.waitstatesSeq[destRegion]);
                    }
                    info.nextSource = source | (sourceRegion << interfaces_ts_7.MemoryBase.BASE_OFFSET);
                    info.nextDest = dest | (destRegion << interfaces_ts_7.MemoryBase.BASE_OFFSET);
                    info.nextCount = wordsRemaining;
                    if (!info.repeat) {
                        info.enable = false;
                        // Clear the enable bit in memory
                        if (!this.DMA_REGISTER) {
                            throw new Error("dma register invalid");
                        }
                        const dmaReg = this.DMA_REGISTER[number];
                        const io = this.getIIO();
                        if (!io.registers) {
                            throw new Error("io register no init");
                        }
                        io.registers[dmaReg] &= 0x7FE0;
                    }
                    else {
                        info.nextCount = info.count;
                        if (info.dstControl == this.DMA_INCREMENT_RELOAD) {
                            info.nextDest = info.dest;
                        }
                        this.scheduleDma(number, info);
                    }
                }
                getIIO() {
                    return this.memory[interfaces_ts_7.MemoryRegion.IO];
                }
                /**
                 *
                 * @param word
                 */
                adjustTimings(word) {
                    var sram = word & 0x0003;
                    var ws0 = (word & 0x000C) >> 2;
                    var ws0seq = (word & 0x0010) >> 4;
                    var ws1 = (word & 0x0060) >> 5;
                    var ws1seq = (word & 0x0080) >> 7;
                    var ws2 = (word & 0x0300) >> 8;
                    var ws2seq = (word & 0x0400) >> 10;
                    var prefetch = word & 0x4000;
                    this.waitstates[interfaces_ts_7.MemoryRegion.CART_SRAM] = this.ROM_WS[sram];
                    this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART_SRAM] = this.ROM_WS[sram];
                    this.waitstates32[interfaces_ts_7.MemoryRegion.CART_SRAM] = this.ROM_WS[sram];
                    this.waitstatesSeq32[interfaces_ts_7.MemoryRegion.CART_SRAM] = this.ROM_WS[sram];
                    this.waitstates[interfaces_ts_7.MemoryRegion.CART0] = this.waitstates[interfaces_ts_7.MemoryRegion.CART0 + 1] = this.ROM_WS[ws0];
                    this.waitstates[interfaces_ts_7.MemoryRegion.CART1] = this.waitstates[interfaces_ts_7.MemoryRegion.CART1 + 1] = this.ROM_WS[ws1];
                    this.waitstates[interfaces_ts_7.MemoryRegion.CART2] = this.waitstates[interfaces_ts_7.MemoryRegion.CART2 + 1] = this.ROM_WS[ws2];
                    this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART0] = this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART0 + 1] = this.ROM_WS_SEQ[0][ws0seq];
                    this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART1] = this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART1 + 1] = this.ROM_WS_SEQ[1][ws1seq];
                    this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART2] = this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART2 + 1] = this.ROM_WS_SEQ[2][ws2seq];
                    this.waitstates32[interfaces_ts_7.MemoryRegion.CART0] = this.waitstates32[interfaces_ts_7.MemoryRegion.CART0 + 1] = this.waitstates[interfaces_ts_7.MemoryRegion.CART0] + 1 + this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART0];
                    this.waitstates32[interfaces_ts_7.MemoryRegion.CART1] = this.waitstates32[interfaces_ts_7.MemoryRegion.CART1 + 1] = this.waitstates[interfaces_ts_7.MemoryRegion.CART1] + 1 + this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART1];
                    this.waitstates32[interfaces_ts_7.MemoryRegion.CART2] = this.waitstates32[interfaces_ts_7.MemoryRegion.CART2 + 1] = this.waitstates[interfaces_ts_7.MemoryRegion.CART2] + 1 + this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART2];
                    this.waitstatesSeq32[interfaces_ts_7.MemoryRegion.CART0] = this.waitstatesSeq32[interfaces_ts_7.MemoryRegion.CART0 + 1] = 2 * this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART0] + 1;
                    this.waitstatesSeq32[interfaces_ts_7.MemoryRegion.CART1] = this.waitstatesSeq32[interfaces_ts_7.MemoryRegion.CART1 + 1] = 2 * this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART1] + 1;
                    this.waitstatesSeq32[interfaces_ts_7.MemoryRegion.CART2] = this.waitstatesSeq32[interfaces_ts_7.MemoryRegion.CART2 + 1] = 2 * this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART2] + 1;
                    if (prefetch) {
                        this.waitstatesPrefetch[interfaces_ts_7.MemoryRegion.CART0] = this.waitstatesPrefetch[interfaces_ts_7.MemoryRegion.CART0 + 1] = 0;
                        this.waitstatesPrefetch[interfaces_ts_7.MemoryRegion.CART1] = this.waitstatesPrefetch[interfaces_ts_7.MemoryRegion.CART1 + 1] = 0;
                        this.waitstatesPrefetch[interfaces_ts_7.MemoryRegion.CART2] = this.waitstatesPrefetch[interfaces_ts_7.MemoryRegion.CART2 + 1] = 0;
                        this.waitstatesPrefetch32[interfaces_ts_7.MemoryRegion.CART0] = this.waitstatesPrefetch32[interfaces_ts_7.MemoryRegion.CART0 + 1] = 0;
                        this.waitstatesPrefetch32[interfaces_ts_7.MemoryRegion.CART1] = this.waitstatesPrefetch32[interfaces_ts_7.MemoryRegion.CART1 + 1] = 0;
                        this.waitstatesPrefetch32[interfaces_ts_7.MemoryRegion.CART2] = this.waitstatesPrefetch32[interfaces_ts_7.MemoryRegion.CART2 + 1] = 0;
                    }
                    else {
                        this.waitstatesPrefetch[interfaces_ts_7.MemoryRegion.CART0] = this.waitstatesPrefetch[interfaces_ts_7.MemoryRegion.CART0 + 1] = this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART0];
                        this.waitstatesPrefetch[interfaces_ts_7.MemoryRegion.CART1] = this.waitstatesPrefetch[interfaces_ts_7.MemoryRegion.CART1 + 1] = this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART1];
                        this.waitstatesPrefetch[interfaces_ts_7.MemoryRegion.CART2] = this.waitstatesPrefetch[interfaces_ts_7.MemoryRegion.CART2 + 1] = this.waitstatesSeq[interfaces_ts_7.MemoryRegion.CART2];
                        this.waitstatesPrefetch32[interfaces_ts_7.MemoryRegion.CART0] = this.waitstatesPrefetch32[interfaces_ts_7.MemoryRegion.CART0 + 1] = this.waitstatesSeq32[interfaces_ts_7.MemoryRegion.CART0];
                        this.waitstatesPrefetch32[interfaces_ts_7.MemoryRegion.CART1] = this.waitstatesPrefetch32[interfaces_ts_7.MemoryRegion.CART1 + 1] = this.waitstatesSeq32[interfaces_ts_7.MemoryRegion.CART1];
                        this.waitstatesPrefetch32[interfaces_ts_7.MemoryRegion.CART2] = this.waitstatesPrefetch32[interfaces_ts_7.MemoryRegion.CART2 + 1] = this.waitstatesSeq32[interfaces_ts_7.MemoryRegion.CART2];
                    }
                }
                getISave() {
                    if (!this.save) {
                        throw new Error("save is null");
                    }
                    return this.save;
                }
                /**
                 *
                 */
                saveNeedsFlush() {
                    return this.getISave().writePending;
                }
                /**
                 *
                 */
                flushSave() {
                    this.getISave().writePending = false;
                }
                allocGPIO(rom) {
                    return new mod_ts_1.GameBoyAdvanceGPIO(this.core.getGBA(), rom);
                }
            };
            exports_33("default", GameBoyAdvanceMMU);
        }
    };
});
System.register("mmu/mod", ["mmu/GameBoyAdvanceMMU"], function (exports_34, context_34) {
    "use strict";
    var GameBoyAdvanceMMU_ts_1;
    var __moduleName = context_34 && context_34.id;
    function factoryMMU(ctx) {
        return new GameBoyAdvanceMMU_ts_1.default(ctx);
    }
    exports_34("factoryMMU", factoryMMU);
    return {
        setters: [
            function (GameBoyAdvanceMMU_ts_1_1) {
                GameBoyAdvanceMMU_ts_1 = GameBoyAdvanceMMU_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("constants", [], function (exports_35, context_35) {
    "use strict";
    var SHIFT_32;
    var __moduleName = context_35 && context_35.id;
    return {
        setters: [],
        execute: function () {
            exports_35("SHIFT_32", SHIFT_32 = 1 / 0x100000000);
        }
    };
});
System.register("core/ARMCoreArm", ["interfaces", "constants"], function (exports_36, context_36) {
    "use strict";
    var interfaces_ts_8, constants_ts_1, ARMCoreArm;
    var __moduleName = context_36 && context_36.id;
    return {
        setters: [
            function (interfaces_ts_8_1) {
                interfaces_ts_8 = interfaces_ts_8_1;
            },
            function (constants_ts_1_1) {
                constants_ts_1 = constants_ts_1_1;
            }
        ],
        execute: function () {
            ARMCoreArm = class ARMCoreArm {
                constructor(cpu) {
                    this.cpu = cpu;
                    this.addressingMode23Immediate = [
                        // 000x0
                        function (rn, offset, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                var addr = gprs[rn];
                                if (!condOp || condOp()) {
                                    gprs[rn] -= offset;
                                }
                                return addr;
                            };
                            address.writesPC = rn == cpu.PC;
                            return address;
                        },
                        // 000xW
                        null,
                        null,
                        null,
                        // 00Ux0
                        function (rn, offset, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                const addr = gprs[rn];
                                if (!condOp || condOp()) {
                                    gprs[rn] += offset;
                                }
                                return addr;
                            };
                            address.writesPC = rn == cpu.PC;
                            return address;
                        },
                        // 00UxW
                        null,
                        null,
                        null,
                        // 0P0x0
                        function (rn, offset, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                return gprs[rn] - offset;
                            };
                            address.writesPC = false;
                            return address;
                        },
                        // 0P0xW
                        function (rn, offset, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                const addr = gprs[rn] - offset;
                                if (!condOp || condOp()) {
                                    gprs[rn] = addr;
                                }
                                return addr;
                            };
                            address.writesPC = rn == cpu.PC;
                            return address;
                        },
                        null,
                        null,
                        // 0PUx0
                        function (rn, offset, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                return gprs[rn] + offset;
                            };
                            address.writesPC = false;
                            return address;
                        },
                        // 0PUxW
                        function (rn, offset, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                const addr = gprs[rn] + offset;
                                if (!condOp || condOp()) {
                                    gprs[rn] = addr;
                                }
                                return addr;
                            };
                            address.writesPC = rn == cpu.PC;
                            return address;
                        },
                        null,
                        null,
                    ];
                    this.addressingMode23Register = [
                        // I00x0
                        function (rn, rm, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                const addr = gprs[rn];
                                if (!condOp || condOp()) {
                                    gprs[rn] -= gprs[rm];
                                }
                                return addr;
                            };
                            address.writesPC = rn == cpu.PC;
                            return address;
                        },
                        // I00xW
                        null,
                        null,
                        null,
                        // I0Ux0
                        function (rn, rm, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                const addr = gprs[rn];
                                if (!condOp || condOp()) {
                                    gprs[rn] += gprs[rm];
                                }
                                return addr;
                            };
                            address.writesPC = rn == cpu.PC;
                            return address;
                        },
                        // I0UxW
                        null,
                        null,
                        null,
                        // IP0x0
                        function (rn, rm, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                return gprs[rn] - gprs[rm];
                            };
                            address.writesPC = false;
                            return address;
                        },
                        // IP0xW
                        function (rn, rm, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                const addr = gprs[rn] - gprs[rm];
                                if (!condOp || condOp()) {
                                    gprs[rn] = addr;
                                }
                                return addr;
                            };
                            address.writesPC = rn == cpu.PC;
                            return address;
                        },
                        null,
                        null,
                        // IPUx0
                        function (rn, rm, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                const addr = gprs[rn] + gprs[rm];
                                return addr;
                            };
                            address.writesPC = false;
                            return address;
                        },
                        // IPUxW
                        function (rn, rm, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                const addr = gprs[rn] + gprs[rm];
                                if (!condOp || condOp()) {
                                    gprs[rn] = addr;
                                }
                                return addr;
                            };
                            address.writesPC = rn == cpu.PC;
                            return address;
                        },
                        null,
                        null
                    ];
                    this.addressingMode2RegisterShifted = [
                        // I00x0
                        function (rn, shiftOp, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                const addr = gprs[rn];
                                if (!condOp || condOp()) {
                                    shiftOp();
                                    gprs[rn] -= cpu.shifterOperand;
                                }
                                return addr;
                            };
                            address.writesPC = rn == cpu.PC;
                            return address;
                        },
                        // I00xW
                        null,
                        null,
                        null,
                        // I0Ux0
                        function (rn, shiftOp, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                const addr = gprs[rn];
                                if (!condOp || condOp()) {
                                    shiftOp();
                                    gprs[rn] += cpu.shifterOperand;
                                }
                                return addr;
                            };
                            address.writesPC = rn == cpu.PC;
                            return address;
                        },
                        // I0UxW
                        null,
                        null,
                        null,
                        // IP0x0
                        function (rn, shiftOp, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                shiftOp();
                                return gprs[rn] - cpu.shifterOperand;
                            };
                            address.writesPC = false;
                            return address;
                        },
                        // IP0xW
                        function (rn, shiftOp, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                shiftOp();
                                const addr = gprs[rn] - cpu.shifterOperand;
                                if (!condOp || condOp()) {
                                    gprs[rn] = addr;
                                }
                                return addr;
                            };
                            address.writesPC = rn == cpu.PC;
                            return address;
                        },
                        null,
                        null,
                        // IPUx0
                        function (rn, shiftOp, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                shiftOp();
                                return gprs[rn] + cpu.shifterOperand;
                            };
                            address.writesPC = false;
                            return address;
                        },
                        // IPUxW
                        function (rn, shiftOp, condOp) {
                            const gprs = cpu.gprs;
                            const address = function () {
                                shiftOp();
                                const addr = gprs[rn] + cpu.shifterOperand;
                                if (!condOp || condOp()) {
                                    gprs[rn] = addr;
                                }
                                return addr;
                            };
                            address.writesPC = (rn === cpu.PC);
                            return address;
                        },
                        null,
                        null,
                    ];
                }
                /**
                 *
                 * @param rs
                 * @param rm
                 */
                constructAddressingMode1ASR(rs, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    return function () {
                        ++cpu.cycles;
                        var shift = gprs[rs];
                        if (rs == cpu.PC) {
                            shift += 4;
                        }
                        shift &= 0xFF;
                        var shiftVal = gprs[rm];
                        if (rm == cpu.PC) {
                            shiftVal += 4;
                        }
                        if (shift == 0) {
                            cpu.shifterOperand = shiftVal;
                            cpu.shifterCarryOut = cpu.cpsrC;
                        }
                        else if (shift < 32) {
                            cpu.shifterOperand = shiftVal >> shift;
                            cpu.shifterCarryOut = shiftVal & (1 << (shift - 1));
                        }
                        else if (gprs[rm] >> 31) {
                            cpu.shifterOperand = 0xFFFFFFFF;
                            cpu.shifterCarryOut = 0x80000000;
                        }
                        else {
                            cpu.shifterOperand = 0;
                            cpu.shifterCarryOut = 0;
                        }
                    };
                }
                /**
                 *
                 * @param immediate
                 */
                constructAddressingMode1Immediate(immediate) {
                    const cpu = this.cpu;
                    return function () {
                        cpu.shifterOperand = immediate;
                        cpu.shifterCarryOut = cpu.cpsrC;
                    };
                }
                /**
                 *
                 * @param immediate
                 * @param rotate
                 */
                constructAddressingMode1ImmediateRotate(immediate, rotate) {
                    const cpu = this.cpu;
                    return function () {
                        cpu.shifterOperand = (immediate >>> rotate) | (immediate << (32 - rotate));
                        cpu.shifterCarryOut = cpu.shifterOperand >> 31;
                    };
                }
                /**
                 *
                 * @param rs
                 * @param rm
                 */
                constructAddressingMode1LSL(rs, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    return function () {
                        ++cpu.cycles;
                        var shift = gprs[rs];
                        if (rs == cpu.PC) {
                            shift += 4;
                        }
                        shift &= 0xFF;
                        var shiftVal = gprs[rm];
                        if (rm == cpu.PC) {
                            shiftVal += 4;
                        }
                        if (shift == 0) {
                            cpu.shifterOperand = shiftVal;
                            cpu.shifterCarryOut = cpu.cpsrC;
                        }
                        else if (shift < 32) {
                            cpu.shifterOperand = shiftVal << shift;
                            cpu.shifterCarryOut = shiftVal & (1 << (32 - shift));
                        }
                        else if (shift == 32) {
                            cpu.shifterOperand = 0;
                            cpu.shifterCarryOut = shiftVal & 1;
                        }
                        else {
                            cpu.shifterOperand = 0;
                            cpu.shifterCarryOut = 0;
                        }
                    };
                }
                /**
                 *
                 * @param rs
                 * @param rm
                 */
                constructAddressingMode1LSR(rs, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    return function () {
                        ++cpu.cycles;
                        var shift = gprs[rs];
                        if (rs == cpu.PC) {
                            shift += 4;
                        }
                        shift &= 0xFF;
                        var shiftVal = gprs[rm];
                        if (rm == cpu.PC) {
                            shiftVal += 4;
                        }
                        if (shift == 0) {
                            cpu.shifterOperand = shiftVal;
                            cpu.shifterCarryOut = cpu.cpsrC;
                        }
                        else if (shift < 32) {
                            cpu.shifterOperand = shiftVal >>> shift;
                            cpu.shifterCarryOut = shiftVal & (1 << (shift - 1));
                        }
                        else if (shift == 32) {
                            cpu.shifterOperand = 0;
                            cpu.shifterCarryOut = shiftVal >> 31;
                        }
                        else {
                            cpu.shifterOperand = 0;
                            cpu.shifterCarryOut = 0;
                        }
                    };
                }
                /**
                 *
                 * @param rs
                 * @param rm
                 */
                constructAddressingMode1ROR(rs, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    return function () {
                        ++cpu.cycles;
                        var shift = gprs[rs];
                        if (rs == cpu.PC) {
                            shift += 4;
                        }
                        shift &= 0xFF;
                        var shiftVal = gprs[rm];
                        if (rm == cpu.PC) {
                            shiftVal += 4;
                        }
                        var rotate = shift & 0x1F;
                        if (shift == 0) {
                            cpu.shifterOperand = shiftVal;
                            cpu.shifterCarryOut = cpu.cpsrC;
                        }
                        else if (rotate) {
                            cpu.shifterOperand = (gprs[rm] >>> rotate) | (gprs[rm] << (32 - rotate));
                            cpu.shifterCarryOut = shiftVal & (1 << (rotate - 1));
                        }
                        else {
                            cpu.shifterOperand = shiftVal;
                            cpu.shifterCarryOut = shiftVal >> 31;
                        }
                    };
                }
                /**
                 *
                 * @param instruction
                 * @param immediate
                 * @param condOp
                 */
                constructAddressingMode23Immediate(instruction, immediate, condOp) {
                    const rn = (instruction & 0x000F0000) >> 16;
                    const address = this.addressingMode23Immediate[(instruction & 0x01A00000) >> 21];
                    if (!address) {
                        throw new Error("invliad address");
                    }
                    return address(rn, immediate, condOp);
                }
                /**
                 *
                 * @param instruction
                 * @param rm
                 * @param condOp
                 */
                constructAddressingMode23Register(instruction, rm, condOp) {
                    const rn = (instruction & 0x000F0000) >> 16;
                    const address = this.addressingMode23Register[(instruction & 0x01A00000) >> 21];
                    if (!address) {
                        throw new Error("invliad address");
                    }
                    return address(rn, rm, condOp);
                }
                /**
                 *
                 * @param instruction
                 * @param shiftOp
                 * @param condOp
                 */
                constructAddressingMode2RegisterShifted(instruction, shiftOp, condOp) {
                    const rn = (instruction & 0x000F0000) >> 16;
                    const address = this.addressingMode2RegisterShifted[(instruction & 0x01A00000) >> 21];
                    if (!address) {
                        throw new Error("invliad address");
                    }
                    return address(rn, shiftOp, condOp);
                }
                /**
                 *
                 */
                constructAddressingMode4(immediate, rn) {
                    const gprs = this.cpu.gprs;
                    return function () {
                        return gprs[rn] + immediate;
                    };
                }
                constructAddressingMode4Writeback(immediate, offset, rn, overlap) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function (writeInitial) {
                        var addr = gprs[rn] + immediate;
                        if (writeInitial && overlap) {
                            mmu.store32(gprs[rn] + immediate - 4, gprs[rn]);
                        }
                        gprs[rn] += offset;
                        return addr;
                    };
                }
                getMMU() {
                    return this.cpu.core.getMMU();
                }
                /**
                 * ADC
                 */
                constructADC(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        const shifterOperand = (cpu.shifterOperand >>> 0) + (!!cpu.cpsrC ? 1 : 0);
                        gprs[rd] = (gprs[rn] >>> 0) + shifterOperand;
                    };
                }
                /**
                 * ADCS
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 * @see https://developer.arm.com/docs/100076/0200/a32t32-instruction-set-reference/a32-and-t32-instructions/adc
                 */
                constructADCS(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        var shifterOperand = (cpu.shifterOperand >>> 0) + (!!cpu.cpsrC ? 1 : 0);
                        var d = (gprs[rn] >>> 0) + shifterOperand;
                        if (rd == cpu.PC && cpu.hasSPSR()) {
                            cpu.unpackCPSR(cpu.spsr);
                        }
                        else {
                            cpu.cpsrN = d >> 31;
                            cpu.cpsrZ = !(d & 0xFFFFFFFF) ? 1 : 0;
                            cpu.cpsrC = (d > 0xFFFFFFFF ? 1 : 0);
                            cpu.cpsrV = ((gprs[rn] >> 31) == (shifterOperand >> 31) &&
                                (gprs[rn] >> 31) != (d >> 31) &&
                                (shifterOperand >> 31) != (d >> 31) ? 1 : 0);
                        }
                        gprs[rd] = d;
                    };
                }
                ;
                /**
                 * ADD
                 * @param rd 目的暫存器
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 * @see https://developer.arm.com/docs/100076/0200/a32t32-instruction-set-reference/a32-and-t32-instructions/add
                 */
                constructADD(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = (gprs[rn] >>> 0) + (cpu.shifterOperand >>> 0);
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructADDS(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        var d = (gprs[rn] >>> 0) + (cpu.shifterOperand >>> 0);
                        if (rd == cpu.PC && cpu.hasSPSR()) {
                            cpu.unpackCPSR(cpu.spsr);
                        }
                        else {
                            cpu.cpsrN = d >> 31;
                            cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                            cpu.cpsrC = (d > 0xFFFFFFFF) ? 1 : 0;
                            cpu.cpsrV = ((gprs[rn] >> 31) == (cpu.shifterOperand >> 31) &&
                                (gprs[rn] >> 31) != (d >> 31) &&
                                (cpu.shifterOperand >> 31) != (d >> 31)) ? 1 : 0;
                        }
                        gprs[rd] = d;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructAND(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = gprs[rn] & cpu.shifterOperand;
                    };
                }
                ;
                constructANDS(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = gprs[rn] & cpu.shifterOperand;
                        if (rd == cpu.PC && cpu.hasSPSR()) {
                            cpu.unpackCPSR(cpu.spsr);
                        }
                        else {
                            cpu.cpsrN = gprs[rd] >> 31;
                            cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                            cpu.cpsrC = cpu.shifterCarryOut;
                        }
                    };
                }
                ;
                /**
                 *
                 * @param immediate
                 * @param condOp
                 */
                constructB(immediate, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        if (condOp && !condOp()) {
                            mmu.waitPrefetch32(gprs[cpu.PC]);
                            return;
                        }
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        gprs[cpu.PC] += immediate;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructBIC(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = gprs[rn] & ~cpu.shifterOperand;
                    };
                }
                constructBICS(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = gprs[rn] & ~cpu.shifterOperand;
                        if (rd == cpu.PC && cpu.hasSPSR()) {
                            cpu.unpackCPSR(cpu.spsr);
                        }
                        else {
                            cpu.cpsrN = gprs[rd] >> 31;
                            cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                            cpu.cpsrC = cpu.shifterCarryOut;
                        }
                    };
                }
                /**
                 *
                 * @param immediate
                 * @param condOp
                 */
                constructBL(immediate, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        if (condOp && !condOp()) {
                            mmu.waitPrefetch32(gprs[cpu.PC]);
                            return;
                        }
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        gprs[cpu.LR] = gprs[cpu.PC] - 4;
                        gprs[cpu.PC] += immediate;
                    };
                }
                /**
                 *
                 * @param rm
                 * @param condOp
                 */
                constructBX(rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        if (condOp && !condOp()) {
                            mmu.waitPrefetch32(gprs[cpu.PC]);
                            return;
                        }
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        cpu.switchExecMode(gprs[rm] & 0x00000001);
                        gprs[cpu.PC] = gprs[rm] & 0xFFFFFFFE;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructCMN(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        var aluOut = (gprs[rn] >>> 0) + (cpu.shifterOperand >>> 0);
                        cpu.cpsrN = aluOut >> 31;
                        cpu.cpsrZ = (!(aluOut & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = (aluOut > 0xFFFFFFFF) ? 1 : 0;
                        cpu.cpsrV = ((gprs[rn] >> 31) == (cpu.shifterOperand >> 31) &&
                            (gprs[rn] >> 31) != (aluOut >> 31) &&
                            (cpu.shifterOperand >> 31) != (aluOut >> 31)) ? 1 : 0;
                    };
                }
                /**
                 * CMP
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructCMP(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        const aluOut = gprs[rn] - cpu.shifterOperand;
                        cpu.cpsrN = aluOut >> 31;
                        cpu.cpsrZ = (!(aluOut & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = ((gprs[rn] >>> 0) >= (cpu.shifterOperand >>> 0)) ? 1 : 0;
                        cpu.cpsrV = ((gprs[rn] >> 31) != (cpu.shifterOperand >> 31) &&
                            (gprs[rn] >> 31) != (aluOut >> 31)) ? 1 : 0;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructEOR(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = gprs[rn] ^ cpu.shifterOperand;
                    };
                }
                ;
                /**
                 * EORS
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructEORS(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = gprs[rn] ^ cpu.shifterOperand;
                        if (rd == cpu.PC && cpu.hasSPSR()) {
                            cpu.unpackCPSR(cpu.spsr);
                        }
                        else {
                            cpu.cpsrN = gprs[rd] >> 31;
                            cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                            cpu.cpsrC = cpu.shifterCarryOut;
                        }
                    };
                }
                /**
                 * LDM
                 * @param rs
                 * @param address
                 * @param condOp
                 */
                constructLDM(rs, address, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        let addr = address(false);
                        let total = 0;
                        let m, i;
                        for (m = rs, i = 0; m; m >>= 1, ++i) {
                            if (m & 1) {
                                gprs[i] = mmu.load32(addr & 0xFFFFFFFC);
                                addr += 4;
                                ++total;
                            }
                        }
                        mmu.waitMulti32(addr, total);
                        ++cpu.cycles;
                    };
                }
                /**
                 * LDMS
                 * @param rs
                 * @param address
                 * @param condOp
                 */
                constructLDMS(rs, address, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        let addr = address(false);
                        let total = 0;
                        const mode = cpu.mode;
                        cpu.switchMode(interfaces_ts_8.ARMMode.System);
                        let m, i;
                        for (m = rs, i = 0; m; m >>= 1, ++i) {
                            if (m & 1) {
                                gprs[i] = mmu.load32(addr & 0xFFFFFFFC);
                                addr += 4;
                                ++total;
                            }
                        }
                        cpu.switchMode(mode);
                        mmu.waitMulti32(addr, total);
                        ++cpu.cycles;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param address
                 * @param condOp
                 */
                constructLDR(rd, address, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        const addr = address();
                        gprs[rd] = mmu.load32(addr);
                        mmu.wait32(addr);
                        ++cpu.cycles;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param address
                 * @param condOp
                 */
                constructLDRB(rd, address, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        const addr = address();
                        gprs[rd] = mmu.loadU8(addr);
                        mmu.wait(addr);
                        ++cpu.cycles;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param address
                 * @param condOp
                 */
                constructLDRH(rd, address, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        const addr = address();
                        gprs[rd] = mmu.loadU16(addr);
                        mmu.wait(addr);
                        ++cpu.cycles;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param address
                 * @param condOp
                 */
                constructLDRSB(rd, address, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        const addr = address();
                        gprs[rd] = mmu.load8(addr);
                        mmu.wait(addr);
                        ++cpu.cycles;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param address
                 * @param condOp
                 */
                constructLDRSH(rd, address, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        const addr = address();
                        gprs[rd] = mmu.load16(addr);
                        mmu.wait(addr);
                        ++cpu.cycles;
                    };
                }
                /**
                 * MLA
                 * @param rd
                 * @param rn
                 * @param rs
                 * @param rm
                 * @param condOp
                 */
                constructMLA(rd, rn, rs, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        ++cpu.cycles;
                        mmu.waitMul(rs);
                        if ((gprs[rm] & 0xFFFF0000) && (gprs[rs] & 0xFFFF0000)) {
                            // Our data type is a double--we'll lose bits if we do it all at once!
                            const hi = ((gprs[rm] & 0xFFFF0000) * gprs[rs]) & 0xFFFFFFFF;
                            const lo = ((gprs[rm] & 0x0000FFFF) * gprs[rs]) & 0xFFFFFFFF;
                            gprs[rd] = (hi + lo + gprs[rn]) & 0xFFFFFFFF;
                        }
                        else {
                            gprs[rd] = gprs[rm] * gprs[rs] + gprs[rn];
                        }
                    };
                }
                /**
                 * MLAS
                 * @param rd
                 * @param rn
                 * @param rs
                 * @param rm
                 * @param condOp
                 */
                constructMLAS(rd, rn, rs, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        ++cpu.cycles;
                        mmu.waitMul(rs);
                        if ((gprs[rm] & 0xFFFF0000) && (gprs[rs] & 0xFFFF0000)) {
                            // Our data type is a double--we'll lose bits if we do it all at once!
                            const hi = ((gprs[rm] & 0xFFFF0000) * gprs[rs]) & 0xFFFFFFFF;
                            const lo = ((gprs[rm] & 0x0000FFFF) * gprs[rs]) & 0xFFFFFFFF;
                            gprs[rd] = (hi + lo + gprs[rn]) & 0xFFFFFFFF;
                        }
                        else {
                            gprs[rd] = gprs[rm] * gprs[rs] + gprs[rn];
                        }
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * MOV
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructMOV(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = cpu.shifterOperand;
                    };
                }
                /**
                 * MOVS
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructMOVS(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = cpu.shifterOperand;
                        if (rd == cpu.PC && cpu.hasSPSR()) {
                            cpu.unpackCPSR(cpu.spsr);
                        }
                        else {
                            cpu.cpsrN = gprs[rd] >> 31;
                            cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                            cpu.cpsrC = cpu.shifterCarryOut;
                        }
                    };
                }
                /**
                 * MRS
                 * @param rd
                 * @param r
                 * @param condOp
                 */
                constructMRS(rd, r, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        if (r) {
                            gprs[rd] = cpu.spsr;
                        }
                        else {
                            gprs[rd] = cpu.packCPSR();
                        }
                    };
                }
                /**
                 * MSR
                 * @param rm
                 * @param r
                 * @param instruction
                 * @param immediate
                 * @param condOp
                 */
                constructMSR(rm, r, instruction, immediate, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const c = instruction & 0x00010000;
                    const f = instruction & 0x00080000;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        let operand;
                        if (instruction & 0x02000000) {
                            operand = immediate;
                        }
                        else {
                            operand = gprs[rm];
                        }
                        let mask = (c ? 0x000000FF : 0x00000000) |
                            //(x ? 0x0000FF00 : 0x00000000) | // Irrelevant on ARMv4T
                            //(s ? 0x00FF0000 : 0x00000000) | // Irrelevant on ARMv4T
                            (f ? 0xFF000000 : 0x00000000);
                        if (r) {
                            mask &= cpu.USER_MASK | cpu.PRIV_MASK | cpu.STATE_MASK;
                            cpu.spsr = (cpu.spsr & ~mask) | (operand & mask);
                        }
                        else {
                            if (mask & cpu.USER_MASK) {
                                cpu.cpsrN = operand >> 31;
                                cpu.cpsrZ = operand & 0x40000000;
                                cpu.cpsrC = operand & 0x20000000;
                                cpu.cpsrV = operand & 0x10000000;
                            }
                            if (cpu.mode != interfaces_ts_8.ARMMode.User && (mask & cpu.PRIV_MASK)) {
                                cpu.switchMode((operand & 0x0000000F) | 0x00000010);
                                cpu.cpsrI = operand & 0x00000080;
                                cpu.cpsrF = operand & 0x00000040;
                            }
                        }
                    };
                }
                constructMUL(rd, rs, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        mmu.waitMul(gprs[rs]);
                        if ((gprs[rm] & 0xFFFF0000) && (gprs[rs] & 0xFFFF0000)) {
                            // Our data type is a double--we'll lose bits if we do it all at once!
                            var hi = ((gprs[rm] & 0xFFFF0000) * gprs[rs]) | 0;
                            var lo = ((gprs[rm] & 0x0000FFFF) * gprs[rs]) | 0;
                            gprs[rd] = hi + lo;
                        }
                        else {
                            gprs[rd] = gprs[rm] * gprs[rs];
                        }
                    };
                }
                constructMULS(rd, rs, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        mmu.waitMul(gprs[rs]);
                        if ((gprs[rm] & 0xFFFF0000) && (gprs[rs] & 0xFFFF0000)) {
                            // Our data type is a double--we'll lose bits if we do it all at once!
                            var hi = ((gprs[rm] & 0xFFFF0000) * gprs[rs]) | 0;
                            var lo = ((gprs[rm] & 0x0000FFFF) * gprs[rs]) | 0;
                            gprs[rd] = hi + lo;
                        }
                        else {
                            gprs[rd] = gprs[rm] * gprs[rs];
                        }
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructMVN(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = ~cpu.shifterOperand;
                    };
                }
                constructMVNS(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = ~cpu.shifterOperand;
                        if (rd == cpu.PC && cpu.hasSPSR()) {
                            cpu.unpackCPSR(cpu.spsr);
                        }
                        else {
                            cpu.cpsrN = gprs[rd] >> 31;
                            cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                            cpu.cpsrC = cpu.shifterCarryOut;
                        }
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructORR(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = gprs[rn] | cpu.shifterOperand;
                    };
                }
                /**
                 * ORRS
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructORRS(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = gprs[rn] | cpu.shifterOperand;
                        if (rd == cpu.PC && cpu.hasSPSR()) {
                            cpu.unpackCPSR(cpu.spsr);
                        }
                        else {
                            cpu.cpsrN = gprs[rd] >> 31;
                            cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                            cpu.cpsrC = cpu.shifterCarryOut;
                        }
                    };
                }
                /**
                 * RSB
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructRSB(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = cpu.shifterOperand - gprs[rn];
                    };
                }
                ;
                /**
                 * RSBS
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructRSBS(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        var d = cpu.shifterOperand - gprs[rn];
                        if (rd == cpu.PC && cpu.hasSPSR()) {
                            cpu.unpackCPSR(cpu.spsr);
                        }
                        else {
                            cpu.cpsrN = d >> 31;
                            cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                            cpu.cpsrC = ((cpu.shifterOperand >>> 0) >= (gprs[rn] >>> 0)) ? 1 : 0;
                            cpu.cpsrV = ((cpu.shifterOperand >> 31) != (gprs[rn] >> 31) &&
                                (cpu.shifterOperand >> 31) != (d >> 31)) ? 1 : 0;
                        }
                        gprs[rd] = d;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructRSC(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        const n = (gprs[rn] >>> 0) + (!cpu.cpsrC ? 1 : 0);
                        gprs[rd] = (cpu.shifterOperand >>> 0) - n;
                    };
                }
                constructRSCS(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        var n = (gprs[rn] >>> 0) + (!cpu.cpsrC ? 1 : 0);
                        var d = (cpu.shifterOperand >>> 0) - n;
                        if (rd == cpu.PC && cpu.hasSPSR()) {
                            cpu.unpackCPSR(cpu.spsr);
                        }
                        else {
                            cpu.cpsrN = d >> 31;
                            cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                            cpu.cpsrC = ((cpu.shifterOperand >>> 0) >= (d >>> 0)) ? 1 : 0;
                            cpu.cpsrV = ((cpu.shifterOperand >> 31) != (n >> 31) &&
                                (cpu.shifterOperand >> 31) != (d >> 31)) ? 1 : 0;
                        }
                        gprs[rd] = d;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructSBC(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        var shifterOperand = (cpu.shifterOperand >>> 0) + (!cpu.cpsrC ? 1 : 0);
                        gprs[rd] = (gprs[rn] >>> 0) - shifterOperand;
                    };
                }
                constructSBCS(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        var shifterOperand = (cpu.shifterOperand >>> 0) + (!cpu.cpsrC ? 1 : 0);
                        var d = (gprs[rn] >>> 0) - shifterOperand;
                        if (rd == cpu.PC && cpu.hasSPSR()) {
                            cpu.unpackCPSR(cpu.spsr);
                        }
                        else {
                            cpu.cpsrN = d >> 31;
                            cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                            cpu.cpsrC = ((gprs[rn] >>> 0) >= (d >>> 0) ? 1 : 0);
                            cpu.cpsrV = ((gprs[rn] >> 31) != (shifterOperand >> 31) &&
                                (gprs[rn] >> 31) != (d >> 31) ? 1 : 0);
                        }
                        gprs[rd] = d;
                    };
                }
                constructSMLAL(rd, rn, rs, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        cpu.cycles += 2;
                        mmu.waitMul(rs);
                        var hi = (gprs[rm] & 0xFFFF0000) * gprs[rs];
                        var lo = (gprs[rm] & 0x0000FFFF) * gprs[rs];
                        var carry = (gprs[rn] >>> 0) + hi + lo;
                        gprs[rn] = carry;
                        gprs[rd] += Math.floor(carry * constants_ts_1.SHIFT_32);
                    };
                }
                constructSMLALS(rd, rn, rs, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        cpu.cycles += 2;
                        mmu.waitMul(rs);
                        var hi = (gprs[rm] & 0xFFFF0000) * gprs[rs];
                        var lo = (gprs[rm] & 0x0000FFFF) * gprs[rs];
                        var carry = (gprs[rn] >>> 0) + hi + lo;
                        gprs[rn] = carry;
                        gprs[rd] += Math.floor(carry * constants_ts_1.SHIFT_32);
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!((gprs[rd] & 0xFFFFFFFF) || (gprs[rn] & 0xFFFFFFFF))) ? 1 : 0;
                    };
                }
                ;
                /**
                 * SMULL
                 * @param rd
                 * @param rn
                 * @param rs
                 * @param rm
                 * @param condOp
                 */
                constructSMULL(rd, rn, rs, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        ++cpu.cycles;
                        mmu.waitMul(gprs[rs]);
                        var hi = ((gprs[rm] & 0xFFFF0000) >> 0) * (gprs[rs] >> 0);
                        var lo = ((gprs[rm] & 0x0000FFFF) >> 0) * (gprs[rs] >> 0);
                        gprs[rn] = ((hi & 0xFFFFFFFF) + (lo & 0xFFFFFFFF)) & 0xFFFFFFFF;
                        gprs[rd] = Math.floor(hi * constants_ts_1.SHIFT_32 + lo * constants_ts_1.SHIFT_32);
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param rs
                 * @param rm
                 * @param condOp
                 */
                constructSMULLS(rd, rn, rs, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        ++cpu.cycles;
                        mmu.waitMul(gprs[rs]);
                        var hi = ((gprs[rm] & 0xFFFF0000) >> 0) * (gprs[rs] >> 0);
                        var lo = ((gprs[rm] & 0x0000FFFF) >> 0) * (gprs[rs] >> 0);
                        gprs[rn] = ((hi & 0xFFFFFFFF) + (lo & 0xFFFFFFFF)) & 0xFFFFFFFF;
                        gprs[rd] = Math.floor(hi * constants_ts_1.SHIFT_32 + lo * constants_ts_1.SHIFT_32);
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!((gprs[rd] & 0xFFFFFFFF) || (gprs[rn] & 0xFFFFFFFF)) ? 1 : 0);
                    };
                }
                /**
                 * STM
                 * @param rs
                 * @param address
                 * @param condOp
                 */
                constructSTM(rs, address, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        if (condOp && !condOp()) {
                            mmu.waitPrefetch32(gprs[cpu.PC]);
                            return;
                        }
                        mmu.wait32(gprs[cpu.PC]);
                        let addr = address(true);
                        let total = 0;
                        let m, i;
                        for (m = rs, i = 0; m; m >>= 1, ++i) {
                            if (m & 1) {
                                mmu.store32(addr, gprs[i]);
                                addr += 4;
                                ++total;
                            }
                        }
                        mmu.waitMulti32(addr, total);
                    };
                }
                /**
                 * STMS
                 * @param rs
                 * @param address
                 * @param condOp
                 */
                constructSTMS(rs, address, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        if (condOp && !condOp()) {
                            mmu.waitPrefetch32(gprs[cpu.PC]);
                            return;
                        }
                        mmu.wait32(gprs[cpu.PC]);
                        const mode = cpu.mode;
                        let addr = address(true);
                        let total = 0;
                        let m, i;
                        cpu.switchMode(interfaces_ts_8.ARMMode.System);
                        for (m = rs, i = 0; m; m >>= 1, ++i) {
                            if (m & 1) {
                                mmu.store32(addr, gprs[i]);
                                addr += 4;
                                ++total;
                            }
                        }
                        cpu.switchMode(mode);
                        mmu.waitMulti32(addr, total);
                    };
                }
                /**
                 * STR
                 * @param rd
                 * @param address
                 * @param condOp
                 */
                constructSTR(rd, address, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        if (condOp && !condOp()) {
                            mmu.waitPrefetch32(gprs[cpu.PC]);
                            return;
                        }
                        const addr = address();
                        mmu.store32(addr, gprs[rd]);
                        mmu.wait32(addr);
                        mmu.wait32(gprs[cpu.PC]);
                    };
                }
                /**
                 * STRB
                 * @param rd
                 * @param address
                 * @param condOp
                 */
                constructSTRB(rd, address, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        if (condOp && !condOp()) {
                            mmu.waitPrefetch32(gprs[cpu.PC]);
                            return;
                        }
                        const addr = address();
                        mmu.store8(addr, gprs[rd]);
                        mmu.wait(addr);
                        mmu.wait32(gprs[cpu.PC]);
                    };
                }
                /**
                 *
                 * @param rd
                 * @param address
                 * @param condOp
                 */
                constructSTRH(rd, address, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        if (condOp && !condOp()) {
                            mmu.waitPrefetch32(gprs[cpu.PC]);
                            return;
                        }
                        const addr = address();
                        mmu.store16(addr, gprs[rd]);
                        mmu.wait(addr);
                        mmu.wait32(gprs[cpu.PC]);
                    };
                }
                /**
                 * SUB
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructSUB(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        gprs[rd] = gprs[rn] - cpu.shifterOperand;
                    };
                }
                /**
                 * SUBS
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructSUBS(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        var d = gprs[rn] - cpu.shifterOperand;
                        if (rd == cpu.PC && cpu.hasSPSR()) {
                            cpu.unpackCPSR(cpu.spsr);
                        }
                        else {
                            cpu.cpsrN = d >> 31;
                            cpu.cpsrZ = !(d & 0xFFFFFFFF) ? 1 : 0;
                            cpu.cpsrC = (gprs[rn] >>> 0) >= (cpu.shifterOperand >>> 0) ? 1 : 0;
                            cpu.cpsrV = ((gprs[rn] >> 31) != (cpu.shifterOperand >> 31) &&
                                (gprs[rn] >> 31) != (d >> 31)) ? 1 : 0;
                        }
                        gprs[rd] = d;
                    };
                }
                /**
                 * SWI
                 * @param immediate
                 * @param condOp
                 */
                constructSWI(immediate, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    const irq = this.getIRQ();
                    return function () {
                        if (condOp && !condOp()) {
                            mmu.waitPrefetch32(gprs[cpu.PC]);
                            return;
                        }
                        irq.swi32(immediate);
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                    };
                }
                getIRQ() {
                    return this.cpu.core.getIRQ();
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param rm
                 * @param condOp
                 */
                constructSWP(rd, rn, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        mmu.wait32(gprs[rn]);
                        mmu.wait32(gprs[rn]);
                        var d = mmu.load32(gprs[rn]);
                        mmu.store32(gprs[rn], gprs[rm]);
                        gprs[rd] = d;
                        ++cpu.cycles;
                    };
                }
                /**
                 * SWPB
                 * @param rd
                 * @param rn
                 * @param rm
                 * @param condOp
                 */
                constructSWPB(rd, rn, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        mmu.wait(gprs[rn]);
                        mmu.wait(gprs[rn]);
                        const d = mmu.load8(gprs[rn]);
                        mmu.store8(gprs[rn], gprs[rm]);
                        gprs[rd] = d;
                        ++cpu.cycles;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructTEQ(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        const aluOut = gprs[rn] ^ cpu.shifterOperand;
                        cpu.cpsrN = aluOut >> 31;
                        cpu.cpsrZ = !(aluOut & 0xFFFFFFFF) ? 1 : 0;
                        cpu.cpsrC = cpu.shifterCarryOut;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param shiftOp
                 * @param condOp
                 */
                constructTST(rd, rn, shiftOp, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        shiftOp();
                        const aluOut = gprs[rn] & cpu.shifterOperand;
                        cpu.cpsrN = aluOut >> 31;
                        cpu.cpsrZ = !(aluOut & 0xFFFFFFFF) ? 1 : 0;
                        cpu.cpsrC = cpu.shifterCarryOut;
                    };
                }
                /**
                 * UMLAL
                 * @param rd
                 * @param rn
                 * @param rs
                 * @param rm
                 * @param condOp
                 */
                constructUMLAL(rd, rn, rs, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        cpu.cycles += 2;
                        mmu.waitMul(rs);
                        const hi = ((gprs[rm] & 0xFFFF0000) >>> 0) * (gprs[rs] >>> 0);
                        const lo = (gprs[rm] & 0x0000FFFF) * (gprs[rs] >>> 0);
                        const carry = (gprs[rn] >>> 0) + hi + lo;
                        gprs[rn] = carry;
                        gprs[rd] += carry * constants_ts_1.SHIFT_32;
                    };
                }
                /**
                 * UMLALS
                 * @param rd
                 * @param rn
                 * @param rs
                 * @param rm
                 * @param condOp
                 */
                constructUMLALS(rd, rn, rs, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        cpu.cycles += 2;
                        mmu.waitMul(rs);
                        const hi = ((gprs[rm] & 0xFFFF0000) >>> 0) * (gprs[rs] >>> 0);
                        const lo = (gprs[rm] & 0x0000FFFF) * (gprs[rs] >>> 0);
                        const carry = (gprs[rn] >>> 0) + hi + lo;
                        gprs[rn] = carry;
                        gprs[rd] += carry * constants_ts_1.SHIFT_32;
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = !((gprs[rd] & 0xFFFFFFFF) || (gprs[rn] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * UMULL
                 * @param rd
                 * @param rn
                 * @param rs
                 * @param rm
                 * @param condOp
                 * @see https://developer.arm.com/docs/dui0801/j/a64-general-instructions/umull
                 */
                constructUMULL(rd, rn, rs, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        ++cpu.cycles;
                        mmu.waitMul(gprs[rs]);
                        const hi = ((gprs[rm] & 0xFFFF0000) >>> 0) * (gprs[rs] >>> 0);
                        const lo = ((gprs[rm] & 0x0000FFFF) >>> 0) * (gprs[rs] >>> 0);
                        gprs[rn] = ((hi & 0xFFFFFFFF) + (lo & 0xFFFFFFFF)) & 0xFFFFFFFF;
                        gprs[rd] = ((hi + lo) * constants_ts_1.SHIFT_32) >>> 0;
                    };
                }
                /**
                 * UMULLS
                 * @param rd
                 * @param rn
                 * @param rs
                 * @param rm
                 * @param condOp
                 */
                constructUMULLS(rd, rn, rs, rm, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch32(gprs[cpu.PC]);
                        if (condOp && !condOp()) {
                            return;
                        }
                        ++cpu.cycles;
                        mmu.waitMul(gprs[rs]);
                        const hi = ((gprs[rm] & 0xFFFF0000) >>> 0) * (gprs[rs] >>> 0);
                        const lo = ((gprs[rm] & 0x0000FFFF) >>> 0) * (gprs[rs] >>> 0);
                        gprs[rn] = ((hi & 0xFFFFFFFF) + (lo & 0xFFFFFFFF)) & 0xFFFFFFFF;
                        gprs[rd] = ((hi + lo) * constants_ts_1.SHIFT_32) >>> 0;
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = !((gprs[rd] & 0xFFFFFFFF) || (gprs[rn] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
            };
            exports_36("default", ARMCoreArm);
        }
    };
});
System.register("core/ARMCoreThumb", [], function (exports_37, context_37) {
    "use strict";
    var ARMCoreThumb;
    var __moduleName = context_37 && context_37.id;
    return {
        setters: [],
        execute: function () {
            /**
             * ARM Thumb 指令集
             */
            ARMCoreThumb = class ARMCoreThumb {
                constructor(cpu) {
                    this.cpu = cpu;
                }
                getMMU() {
                    return this.cpu.core.getMMU();
                }
                /**
                 * ADC
                 * @param rd
                 * @param rm
                 */
                constructADC(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const m = (gprs[rm] >>> 0) + (!!cpu.cpsrC ? 1 : 0);
                        const oldD = gprs[rd];
                        const d = (oldD >>> 0) + m;
                        const oldDn = oldD >> 31;
                        const dn = d >> 31;
                        const mn = m >> 31;
                        cpu.cpsrN = dn;
                        cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = (d > 0xFFFFFFFF) ? 1 : 0;
                        cpu.cpsrV = (oldDn == mn && oldDn != dn && mn != dn) ? 1 : 0;
                        gprs[rd] = d;
                    };
                }
                /**
                 * ADD1
                 * @param rd
                 * @param rn
                 * @param immediate
                 */
                constructADD1(rd, rn, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const d = (gprs[rn] >>> 0) + immediate;
                        cpu.cpsrN = d >> 31;
                        cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = (d > 0xFFFFFFFF) ? 1 : 0;
                        cpu.cpsrV = (!(gprs[rn] >> 31) && ((gprs[rn] >> 31 ^ d) >> 31) && (d >> 31)) ? 1 : 0;
                        gprs[rd] = d;
                    };
                }
                /**
                 * ADD2
                 * @param rn
                 * @param immediate
                 */
                constructADD2(rn, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const d = (gprs[rn] >>> 0) + immediate;
                        cpu.cpsrN = d >> 31;
                        cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = (d > 0xFFFFFFFF) ? 1 : 0;
                        cpu.cpsrV = (!(gprs[rn] >> 31) && ((gprs[rn] ^ d) >> 31) && ((immediate ^ d) >> 31)) ? 1 : 0;
                        gprs[rn] = d;
                    };
                }
                /**
                 * ADD3
                 * @param rd
                 * @param rn
                 * @param rm
                 */
                constructADD3(rd, rn, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const d = (gprs[rn] >>> 0) + (gprs[rm] >>> 0);
                        cpu.cpsrN = d >> 31;
                        cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = (d > 0xFFFFFFFF) ? 1 : 0;
                        cpu.cpsrV = (!((gprs[rn] ^ gprs[rm]) >> 31) && ((gprs[rn] ^ d) >> 31) && ((gprs[rm] ^ d) >> 31)) ? 1 : 0;
                        gprs[rd] = d;
                    };
                }
                /**
                 * ADD4
                 * @param rd
                 * @param rm
                 */
                constructADD4(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] += gprs[rm];
                    };
                }
                /**
                 * ADD5
                 * @param rd
                 * @param immediate
                 */
                constructADD5(rd, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = (gprs[cpu.PC] & 0xFFFFFFFC) + immediate;
                    };
                }
                /**
                 * ADD6
                 * @param rd
                 * @param immediate
                 */
                constructADD6(rd, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = gprs[cpu.SP] + immediate;
                    };
                }
                /**
                 * ADD7
                 * @param immediate
                 */
                constructADD7(immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[cpu.SP] += immediate;
                    };
                }
                /**
                 * AND
                 * @param rd
                 * @param rm
                 */
                constructAND(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = gprs[rd] & gprs[rm];
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * ASR1
                 * @param rd
                 * @param rm
                 * @param immediate
                 */
                constructASR1(rd, rm, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        if (immediate == 0) {
                            cpu.cpsrC = gprs[rm] >> 31;
                            if (cpu.cpsrC) {
                                gprs[rd] = 0xFFFFFFFF;
                            }
                            else {
                                gprs[rd] = 0;
                            }
                        }
                        else {
                            cpu.cpsrC = gprs[rm] & (1 << (immediate - 1));
                            gprs[rd] = gprs[rm] >> immediate;
                        }
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * ASR2
                 * @param rd
                 * @param rm
                 */
                constructASR2(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        var rs = gprs[rm] & 0xFF;
                        if (rs) {
                            if (rs < 32) {
                                cpu.cpsrC = gprs[rd] & (1 << (rs - 1));
                                gprs[rd] >>= rs;
                            }
                            else {
                                cpu.cpsrC = gprs[rd] >> 31;
                                if (cpu.cpsrC) {
                                    gprs[rd] = 0xFFFFFFFF;
                                }
                                else {
                                    gprs[rd] = 0;
                                }
                            }
                        }
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * B1
                 * @param immediate
                 * @param condOp
                 */
                constructB1(immediate, condOp) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        if (condOp()) {
                            gprs[cpu.PC] += immediate;
                        }
                    };
                }
                /**
                 * B2
                 * @param immediate
                 */
                constructB2(immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[cpu.PC] += immediate;
                    };
                }
                /**
                 * BIC
                 * @param rd
                 * @param rm
                 */
                constructBIC(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = gprs[rd] & ~gprs[rm];
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * BL1
                 * @param immediate
                 */
                constructBL1(immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[cpu.LR] = gprs[cpu.PC] + immediate;
                    };
                }
                /**
                 * BL2
                 * @param immediate
                 */
                constructBL2(immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        var pc = gprs[cpu.PC];
                        gprs[cpu.PC] = gprs[cpu.LR] + (immediate << 1);
                        gprs[cpu.LR] = pc - 1;
                    };
                }
                /**
                 * BX
                 * @param rd
                 * @param rm
                 */
                constructBX(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        cpu.switchExecMode(gprs[rm] & 0x00000001);
                        let misalign = 0;
                        if (rm == 15) {
                            misalign = gprs[rm] & 0x00000002;
                        }
                        gprs[cpu.PC] = gprs[rm] & 0xFFFFFFFE - misalign;
                    };
                }
                /**
                 * CMN
                 * @param rd
                 * @param rm
                 */
                constructCMN(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        var aluOut = (gprs[rd] >>> 0) + (gprs[rm] >>> 0);
                        cpu.cpsrN = aluOut >> 31;
                        cpu.cpsrZ = (!(aluOut & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = (aluOut > 0xFFFFFFFF) ? 1 : 0;
                        cpu.cpsrV = ((gprs[rd] >> 31) == (gprs[rm] >> 31) &&
                            (gprs[rd] >> 31) != (aluOut >> 31) &&
                            (gprs[rm] >> 31) != (aluOut >> 31)) ? 1 : 0;
                    };
                }
                /**
                 * CMP
                 * @param rn
                 * @param immediate
                 */
                constructCMP1(rn, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const aluOut = gprs[rn] - immediate;
                        cpu.cpsrN = aluOut >> 31;
                        cpu.cpsrZ = (!(aluOut & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = ((gprs[rn] >>> 0) >= immediate) ? 1 : 0;
                        cpu.cpsrV = (gprs[rn] >> 31) && ((gprs[rn] ^ aluOut) >> 31);
                    };
                }
                /**
                 * CMP2
                 * @param rd
                 * @param rm
                 */
                constructCMP2(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const d = gprs[rd];
                        const m = gprs[rm];
                        const aluOut = d - m;
                        const an = aluOut >> 31;
                        const dn = d >> 31;
                        cpu.cpsrN = an;
                        cpu.cpsrZ = (!(aluOut & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = ((d >>> 0) >= (m >>> 0)) ? 1 : 0;
                        cpu.cpsrV = (dn != (m >> 31) && dn != an) ? 1 : 0;
                    };
                }
                /**
                 * CMP3
                 * @param rd
                 * @param rm
                 */
                constructCMP3(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const aluOut = gprs[rd] - gprs[rm];
                        cpu.cpsrN = aluOut >> 31;
                        cpu.cpsrZ = (!(aluOut & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = ((gprs[rd] >>> 0) >= (gprs[rm] >>> 0)) ? 1 : 0;
                        cpu.cpsrV = ((gprs[rd] ^ gprs[rm]) >> 31) && ((gprs[rd] ^ aluOut) >> 31);
                    };
                }
                /**
                 * EOR
                 * @param rd
                 * @param rm
                 */
                constructEOR(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = gprs[rd] ^ gprs[rm];
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * DMIA
                 * @param rn
                 * @param rs
                 */
                constructLDMIA(rn, rs) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        let address = gprs[rn];
                        let total = 0;
                        let m, i;
                        for (m = 0x01, i = 0; i < 8; m <<= 1, ++i) {
                            if (rs & m) {
                                gprs[i] = mmu.load32(address);
                                address += 4;
                                ++total;
                            }
                        }
                        mmu.waitMulti32(address, total);
                        if (!((1 << rn) & rs)) {
                            gprs[rn] = address;
                        }
                    };
                }
                /**
                 * LDR1
                 * @param rd
                 * @param rn
                 * @param immediate
                 */
                constructLDR1(rd, rn, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const n = gprs[rn] + immediate;
                        gprs[rd] = mmu.load32(n);
                        mmu.wait32(n);
                        ++cpu.cycles;
                    };
                }
                /**
                 * LDR2
                 * @param rd
                 * @param rn
                 * @param rm
                 */
                constructLDR2(rd, rn, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = mmu.load32(gprs[rn] + gprs[rm]);
                        mmu.wait32(gprs[rn] + gprs[rm]);
                        ++cpu.cycles;
                    };
                }
                /**
                 * LDR3
                 * @param rd
                 * @param immediate
                 */
                constructLDR3(rd, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = mmu.load32((gprs[cpu.PC] & 0xFFFFFFFC) + immediate);
                        mmu.wait32(gprs[cpu.PC]);
                        ++cpu.cycles;
                    };
                }
                /**
                 * LDR4
                 * @param rd
                 * @param immediate
                 */
                constructLDR4(rd, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = mmu.load32(gprs[cpu.SP] + immediate);
                        mmu.wait32(gprs[cpu.SP] + immediate);
                        ++cpu.cycles;
                    };
                }
                /**
                 * LDRB1
                 * @param rd
                 * @param rn
                 * @param immediate
                 */
                constructLDRB1(rd, rn, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        const n = gprs[rn] + immediate;
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = mmu.loadU8(n);
                        mmu.wait(n);
                        ++cpu.cycles;
                    };
                }
                /**
                 * LDRB2
                 * @param rd
                 * @param rn
                 * @param rm
                 */
                constructLDRB2(rd, rn, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = mmu.loadU8(gprs[rn] + gprs[rm]);
                        mmu.wait(gprs[rn] + gprs[rm]);
                        ++cpu.cycles;
                    };
                }
                /**
                 * LDRH1
                 * @param rd
                 * @param rn
                 * @param immediate
                 */
                constructLDRH1(rd, rn, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        const n = gprs[rn] + immediate;
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = mmu.loadU16(n);
                        mmu.wait(n);
                        ++cpu.cycles;
                    };
                }
                /**
                 * LDRH2
                 * @param rd
                 * @param rn
                 * @param rm
                 */
                constructLDRH2(rd, rn, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = mmu.loadU16(gprs[rn] + gprs[rm]);
                        mmu.wait(gprs[rn] + gprs[rm]);
                        ++cpu.cycles;
                    };
                }
                /**
                 * LDRSB
                 * @param rd
                 * @param rn
                 * @param rm
                 */
                constructLDRSB(rd, rn, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = mmu.load8(gprs[rn] + gprs[rm]);
                        mmu.wait(gprs[rn] + gprs[rm]);
                        ++cpu.cycles;
                    };
                }
                /**
                 * LDRSH
                 * @param rd
                 * @param rn
                 * @param rm
                 */
                constructLDRSH(rd, rn, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = mmu.load16(gprs[rn] + gprs[rm]);
                        mmu.wait(gprs[rn] + gprs[rm]);
                        ++cpu.cycles;
                    };
                }
                /**
                 * LSL1
                 * @param rd
                 * @param rm
                 * @param immediate
                 */
                constructLSL1(rd, rm, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        if (immediate == 0) {
                            gprs[rd] = gprs[rm];
                        }
                        else {
                            cpu.cpsrC = gprs[rm] & (1 << (32 - immediate));
                            gprs[rd] = gprs[rm] << immediate;
                        }
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * LSL2
                 * @param rd
                 * @param rm
                 */
                constructLSL2(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const rs = gprs[rm] & 0xFF;
                        if (rs) {
                            if (rs < 32) {
                                cpu.cpsrC = gprs[rd] & (1 << (32 - rs));
                                gprs[rd] <<= rs;
                            }
                            else {
                                if (rs > 32) {
                                    cpu.cpsrC = 0;
                                }
                                else {
                                    cpu.cpsrC = gprs[rd] & 0x00000001;
                                }
                                gprs[rd] = 0;
                            }
                        }
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * LSR1
                 * @param rd
                 * @param rm
                 * @param immediate
                 */
                constructLSR1(rd, rm, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        if (immediate == 0) {
                            cpu.cpsrC = gprs[rm] >> 31;
                            gprs[rd] = 0;
                        }
                        else {
                            cpu.cpsrC = gprs[rm] & (1 << (immediate - 1));
                            gprs[rd] = gprs[rm] >>> immediate;
                        }
                        cpu.cpsrN = 0;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * LSR2
                 * @param rd
                 * @param rm
                 */
                constructLSR2(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const rs = gprs[rm] & 0xFF;
                        if (rs) {
                            if (rs < 32) {
                                cpu.cpsrC = gprs[rd] & (1 << (rs - 1));
                                gprs[rd] >>>= rs;
                            }
                            else {
                                if (rs > 32) {
                                    cpu.cpsrC = 0;
                                }
                                else {
                                    cpu.cpsrC = gprs[rd] >> 31;
                                }
                                gprs[rd] = 0;
                            }
                        }
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                ;
                /**
                 * MOV1
                 * @param rn
                 * @param immediate
                 */
                constructMOV1(rn, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rn] = immediate;
                        cpu.cpsrN = immediate >> 31;
                        cpu.cpsrZ = (!(immediate & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * MOV2
                 * @param rd
                 * @param rn
                 * @param rm
                 */
                constructMOV2(rd, rn, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const d = gprs[rn];
                        cpu.cpsrN = d >> 31;
                        cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = 0;
                        cpu.cpsrV = 0;
                        gprs[rd] = d;
                    };
                }
                /**
                 * MOV3
                 * @param rd
                 * @param rm
                 */
                constructMOV3(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = gprs[rm];
                    };
                }
                /**
                 * MUL
                 * @param rd
                 * @param rm
                 */
                constructMUL(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        mmu.waitMul(gprs[rm]);
                        if ((gprs[rm] & 0xFFFF0000) && (gprs[rd] & 0xFFFF0000)) {
                            // Our data type is a double--we'll lose bits if we do it all at once!
                            const hi = ((gprs[rd] & 0xFFFF0000) * gprs[rm]) & 0xFFFFFFFF;
                            const lo = ((gprs[rd] & 0x0000FFFF) * gprs[rm]) & 0xFFFFFFFF;
                            gprs[rd] = (hi + lo) & 0xFFFFFFFF;
                        }
                        else {
                            gprs[rd] *= gprs[rm];
                        }
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * MVN
                 * @param rd
                 * @param rm
                 */
                constructMVN(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = ~gprs[rm];
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * NEG
                 * @param rd
                 * @param rm
                 */
                constructNEG(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const d = -gprs[rm];
                        cpu.cpsrN = d >> 31;
                        cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = (0 >= (d >>> 0)) ? 1 : 0;
                        cpu.cpsrV = (gprs[rm] >> 31) && (d >> 31);
                        gprs[rd] = d;
                    };
                }
                /**
                 * ORR
                 * @param rd
                 * @param rm
                 */
                constructORR(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        gprs[rd] = gprs[rd] | gprs[rm];
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                ;
                /**
                 * POP
                 * @param rs
                 * @param r
                 */
                constructPOP(rs, r) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        ++cpu.cycles;
                        let address = gprs[cpu.SP];
                        let total = 0;
                        let m, i;
                        for (m = 0x01, i = 0; i < 8; m <<= 1, ++i) {
                            if (rs & m) {
                                mmu.waitSeq32(address);
                                gprs[i] = mmu.load32(address);
                                address += 4;
                                ++total;
                            }
                        }
                        if (r) {
                            gprs[cpu.PC] = mmu.load32(address) & 0xFFFFFFFE;
                            address += 4;
                            ++total;
                        }
                        mmu.waitMulti32(address, total);
                        gprs[cpu.SP] = address;
                    };
                }
                /**
                 * PUSH
                 * @param rs
                 * @param r
                 */
                constructPUSH(rs, r) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        let address = gprs[cpu.SP] - 4;
                        let total = 0;
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        if (r) {
                            mmu.store32(address, gprs[cpu.LR]);
                            address -= 4;
                            ++total;
                        }
                        let m, i;
                        for (m = 0x80, i = 7; m; m >>= 1, --i) {
                            if (rs & m) {
                                mmu.store32(address, gprs[i]);
                                address -= 4;
                                ++total;
                                break;
                            }
                        }
                        for (m >>= 1, --i; m; m >>= 1, --i) {
                            if (rs & m) {
                                mmu.store32(address, gprs[i]);
                                address -= 4;
                                ++total;
                            }
                        }
                        mmu.waitMulti32(address, total);
                        gprs[cpu.SP] = address + 4;
                    };
                }
                /**
                 * ROR
                 * @param rd
                 * @param rm
                 */
                constructROR(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        var rs = gprs[rm] & 0xFF;
                        if (rs) {
                            var r4 = rs & 0x1F;
                            if (r4 > 0) {
                                cpu.cpsrC = gprs[rd] & (1 << (r4 - 1));
                                gprs[rd] = (gprs[rd] >>> r4) | (gprs[rd] << (32 - r4));
                            }
                            else {
                                cpu.cpsrC = gprs[rd] >> 31;
                            }
                        }
                        cpu.cpsrN = gprs[rd] >> 31;
                        cpu.cpsrZ = (!(gprs[rd] & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
                /**
                 * SBC
                 * @param rd
                 * @param rm
                 */
                constructSBC(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const m = (gprs[rm] >>> 0) + (cpu.cpsrC > 0 ? 1 : 0);
                        const d = (gprs[rd] >>> 0) - m;
                        cpu.cpsrN = d >> 31;
                        cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = ((gprs[rd] >>> 0) >= (d >>> 0)) ? 1 : 0;
                        cpu.cpsrV = ((gprs[rd] ^ m) >> 31) && ((gprs[rd] ^ d) >> 31);
                        gprs[rd] = d;
                    };
                }
                /**
                 * STMIA
                 * @param rn
                 * @param rs
                 */
                constructSTMIA(rn, rs) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.wait(gprs[cpu.PC]);
                        let address = gprs[rn];
                        let total = 0;
                        let m, i;
                        for (m = 0x01, i = 0; i < 8; m <<= 1, ++i) {
                            if (rs & m) {
                                mmu.store32(address, gprs[i]);
                                address += 4;
                                ++total;
                                break;
                            }
                        }
                        for (m <<= 1, ++i; i < 8; m <<= 1, ++i) {
                            if (rs & m) {
                                mmu.store32(address, gprs[i]);
                                address += 4;
                                ++total;
                            }
                        }
                        mmu.waitMulti32(address, total);
                        gprs[rn] = address;
                    };
                }
                /**
                 * STR1
                 * @param rd
                 * @param rn
                 * @param immediate
                 */
                constructSTR1(rd, rn, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        const n = gprs[rn] + immediate;
                        mmu.store32(n, gprs[rd]);
                        mmu.wait(gprs[cpu.PC]);
                        mmu.wait32(n);
                    };
                }
                /**
                 * STR2
                 * @param rd
                 * @param rn
                 * @param rm
                 */
                constructSTR2(rd, rn, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.store32(gprs[rn] + gprs[rm], gprs[rd]);
                        mmu.wait(gprs[cpu.PC]);
                        mmu.wait32(gprs[rn] + gprs[rm]);
                    };
                }
                /**
                 * STR3
                 * @param rd
                 * @param immediate
                 */
                constructSTR3(rd, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.store32(gprs[cpu.SP] + immediate, gprs[rd]);
                        mmu.wait(gprs[cpu.PC]);
                        mmu.wait32(gprs[cpu.SP] + immediate);
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param immediate
                 */
                constructSTRB1(rd, rn, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        const n = gprs[rn] + immediate;
                        mmu.store8(n, gprs[rd]);
                        mmu.wait(gprs[cpu.PC]);
                        mmu.wait(n);
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param rm
                 */
                constructSTRB2(rd, rn, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.store8(gprs[rn] + gprs[rm], gprs[rd]);
                        mmu.wait(gprs[cpu.PC]);
                        mmu.wait(gprs[rn] + gprs[rm]);
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param immediate
                 */
                constructSTRH1(rd, rn, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        const n = gprs[rn] + immediate;
                        mmu.store16(n, gprs[rd]);
                        mmu.wait(gprs[cpu.PC]);
                        mmu.wait(n);
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param rm
                 */
                constructSTRH2(rd, rn, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.store16(gprs[rn] + gprs[rm], gprs[rd]);
                        mmu.wait(gprs[cpu.PC]);
                        mmu.wait(gprs[rn] + gprs[rm]);
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param immediate
                 */
                constructSUB1(rd, rn, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const d = gprs[rn] - immediate;
                        cpu.cpsrN = d >> 31;
                        cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = ((gprs[rn] >>> 0) >= immediate) ? 1 : 0;
                        cpu.cpsrV = (gprs[rn] >> 31) && ((gprs[rn] ^ d) >> 31);
                        gprs[rd] = d;
                    };
                }
                /**
                 *
                 * @param rn
                 * @param immediate
                 */
                constructSUB2(rn, immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        var d = gprs[rn] - immediate;
                        cpu.cpsrN = d >> 31;
                        cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = ((gprs[rn] >>> 0) >= immediate) ? 1 : 0;
                        cpu.cpsrV = (gprs[rn] >> 31) && ((gprs[rn] ^ d) >> 31);
                        gprs[rn] = d;
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rn
                 * @param rm
                 */
                constructSUB3(rd, rn, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const d = gprs[rn] - gprs[rm];
                        cpu.cpsrN = d >> 31;
                        cpu.cpsrZ = (!(d & 0xFFFFFFFF)) ? 1 : 0;
                        cpu.cpsrC = ((gprs[rn] >>> 0) >= (gprs[rm] >>> 0)) ? 1 : 0;
                        cpu.cpsrV = ((gprs[rn] >> 31) != (gprs[rm] >> 31) &&
                            (gprs[rn] >> 31) != (d >> 31)) ? 1 : 0;
                        gprs[rd] = d;
                    };
                }
                getIRQ() {
                    return this.cpu.core.getIRQ();
                }
                /**
                 * SWI
                 * @param immediate
                 */
                constructSWI(immediate) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    const irq = this.getIRQ();
                    return function () {
                        irq.swi(immediate);
                        mmu.waitPrefetch(gprs[cpu.PC]);
                    };
                }
                /**
                 *
                 * @param rd
                 * @param rm
                 */
                constructTST(rd, rm) {
                    const cpu = this.cpu;
                    const gprs = cpu.gprs;
                    const mmu = this.getMMU();
                    return function () {
                        mmu.waitPrefetch(gprs[cpu.PC]);
                        const aluOut = gprs[rd] & gprs[rm];
                        cpu.cpsrN = aluOut >> 31;
                        cpu.cpsrZ = (!(aluOut & 0xFFFFFFFF)) ? 1 : 0;
                    };
                }
            };
            exports_37("default", ARMCoreThumb);
        }
    };
});
System.register("core/ARMCore", ["interfaces", "core/ARMCoreArm", "core/ARMCoreThumb"], function (exports_38, context_38) {
    "use strict";
    var interfaces_ts_9, ARMCoreArm_ts_1, ARMCoreThumb_ts_1, BaseAddress, ARMCore;
    var __moduleName = context_38 && context_38.id;
    return {
        setters: [
            function (interfaces_ts_9_1) {
                interfaces_ts_9 = interfaces_ts_9_1;
            },
            function (ARMCoreArm_ts_1_1) {
                ARMCoreArm_ts_1 = ARMCoreArm_ts_1_1;
            },
            function (ARMCoreThumb_ts_1_1) {
                ARMCoreThumb_ts_1 = ARMCoreThumb_ts_1_1;
            }
        ],
        execute: function () {
            (function (BaseAddress) {
                BaseAddress[BaseAddress["RESET"] = 0] = "RESET";
                BaseAddress[BaseAddress["UNDEF"] = 4] = "UNDEF";
                BaseAddress[BaseAddress["SWI"] = 8] = "SWI";
                BaseAddress[BaseAddress["PABT"] = 12] = "PABT";
                BaseAddress[BaseAddress["DABT"] = 16] = "DABT";
                BaseAddress[BaseAddress["IRQ"] = 24] = "IRQ";
                BaseAddress[BaseAddress["FIQ"] = 28] = "FIQ";
            })(BaseAddress || (BaseAddress = {}));
            ARMCore = /** @class */ (() => {
                /**
                 * ARM 核心
                 */
                class ARMCore {
                    constructor(ctx) {
                        this.SP = 13;
                        this.LR = 14;
                        this.PC = 15;
                        this.page = null;
                        this.conds = [];
                        this.pageMask = 0;
                        this.loadInstruction = this.loadInstructionArm;
                        this.UNALLOC_MASK = 0x0FFFFF00;
                        this.USER_MASK = 0xF0000000;
                        this.PRIV_MASK = 0x000000CF; // This is out of spec, but it seems to be what's done in other implementations
                        this.STATE_MASK = 0x00000020;
                        // 0 ~ 15
                        this.gprs = new Int32Array(16);
                        this.execMode = interfaces_ts_9.OpExecMode.ARM;
                        this.instructionWidth = 0;
                        this.mode = interfaces_ts_9.ARMMode.System;
                        this.cpsrI = 0;
                        this.cpsrF = 0;
                        this.cpsrV = 0;
                        this.cpsrC = 0;
                        this.cpsrZ = 0;
                        this.cpsrN = 0;
                        this.spsr = 0;
                        this.bankedRegisters = [];
                        this.cycles = 0;
                        this.shifterOperand = 0;
                        this.shifterCarryOut = 0;
                        this.pageId = 0;
                        this.pageRegion = 0;
                        this.bankedSPSRs = new Int32Array();
                        this.instruction = null;
                        this.conditionPassed = false;
                        this.MODE_USER = 0x10;
                        this.MODE_FIQ = 0x11;
                        this.MODE_IRQ = 0x12;
                        this.MODE_SUPERVISOR = 0x13;
                        this.MODE_ABORT = 0x17;
                        this.MODE_UNDEFINED = 0x1B;
                        this.MODE_SYSTEM = 0x1F;
                        this.core = ctx;
                        this.armCompiler = new ARMCoreArm_ts_1.default(this);
                        this.thumbCompiler = new ARMCoreThumb_ts_1.default(this);
                        this.generateConds();
                    }
                    /**
                     *
                     * @param startOffset
                     */
                    resetCPU(startOffset) {
                        for (var i = 0; i < this.PC; ++i) {
                            this.gprs[i] = 0;
                        }
                        this.gprs[this.PC] = startOffset + ARMCore.WORD_SIZE_ARM;
                        this.loadInstruction = this.loadInstructionArm;
                        this.execMode = interfaces_ts_9.OpExecMode.ARM;
                        this.instructionWidth = ARMCore.WORD_SIZE_ARM;
                        this.mode = interfaces_ts_9.ARMMode.System;
                        this.cpsrI = 0;
                        this.cpsrF = 0;
                        this.cpsrV = 0;
                        this.cpsrC = 0;
                        this.cpsrZ = 0;
                        this.cpsrN = 0;
                        this.bankedRegisters = [
                            new Int32Array(7),
                            new Int32Array(7),
                            new Int32Array(2),
                            new Int32Array(2),
                            new Int32Array(2),
                            new Int32Array(2)
                        ];
                        this.spsr = 0;
                        this.bankedSPSRs = new Int32Array(6);
                        this.cycles = 0;
                        this.shifterOperand = 0;
                        this.shifterCarryOut = 0;
                        this.page = null;
                        this.pageId = 0;
                        this.pageRegion = -1;
                        this.instruction = null;
                        this.getIRQ().getClear().clear();
                    }
                    /**
                     * 執行指令
                     */
                    step() {
                        const gprs = this.gprs;
                        const mmu = this.getMMU();
                        let instruction = this.instruction;
                        if (!instruction) {
                            this.instruction = this.loadInstruction(gprs[this.PC] - this.instructionWidth);
                            instruction = this.instruction;
                        }
                        gprs[this.PC] += this.instructionWidth;
                        this.conditionPassed = true;
                        // 執行
                        instruction.instruction();
                        if (!instruction.writesPC) {
                            if (this.instruction != null) { // We might have gotten an interrupt from the instruction
                                if (instruction.next == null || instruction.next.page?.invalid) {
                                    instruction.next = this.loadInstruction(gprs[this.PC] - this.instructionWidth);
                                }
                                this.instruction = instruction.next;
                            }
                        }
                        else {
                            if (this.conditionPassed) {
                                const pc = gprs[this.PC] &= 0xFFFFFFFE;
                                if (this.execMode == interfaces_ts_9.OpExecMode.ARM) {
                                    mmu.wait32(pc);
                                    mmu.waitPrefetch32(pc);
                                }
                                else {
                                    mmu.wait(pc);
                                    mmu.waitPrefetch(pc);
                                }
                                gprs[this.PC] += this.instructionWidth;
                                if (!instruction.fixedJump) {
                                    this.instruction = null;
                                }
                                else if (this.instruction != null) {
                                    if (instruction.next == null || instruction.next.page?.invalid) {
                                        instruction.next = this.loadInstruction(gprs[this.PC] - this.instructionWidth);
                                    }
                                    this.instruction = instruction.next;
                                }
                            }
                            else {
                                this.instruction = null;
                            }
                        }
                        this.getIRQ().updateTimers();
                    }
                    freeze() {
                        return {
                            'gprs': [
                                this.gprs[0],
                                this.gprs[1],
                                this.gprs[2],
                                this.gprs[3],
                                this.gprs[4],
                                this.gprs[5],
                                this.gprs[6],
                                this.gprs[7],
                                this.gprs[8],
                                this.gprs[9],
                                this.gprs[10],
                                this.gprs[11],
                                this.gprs[12],
                                this.gprs[13],
                                this.gprs[14],
                                this.gprs[15],
                            ],
                            'mode': this.mode,
                            'cpsrI': this.cpsrI,
                            'cpsrF': this.cpsrF,
                            'cpsrV': this.cpsrV,
                            'cpsrC': this.cpsrC,
                            'cpsrZ': this.cpsrZ,
                            'cpsrN': this.cpsrN,
                            'bankedRegisters': [
                                [
                                    this.bankedRegisters[0][0],
                                    this.bankedRegisters[0][1],
                                    this.bankedRegisters[0][2],
                                    this.bankedRegisters[0][3],
                                    this.bankedRegisters[0][4],
                                    this.bankedRegisters[0][5],
                                    this.bankedRegisters[0][6]
                                ],
                                [
                                    this.bankedRegisters[1][0],
                                    this.bankedRegisters[1][1],
                                    this.bankedRegisters[1][2],
                                    this.bankedRegisters[1][3],
                                    this.bankedRegisters[1][4],
                                    this.bankedRegisters[1][5],
                                    this.bankedRegisters[1][6]
                                ],
                                [
                                    this.bankedRegisters[2][0],
                                    this.bankedRegisters[2][1]
                                ],
                                [
                                    this.bankedRegisters[3][0],
                                    this.bankedRegisters[3][1]
                                ],
                                [
                                    this.bankedRegisters[4][0],
                                    this.bankedRegisters[4][1]
                                ],
                                [
                                    this.bankedRegisters[5][0],
                                    this.bankedRegisters[5][1]
                                ]
                            ],
                            'spsr': this.spsr,
                            'bankedSPSRs': [
                                this.bankedSPSRs[0],
                                this.bankedSPSRs[1],
                                this.bankedSPSRs[2],
                                this.bankedSPSRs[3],
                                this.bankedSPSRs[4],
                                this.bankedSPSRs[5]
                            ],
                            'cycles': this.cycles
                        };
                    }
                    defrost(frost) {
                        this.instruction = null;
                        this.page = null;
                        this.pageId = 0;
                        this.pageRegion = -1;
                        this.gprs[0] = frost.gprs[0];
                        this.gprs[1] = frost.gprs[1];
                        this.gprs[2] = frost.gprs[2];
                        this.gprs[3] = frost.gprs[3];
                        this.gprs[4] = frost.gprs[4];
                        this.gprs[5] = frost.gprs[5];
                        this.gprs[6] = frost.gprs[6];
                        this.gprs[7] = frost.gprs[7];
                        this.gprs[8] = frost.gprs[8];
                        this.gprs[9] = frost.gprs[9];
                        this.gprs[10] = frost.gprs[10];
                        this.gprs[11] = frost.gprs[11];
                        this.gprs[12] = frost.gprs[12];
                        this.gprs[13] = frost.gprs[13];
                        this.gprs[14] = frost.gprs[14];
                        this.gprs[15] = frost.gprs[15];
                        this.mode = frost.mode;
                        this.cpsrI = frost.cpsrI;
                        this.cpsrF = frost.cpsrF;
                        this.cpsrV = frost.cpsrV;
                        this.cpsrC = frost.cpsrC;
                        this.cpsrZ = frost.cpsrZ;
                        this.cpsrN = frost.cpsrN;
                        this.bankedRegisters[0][0] = frost.bankedRegisters[0][0];
                        this.bankedRegisters[0][1] = frost.bankedRegisters[0][1];
                        this.bankedRegisters[0][2] = frost.bankedRegisters[0][2];
                        this.bankedRegisters[0][3] = frost.bankedRegisters[0][3];
                        this.bankedRegisters[0][4] = frost.bankedRegisters[0][4];
                        this.bankedRegisters[0][5] = frost.bankedRegisters[0][5];
                        this.bankedRegisters[0][6] = frost.bankedRegisters[0][6];
                        this.bankedRegisters[1][0] = frost.bankedRegisters[1][0];
                        this.bankedRegisters[1][1] = frost.bankedRegisters[1][1];
                        this.bankedRegisters[1][2] = frost.bankedRegisters[1][2];
                        this.bankedRegisters[1][3] = frost.bankedRegisters[1][3];
                        this.bankedRegisters[1][4] = frost.bankedRegisters[1][4];
                        this.bankedRegisters[1][5] = frost.bankedRegisters[1][5];
                        this.bankedRegisters[1][6] = frost.bankedRegisters[1][6];
                        this.bankedRegisters[2][0] = frost.bankedRegisters[2][0];
                        this.bankedRegisters[2][1] = frost.bankedRegisters[2][1];
                        this.bankedRegisters[3][0] = frost.bankedRegisters[3][0];
                        this.bankedRegisters[3][1] = frost.bankedRegisters[3][1];
                        this.bankedRegisters[4][0] = frost.bankedRegisters[4][0];
                        this.bankedRegisters[4][1] = frost.bankedRegisters[4][1];
                        this.bankedRegisters[5][0] = frost.bankedRegisters[5][0];
                        this.bankedRegisters[5][1] = frost.bankedRegisters[5][1];
                        this.spsr = frost.spsr;
                        this.bankedSPSRs[0] = frost.bankedSPSRs[0];
                        this.bankedSPSRs[1] = frost.bankedSPSRs[1];
                        this.bankedSPSRs[2] = frost.bankedSPSRs[2];
                        this.bankedSPSRs[3] = frost.bankedSPSRs[3];
                        this.bankedSPSRs[4] = frost.bankedSPSRs[4];
                        this.bankedSPSRs[5] = frost.bankedSPSRs[5];
                        this.cycles = frost.cycles;
                    }
                    fetchPage(address) {
                        const mmu = this.getMMU();
                        const region = address >> interfaces_ts_9.MemoryBase.BASE_OFFSET;
                        const pageId = mmu.addressToPage(region, address & mmu.OFFSET_MASK);
                        if (region == this.pageRegion) {
                            if (pageId == this.pageId && !this.page?.invalid) {
                                return;
                            }
                            this.pageId = pageId;
                        }
                        else {
                            this.pageMask = mmu.memory[region].PAGE_MASK;
                            this.pageRegion = region;
                            this.pageId = pageId;
                        }
                        this.page = mmu.accessPage(region, pageId);
                    }
                    /**
                     *
                     * @param address
                     */
                    loadInstructionArm(address) {
                        let next = null;
                        this.fetchPage(address);
                        const offset = (address & this.pageMask) >> 2;
                        if (!this.page) {
                            throw new Error("page is invalid");
                        }
                        next = this.page.arm[offset];
                        if (next) {
                            return next;
                        }
                        const instruction = this.getMMU().load32(address) >>> 0;
                        next = this.compileArm(instruction);
                        next.next = null;
                        next.page = this.page;
                        next.address = address;
                        next.opcode = instruction;
                        this.page.arm[offset] = next;
                        return next;
                    }
                    /**
                     *
                     * @param address
                     */
                    loadInstructionThumb(address) {
                        let next = null;
                        this.fetchPage(address);
                        if (!this.page) {
                            throw new Error("page is invalid");
                        }
                        const offset = (address & this.pageMask) >> 1;
                        next = this.page.thumb[offset];
                        if (next) {
                            return next;
                        }
                        const instruction = this.getMMU().load16(address);
                        next = this.compileThumb(instruction);
                        next.next = null;
                        next.page = this.page;
                        next.address = address;
                        next.opcode = instruction;
                        this.page.thumb[offset] = next;
                        return next;
                    }
                    getMMU() {
                        return this.core.getMMU();
                    }
                    /**
                     *
                     * @param mode
                     */
                    selectBank(mode) {
                        switch (mode) {
                            case interfaces_ts_9.ARMMode.User:
                            case interfaces_ts_9.ARMMode.System:
                                // No banked registers
                                return interfaces_ts_9.ARMBank.NONE;
                            case interfaces_ts_9.ARMMode.FIQ:
                                return interfaces_ts_9.ARMBank.FIQ;
                            case interfaces_ts_9.ARMMode.IRQ:
                                return interfaces_ts_9.ARMBank.IRQ;
                            case interfaces_ts_9.ARMMode.SVC:
                                return interfaces_ts_9.ARMBank.SUPERVISOR;
                            case interfaces_ts_9.ARMMode.ABT:
                                return interfaces_ts_9.ARMBank.ABORT;
                            case interfaces_ts_9.ARMMode.Undef:
                                return interfaces_ts_9.ARMBank.UNDEFINED;
                            default:
                                throw new Error("Invalid user mode passed to selectBank");
                        }
                    }
                    /**
                     * 切換指令集
                     * @param newMode
                     */
                    switchExecMode(newMode) {
                        if (this.execMode != newMode) {
                            this.execMode = newMode;
                            if (newMode == interfaces_ts_9.OpExecMode.ARM) {
                                this.instructionWidth = ARMCore.WORD_SIZE_ARM;
                                this.loadInstruction = this.loadInstructionArm;
                            }
                            else {
                                this.instructionWidth = ARMCore.WORD_SIZE_THUMB;
                                this.loadInstruction = this.loadInstructionThumb;
                            }
                        }
                    }
                    /**
                     * 切換模式
                     * @param newMode
                     */
                    switchMode(newMode) {
                        if (newMode == this.mode) {
                            // Not switching modes after all
                            return;
                        }
                        const currentMode = this.mode;
                        this.mode = newMode;
                        // Switch banked registers
                        const newBank = this.selectBank(newMode);
                        const oldBank = this.selectBank(currentMode);
                        if (newBank == oldBank) {
                            return;
                        }
                        if (newMode == interfaces_ts_9.ARMMode.FIQ || currentMode == interfaces_ts_9.ARMMode.FIQ) {
                            const oldFiqBank = (oldBank == interfaces_ts_9.ARMBank.FIQ) ? 1 : 0;
                            const newFiqBank = (newBank == interfaces_ts_9.ARMBank.FIQ) ? 1 : 0;
                            this.bankedRegisters[oldFiqBank][2] = this.gprs[8];
                            this.bankedRegisters[oldFiqBank][3] = this.gprs[9];
                            this.bankedRegisters[oldFiqBank][4] = this.gprs[10];
                            this.bankedRegisters[oldFiqBank][5] = this.gprs[11];
                            this.bankedRegisters[oldFiqBank][6] = this.gprs[12];
                            this.gprs[8] = this.bankedRegisters[newFiqBank][2];
                            this.gprs[9] = this.bankedRegisters[newFiqBank][3];
                            this.gprs[10] = this.bankedRegisters[newFiqBank][4];
                            this.gprs[11] = this.bankedRegisters[newFiqBank][5];
                            this.gprs[12] = this.bankedRegisters[newFiqBank][6];
                        }
                        this.bankedRegisters[oldBank][0] = this.gprs[this.SP];
                        this.bankedRegisters[oldBank][1] = this.gprs[this.LR];
                        this.gprs[this.SP] = this.bankedRegisters[newBank][0];
                        this.gprs[this.LR] = this.bankedRegisters[newBank][1];
                        this.bankedSPSRs[oldBank] = this.spsr;
                        this.spsr = this.bankedSPSRs[newBank];
                    }
                    /**
                     * 組合 CPSR 暫存器
                     */
                    packCPSR() {
                        const execMode = !!this.execMode ? 1 : 0;
                        const cpsrF = !!this.cpsrF ? 1 : 0;
                        const cpsrI = !!this.cpsrI ? 1 : 0;
                        const cpsrN = !!this.cpsrN ? 1 : 0;
                        const cpsrZ = !!this.cpsrZ ? 1 : 0;
                        const cpsrC = !!this.cpsrC ? 1 : 0;
                        const cpsrV = !!this.cpsrV ? 1 : 0;
                        return this.mode | (execMode << 5) | (cpsrF << 6) | (cpsrI << 7) |
                            (cpsrN << 31) | (cpsrZ << 30) | (cpsrC << 29) | (cpsrV << 28);
                    }
                    /**
                     * 從 SPSR 暫存器還原 CPSR 暫存器
                     * @param spsr
                     */
                    unpackCPSR(spsr) {
                        this.switchMode(spsr & 0x0000001F);
                        this.switchExecMode(!!(spsr & 0x00000020) ? 1 : 0);
                        this.cpsrF = spsr & 0x00000040;
                        this.cpsrI = spsr & 0x00000080;
                        this.cpsrN = spsr & 0x80000000;
                        this.cpsrZ = spsr & 0x40000000;
                        this.cpsrC = spsr & 0x20000000;
                        this.cpsrV = spsr & 0x10000000;
                        this.getIRQ().testIRQ();
                    }
                    getIRQ() {
                        return this.core.getIRQ();
                    }
                    /**
                     * 是否支援 SPSR
                     */
                    hasSPSR() {
                        return this.mode != interfaces_ts_9.ARMMode.System && this.mode != interfaces_ts_9.ARMMode.User;
                    }
                    /**
                     *
                     */
                    raiseIRQ() {
                        if (this.cpsrI) {
                            return;
                        }
                        const cpsr = this.packCPSR();
                        const instructionWidth = this.instructionWidth;
                        this.switchMode(interfaces_ts_9.ARMMode.IRQ);
                        this.spsr = cpsr;
                        this.gprs[this.LR] = this.gprs[this.PC] - instructionWidth + 4;
                        this.gprs[this.PC] = BaseAddress.IRQ + ARMCore.WORD_SIZE_ARM;
                        this.instruction = null;
                        this.switchExecMode(interfaces_ts_9.OpExecMode.ARM);
                        this.cpsrI = true ? 1 : 0;
                    }
                    /**
                     *
                     */
                    raiseTrap() {
                        const cpsr = this.packCPSR();
                        const instructionWidth = this.instructionWidth;
                        this.switchMode(interfaces_ts_9.ARMMode.SVC);
                        this.spsr = cpsr;
                        this.gprs[this.LR] = this.gprs[this.PC] - instructionWidth;
                        this.gprs[this.PC] = BaseAddress.SWI + ARMCore.WORD_SIZE_ARM;
                        this.instruction = null;
                        this.switchExecMode(interfaces_ts_9.OpExecMode.ARM);
                        this.cpsrI = true ? 1 : 0;
                    }
                    /**
                     *
                     * @param instruction
                     */
                    badOp(instruction) {
                        const func = function () {
                            throw "Illegal instruction: 0x" + instruction.toString(16);
                        };
                        return {
                            instruction: func,
                            writesPC: true,
                            fixedJump: false
                        };
                    }
                    generateConds() {
                        const cpu = this;
                        this.conds = [
                            // EQ
                            function () {
                                cpu.conditionPassed = cpu.cpsrZ > 0;
                                return cpu.conditionPassed;
                            },
                            // NE
                            function () {
                                cpu.conditionPassed = !cpu.cpsrZ;
                                return cpu.conditionPassed;
                            },
                            // CS
                            function () {
                                cpu.conditionPassed = cpu.cpsrC > 0;
                                return cpu.conditionPassed;
                            },
                            // CC
                            function () {
                                cpu.conditionPassed = !cpu.cpsrC;
                                return cpu.conditionPassed;
                            },
                            // MI
                            function () {
                                cpu.conditionPassed = cpu.cpsrN > 0;
                                return cpu.conditionPassed;
                            },
                            // PL
                            function () {
                                cpu.conditionPassed = !cpu.cpsrN;
                                return cpu.conditionPassed;
                            },
                            // VS
                            function () {
                                cpu.conditionPassed = cpu.cpsrV > 0;
                                return cpu.conditionPassed;
                            },
                            // VC
                            function () {
                                cpu.conditionPassed = !cpu.cpsrV;
                                return cpu.conditionPassed;
                            },
                            // HI
                            function () {
                                cpu.conditionPassed = cpu.cpsrC > 0 && !cpu.cpsrZ;
                                return cpu.conditionPassed;
                            },
                            // LS
                            function () {
                                cpu.conditionPassed = !cpu.cpsrC || cpu.cpsrZ > 0;
                                return cpu.conditionPassed;
                            },
                            // GE
                            function () {
                                cpu.conditionPassed = !cpu.cpsrN == !cpu.cpsrV;
                                return cpu.conditionPassed;
                            },
                            // LT
                            function () {
                                cpu.conditionPassed = !cpu.cpsrN != !cpu.cpsrV;
                                return cpu.conditionPassed;
                            },
                            // GT
                            function () {
                                cpu.conditionPassed = !cpu.cpsrZ && !cpu.cpsrN == !cpu.cpsrV;
                                return cpu.conditionPassed;
                            },
                            // LE
                            function () {
                                cpu.conditionPassed = (cpu.cpsrZ > 0 || !cpu.cpsrN != !cpu.cpsrV);
                                return cpu.conditionPassed;
                            },
                            // AL
                            null,
                            null
                        ];
                    }
                    /**
                     *
                     * @param shiftType
                     * @param immediate
                     * @param rm
                     */
                    barrelShiftImmediate(shiftType, immediate, rm) {
                        const cpu = this;
                        const gprs = this.gprs;
                        switch (shiftType) {
                            case 0x00000000:
                                // LSL
                                if (immediate) {
                                    return function () {
                                        cpu.shifterOperand = gprs[rm] << immediate;
                                        cpu.shifterCarryOut = gprs[rm] & (1 << (32 - immediate));
                                    };
                                }
                                else {
                                    // This boils down to no shift
                                    return function () {
                                        cpu.shifterOperand = gprs[rm];
                                        cpu.shifterCarryOut = cpu.cpsrC;
                                    };
                                }
                                break;
                            case 0x00000020:
                                // LSR
                                if (immediate) {
                                    return function () {
                                        cpu.shifterOperand = gprs[rm] >>> immediate;
                                        cpu.shifterCarryOut = gprs[rm] & (1 << (immediate - 1));
                                    };
                                }
                                else {
                                    return function () {
                                        cpu.shifterOperand = 0;
                                        cpu.shifterCarryOut = gprs[rm] & 0x80000000;
                                    };
                                }
                                break;
                            case 0x00000040:
                                // ASR
                                if (immediate) {
                                    return function () {
                                        cpu.shifterOperand = gprs[rm] >> immediate;
                                        cpu.shifterCarryOut = gprs[rm] & (1 << (immediate - 1));
                                    };
                                }
                                else {
                                    return function () {
                                        cpu.shifterCarryOut = gprs[rm] & 0x80000000;
                                        if (cpu.shifterCarryOut) {
                                            cpu.shifterOperand = 0xFFFFFFFF;
                                        }
                                        else {
                                            cpu.shifterOperand = 0;
                                        }
                                    };
                                }
                                break;
                            case 0x00000060:
                                // ROR
                                if (immediate) {
                                    return function () {
                                        cpu.shifterOperand = (gprs[rm] >>> immediate) | (gprs[rm] << (32 - immediate));
                                        cpu.shifterCarryOut = gprs[rm] & (1 << (immediate - 1));
                                    };
                                }
                                else {
                                    // RRX
                                    return function () {
                                        const cpsrC = !!cpu.cpsrC ? 1 : 0;
                                        cpu.shifterOperand = (cpsrC << 31) | (gprs[rm] >>> 1);
                                        cpu.shifterCarryOut = gprs[rm] & 0x00000001;
                                    };
                                }
                                break;
                        }
                        return function () {
                            throw new Error(`bad immediate ${immediate}`);
                        };
                    }
                    armBX(instruction, condOp) {
                        const rm = instruction & 0xF;
                        const ins = this.armCompiler.constructBX(rm, condOp);
                        return {
                            instruction: ins,
                            writesPC: true,
                            fixedJump: false
                        };
                    }
                    armMRS(instruction, r, condOp) {
                        const rd = (instruction & 0x0000F000) >> 12;
                        const ins = this.armCompiler.constructMRS(rd, r, condOp);
                        return {
                            instruction: ins,
                            writesPC: (rd == this.PC)
                        };
                    }
                    armMSR(r, instruction, condOp) {
                        const rm = instruction & 0x0000000F;
                        const rotateImm = (instruction & 0x00000F00) >> 7;
                        let immediate = instruction & 0x000000FF;
                        immediate = (immediate >>> rotateImm) | (immediate << (32 - rotateImm));
                        const ins = this.armCompiler.constructMSR(rm, r, instruction, immediate, condOp);
                        return {
                            instruction: ins,
                            writesPC: false
                        };
                    }
                    badInstruction() {
                        return function () {
                            throw new Error("bad Instruction");
                        };
                    }
                    opcodeToArmOp(opcode, s, rd, rn, shiftOp, condOp) {
                        let op = this.badInstruction();
                        switch (opcode) {
                            case 0x00000000:
                                // AND
                                if (s) {
                                    op = this.armCompiler.constructANDS(rd, rn, shiftOp, condOp);
                                }
                                else {
                                    op = this.armCompiler.constructAND(rd, rn, shiftOp, condOp);
                                }
                                break;
                            case 0x00200000:
                                // EOR
                                if (s) {
                                    op = this.armCompiler.constructEORS(rd, rn, shiftOp, condOp);
                                }
                                else {
                                    op = this.armCompiler.constructEOR(rd, rn, shiftOp, condOp);
                                }
                                break;
                            case 0x00400000:
                                // SUB
                                if (s) {
                                    op = this.armCompiler.constructSUBS(rd, rn, shiftOp, condOp);
                                }
                                else {
                                    op = this.armCompiler.constructSUB(rd, rn, shiftOp, condOp);
                                }
                                break;
                            case 0x00600000:
                                // RSB
                                if (s) {
                                    op = this.armCompiler.constructRSBS(rd, rn, shiftOp, condOp);
                                }
                                else {
                                    op = this.armCompiler.constructRSB(rd, rn, shiftOp, condOp);
                                }
                                break;
                            case 0x00800000:
                                // ADD
                                if (s) {
                                    op = this.armCompiler.constructADDS(rd, rn, shiftOp, condOp);
                                }
                                else {
                                    op = this.armCompiler.constructADD(rd, rn, shiftOp, condOp);
                                }
                                break;
                            case 0x00A00000:
                                // ADC
                                if (s) {
                                    op = this.armCompiler.constructADCS(rd, rn, shiftOp, condOp);
                                }
                                else {
                                    op = this.armCompiler.constructADC(rd, rn, shiftOp, condOp);
                                }
                                break;
                            case 0x00C00000:
                                // SBC
                                if (s) {
                                    op = this.armCompiler.constructSBCS(rd, rn, shiftOp, condOp);
                                }
                                else {
                                    op = this.armCompiler.constructSBC(rd, rn, shiftOp, condOp);
                                }
                                break;
                            case 0x00E00000:
                                // RSC
                                if (s) {
                                    op = this.armCompiler.constructRSCS(rd, rn, shiftOp, condOp);
                                }
                                else {
                                    op = this.armCompiler.constructRSC(rd, rn, shiftOp, condOp);
                                }
                                break;
                            case 0x01000000:
                                // TST
                                op = this.armCompiler.constructTST(rd, rn, shiftOp, condOp);
                                break;
                            case 0x01200000:
                                // TEQ
                                op = this.armCompiler.constructTEQ(rd, rn, shiftOp, condOp);
                                break;
                            case 0x01400000:
                                // CMP
                                op = this.armCompiler.constructCMP(rd, rn, shiftOp, condOp);
                                break;
                            case 0x01600000:
                                // CMN
                                op = this.armCompiler.constructCMN(rd, rn, shiftOp, condOp);
                                break;
                            case 0x01800000:
                                // ORR
                                if (s) {
                                    op = this.armCompiler.constructORRS(rd, rn, shiftOp, condOp);
                                }
                                else {
                                    op = this.armCompiler.constructORR(rd, rn, shiftOp, condOp);
                                }
                                break;
                            case 0x01A00000:
                                // MOV
                                if (s) {
                                    op = this.armCompiler.constructMOVS(rd, rn, shiftOp, condOp);
                                }
                                else {
                                    op = this.armCompiler.constructMOV(rd, rn, shiftOp, condOp);
                                }
                                break;
                            case 0x01C00000:
                                // BIC
                                if (s) {
                                    op = this.armCompiler.constructBICS(rd, rn, shiftOp, condOp);
                                }
                                else {
                                    op = this.armCompiler.constructBIC(rd, rn, shiftOp, condOp);
                                }
                                break;
                            case 0x01E00000:
                                // MVN
                                if (s) {
                                    op = this.armCompiler.constructMVNS(rd, rn, shiftOp, condOp);
                                }
                                else {
                                    op = this.armCompiler.constructMVN(rd, rn, shiftOp, condOp);
                                }
                                break;
                        }
                        return {
                            instruction: op,
                            writesPC: (rd == this.PC)
                        };
                    }
                    shiftTypeToShiftOp(instruction, shiftType, rm) {
                        const rs = (instruction & 0x00000F00) >> 8;
                        let shiftOp = this.badInstruction();
                        switch (shiftType) {
                            case 0x00000000:
                                // LSL
                                shiftOp = this.armCompiler.constructAddressingMode1LSL(rs, rm);
                                break;
                            case 0x00000020:
                                // LSR
                                shiftOp = this.armCompiler.constructAddressingMode1LSR(rs, rm);
                                break;
                            case 0x00000040:
                                // ASR
                                shiftOp = this.armCompiler.constructAddressingMode1ASR(rs, rm);
                                break;
                            case 0x00000060:
                                // ROR
                                shiftOp = this.armCompiler.constructAddressingMode1ROR(rs, rm);
                                break;
                        }
                        return shiftOp;
                    }
                    /**
                     * 建立錯誤的記憶體位址
                     * @param instruction
                     */
                    badAddress(instruction) {
                        const badAddress = function () {
                            throw "Unimplemented memory access: 0x" + instruction.toString(16);
                        };
                        badAddress.writesPC = false;
                        return badAddress;
                    }
                    armLDRSTR(instruction, condOp) {
                        const rd = (instruction & 0x0000F000) >> 12;
                        let load2 = instruction & 0x00100000;
                        const b = instruction & 0x00400000;
                        const i = instruction & 0x02000000;
                        let address2 = this.badAddress(instruction);
                        if (~instruction & 0x01000000) {
                            // Clear the W bit if the P bit is clear--we don't support memory translation, so these turn into regular accesses
                            instruction &= 0xFFDFFFFF;
                        }
                        if (i) {
                            // Register offset
                            var rm = instruction & 0x0000000F;
                            var shiftType = instruction & 0x00000060;
                            var shiftImmediate = (instruction & 0x00000F80) >> 7;
                            if (shiftType || shiftImmediate) {
                                const shiftOp = this.barrelShiftImmediate(shiftType, shiftImmediate, rm);
                                address2 = this.armCompiler.constructAddressingMode2RegisterShifted(instruction, shiftOp, condOp);
                            }
                            else {
                                address2 = this.armCompiler.constructAddressingMode23Register(instruction, rm, condOp);
                            }
                        }
                        else {
                            // Immediate
                            const offset = instruction & 0x00000FFF;
                            address2 = this.armCompiler.constructAddressingMode23Immediate(instruction, offset, condOp);
                        }
                        let ins = this.badInstruction();
                        if (load2) {
                            if (b) {
                                // LDRB
                                ins = this.armCompiler.constructLDRB(rd, address2, condOp);
                            }
                            else {
                                // LDR
                                ins = this.armCompiler.constructLDR(rd, address2, condOp);
                            }
                        }
                        else {
                            if (b) {
                                // STRB
                                ins = this.armCompiler.constructSTRB(rd, address2, condOp);
                            }
                            else {
                                // STR
                                ins = this.armCompiler.constructSTR(rd, address2, condOp);
                            }
                        }
                        const writesPC = ((rd == this.PC) || address2.writesPC);
                        return {
                            instruction: ins,
                            writesPC
                        };
                    }
                    defaultConditionOperator() {
                        return function () {
                            return true;
                        };
                    }
                    badShiftOperator() {
                        return function () {
                            throw 'BUG: invalid barrel shifter';
                        };
                    }
                    arm001(instruction, condOp) {
                        const opcode = instruction & 0x01E00000;
                        const s = (instruction & 0x00100000) > 0;
                        let shiftsRs = false;
                        let op = this.badOp(instruction);
                        if ((opcode & 0x01800000) == 0x01000000 && !s) {
                            const r = (instruction & 0x00400000) > 0;
                            if ((instruction & 0x00B0F000) == 0x0020F000) {
                                op = this.armMSR(r, instruction, condOp);
                            }
                            else if ((instruction & 0x00BF0000) == 0x000F0000) {
                                op = this.armMRS(instruction, r, condOp);
                            }
                        }
                        else {
                            // Data processing/FSR transfer
                            const rn = (instruction & 0x000F0000) >> 16;
                            const rd = (instruction & 0x0000F000) >> 12;
                            // Parse shifter operand
                            const shiftType = instruction & 0x00000060;
                            const rm = instruction & 0x0000000F;
                            let shiftOp = this.badShiftOperator();
                            if (instruction & 0x02000000) {
                                const immediate = instruction & 0x000000FF;
                                const rotate = (instruction & 0x00000F00) >> 7;
                                if (!rotate) {
                                    shiftOp = this.armCompiler.constructAddressingMode1Immediate(immediate);
                                }
                                else {
                                    shiftOp = this.armCompiler.constructAddressingMode1ImmediateRotate(immediate, rotate);
                                }
                            }
                            else if (instruction & 0x00000010) {
                                shiftsRs = true;
                                shiftOp = this.shiftTypeToShiftOp(instruction, shiftType, rm);
                            }
                            else {
                                const immediate = (instruction & 0x00000F80) >> 7;
                                shiftOp = this.barrelShiftImmediate(shiftType, immediate, rm);
                            }
                            op = this.opcodeToArmOp(opcode, s, rd, rn, shiftOp, condOp);
                        }
                        return op;
                    }
                    armSingleDataSwap(instruction, condOp) {
                        const rm = instruction & 0x0000000F;
                        const rd = (instruction >> 12) & 0x0000000F;
                        const rn = (instruction >> 16) & 0x0000000F;
                        let ins;
                        if (instruction & 0x00400000) {
                            ins = this.armCompiler.constructSWPB(rd, rn, rm, condOp);
                        }
                        else {
                            ins = this.armCompiler.constructSWP(rd, rn, rm, condOp);
                        }
                        return {
                            instruction: ins,
                            writesPC: (rd == this.PC)
                        };
                    }
                    armMultiplies(instruction, condOp) {
                        // Multiplies
                        const rd = (instruction & 0x000F0000) >> 16;
                        const rn = (instruction & 0x0000F000) >> 12;
                        const rs = (instruction & 0x00000F00) >> 8;
                        const rm = instruction & 0x0000000F;
                        const index = instruction & 0x00F00000;
                        const armCompiler = this.armCompiler;
                        const func3Tofunc4 = function (handler) {
                            return function (rd, rn, rs, rm, condOp) {
                                return handler.call(armCompiler, rd, rs, rm, condOp);
                            };
                        };
                        const func = {
                            // MUL
                            0x00000000: func3Tofunc4(this.armCompiler.constructMUL),
                            // MULS
                            0x00100000: func3Tofunc4(this.armCompiler.constructMULS),
                            // MLA
                            0x00200000: this.armCompiler.constructMLA,
                            // MLAS
                            0x00300000: this.armCompiler.constructMLAS,
                            // UMULL
                            0x00800000: this.armCompiler.constructUMULL,
                            // UMULLS
                            0x00900000: this.armCompiler.constructUMULLS,
                            // UMLAL
                            0x00A00000: this.armCompiler.constructUMLAL,
                            // UMLALS
                            0x00B00000: this.armCompiler.constructUMLALS,
                            // SMULL
                            0x00C00000: this.armCompiler.constructSMULL,
                            // SMULLS
                            0x00D00000: this.armCompiler.constructSMULLS,
                            // SMLAL
                            0x00E00000: this.armCompiler.constructSMLAL,
                            // SMLALS
                            0x00F00000: this.armCompiler.constructSMLALS
                        };
                        if (index in func) {
                            return {
                                instruction: func[index].call(this.armCompiler, rd, rn, rs, rm, condOp),
                                writesPC: (rd == this.PC)
                            };
                        }
                        else {
                            return this.badOp(instruction);
                        }
                    }
                    Instruction2Op(ins) {
                        return {
                            instruction: ins,
                            writesPC: false
                        };
                    }
                    armDataTransfer(instruction, condOp) {
                        // Halfword and signed byte data transfer
                        let load = instruction & 0x00100000;
                        const rd = (instruction & 0x0000F000) >> 12;
                        const hiOffset = (instruction & 0x00000F00) >> 4;
                        const rm = instruction & 0x0000000F;
                        const rn = (instruction & 0x0000F000) >> 12;
                        const loOffset = rm;
                        const h = instruction & 0x00000020;
                        const s = instruction & 0x00000040;
                        const w = instruction & 0x00200000;
                        const i = instruction & 0x00400000;
                        let address;
                        if (i) {
                            const immediate = loOffset | hiOffset;
                            address = this.armCompiler.constructAddressingMode23Immediate(instruction, immediate, condOp);
                        }
                        else {
                            address = this.armCompiler.constructAddressingMode23Register(instruction, rm, condOp);
                        }
                        address.writesPC = !!w && (rn == this.PC); // ??
                        let op = this.badOp(instruction);
                        if ((instruction & 0x00000090) == 0x00000090) {
                            if (load) {
                                // Load [signed] halfword/byte
                                if (h) {
                                    if (s) {
                                        // LDRSH
                                        op = this.Instruction2Op(this.armCompiler.constructLDRSH(rd, address, condOp));
                                    }
                                    else {
                                        // LDRH
                                        op = this.Instruction2Op(this.armCompiler.constructLDRH(rd, address, condOp));
                                    }
                                }
                                else {
                                    if (s) {
                                        // LDRSB
                                        op = this.Instruction2Op(this.armCompiler.constructLDRSB(rd, address, condOp));
                                    }
                                }
                            }
                            else if (!s && h) {
                                // STRH
                                op = this.Instruction2Op(this.armCompiler.constructSTRH(rd, address, condOp));
                            }
                        }
                        op.writesPC = ((rd == this.PC) || address.writesPC);
                        return op;
                    }
                    armBlockTransfer(instruction, condOp) {
                        // Block data transfer
                        const load = instruction & 0x00100000;
                        const w = instruction & 0x00200000;
                        const user = instruction & 0x00400000;
                        const u = instruction & 0x00800000;
                        const p = instruction & 0x01000000;
                        let rs = instruction & 0x0000FFFF;
                        const rn = (instruction & 0x000F0000) >> 16;
                        let immediate = 0;
                        let offset = 0;
                        let overlap = false;
                        if (u) {
                            if (p) {
                                immediate = 4;
                            }
                            for (let m = 0x01, i = 0; i < 16; m <<= 1, ++i) {
                                if (rs & m) {
                                    if (w && i == rn && !offset) {
                                        rs &= ~m;
                                        immediate += 4;
                                        overlap = true;
                                    }
                                    offset += 4;
                                }
                            }
                        }
                        else {
                            if (!p) {
                                immediate = 4;
                            }
                            for (let m = 0x01, i = 0; i < 16; m <<= 1, ++i) {
                                if (rs & m) {
                                    if (w && i == rn && !offset) {
                                        rs &= ~m;
                                        immediate += 4;
                                        overlap = true;
                                    }
                                    immediate -= 4;
                                    offset -= 4;
                                }
                            }
                        }
                        let address;
                        if (w) {
                            address = this.armCompiler.constructAddressingMode4Writeback(immediate, offset, rn, overlap);
                        }
                        else {
                            address = this.armCompiler.constructAddressingMode4(immediate, rn);
                        }
                        if (load) {
                            // LDM
                            let ins;
                            if (user) {
                                ins = this.armCompiler.constructLDMS(rs, address, condOp);
                            }
                            else {
                                ins = this.armCompiler.constructLDM(rs, address, condOp);
                            }
                            return {
                                instruction: ins,
                                writesPC: !!(rs & (1 << 15))
                            };
                        }
                        else {
                            // STM
                            let ins;
                            if (user) {
                                ins = this.armCompiler.constructSTMS(rs, address, condOp);
                            }
                            else {
                                ins = this.armCompiler.constructSTM(rs, address, condOp);
                            }
                            return {
                                instruction: ins,
                                writesPC: !!(rs & (1 << 15))
                            };
                        }
                    }
                    armBranch(instruction, condOp) {
                        // Branch
                        let immediate2 = instruction & 0x00FFFFFF;
                        if (immediate2 & 0x00800000) {
                            immediate2 |= 0xFF000000;
                        }
                        immediate2 <<= 2;
                        const link = instruction & 0x01000000;
                        let ins2;
                        if (link) {
                            ins2 = this.armCompiler.constructBL(immediate2, condOp);
                        }
                        else {
                            ins2 = this.armCompiler.constructB(immediate2, condOp);
                        }
                        return {
                            instruction: ins2,
                            writesPC: true,
                            fixedJump: true
                        };
                    }
                    /**
                     * 產生 Arm 執行指令
                     * @param instruction
                     */
                    compileArm(instruction) {
                        let op = this.badOp(instruction);
                        let i = instruction & 0x0E000000;
                        const cpu = this;
                        const gprs = this.gprs;
                        let condOp = this.conds[(instruction & 0xF0000000) >>> 28];
                        if (!condOp) {
                            condOp = this.defaultConditionOperator();
                        }
                        if ((instruction & 0x0FFFFFF0) == 0x012FFF10) {
                            op = this.armBX(instruction, condOp);
                        }
                        else if (!(instruction & 0x0C000000) && (i == 0x02000000 || (instruction & 0x00000090) != 0x00000090)) {
                            op = this.arm001(instruction, condOp);
                        }
                        else if ((instruction & 0x0FB00FF0) == 0x01000090) {
                            op = this.armSingleDataSwap(instruction, condOp);
                        }
                        else {
                            switch (i) {
                                case 0x00000000:
                                    if ((instruction & 0x010000F0) == 0x00000090) {
                                        op = this.armMultiplies(instruction, condOp);
                                    }
                                    else {
                                        op = this.armDataTransfer(instruction, condOp);
                                    }
                                    break;
                                case 0x04000000:
                                case 0x06000000:
                                    op = this.armLDRSTR(instruction, condOp);
                                    break;
                                case 0x08000000:
                                    op = this.armBlockTransfer(instruction, condOp);
                                    break;
                                case 0x0A000000:
                                    op = this.armBranch(instruction, condOp);
                                    break;
                                case 0x0C000000:
                                    // Coprocessor data transfer
                                    break;
                                case 0x0E000000:
                                    // Coprocessor data operation/SWI
                                    if ((instruction & 0x0F000000) == 0x0F000000) {
                                        // SWI
                                        const immediate = (instruction & 0x00FFFFFF);
                                        op = this.Instruction2Op(this.armCompiler.constructSWI(immediate, condOp));
                                        op.writesPC = false;
                                    }
                                    break;
                                default:
                                    throw 'Bad opcode: 0x' + instruction.toString(16);
                            }
                        }
                        op.execMode = interfaces_ts_9.OpExecMode.ARM;
                        op.fixedJump = op.fixedJump || false;
                        return op;
                    }
                    thumbDataProcessingRegister(instruction) {
                        const rm = (instruction & 0x0038) >> 3;
                        const rd = instruction & 0x0007;
                        let op = this.badInstruction();
                        switch (instruction & 0x03C0) {
                            case 0x0000:
                                // AND
                                op = this.thumbCompiler.constructAND(rd, rm);
                                break;
                            case 0x0040:
                                // EOR
                                op = this.thumbCompiler.constructEOR(rd, rm);
                                break;
                            case 0x0080:
                                // LSL(2)
                                op = this.thumbCompiler.constructLSL2(rd, rm);
                                break;
                            case 0x00C0:
                                // LSR(2)
                                op = this.thumbCompiler.constructLSR2(rd, rm);
                                break;
                            case 0x0100:
                                // ASR(2)
                                op = this.thumbCompiler.constructASR2(rd, rm);
                                break;
                            case 0x0140:
                                // ADC
                                op = this.thumbCompiler.constructADC(rd, rm);
                                break;
                            case 0x0180:
                                // SBC
                                op = this.thumbCompiler.constructSBC(rd, rm);
                                break;
                            case 0x01C0:
                                // ROR
                                op = this.thumbCompiler.constructROR(rd, rm);
                                break;
                            case 0x0200:
                                // TST
                                op = this.thumbCompiler.constructTST(rd, rm);
                                break;
                            case 0x0240:
                                // NEG
                                op = this.thumbCompiler.constructNEG(rd, rm);
                                break;
                            case 0x0280:
                                // CMP(2)
                                op = this.thumbCompiler.constructCMP2(rd, rm);
                                break;
                            case 0x02C0:
                                // CMN
                                op = this.thumbCompiler.constructCMN(rd, rm);
                                break;
                            case 0x0300:
                                // ORR
                                op = this.thumbCompiler.constructORR(rd, rm);
                                break;
                            case 0x0340:
                                // MUL
                                op = this.thumbCompiler.constructMUL(rd, rm);
                                break;
                            case 0x0380:
                                // BIC
                                op = this.thumbCompiler.constructBIC(rd, rm);
                                break;
                            case 0x03C0:
                                // MVN
                                op = this.thumbCompiler.constructMVN(rd, rm);
                                break;
                        }
                        return op;
                    }
                    compileThumb(instruction) {
                        var op = this.badOp(instruction & 0xFFFF);
                        const cpu = this;
                        const gprs = this.gprs;
                        if ((instruction & 0xFC00) == 0x4000) {
                            // Data-processing register
                            const ins = this.thumbDataProcessingRegister(instruction);
                            op.instruction = ins;
                            op.writesPC = false;
                        }
                        else if ((instruction & 0xFC00) == 0x4400) {
                            // Special data processing / branch/exchange instruction set
                            const rm = (instruction & 0x0078) >> 3;
                            const rn = instruction & 0x0007;
                            const h1 = instruction & 0x0080;
                            const rd = rn | (h1 >> 4);
                            let ins;
                            switch (instruction & 0x0300) {
                                case 0x0000:
                                    // ADD(4)
                                    ins = this.thumbCompiler.constructADD4(rd, rm);
                                    op.instruction = ins;
                                    op.writesPC = rd == this.PC;
                                    break;
                                case 0x0100:
                                    // CMP(3)
                                    ins = this.thumbCompiler.constructCMP3(rd, rm);
                                    op.instruction = ins;
                                    op.writesPC = false;
                                    break;
                                case 0x0200:
                                    // MOV(3)
                                    ins = this.thumbCompiler.constructMOV3(rd, rm);
                                    op.instruction = ins;
                                    op.writesPC = rd == this.PC;
                                    break;
                                case 0x0300:
                                    // BX
                                    ins = this.thumbCompiler.constructBX(rd, rm);
                                    op.instruction = ins;
                                    op.writesPC = true;
                                    op.fixedJump = false;
                                    break;
                            }
                        }
                        else if ((instruction & 0xF800) == 0x1800) {
                            // Add/subtract
                            const rm = (instruction & 0x01C0) >> 6;
                            const rn = (instruction & 0x0038) >> 3;
                            const rd = instruction & 0x0007;
                            switch (instruction & 0x0600) {
                                case 0x0000:
                                    // ADD(3)
                                    op.instruction = this.thumbCompiler.constructADD3(rd, rn, rm);
                                    break;
                                case 0x0200:
                                    // SUB(3)
                                    op.instruction = this.thumbCompiler.constructSUB3(rd, rn, rm);
                                    break;
                                case 0x0400:
                                    const immediate = (instruction & 0x01C0) >> 6;
                                    if (immediate) {
                                        // ADD(1)
                                        op.instruction = this.thumbCompiler.constructADD1(rd, rn, immediate);
                                    }
                                    else {
                                        // MOV(2)
                                        op.instruction = this.thumbCompiler.constructMOV2(rd, rn, rm);
                                    }
                                    break;
                                case 0x0600:
                                    // SUB(1)
                                    const immediate2 = (instruction & 0x01C0) >> 6;
                                    op.instruction = this.thumbCompiler.constructSUB1(rd, rn, immediate2);
                                    break;
                            }
                            op.writesPC = false;
                        }
                        else if (!(instruction & 0xE000)) {
                            // Shift by immediate
                            const rd = instruction & 0x0007;
                            const rm = (instruction & 0x0038) >> 3;
                            const immediate = (instruction & 0x07C0) >> 6;
                            switch (instruction & 0x1800) {
                                case 0x0000:
                                    // LSL(1)
                                    op.instruction = this.thumbCompiler.constructLSL1(rd, rm, immediate);
                                    break;
                                case 0x0800:
                                    // LSR(1)
                                    op.instruction = this.thumbCompiler.constructLSR1(rd, rm, immediate);
                                    break;
                                case 0x1000:
                                    // ASR(1)
                                    op.instruction = this.thumbCompiler.constructASR1(rd, rm, immediate);
                                    break;
                                case 0x1800:
                                    break;
                            }
                            op.writesPC = false;
                        }
                        else if ((instruction & 0xE000) == 0x2000) {
                            // Add/subtract/compare/move immediate
                            const immediate = instruction & 0x00FF;
                            const rn = (instruction & 0x0700) >> 8;
                            switch (instruction & 0x1800) {
                                case 0x0000:
                                    // MOV(1)
                                    op.instruction = this.thumbCompiler.constructMOV1(rn, immediate);
                                    break;
                                case 0x0800:
                                    // CMP(1)
                                    op.instruction = this.thumbCompiler.constructCMP1(rn, immediate);
                                    break;
                                case 0x1000:
                                    // ADD(2)
                                    op.instruction = this.thumbCompiler.constructADD2(rn, immediate);
                                    break;
                                case 0x1800:
                                    // SUB(2)
                                    op.instruction = this.thumbCompiler.constructSUB2(rn, immediate);
                                    break;
                            }
                            op.writesPC = false;
                        }
                        else if ((instruction & 0xF800) == 0x4800) {
                            // LDR(3)
                            const rd = (instruction & 0x0700) >> 8;
                            const immediate = (instruction & 0x00FF) << 2;
                            op.instruction = this.thumbCompiler.constructLDR3(rd, immediate);
                            op.writesPC = false;
                        }
                        else if ((instruction & 0xF000) == 0x5000) {
                            // Load and store with relative offset
                            const rd = instruction & 0x0007;
                            const rn = (instruction & 0x0038) >> 3;
                            const rm = (instruction & 0x01C0) >> 6;
                            const opcode = instruction & 0x0E00;
                            switch (opcode) {
                                case 0x0000:
                                    // STR(2)
                                    op.instruction = this.thumbCompiler.constructSTR2(rd, rn, rm);
                                    break;
                                case 0x0200:
                                    // STRH(2)
                                    op.instruction = this.thumbCompiler.constructSTRH2(rd, rn, rm);
                                    break;
                                case 0x0400:
                                    // STRB(2)
                                    op.instruction = this.thumbCompiler.constructSTRB2(rd, rn, rm);
                                    break;
                                case 0x0600:
                                    // LDRSB
                                    op.instruction = this.thumbCompiler.constructLDRSB(rd, rn, rm);
                                    break;
                                case 0x0800:
                                    // LDR(2)
                                    op.instruction = this.thumbCompiler.constructLDR2(rd, rn, rm);
                                    break;
                                case 0x0A00:
                                    // LDRH(2)
                                    op.instruction = this.thumbCompiler.constructLDRH2(rd, rn, rm);
                                    break;
                                case 0x0C00:
                                    // LDRB(2)
                                    op.instruction = this.thumbCompiler.constructLDRB2(rd, rn, rm);
                                    break;
                                case 0x0E00:
                                    // LDRSH
                                    op.instruction = this.thumbCompiler.constructLDRSH(rd, rn, rm);
                                    break;
                            }
                            op.writesPC = false;
                        }
                        else if ((instruction & 0xE000) == 0x6000) {
                            // Load and store with immediate offset
                            const rd = instruction & 0x0007;
                            const rn = (instruction & 0x0038) >> 3;
                            let immediate = (instruction & 0x07C0) >> 4;
                            const b = instruction & 0x1000;
                            if (b) {
                                immediate >>= 2;
                            }
                            var load = instruction & 0x0800;
                            if (load) {
                                if (b) {
                                    // LDRB(1)
                                    op.instruction = this.thumbCompiler.constructLDRB1(rd, rn, immediate);
                                }
                                else {
                                    // LDR(1)
                                    op.instruction = this.thumbCompiler.constructLDR1(rd, rn, immediate);
                                }
                            }
                            else {
                                if (b) {
                                    // STRB(1)
                                    op.instruction = this.thumbCompiler.constructSTRB1(rd, rn, immediate);
                                }
                                else {
                                    // STR(1)
                                    op.instruction = this.thumbCompiler.constructSTR1(rd, rn, immediate);
                                }
                            }
                            op.writesPC = false;
                        }
                        else if ((instruction & 0xF600) == 0xB400) {
                            // Push and pop registers
                            const r = !!(instruction & 0x0100);
                            const rs = instruction & 0x00FF;
                            if (instruction & 0x0800) {
                                // POP
                                op.instruction = this.thumbCompiler.constructPOP(rs, r);
                                op.writesPC = r;
                                op.fixedJump = false;
                            }
                            else {
                                // PUSH
                                op.instruction = this.thumbCompiler.constructPUSH(rs, r);
                                op.writesPC = false;
                            }
                        }
                        else if (instruction & 0x8000) {
                            switch (instruction & 0x7000) {
                                case 0x0000:
                                    // Load and store halfword
                                    const rd = instruction & 0x0007;
                                    const rn = (instruction & 0x0038) >> 3;
                                    const immediate = (instruction & 0x07C0) >> 5;
                                    if (instruction & 0x0800) {
                                        // LDRH(1)
                                        op.instruction = this.thumbCompiler.constructLDRH1(rd, rn, immediate);
                                    }
                                    else {
                                        // STRH(1)
                                        op.instruction = this.thumbCompiler.constructSTRH1(rd, rn, immediate);
                                    }
                                    op.writesPC = false;
                                    break;
                                case 0x1000:
                                    // SP-relative load and store
                                    const rd2 = (instruction & 0x0700) >> 8;
                                    const immediate2 = (instruction & 0x00FF) << 2;
                                    const load = instruction & 0x0800;
                                    if (load) {
                                        // LDR(4)
                                        op.instruction = this.thumbCompiler.constructLDR4(rd2, immediate2);
                                    }
                                    else {
                                        // STR(3)
                                        op.instruction = this.thumbCompiler.constructSTR3(rd2, immediate2);
                                    }
                                    op.writesPC = false;
                                    break;
                                case 0x2000:
                                    // Load address
                                    const rd3 = (instruction & 0x0700) >> 8;
                                    const immediate3 = (instruction & 0x00FF) << 2;
                                    if (instruction & 0x0800) {
                                        // ADD(6)
                                        op.instruction = this.thumbCompiler.constructADD6(rd3, immediate3);
                                    }
                                    else {
                                        // ADD(5)
                                        op.instruction = this.thumbCompiler.constructADD5(rd3, immediate3);
                                    }
                                    op.writesPC = false;
                                    break;
                                case 0x3000:
                                    // Miscellaneous
                                    if (!(instruction & 0x0F00)) {
                                        // Adjust stack pointer
                                        // ADD(7)/SUB(4)
                                        const b = instruction & 0x0080;
                                        let immediate4 = (instruction & 0x7F) << 2;
                                        if (b) {
                                            immediate4 = -immediate4;
                                        }
                                        op.instruction = this.thumbCompiler.constructADD7(immediate4);
                                        op.writesPC = false;
                                    }
                                    break;
                                case 0x4000:
                                    // Multiple load and store
                                    const rn5 = (instruction & 0x0700) >> 8;
                                    const rs = instruction & 0x00FF;
                                    if (instruction & 0x0800) {
                                        // LDMIA
                                        op.instruction = this.thumbCompiler.constructLDMIA(rn5, rs);
                                    }
                                    else {
                                        // STMIA
                                        op.instruction = this.thumbCompiler.constructSTMIA(rn5, rs);
                                    }
                                    op.writesPC = false;
                                    break;
                                case 0x5000:
                                    // Conditional branch
                                    const cond = (instruction & 0x0F00) >> 8;
                                    let immediate6 = (instruction & 0x00FF);
                                    if (cond == 0xF) {
                                        // SWI
                                        op.instruction = this.thumbCompiler.constructSWI(immediate6);
                                        op.writesPC = false;
                                    }
                                    else {
                                        // B(1)
                                        if (instruction & 0x0080) {
                                            immediate6 |= 0xFFFFFF00;
                                        }
                                        immediate6 <<= 1;
                                        let condOp = this.conds[cond];
                                        if (!condOp) {
                                            condOp = function () {
                                                return true;
                                            };
                                        }
                                        op.instruction = this.thumbCompiler.constructB1(immediate6, condOp);
                                        op.writesPC = true;
                                        op.fixedJump = true;
                                    }
                                    break;
                                case 0x6000:
                                case 0x7000:
                                    // BL(X)
                                    let immediate7 = instruction & 0x07FF;
                                    const h = instruction & 0x1800;
                                    switch (h) {
                                        case 0x0000:
                                            // B(2)
                                            if (immediate7 & 0x0400) {
                                                immediate7 |= 0xFFFFF800;
                                            }
                                            immediate7 <<= 1;
                                            op.instruction = this.thumbCompiler.constructB2(immediate7);
                                            op.writesPC = true;
                                            op.fixedJump = true;
                                            break;
                                        case 0x0800:
                                            // BLX (ARMv5T)
                                            /*op() {
                                                var pc = gprs[cpu.PC];
                                                gprs[cpu.PC] = (gprs[cpu.LR] + (immediate << 1)) & 0xFFFFFFFC;
                                                gprs[cpu.LR] = pc - 1;
                                                cpu.switchExecMode(cpu.MODE_ARM);
                                            }*/
                                            break;
                                        case 0x1000:
                                            // BL(1)
                                            if (immediate7 & 0x0400) {
                                                immediate7 |= 0xFFFFFC00;
                                            }
                                            immediate7 <<= 12;
                                            op.instruction = this.thumbCompiler.constructBL1(immediate7);
                                            op.writesPC = false;
                                            break;
                                        case 0x1800:
                                            // BL(2)
                                            op.instruction = this.thumbCompiler.constructBL2(immediate7);
                                            op.writesPC = true;
                                            op.fixedJump = false;
                                            break;
                                    }
                                    break;
                                default:
                                    this.WARN("Undefined instruction: 0x" + instruction.toString(16));
                            }
                        }
                        else {
                            throw 'Bad opcode: 0x' + instruction.toString(16);
                        }
                        op.execMode = interfaces_ts_9.OpExecMode.THUMB;
                        op.fixedJump = op.fixedJump || false;
                        return op;
                    }
                    WARN(message) {
                        console.error(message);
                    }
                }
                ARMCore.WORD_SIZE_ARM = 4;
                ARMCore.WORD_SIZE_THUMB = 2;
                return ARMCore;
            })();
            exports_38("default", ARMCore);
        }
    };
});
System.register("core/mod", ["core/ARMCore"], function (exports_39, context_39) {
    "use strict";
    var ARMCore_ts_1;
    var __moduleName = context_39 && context_39.id;
    function factoryCPU(ctx) {
        return new ARMCore_ts_1.default(ctx);
    }
    exports_39("factoryCPU", factoryCPU);
    return {
        setters: [
            function (ARMCore_ts_1_1) {
                ARMCore_ts_1 = ARMCore_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("mod", ["interfaces", "gpio/mod", "audio/mod", "video/mod", "keypad/mod", "irq/mod", "mmu/mod", "core/mod"], function (exports_40, context_40) {
    "use strict";
    var interfaces_ts_10, mod_ts_3, mod_ts_4, mod_ts_5, mod_ts_6, mod_ts_7, mod_ts_8, mod_ts_9, GameBoyAdvance;
    var __moduleName = context_40 && context_40.id;
    return {
        setters: [
            function (interfaces_ts_10_1) {
                interfaces_ts_10 = interfaces_ts_10_1;
            },
            function (mod_ts_3_1) {
                mod_ts_3 = mod_ts_3_1;
            },
            function (mod_ts_4_1) {
                mod_ts_4 = mod_ts_4_1;
            },
            function (mod_ts_5_1) {
                mod_ts_5 = mod_ts_5_1;
            },
            function (mod_ts_6_1) {
                mod_ts_6 = mod_ts_6_1;
            },
            function (mod_ts_7_1) {
                mod_ts_7 = mod_ts_7_1;
            },
            function (mod_ts_8_1) {
                mod_ts_8 = mod_ts_8_1;
            },
            function (mod_ts_9_1) {
                mod_ts_9 = mod_ts_9_1;
            }
        ],
        execute: function () {
            GameBoyAdvance = /** @class */ (() => {
                class GameBoyAdvance {
                    constructor() {
                        this.indirectCanvas = null;
                        this.targetCanvas = null;
                        this.queue = 0;
                        this.reportFPS = null;
                        this.log = null;
                        this.SYS_ID = 'com.endrift.gbajs';
                        this.throttle = 0;
                        this.lastVblank = 0;
                        this.seenSave = false;
                        this.logLevel = GameBoyAdvance.LOG_ERROR | GameBoyAdvance.LOG_WARN;
                        this.rom = null;
                        this.cpu = mod_ts_9.factoryCPU(this);
                        this.mmu = mod_ts_8.factoryMMU(this);
                        this.irq = mod_ts_7.factoryIRQ(this);
                        this.io = mod_ts_3.factoryIO(this);
                        this.audio = mod_ts_4.factoryAudio(this);
                        this.video = mod_ts_5.factoryVideo(this);
                        this.keypad = mod_ts_6.factoryKeypad();
                        this.sio = mod_ts_3.factorySIO(this);
                        this.keypad.registerHandlers();
                        this.doStep = this.waitFrame;
                        this.paused = false;
                        this.seenFrame = false;
                        this.seenSave = false;
                        this.lastVblank = 0;
                        this.queue = 0;
                        this.reportFPS = null;
                        this.throttle = 16; // This is rough, but the 2/3ms difference gives us a good overhead
                        const self = this;
                        // @ts-ignore
                        window.queueFrame = function (f) {
                            // @ts-ignore
                            self.queue = window.setTimeout(f, self.throttle);
                        };
                        // @ts-ignore
                        window.URL = window.URL || window.webkitURL;
                        this.video.vblankCallback = function () {
                            self.seenFrame = true;
                        };
                    }
                    getSIO() {
                        return this.sio;
                    }
                    getKeypad() {
                        return this.keypad;
                    }
                    getLog() {
                        return this;
                    }
                    getGBA() {
                        return this;
                    }
                    getContext() {
                        return this;
                    }
                    getIO() {
                        return this.io;
                    }
                    getVideo() {
                        return this.video;
                    }
                    getAudio() {
                        return this.audio;
                    }
                    getIRQ() {
                        return this.irq;
                    }
                    getCPU() {
                        return this.cpu;
                    }
                    getMMU() {
                        return this.mmu;
                    }
                    /**
                     *
                     * @param canvas
                     */
                    setCanvas(canvas) {
                        const self = this;
                        if (canvas.offsetWidth != 240 || canvas.offsetHeight != 160) {
                            // @ts-ignore
                            this.indirectCanvas = document.createElement("canvas");
                            if (!this.indirectCanvas) {
                                throw new Error("create canvas error");
                            }
                            this.indirectCanvas.setAttribute("height", "160");
                            this.indirectCanvas.setAttribute("width", "240");
                            this.targetCanvas = canvas;
                            this.setCanvasDirect(this.indirectCanvas);
                            // @ts-ignore
                            const targetContext = canvas.getContext('2d');
                            this.video.drawCallback = function () {
                                // @ts-ignore
                                targetContext.drawImage(self.indirectCanvas, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
                            };
                        }
                        else {
                            this.setCanvasDirect(canvas);
                        }
                    }
                    /**
                     *
                     * @param canvas
                     */
                    setCanvasDirect(canvas) {
                        // @ts-ignore
                        this.context = canvas.getContext('2d');
                        // @ts-ignore
                        this.video.setBacking(this.context);
                    }
                    getGBAMMU() {
                        return this.mmu;
                    }
                    /**
                     *
                     * @param bios
                     * @param real
                     */
                    setBios(bios, real = false) {
                        this.getGBAMMU().loadBios(bios, real);
                    }
                    /**
                     *
                     * @param rom
                     */
                    setRom(rom) {
                        this.reset();
                        this.rom = this.getGBAMMU().loadRom(rom, true);
                        if (!this.rom) {
                            return false;
                        }
                        this.retrieveSavedata();
                        return true;
                    }
                    /**
                     *
                     */
                    hasRom() {
                        return !!this.rom;
                    }
                    /**
                     *
                     * @param romFile
                     * @param callback
                     */
                    loadRomFromFile(romFile, callback) {
                        // @ts-ignore
                        const reader = new FileReader();
                        const self = this;
                        // @ts-ignore
                        reader.onload = function (e) {
                            // @ts-ignore
                            var result = self.setRom(e.target.result);
                            if (callback) {
                                callback(result);
                            }
                        };
                        reader.readAsArrayBuffer(romFile);
                    }
                    /**
                     *
                     */
                    reset() {
                        this.audio.pause(true);
                        this.mmu.clear();
                        this.io.clear();
                        this.audio.clear();
                        this.video.clear();
                        this.sio.clear();
                        const gbammu = this.getGBAMMU();
                        gbammu.mmap(interfaces_ts_10.MemoryRegion.IO, this.io.getMemoryView());
                        const render = this.video.renderPath;
                        gbammu.mmap(interfaces_ts_10.MemoryRegion.PALETTE_RAM, render.palette.getMemoryView());
                        gbammu.mmap(interfaces_ts_10.MemoryRegion.VRAM, render.vram.getMemoryView());
                        gbammu.mmap(interfaces_ts_10.MemoryRegion.OAM, render.oam.getMemoryView());
                        this.cpu.resetCPU(0);
                    }
                    /**
                     *
                     */
                    step() {
                        while (this.doStep()) {
                            this.cpu.step();
                        }
                    }
                    /**
                     *
                     */
                    waitFrame() {
                        const seen = this.seenFrame;
                        this.seenFrame = false;
                        return !seen;
                    }
                    /**
                     *
                     */
                    pause() {
                        this.paused = true;
                        this.audio.pause(true);
                        if (this.queue > 0) {
                            clearTimeout(this.queue);
                            this.queue = 0;
                        }
                    }
                    /**
                     *
                     */
                    advanceFrame() {
                        this.step();
                        const mmu = this.mmu;
                        if (this.seenSave) {
                            if (!mmu.saveNeedsFlush()) {
                                this.storeSavedata();
                                this.seenSave = false;
                            }
                            else {
                                mmu.flushSave();
                            }
                        }
                        else if (mmu.saveNeedsFlush()) {
                            this.seenSave = true;
                            mmu.flushSave();
                        }
                    }
                    /**
                     *
                     */
                    runStable() {
                        // if (this.interval) {
                        // return; // Already running
                        // }
                        var self = this;
                        var timer = 0;
                        var frames = 0;
                        let runFunc;
                        var start = Date.now();
                        this.paused = false;
                        this.audio.pause(false);
                        if (this.reportFPS) {
                            runFunc = function () {
                                try {
                                    timer += Date.now() - start;
                                    if (self.paused) {
                                        return;
                                    }
                                    else {
                                        // @ts-ignore
                                        queueFrame(runFunc);
                                    }
                                    start = Date.now();
                                    self.advanceFrame();
                                    ++frames;
                                    if (frames == 60) {
                                        self.reportFPS((frames * 1000) / timer);
                                        frames = 0;
                                        timer = 0;
                                    }
                                }
                                catch (exception) {
                                    self.ERROR(exception);
                                    if (exception.stack) {
                                        self.logStackTrace(exception.stack.split('\n'));
                                    }
                                    throw exception;
                                }
                            };
                        }
                        else {
                            runFunc = function () {
                                try {
                                    if (self.paused) {
                                        return;
                                    }
                                    else {
                                        // @ts-ignore
                                        queueFrame(runFunc);
                                    }
                                    self.advanceFrame();
                                }
                                catch (exception) {
                                    self.ERROR(exception);
                                    if (exception.stack) {
                                        self.logStackTrace(exception.stack.split('\n'));
                                    }
                                    throw exception;
                                }
                            };
                        }
                        // @ts-ignore
                        queueFrame(runFunc);
                    }
                    /**
                     * 載入遊戲進度
                     * @param data
                     */
                    setSavedata(data) {
                        this.mmu.loadSavedata(data);
                    }
                    /**
                     * 載入遊戲進度
                     * @param saveFile
                     */
                    loadSavedataFromFile(saveFile) {
                        // @ts-ignore
                        const reader = new FileReader();
                        const self = this;
                        // @ts-ignore
                        reader.onload = function (e) {
                            // @ts-ignore
                            self.setSavedata(e.target.result);
                        };
                        reader.readAsArrayBuffer(saveFile);
                    }
                    /**
                     * 解碼狀態資料
                     * @param string
                     */
                    decodeSavedata(string) {
                        this.setSavedata(this.decodeBase64(string));
                    }
                    /**
                     * Base64 Decode
                     * @param string
                     */
                    decodeBase64(string) {
                        let length = (string.length * 3 / 4);
                        if (string[string.length - 2] == '=') {
                            length -= 2;
                        }
                        else if (string[string.length - 1] == '=') {
                            length -= 1;
                        }
                        const buffer = new ArrayBuffer(length);
                        let view = new Uint8Array(buffer);
                        const bits = string.match(/..../g);
                        if (!bits) {
                            throw new Error("data invalid");
                        }
                        let i;
                        for (i = 0; i + 2 < length; i += 3) {
                            const item = bits.shift();
                            if (!item) {
                                throw new Error("data invalid");
                            }
                            const s = atob(item);
                            view[i] = s.charCodeAt(0);
                            view[i + 1] = s.charCodeAt(1);
                            view[i + 2] = s.charCodeAt(2);
                        }
                        if (i < length) {
                            const item = bits.shift();
                            if (!item) {
                                throw new Error("data invalid");
                            }
                            const s = atob(item);
                            view[i++] = s.charCodeAt(0);
                            if (s.length > 1) {
                                view[i++] = s.charCodeAt(1);
                            }
                        }
                        return buffer;
                    }
                    /**
                     * Base64 Encode
                     * @param view
                     */
                    encodeBase64(view) {
                        const data = [];
                        const wordstring = [];
                        for (let i = 0; i < view.byteLength; ++i) {
                            const b = view.getUint8(i);
                            wordstring.push(String.fromCharCode(b));
                            while (wordstring.length >= 3) {
                                const triplet = wordstring.splice(0, 3);
                                data.push(btoa(triplet.join('')));
                            }
                        }
                        if (wordstring.length) {
                            data.push(btoa(wordstring.join('')));
                        }
                        return data.join('');
                    }
                    /**
                     * 下載遊戲進度
                     */
                    downloadSavedata() {
                        const sram = this.mmu.save;
                        if (!sram) {
                            this.WARN("No save data available");
                            return false;
                        }
                        // @ts-ignore
                        if (window.URL) {
                            // @ts-ignore
                            const url = window.URL.createObjectURL(new Blob([sram.buffer], { type: 'application/octet-stream' }));
                            // @ts-ignore
                            window.open(url);
                        }
                        else {
                            const data = this.encodeBase64(sram.view);
                            // @ts-ignore
                            window.open('data:application/octet-stream;base64,' + data, this.rom.code + '.sav');
                        }
                        return true;
                    }
                    /**
                     * 儲存遊戲進度
                     */
                    storeSavedata() {
                        const gbammu = this.mmu;
                        const sram = gbammu.save;
                        if (!sram) {
                            throw new Error("GBA SRAM no init");
                        }
                        if (!gbammu.cart) {
                            throw new Error("GBA MMU cart no init");
                        }
                        try {
                            // @ts-ignore
                            const storage = window.localStorage;
                            storage[this.SYS_ID + '.' + gbammu.cart.code] = this.encodeBase64(sram.view);
                        }
                        catch (e) {
                            this.WARN('Could not store savedata! ' + e);
                        }
                    }
                    /**
                     *
                     */
                    retrieveSavedata() {
                        const gbammu = this.mmu;
                        if (!gbammu.cart) {
                            throw new Error("GBA MMU cart no init");
                        }
                        try {
                            // @ts-ignore
                            const storage = window.localStorage;
                            const data = storage[this.SYS_ID + '.' + gbammu.cart.code];
                            if (data) {
                                this.decodeSavedata(data);
                                return true;
                            }
                        }
                        catch (e) {
                            this.WARN('Could not retrieve savedata! ' + e);
                        }
                        return false;
                    }
                    /**
                     *
                     */
                    freeze() {
                        return {
                            'cpu': this.cpu.freeze(),
                            'mmu': this.mmu.freeze(),
                            'irq': this.irq.freeze(),
                            'io': this.io.freeze(),
                            'audio': this.audio.freeze(),
                            'video': this.video.freeze()
                        };
                    }
                    /**
                     *
                     * @param frost
                     */
                    defrost(frost) {
                        this.cpu.defrost(frost.cpu);
                        this.mmu.defrost(frost.mmu);
                        this.audio.defrost(frost.audio);
                        this.video.defrost(frost.video);
                        this.irq.defrost(frost.irq);
                        this.io.defrost(frost.io);
                    }
                    /**
                     *
                     * @param logger
                     */
                    setLogger(logger) {
                        this.log = logger;
                    }
                    /**
                     *
                     *
                     */
                    logStackTrace(stack) {
                        if (!this.log) {
                            return;
                        }
                        const overflow = stack.length - 32;
                        this.ERROR('Stack trace follows:');
                        if (overflow > 0) {
                            this.log(-1, '> (Too many frames)');
                        }
                        for (var i = Math.max(overflow, 0); i < stack.length; ++i) {
                            this.log(-1, '> ' + stack[i]);
                        }
                    }
                    /**
                     *
                     * @param error
                     */
                    ERROR(error) {
                        if (!this.log) {
                            return;
                        }
                        if (this.logLevel & GameBoyAdvance.LOG_ERROR) {
                            this.log(GameBoyAdvance.LOG_ERROR, error);
                        }
                    }
                    /**
                     *
                     * @param warn
                     */
                    WARN(warn) {
                        if (!this.log) {
                            return;
                        }
                        if (this.logLevel & GameBoyAdvance.LOG_WARN) {
                            this.log(GameBoyAdvance.LOG_WARN, warn);
                        }
                    }
                    /**
                     *
                     * @param func
                     */
                    STUB(func) {
                        if (!this.log) {
                            return;
                        }
                        if (this.logLevel & GameBoyAdvance.LOG_STUB) {
                            this.log(GameBoyAdvance.LOG_STUB, func);
                        }
                    }
                    /**
                     *
                     * @param info
                     */
                    INFO(info) {
                        if (!this.log) {
                            return;
                        }
                        if (this.logLevel & GameBoyAdvance.LOG_INFO) {
                            this.log(GameBoyAdvance.LOG_INFO, info);
                        }
                    }
                    /**
                     *
                     * @param info
                     */
                    DEBUG(info) {
                        if (!this.log) {
                            return;
                        }
                        if (this.logLevel & GameBoyAdvance.LOG_DEBUG) {
                            this.log(GameBoyAdvance.LOG_DEBUG, info);
                        }
                    }
                    /**
                     *
                     * @param err
                     */
                    ASSERT_UNREACHED(err) {
                        throw new Error("Should be unreached: " + err);
                    }
                    /**
                     *
                     * @param test
                     * @param err
                     */
                    ASSERT(test, err) {
                        if (!test) {
                            throw new Error("Assertion failed: " + err);
                        }
                    }
                }
                GameBoyAdvance.LOG_ERROR = 1;
                GameBoyAdvance.LOG_WARN = 2;
                GameBoyAdvance.LOG_STUB = 4;
                GameBoyAdvance.LOG_INFO = 8;
                GameBoyAdvance.LOG_DEBUG = 16;
                return GameBoyAdvance;
            })();
            exports_40("GameBoyAdvance", GameBoyAdvance);
        }
    };
});

const __exp = __instantiate("mod");
export const GameBoyAdvance = __exp["GameBoyAdvance"];
