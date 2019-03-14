// Shim
export async function convert_string(str: string) : Promise<string>
{
    const svgbob = await import("svgbob-wasm");
    return svgbob.convert_string(str);
}

