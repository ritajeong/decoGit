/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "decogit.decogit";

export interface MsgBuySticker {
  creator: string;
  stickerId: string;
  bid: string;
}

export interface MsgBuyStickerResponse {}

export interface MsgCreateSticker {
  creator: string;
  sticker: string;
  price: string;
}

export interface MsgCreateStickerResponse {
  id: string;
}

function createBaseMsgBuySticker(): MsgBuySticker {
  return { creator: "", stickerId: "", bid: "" };
}

export const MsgBuySticker = {
  encode(message: MsgBuySticker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.stickerId !== "") {
      writer.uint32(18).string(message.stickerId);
    }
    if (message.bid !== "") {
      writer.uint32(26).string(message.bid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBuySticker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBuySticker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.stickerId = reader.string();
          break;
        case 3:
          message.bid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgBuySticker {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      stickerId: isSet(object.stickerId) ? String(object.stickerId) : "",
      bid: isSet(object.bid) ? String(object.bid) : "",
    };
  },

  toJSON(message: MsgBuySticker): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.stickerId !== undefined && (obj.stickerId = message.stickerId);
    message.bid !== undefined && (obj.bid = message.bid);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBuySticker>, I>>(object: I): MsgBuySticker {
    const message = createBaseMsgBuySticker();
    message.creator = object.creator ?? "";
    message.stickerId = object.stickerId ?? "";
    message.bid = object.bid ?? "";
    return message;
  },
};

function createBaseMsgBuyStickerResponse(): MsgBuyStickerResponse {
  return {};
}

export const MsgBuyStickerResponse = {
  encode(_: MsgBuyStickerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBuyStickerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBuyStickerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgBuyStickerResponse {
    return {};
  },

  toJSON(_: MsgBuyStickerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgBuyStickerResponse>, I>>(_: I): MsgBuyStickerResponse {
    const message = createBaseMsgBuyStickerResponse();
    return message;
  },
};

function createBaseMsgCreateSticker(): MsgCreateSticker {
  return { creator: "", sticker: "", price: "" };
}

export const MsgCreateSticker = {
  encode(message: MsgCreateSticker, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.sticker !== "") {
      writer.uint32(18).string(message.sticker);
    }
    if (message.price !== "") {
      writer.uint32(26).string(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateSticker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateSticker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.sticker = reader.string();
          break;
        case 3:
          message.price = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateSticker {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      sticker: isSet(object.sticker) ? String(object.sticker) : "",
      price: isSet(object.price) ? String(object.price) : "",
    };
  },

  toJSON(message: MsgCreateSticker): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.sticker !== undefined && (obj.sticker = message.sticker);
    message.price !== undefined && (obj.price = message.price);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateSticker>, I>>(object: I): MsgCreateSticker {
    const message = createBaseMsgCreateSticker();
    message.creator = object.creator ?? "";
    message.sticker = object.sticker ?? "";
    message.price = object.price ?? "";
    return message;
  },
};

function createBaseMsgCreateStickerResponse(): MsgCreateStickerResponse {
  return { id: "" };
}

export const MsgCreateStickerResponse = {
  encode(message: MsgCreateStickerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateStickerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateStickerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateStickerResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: MsgCreateStickerResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateStickerResponse>, I>>(object: I): MsgCreateStickerResponse {
    const message = createBaseMsgCreateStickerResponse();
    message.id = object.id ?? "";
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  BuySticker(request: MsgBuySticker): Promise<MsgBuyStickerResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  CreateSticker(request: MsgCreateSticker): Promise<MsgCreateStickerResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.BuySticker = this.BuySticker.bind(this);
    this.CreateSticker = this.CreateSticker.bind(this);
  }
  BuySticker(request: MsgBuySticker): Promise<MsgBuyStickerResponse> {
    const data = MsgBuySticker.encode(request).finish();
    const promise = this.rpc.request("decogit.decogit.Msg", "BuySticker", data);
    return promise.then((data) => MsgBuyStickerResponse.decode(new _m0.Reader(data)));
  }

  CreateSticker(request: MsgCreateSticker): Promise<MsgCreateStickerResponse> {
    const data = MsgCreateSticker.encode(request).finish();
    const promise = this.rpc.request("decogit.decogit.Msg", "CreateSticker", data);
    return promise.then((data) => MsgCreateStickerResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
