/// <reference types="pixi.js" />
declare namespace PIXI {
    interface GLTexture {
        compressed?: boolean;
    }
}
declare namespace pixi_compressed_textures {
    function loadFromArrayBuffer(arrayBuffer: ArrayBuffer, src: string, crnLoad?: boolean): CompressedImage;
    class CompressedImage extends PIXI.resources.Resource {
        private _internalLoader;
        constructor(src: string, data?: Uint8Array, type?: string, width?: number, height?: number, levels?: number, internalFormat?: number);
        init(src: string, data: Uint8Array, type: string, width: number, height: number, levels: number, internalFormat: number): CompressedImage;
        complete: boolean;
        isCompressedImage: boolean;
        preserveSource: boolean;
        onload: (event: Object) => void;
        src: string;
        data: Uint8Array;
        type: string;
        width: number;
        height: number;
        levels: number;
        internalFormat: number;
        baseTexture: PIXI.BaseTexture;
        dispose(): void;
        bind(baseTexture: PIXI.BaseTexture): void;
        upload(renderer: PIXI.Renderer, baseTexture: PIXI.BaseTexture, glTexture: PIXI.GLTexture): boolean;
        style(renderer: PIXI.Renderer, baseTexture: PIXI.BaseTexture, glTexture: PIXI.GLTexture): boolean;
        loadFromArrayBuffer(arrayBuffer: ArrayBuffer, crnLoad?: boolean): CompressedImage;
    }
}
declare namespace pixi_compressed_textures {
    abstract class AbstractInternalLoader {
        protected _image: CompressedImage;
        static type: string;
        protected _format: number;
        constructor(_image?: CompressedImage);
        abstract levelBufferSize(width: number, height: number, mipLevel?: number): number;
        abstract load(buffer: ArrayBuffer): CompressedImage;
        free(): void;
        static test(arrayBuffer: ArrayBuffer): boolean;
    }
}
declare namespace pixi_compressed_textures {
    class ASTCLoader extends AbstractInternalLoader {
        useSRGB: boolean;
        static type: string;
        private _blockSize;
        constructor(_image: CompressedImage, useSRGB?: boolean);
        load(buffer: ArrayBuffer): CompressedImage;
        static test(buffer: ArrayBuffer): boolean;
        levelBufferSize(width: number, height: number, mipLevel?: number): number;
    }
}
declare function fourCCToInt32(value: string): number;
declare function int32ToFourCC(value: number): string;
declare namespace pixi_compressed_textures {
    class DDSLoader extends AbstractInternalLoader {
        static type: string;
        constructor(_image: CompressedImage);
        load(arrayBuffer: ArrayBuffer): CompressedImage;
        static test(buffer: ArrayBuffer): boolean;
        levelBufferSize(width: number, height: number, mipLevel?: number): number;
    }
}
declare namespace pixi_compressed_textures {
    class PVRTCLoader extends AbstractInternalLoader {
        static type: string;
        constructor(_image: CompressedImage);
        load(arrayBuffer: ArrayBuffer): CompressedImage;
        static test(buffer: ArrayBuffer): boolean;
        levelBufferSize(width: number, height: number, mipLevel?: number): number;
    }
}
declare class BasisFile {
    constructor(buffer: Uint8Array);
    getNumImages(): number;
    getNumLevels(): number;
    getImageWidth(imageId: number, level: number): number;
    getImageHeight(imageId: number, level: number): number;
    getHasAlpha(): boolean;
    startTranscoding(): boolean;
    getImageTranscodedSizeInBytes(imageId: number, level: number, basisFormat: number): number;
    transcodeImage(dstBuff: Uint8Array, imageId: number, level: number, basisFormat: number, pvrtcWrapAddressing: boolean, getAlphaForOpaqueFormats: boolean): number;
}
declare namespace pixi_compressed_textures {
    class BASISLoader extends AbstractInternalLoader {
        static BASIS_BINDING: typeof BasisFile;
        static RGB_FORMAT: {
            basis: number;
            name: string;
            native: number;
        };
        static RGBA_FORMAT: {
            basis: number;
            name: string;
            native: number;
        };
        type: string;
        private _file;
        constructor(_image: CompressedImage);
        static test(array: ArrayBuffer): boolean;
        static bindTranscoder(fileCtr: typeof BasisFile, ext: any): void;
        load(buffer: ArrayBuffer): CompressedImage;
        _loadAsync(buffer: ArrayBuffer): Promise<CompressedImage>;
        levelBufferSize(width: number, height: number, level: number): number;
    }
}
declare module CRN_Module {
    function _free(src: number): void;
    let HEAPU8: Uint8Array;
    function _crn_get_width(src: number, size: number): number;
    function _crn_get_height(src: number, size: number): number;
    function _crn_get_levels(src: number, size: number): number;
    function _crn_get_dxt_format(src: number, size: number): number;
    function _crn_get_uncompressed_size(src: number, size: number, stuff: number): number;
    function _malloc(size: number): number;
    function _crn_decompress(src: number, srcSize: number, dst: number, dstSize: number, stuff: number): void;
}
declare namespace pixi_compressed_textures {
    class CRNLoader extends AbstractInternalLoader {
        static type: string;
        private _caches;
        constructor(_image: CompressedImage);
        load(arrayBuffer: ArrayBuffer): CompressedImage;
        levelBufferSize(width: number, height: number, mipLevel?: number): number;
        free(): void;
        static test(buffer: ArrayBuffer): boolean;
    }
}
declare namespace PIXI.systems {
    interface TextureSystem {
        initCompressed?(): void;
        registerCompressedLoader?(loader: any): void;
        compressedExtensions?: any;
    }
}
declare namespace pixi_compressed_textures {
    let Loaders: Array<any>;
    function RegisterCompressedLoader(...loaders: any[]): void;
    let defaultDetectedExtensions: string[];
    function detectExtensions(renderer: PIXI.Renderer, resolution?: number, defaultResolution?: number): string[];
}
declare namespace PIXI {
    interface LoaderResource {
        compressedImage?: pixi_compressed_textures.CompressedImage;
        isCompressedImage?: boolean;
    }
}
declare namespace pixi_compressed_textures {
    const TEXTURE_EXTENSIONS: string[];
    function RegisterCompressedExtensions(...exts: string[]): void;
    class ImageParser {
        static use(this: PIXI.Loader, resource: PIXI.LoaderResource, next: () => any): void;
    }
}
declare namespace PIXI {
    interface LoaderResource {
        _defaultUrlChoice?: string;
        _defaultUrl?: string;
        _baseUrl?: string;
    }
}
declare namespace pixi_compressed_textures {
    function extensionChooser(supportedExtensions?: Array<string>): (this: PIXI.Loader, resource: PIXI.LoaderResource, next: () => any) => any;
}
declare namespace pixi_compressed_textures {
    class ExtensionFixer {
        static use(this: PIXI.Loader, resource: PIXI.LoaderResource, next: () => any): void;
    }
}
declare namespace pixi_compressed_textures {
}
declare module "pixi-compressed-textures" {
    export = pixi_compressed_textures;
}
declare namespace pixi_compressed_textures {
    class WorkedBASISLoader extends BASISLoader {
        private _mips;
        constructor(_image: CompressedImage);
        _loadAsync(buffer: ArrayBuffer): Promise<CompressedImage>;
        static loadAndRunTranscoder(options: {
            path: string;
            ext: any;
            threads: number;
        }): Promise<void>;
        static runTranscoder(options: {
            jsSource: string;
            wasmSource: ArrayBuffer;
            threads: number;
            ext: any;
        }): Promise<WorkedBASIS.TranscoderWorkerPool>;
        levelBufferSize(width: number, height: number, mip: number): number;
    }
}
interface IBasicResult {
    type?: 'error' | 'init' | 'transcode';
}
interface IInitResult extends IBasicResult {
    buffer?: ArrayBuffer;
}
interface IErrorResult extends IBasicResult {
    type: 'error';
    error: string;
}
interface ITranscodeOptions {
    rgbaFormat: number;
    rgbFormat: number;
    genMip?: boolean;
    transfer?: boolean;
}
interface IMipmap {
    width: number;
    height: number;
    format: number;
    size: number;
}
interface ITranscodeResult extends IInitResult {
    type: 'transcode';
    hasAlpha: boolean;
    width: number;
    height: number;
    mipmaps: Array<IMipmap>;
}
declare namespace pixi_compressed_textures.WorkedBASIS {
    class BasisWorker {
        static ID: number;
        worker: Worker;
        id: number;
        free: boolean;
        initDone: boolean;
        binary: ArrayBuffer;
        private _rej;
        private _res;
        init(basisSource?: string, basisBinary?: ArrayBuffer): Promise<boolean>;
        transcode(buffer: ArrayBuffer, options: ITranscodeOptions): Promise<ITranscodeResult>;
        _init(bin: ArrayBuffer): void;
        _onMessage(event: {
            data: IBasicResult;
        }): void;
        _onError(reason: string): void;
        destroy(): void;
    }
    class TranscoderWorkerPool {
        workers: Array<BasisWorker>;
        private count;
        constructor(count?: number);
        init(jsSource: string, wasmSource: ArrayBuffer): Promise<this>;
        transcode(buffer: ArrayBuffer, options: ITranscodeOptions): Promise<ITranscodeResult>;
        destroy(): void;
    }
}
declare var BASIS: any;
declare namespace pixi_compressed_textures.WorkedBASIS {
    const basisWorkerSource: string;
    function generateWorker(basisJSSource: string): Worker;
}
