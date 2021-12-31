import { paletton } from "./helpers/paletton";

export const palette = paletton`
<palette>
<url>
http://paletton.com/#uid=7370G0kleqtbzEKgVuIpcmGtdhZ
</url>
<colorset id="primary" title="Primary color">
<color id="primary-0" nr="0" rgb="2F8C6E" r="47" g="140" b="110" r0="0.184" g0="0.549" b0="0.431"/>
<color id="primary-1" nr="1" rgb="7DC4AD" r="125" g="196" b="173" r0="0.49" g0="0.769" b0="0.678"/>
<color id="primary-2" nr="2" rgb="4DA387" r="77" g="163" b="135" r0="0.302" g0="0.639" b0="0.529"/>
<color id="primary-3" nr="3" rgb="1A7859" r="26" g="120" b="89" r0="0.102" g0="0.471" b0="0.349"/>
<color id="primary-4" nr="4" rgb="085F43" r="8" g="95" b="67" r0="0.031" g0="0.373" b0="0.263"/>
</colorset>
<colorset id="secondary-1" title="Secondary color (1)">
<color id="secondary-1-0" nr="0" rgb="3A518E" r="58" g="81" b="142" r0="0.227" g0="0.318" b0="0.557"/>
<color id="secondary-1-1" nr="1" rgb="8697C5" r="134" g="151" b="197" r0="0.525" g0="0.592" b0="0.773"/>
<color id="secondary-1-2" nr="2" rgb="576CA5" r="87" g="108" b="165" r0="0.341" g0="0.424" b0="0.647"/>
<color id="secondary-1-3" nr="3" rgb="243B7A" r="36" g="59" b="122" r0="0.141" g0="0.231" b0="0.478"/>
<color id="secondary-1-4" nr="4" rgb="122760" r="18" g="39" b="96" r0="0.071" g0="0.153" b0="0.376"/>
</colorset>
<colorset id="secondary-2" title="Secondary color (2)">
<color id="secondary-2-0" nr="0" rgb="D3A647" r="211" g="166" b="71" r0="0.827" g0="0.651" b0="0.278"/>
<color id="secondary-2-1" nr="1" rgb="FFE1A3" r="255" g="225" b="163" r0="1" g0="0.882" b0="0.639"/>
<color id="secondary-2-2" nr="2" rgb="F5CB73" r="245" g="203" b="115" r0="0.961" g0="0.796" b0="0.451"/>
<color id="secondary-2-3" nr="3" rgb="B58726" r="181" g="135" b="38" r0="0.71" g0="0.529" b0="0.149"/>
<color id="secondary-2-4" nr="4" rgb="8F650D" r="143" g="101" b="13" r0="0.561" g0="0.396" b0="0.051"/>
</colorset>
<colorset id="complement" title="Complement color">
<color id="complement-0" nr="0" rgb="D37647" r="211" g="118" b="71" r0="0.827" g0="0.463" b0="0.278"/>
<color id="complement-1" nr="1" rgb="FFC2A3" r="255" g="194" b="163" r0="1" g0="0.761" b0="0.639"/>
<color id="complement-2" nr="2" rgb="F59F73" r="245" g="159" b="115" r0="0.961" g0="0.624" b0="0.451"/>
<color id="complement-3" nr="3" rgb="B55626" r="181" g="86" b="38" r0="0.71" g0="0.337" b0="0.149"/>
<color id="complement-4" nr="4" rgb="8F390D" r="143" g="57" b="13" r0="0.561" g0="0.224" b0="0.051"/>
</colorset>
</palette>
`;

export const baseTheme = {
    color: {
        fill: palette.primary[2],
        outline: palette.primary[2],
        clickableText: palette.primary[2],
        fillHighlight: palette.primary[1],
        highlightOverlay: "rgba(255,255,255,0.25)",
        error: "#FF5300",
        success: "#26DE00",
        disabled: "rgb(224,224,224)",
        disabledContrast: "rgb(64,64,64)",
        disabledText: "rgb(96,96,96)",
    },
    font: {
        h1: {
            family: 'sans-serif',
            size: '24px',
        },
        h2: {
            family: 'sans-serif',
            size: '20px',
        },
        h3: {
            family: 'sans-serif',
            size: '16px',
        },
        body: {
            family: 'sans-serif',
            size: '14px',
        }
    },
    borderRadius: "4px",
};
