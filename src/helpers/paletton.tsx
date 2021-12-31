
type Subpalette = [string, string, string, string, string];
export type Palette = {
    primary: Subpalette,
    secondary?: Subpalette,
    secondary2?: Subpalette,
    complement?: Subpalette,
    url: string,
};

export const paletton = (ps: TemplateStringsArray, ...pf: any): Palette => {
    const stringed = ps.map((e: any, i: number) => {
        if (i === 0) return e;
        else {
            const f = pf[i-1];
            return (typeof f === "function" ? String(f()) : String(f)) + e;
        }
    }).join("");
    const parser = new DOMParser();
    const paletteData = parser.parseFromString(stringed, "text/xml");
    
    let colorsets = paletteData.getElementsByTagName("colorset");
    const spreadColors = (colorset: Element) => {
        const colors = colorset.getElementsByTagName("color");
        const outp = [];
        for (let i=0; i<colors.length; i++) {
            outp.push("#" + colors[i].getAttribute("rgb"));
        }
        return outp;
    }
    return {
        primary: spreadColors(colorsets[0]) as any,
        secondary: spreadColors(colorsets[1] || colorsets[0]) as any,
        secondary2: spreadColors(colorsets[2] || colorsets[0]) as any,
        complement: spreadColors(colorsets[3] || colorsets[1] || colorsets[0]) as any,
        url: paletteData.getElementsByTagName("url")[0].innerHTML,
    };
};
