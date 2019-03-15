/*
All credits and attributions to https://github.com/StingyJack/Mermaider/blob/master/Mermaider.UI/Scripts/Mermaid.d.ts
 */
interface IMermaidAPI {
    render: (id: string, txt: string, cb: Function, container?: Element) => void;
    parseError: (err: string, hash: string) => void;
    parse: (graphText: string) => boolean;

}

interface ILog {
    log: (msg: string) => void;
}



interface IMermaid {
    initialize: (options: any) => void;
    mermaidAPI: IMermaidAPI;
    Log: ILog;
}

declare module "mermaid" {
    let MermaidAll: IMermaid;
    export = MermaidAll;
}

declare module "Log" {
    let Log: ILog;
    export = Log;
}
